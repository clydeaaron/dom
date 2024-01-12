import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Header from './header'
import AdminNavigation from './AdminNavigation'

export default function CreateCourse() {
    const validationSchema = Yup.object().shape({
        Course: Yup.string().label("Subjects").required(),
        Shorten: Yup.string().label("Shorten Course").required(),
        Years: Yup.number().integer().label("Years per Course").required(),
    })

    const formik = useFormik({
        initialValues: {
            Course: "",
            Shorten: "",
            Years: 0
        },
        validationSchema,
        
    })

    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex w-screen h-screen border'>
                <div className='w-80 '>
                    <AdminNavigation />
                </div>
                <div className='flex flex-row static min-h-[500px] w-screen pl-12 pr-2 pt-2 shadow-lg min-w-[1300px]'>
                    <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
                        <div className='flex h-screen justify-center items-center '>
                            <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                                <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                                    <h1 className='w-full'>Add New Course</h1>
                                    <div className='flex justify-end items-end w-full'>
                                        <button><ion-icon name="close-outline"></ion-icon></button>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                                    <div className='flex flex-row'>
                                        <div className='flex p-2'>
                                            <div className='px-3'>Course Name:<span className='text-red'>*</span></div>
                                            <input type='text' id="Course" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                        </div>
                                        <div className='flex p-2'>
                                            <div className='px-5'>Course Shorten: </div>
                                            <input type='text' id="Shorten" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                        </div>
                                        <div className='flex p-2'>
                                            <div className='px-6'>Course Years:<span className='text-red'>*</span></div>
                                            <input type="number" id="Years" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                        </div>
                                    </div>
                                    <div className='flex flex-row'>

                                    </div>
                                    <div className='flex flex-row justify-end items-end p-3'>
                                        <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}