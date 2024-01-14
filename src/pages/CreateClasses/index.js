import { useFormik } from 'formik'
import * as Yup from "yup";
import React, { useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import { CreateClass, ViewAllSubject } from '../../functions';

export default function CreateClasses() {
    const [rowsData, setRowsData] = useState([]);
    const [count, setCount] = useState(0);
    const [getSubject, setGetSubjects] = useState([]);

    const generateValidationSchema = () => {
        const rowSchema = Yup.object().shape({
            Subject: Yup.string().label("Subject").required(),
            Type: Yup.string().label("Subject Type").required(),
            Time: Yup.string().label("Time").required(),
        });
        
        return Yup.object().shape({
            Room: Yup.string().label("Classroom").required(),
            course: Yup.string().label("Course").required(),
            level: Yup.number().integer().label("Year Level").required(),
            Details: Yup.array().of(rowSchema).required(),
        });
    };
    
    const validationSchema = generateValidationSchema();

    const addFields = () => {
        setCount((prevCount) => prevCount + 1);

        const rowInput = {
            counter: count,
            Subject: "",
            Type: "",
            Time: "",
        };

        setRowsData([...rowsData, rowInput]);
    };

    const handleCourse = (event) => {
        formik.handleChange(event);
        ViewSubject(event.target.value);
        console.log(formik.values.course);
    };

    const removeRows = (index) => {
        const updatedRows = [...rowsData];
        updatedRows.splice(index, 1);
        setRowsData(updatedRows);
    };

    const ViewSubject = async (course) => {
        // Use await to wait for the asynchronous operation to complete
        const response = await ViewAllSubject({ courses: course });
        console.log(response)

        if (!response.valid) {
            return;
        }

        setGetSubjects(response.data);
        console.log(course);
    };

    async function onSubmit(value) {
        console.log(value)
        const response = await CreateClass({ Room: value?.Room, course: value?.course, level: value?.level, Subject: value?.Details });


        alert(response)
        // return  window.location.href = routes.room
    }

    const formik = useFormik({
        initialValues: {
                Room: "",
                course: "",
                level: "", 
                Details: [{}],
            },
        validationSchema,
        onSubmit
    });


    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex flex-row w-screen h-screen border'>
                <div className='min-w-[300px] '>
                    <AdminNavigation />
                </div>
                <div className='flex h-screen  min-w-[1000px] pt-5'>
                    <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                        <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                            <h1 className='w-full'>Add New Class</h1>
                            <div className='flex justify-end items-end w-full'>
                                <button><ion-icon name="close-outline"></ion-icon></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                            <div className='flex flex-row'>
                                <div className='flex p-2'>
                                    <div className='px-3'>Classroom:<span className='text-red'>*</span></div>
                                    <input type='text' id="Room" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.Room && formik.errors.Room ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Room}</div>
                                    ) : null}
                                </div>
                                <div className='flex p-2'>
                                    <div className='px-5'>Course: </div>
                                    <input type='text' id="course" className='border rounded-md p-1' onChange={handleCourse}/>
                                    {formik.touched.course && formik.errors.course ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.course}</div>
                                    ) : null}
                                </div>
                                <div className='flex p-2'>
                                    <div className='px-6'>Year Level:<span className='text-red'>*</span></div>
                                    <input type="number" id="level" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.level && formik.errors.level ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.level}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className="flex flex-row gap-2 h-9 justify-center items-center ">
                                    <button type="submit" className=' px-4 h-full hover:bg-red bg-[#cc2609]  text-white rounded-md text-sm whitespace-nowrap' onClick={addFields}>
                                        Add Subject
                                    </button>
                                </div>
                                
                                {/**
                                 * Start Rows
                                 */
                                    rowsData.map((data, index) => (
                                        <div className='flex py-1 gap-5' key={index}>
                                            <div className="flex shadow rounded-l-sm w-full h-9 justify-center items-center">
                                                <div className='bg-slightwhite text-lightgray px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] justify-center items-center whitespace-nowrap italic'>
                                                {index + 1} <ion-icon name="mail"></ion-icon>
                                                </div>
                                                <select
                                                id={`Details[${index}].Subject`}
                                                name={`Details[${index}].Subject`}
                                                className="border block w-full rounded-sm text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  py-2 px-3"
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    // Assuming you have a function like handleSubjectChange to update the selected value
                                                    // handleSubjectChange(e.target.value);
                                                }}
                                                >
                                                <option selected disabled> -- Select Subject --</option>
                                                {getSubject.map((item, idx) => (
                                                    <option key={idx} value={item.label}>
                                                    {item.label}
                                                    </option>
                                                ))}
                                                </select>
                                            </div>
                                        
                                            <div className="flex rounded-l-sm w-full h-9 justify-center items-center">
                                                <select
                                                id={`Details[${index}].Type`}
                                                name={`Details[${index}].Type`}
                                                className="border block w-full rounded-sm text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  py-2 px-3 "
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    // handleTypeChange(e.target.value);
                                                }}
                                                >
                                                <option selected disabled>-- Select Subject Type --</option>
                                                <option value="Minor">Minor</option>
                                                <option value="Major">Major</option>
                                                </select>
                                            </div>
                                            <div className="flex rounded-l-sm w-full h-9 justify-center items-center ">
                                                <input
                                                type="text"
                                                id={`Details[${index}].Time`}
                                                name={`Details[${index}].Time`}
                                                onChange={formik.handleChange}
                                                className='border h-9 w-full bg-slightwhite px-2 py-2 font-light text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] placeholder:italic placeholder:text-lightgray  rounded-r-sm '
                                                placeholder='Time'
                                                />
                                            </div>
                                            <div className="flex w-[35%] rounded-l-sm p-auto h-9 justify-center items-center">
                                                <button
                                                className='p-1 w-full rounded-lg text-sm whitespace-nowrap border'
                                                onClick={() => removeRows(index)}
                                                >
                                                <ion-icon name="trash-outline"></ion-icon>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex flex-row justify-end items-end p-3'>
                                <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
