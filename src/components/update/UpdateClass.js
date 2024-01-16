import { useFormik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { UpdateClassroom, ViewAllSubject, ViewClassDetail } from '../../functions';
import routes from '../../pages/pagename';

export default function UpdateClass(data) {
    const { room, course, year } = data.data
    const [rowsData, setRowsData] = useState([]);
    const [count, setCount] = useState(0);
    const [getSubject, setGetSubjects] = useState([]);

    useEffect(() => {
        fetchDetails(formik.values.Room)
        ViewSubject(course);
    }, [])

    const generateValidationSchema = () => {
        
        return Yup.object().shape({
            Room: Yup.string().label("Classroom").required(),
            course: Yup.string().label("Course").required(),
            level: Yup.number().integer().label("Year Level").required(),
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
    };

    async function onSubmit(value) {
        const subjectsData = rowsData.map((data) => ({
            Subject: data.Subject,
            Type: data.Type,
            Time: data.Time,
        }));
    
        const response = await UpdateClassroom({
            Room: value?.Room,
            course: value?.course,
            level: value?.level,
            Subject: subjectsData,
        });
    
        alert(response);
        // return  window.location.href = routes.room
    }

    const formik = useFormik({
        initialValues: {
                Room: room,
                course: course,
                level: year, 
                Details: [{}],
            },
        validationSchema,
        onSubmit
    });


    async function fetchDetails(id) {
        const response = await ViewClassDetail({id: id});
        console.log(response);
        const { data } = response;
        if(response.valid) {
            data.map((item, index) => {
                setRowsData([{
                    counter: index,
                    Subject: item.subject,
                    Type: item.type,
                    Time: item.time,
                }])
            })
            
            setCount(response.data.length)
        } else {
            
        console.log(response.msg)
        }
    }

    return (

        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto min-w-[1000px] min-h-[80px] rounded-xl overflow-auto'>
                    <div className='pl-5 pt-10 text-[18px]'>
                            Update Class
                        </div>  
                    <div className='flex h-[500px]  w-full pt-3'>
                        <div className='w-full px-3 bg-slate-100'>
                            <div className='flex flex-row justify-start items-start  w-full rounded-t-md h-auto p-5 '>
                                <div className='flex flex-col p-2 w-full'>
                                    <div>Classroom:<span className='text-red'>*</span></div>
                                    <input type='text' id="Room" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Room}/>
                                    {formik.touched.Room && formik.errors.Room ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Room}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col p-2'>
                                    <div>Course: </div>
                                    <input type='text' id="course" className='border rounded-md p-1' onChange={handleCourse} defaultValue={formik.values.course}/>
                                    {formik.touched.course && formik.errors.course ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.course}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col p-2'>
                                    <div>Year Level:<span className='text-red'>*</span></div>
                                    <input type="number" id="level" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.level}/>
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
                                    
                                    <a href={routes.enroll + "?id="+formik.values.Room}> Enroll Student</a>
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
                                                    data['Subject'] = e.target.value;
                                                    // Assuming you have a function like handleSubjectChange to update the selected value
                                                    // handleSubjectChange(e.target.value);
                                                }}
                                                defaultValue={data.Subject != null ? data.Subject : null}
                                                >
                                                <option disabled> -- Select Subject --</option>
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
                                                    data['Type'] = e.target.value;
                                                    // handleTypeChange(e.target.value);
                                                }}
                                                defaultValue={data.Type != null ? data.Type : null}
                                                >
                                                <option disabled>-- Select Subject Type --</option>
                                                <option value="Minor">Minor</option>
                                                <option value="Major">Major</option>
                                                </select>
                                            </div>
                                            <div className="flex rounded-l-sm w-full h-9 justify-center items-center ">
                                                <input
                                                type="text"
                                                id={`Details[${index}].Time`}
                                                name={`Details[${index}].Time`}
                                                onChange={(e) => 
                                                    data['Time'] = e.target.value
                                                }
                                                defaultValue={data.Time != null ? data.Time : null}
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
                                <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
