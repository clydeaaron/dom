import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import { InsertStudent, ViewAllCourse } from '../../functions';

export default function AddStudent() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        ViewCourse();
    },[])

    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().label("First Name").required(),
        MiddleName: Yup.string().label("Middle Name"),
        LastName: Yup.string().label("First Name").required(),
        Birthdate: Yup.date().label("Birthdate").default(() => new Date()),
        Year: Yup.number().integer().positive().label("Year").required(),
        Course: Yup.string().label("Course").required(),
        Contact: Yup.string().label("Contact Number").required()
    })

    async function ViewCourse(){
        const response = await ViewAllCourse();
        console.log(courses)

        setCourses(response.data)
        
    }

    async function onSubmit(value){
        const response = await InsertStudent({
            firstname: value?.FirstName,
            middlename: value?.MiddleName,
            lastname: value?.LastName,
            Birthdate: value?.Birthdate,
            Gender: value?.Gender,
            Year: value?.Year,
            Course: value?.Course,
            Contact: value?.Contact
        });

        console.log(response)
        alert(response.msg);
    }

    const formik = useFormik({
        initialValues: {
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Birthdate: "",
            Gender: "",
            Year: 0,
            Course: "",
            Contact: "",
        },
        validationSchema,
        onSubmit
    })
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-col shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
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
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[32%]'>Birthdate:<span className='text-red'>*</span></div>
                                <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[35%]'>Course:<span className='text-red'>*</span></div>
                                <select id="Course" className='border rounded-md p-1' onChange={formik.handleChange}>
                                    <option selected disabled>--- Select a course ---</option>
                                    {
                                        courses.map((item, index) => (
                                            <option key={index} value={item.shortcut}>{item.course_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Gender:<span className='text-red'>*</span></div>
                                <select id="gender" className='border rounded-md p-1' onChange={formik.handleChange}>
                                    <option selected disabled>--- Select a Gender ---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[35%]'>Year:<span className='text-red'>*</span></div>
                                <input type='number' id="Year" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-6'>Contact Number:<span className='text-red'>*</span></div>
                                <input type='text' id="Contact" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                        </div>
                        <div className='flex flex-row justify-end items-end'>
                            <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
