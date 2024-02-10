import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import * as Yup from 'yup'
import { CreationCourse, ViewAllSubject } from '../../functions'
import routes from '../pagename'

export default function CreateCourse() {
    const [rowsData, setRowsData] = useState([]);
    const [getSubject, setGetSubjects] = useState([]);

    useEffect(() => {
        ViewSubject();
    },[])

    const validationSchema = Yup.object().shape({
        Course: Yup.string().label("Course").required(),
        Shorten: Yup.string().label("Shorten Course").required(),
        Years: Yup.number().integer().label("Years in Course").required()
    })

    const ViewSubject = async () => {
        const response = await ViewAllSubject();

        const { valid, data } = response;
        if (!valid) {
            return;
        }

        setGetSubjects(data)
    };

    /**
     * Add Field And Remove
     */
    const addFields = () => {

        const rowInput = {
            Subject: "",    
            Type: "",
            Unit: "",
        };

        setRowsData([...rowsData, rowInput]);
    };

    const removeRows = (index) => {
        const updatedRows = [...rowsData];
        updatedRows.splice(index, 1);
        setRowsData(updatedRows);
    };

    const onSubmit = async(value) => {
        const response = await CreationCourse({course: value?.Course, shorten: value?.Shorten, year: value?.Years, details: value?.Details});
        const { valid, msg } = response;
        console.log(response)
        alert(msg)
    
        if (valid) {
            window.location.href = routes.courses;
        }
    }

    const formik = useFormik({
        initialValues: {
            Course: null,
            Shorten: null,
            Years: null,
            Details: [{}],
        },
        validationSchema,
        onSubmit
    })
    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif '>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex flex-row w-screen h-screen'>
                <div className='min-w-[300px] '>
                    <AdminNavigation />
                </div>
                <div className='flex h-3/4 min-w-[1000px] pt-5 pr-5 '>
                    <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl overflow-auto'>
                        <div className='flex flex-col justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                            <div className='flex justify-start items-start w-full'>
                                <button onClick={() => window.history.back()}>
                                    <ion-icon name="arrow-back-outline"></ion-icon>
                                </button>
                            </div>
                            <h1 className='w-full'>Add New Course</h1>
                        </div>

                        <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                            <div className='flex flex-row'>
                                <div className='flex p-2'>
                                    <div className='px-3'>Course Name:<span className='text-red'>*</span></div>
                                    <div>
                                        <input type='text' id="Course" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                        {formik.touched.Course && formik.errors.Course ? (
                                            <div className='text-red text-[10px] py-2'>{formik.errors.Course}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='flex p-2'>
                                    <div className='px-5'>Course Code: </div>
                                    <div>
                                        <input type='text' id="Shorten" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                        {formik.touched.Shorten && formik.errors.Shorten ? (
                                            <div className='text-red text-[10px] py-2'>{formik.errors.Shorten}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='flex p-2'>
                                    <div className='px-6'>Course Years:<span className='text-red'>*</span></div>
                                    <div>
                                        <input type="number" id="Years" className='border rounded-md p-1' max="10" onChange={formik.handleChange}/>
                                        {formik.touched.Years && formik.errors.Years ? (
                                            <div className='text-red text-[10px] py-2'>{formik.errors.Years}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='border p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] rounded-md bg-red' onClick={addFields}>Add Subject</button>
                            </div>

                            <div className='flex flex-col w-full h-full overflow-auto p-2'>
                                {
                                    rowsData.map((item, index) => {
                                        return (
                                            <div className='flex flex-row p-2 gap-4'>
                                                <div className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] '>#{index+1}</div>
                                                <div className="flex rounded-l-sm w-full h-9 justify-center items-center">
                                                    <div className='p-1'>Subject:</div>
                                                    <select id={`Details[${index}].Subject`} className='p-2 border text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] ' defaultValue={item.Subject} onChange={formik.handleChange} >
                                                        <option value="">-- Select Subject --</option>
                                                        {
                                                            getSubject.map((item, index) => {
                                                                return (
                                                                    <option value={item.id}>{item.label}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="flex rounded-l-sm w-full h-9 justify-center items-center">
                                                    <div className='p-2'>Type:</div>
                                                    <select id={`Details[${index}].Type`}  className='p-2 border text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] ' onChange={formik.handleChange}>
                                                        <option value="" disable>-- Select Subject Type --</option>
                                                        <option value="Minor">Minor</option>
                                                        <option value="Major">Major</option>
                                                    </select>
                                                </div>
                                                <div className="flex rounded-l-sm w-full h-9 justify-center items-center">
                                                    <div className='p-2'>Unit:</div>
                                                    <input type="number" id={`Details[${index}].Unit`} className='p-2 border text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] ' max="5" onChange={formik.handleChange}/>
                                                </div>
                                                <div className="flex w-[35%] rounded-l-sm p-auto h-9 justify-center items-center">
                                                    <button className='p-1 w-[50px] rounded-lg text-sm whitespace-nowrap border' onClick={() => removeRows(index)}>
                                                        <ion-icon name="trash-outline"></ion-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })                                      
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
