import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import { InsertStudent, ViewAllCourse } from '../../functions';

export default function AddStudent() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        FetchCourse();
    },[])

    const validationSchema = Yup.object().shape({
        StudentID: Yup.string().label("Student_id").required(),
        FirstName: Yup.string().label("First Name").required(),
        MiddleName: Yup.string().label("Middle Name"),
        LastName: Yup.string().label("First Name").required(),
        Birthdate: Yup.date().label("Birthdate").default(() => new Date()).required(),
        Year: Yup.number().integer().positive().label("Year").required(),
        Gender: Yup.string().label('Gender').required(),
        Course: Yup.string().label("Course").required(),
        Contact: Yup.string().label("Contact Number").matches(/^\d+$/, "Contact number must contain only digits").max(11, "Contact number must be at most 11 digits").required("Contact number is required")
    })

    async function FetchCourse(){
        const response = await ViewAllCourse();

        return setCourses(response.data)
    }

    async function onSubmit(value){
        const response = await InsertStudent({
            student_id: value?.StudentID,
            firstname: value?.FirstName,
            middlename: value?.MiddleName,
            lastname: value?.LastName,
            Birthdate: value?.Birthdate,
            Gender: value?.Gender,
            Year: value?.Year,
            Course: value?.Course,
            Contact: value?.Contact
        });
        
        alert(response.msg);
        return window.location.reload();
    }

    const formik = useFormik({
        initialValues: {
            StudentID: null,
            FirstName: null,
            MiddleName: null,
            LastName: null,
            Birthdate: null,
            Gender: null,
            Year: null,
            Course: null,
            Contact: null,
        },
        validationSchema,
        onSubmit
    })

    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-row shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
                        <h1 className='w-full'>Add New Student</h1>
                        <div className='flex justify-end items-end w-full'>
                            <form>
                                <button><ion-icon name="close-outline"></ion-icon></button>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-6'>Student ID:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="StudentID" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.student_id} />
                                    {formik.touched.StudentID && formik.errors.StudentID ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.StudentID}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-6'>First Name:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="FirstName" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.FirstName && formik.errors.FirstName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.FirstName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-5'>Middle Name: </div>
                                <div>
                                    <input type='text' id="MiddleName" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.MiddleName && formik.errors.MiddleName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.MiddleName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6'>Last Name:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="LastName" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.LastName && formik.errors.LastName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.LastName}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[32%]'>Birthdate:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.Birthdate && formik.errors.Birthdate ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Birthdate}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[35%]'>Course:<span className='text-red'>*</span></div>
                                <div>
                                    <select id="Course" className='border rounded-md p-1' onChange={formik.handleChange}>
                                        <option selected disabled>--- Select a course ---</option>
                                        {
                                            courses.map((item, index) => (
                                                <option key={index} value={item.shortcut}>{item.course_name}</option>
                                            ))
                                        }
                                    </select>
                                    {formik.touched.Course && formik.errors.Course ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Course}</div>
                                    ) : null}
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Gender:<span className='text-red'>*</span></div>
                                <div>
                                    <select id="Gender" className='border rounded-md p-1' onChange={formik.handleChange}>
                                        <option selected disabled>--- Select a Gender ---</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {formik.touched.Gender && formik.errors.Gender ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Gender}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[35%]'>Year:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='number' id="Year" className='border rounded-md p-1' onChange={formik.handleChange}/>
                                    {formik.touched.Year && formik.errors.Year ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Year}</div>
                                    ) : null}
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-6'>Contact Number:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='string' pattern="[0-9]*" id="Contact" className='border rounded-md p-1' maxLength="11" max="11" onChange={formik.handleChange}/>
                                    {formik.touched.Contact && formik.errors.Contact ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Contact}</div>
                                    ) : null}
                                </div>
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
