import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";

export default function AddStudent(data) {

    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().label("First Name").required(),
        MiddleName: Yup.string().label("Middle Name"),
        LastName: Yup.string().label("First Name").required(),
        Birthdate: Yup.date().label("Birthdate").default(() => new Date()),
        Year: Yup.number().integer().positive().label("Year").required(),
        Course: Yup.string().label("Course").required(),
    })

    async function onSubmit(value){
        const response = "";

        if(response?.valid) {
            
        } else {
            
        }
    }

    const formik = useFormik({
        initialValues: {
            FirstName: null,
            MiddleName: null,
            LastName: null,
            Birthdate: null,
            Year: null,
            Course: null,
        },
        validationSchema,
        onSubmit
    })
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-col justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                        <h1>Add New Student</h1>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-6'>First Name:<span className='text-red'>*</span></div>
                                <input type='text' id="FirstName" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-5'>Middle Name: </div>
                                <input type='text' id="MiddleName" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6'>Last Name:<span className='text-red'>*</span></div>
                                <input type='text' id="LastName" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-7'>Birthdate:<span className='text-red'>*</span></div>
                                <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-7'>Course:<span className='text-red'>*</span></div>
                                <select id="Course" className='border rounded-md p-1' onChange={formik.handleChange}>
                                    <option value="" disabled>--- Select an course ---</option>
                                </select>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6'>Year:<span className='text-red'>*</span></div>
                                <input type='text' id="Year" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                        </div>
                        {/* <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-6'>Year:<span className='text-red'>*</span></div>
                                <input type='text' id="Year" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                        </div> */}
                        <div className='flex flex-row justify-end items-end'>
                            <button type='submit' className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
