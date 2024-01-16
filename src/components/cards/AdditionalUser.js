import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { CreateUser } from '../../functions'

export default function AdditionalUser() {
    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().label("First name").required(),
        MiddleName: Yup.string().label("Middle name").notRequired(), // Use notRequired instead of required for MiddleName
        LastName: Yup.string().label("Last name").required(),
        username: Yup.string().label("Username").required(),
        Email: Yup.string().email().label("Email").required(),
        password: Yup.string().label("Password").required(),
        gender: Yup.string().label("Gender").required(),
        Birthdate: Yup.date().label("Birthdate").required(), // You may want to adjust this based on your requirements
        user_type: Yup.string().label("User Type").required()
    });

    async function onSubmit(values) {
        console.log("sada")
        const response = await CreateUser({
            user: values.username,
            email: values.Email,
            password: values.password,
            fname: values.FirstName,
            mname: values.MiddleName,
            lname: values.LastName,
            birthdate: values.Birthdate,
            gender: values.gender,
            type: values.user_type
        });

        alert(response.msg);
    }

    const formik = useFormik({
        initialValues: {
            FirstName: "",
            MiddleName: "",
            LastName: "",
            username: "",
            Email: "",
            password: "",
            gender: "",
            Birthdate: "",
            user_type: ""
        },
        validationSchema,
        onSubmit
    });
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-col shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
                        <h1>Add New User</h1>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-6'>First Name:<span className='text-red'>*</span></div>
                                <input type='text' id="FirstName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.FirstName}/>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-5'>Middle Name: </div>
                                <input type='text' id="MiddleName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.MiddleName}/>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6'>Last Name:<span className='text-red'>*</span></div>
                                <input type='text' id="LastName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.LastName}/>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Username:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="username" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.username}/>
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.username}</div>
                                    ) : null}
                                </div>
                                
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Email:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="Email" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Email}/>
                                    {formik.touched.Email && formik.errors.Email ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[35%]'>Password:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='password' id="password" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Year}/>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[32%]'>Birthdate:<span className='text-red'>*</span></div>
                                <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Birthdate}/>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Gender:<span className='text-red'>*</span></div>
                                <select id="gender" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.gender}>
                                    <option value="" disabled>--- Select a Gender ---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6'>User Type:<span className='text-red'>*</span></div>
                                <select id='user_type' class='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.user_type}>
                                    <option value="" disabled>-- Select User Type --</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Prof">Professor</option>
                                </select>
                            </div>
                        </div>
                            
                        <div className='flex flex-row justify-end items-end'>
                            <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onSubmit={formik.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
