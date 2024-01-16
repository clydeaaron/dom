import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { UpdateUsers } from '../../functions'

export default function UpdateUser(data) {
    const { id, first_name, middle_name, last_name, username, email, password, birthdate, gender, course, user_type } = data.data
    
    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().label("first name").required(),
        MiddleName: Yup.string().label("middle name").required(),
        LastName: Yup.string().label("last name").required(),
        username: Yup.string().label("username").required(),
        Email: Yup.string().email().label("Email").required(),
        password: Yup.string().label("password").required(),
        gender: Yup.string().label("gender").required(),
        Birthdate: Yup.date().label("Birthdate").default(() => new Date()),
        user_type: Yup.string().label("User Type").required()
    })

    async function onSubmit(values) {
        console.log(values);
        try {
            const response = await UpdateUsers({
                id: values?.id,
                user: values?.username,
                email: values?.Email,
                password: values?.password,
                fname: values?.FirstName,
                mname: values?.MiddleName,
                lname: values?.LastName,
                birthdate: values?.Birthdate,
                gender: values?.gender,
                type: values?.user_type
            });
            alert(response.msg);
        } catch (error) {
            console.error(error);
            alert("An error occurred during the user update. Please try again."); // Handle error more gracefully
        }
    }


    const formik = useFormik({
        initialValues: {
            id: id || "", // Default to an empty string if student_id is undefined or null
            FirstName: first_name || "",
            MiddleName: middle_name || "",
            LastName: last_name || "",
            username: username || "",
            Email: email || "",
            password: password || "",
            gender: gender || "",
            Birthdate: birthdate || "",
            Course: course || "",
            user_type: user_type || ""
        },
        validationSchema,
        onSubmit
    });
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-col shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
                        <h1>Update User</h1>
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
                                <input type='text' id="username" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.username}/>
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
                                <input type='password' id="password" className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            
                        </div>
                        
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[32%]'>Birthdate:<span className='text-red'>*</span></div>
                                <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Birthdate}/>
                            </div>
                            <div className='flex p-2 w-full'>
                                <div className='px-6 w-[32%]'>Gender:<span className='text-red'>*</span></div>
                                <select
                                    id="gender"
                                    className='border rounded-md p-1'
                                    onChange={formik.handleChange}
                                    value={formik.values.gender} // Use formik.values for controlled components
                                >
                                    <option disabled>--- Select a Gender ---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6'>User Type:<span className='text-red'>*</span></div>
                                <select
                                    id='user_type'
                                    className='border rounded-md p-1'
                                    onChange={formik.handleChange}
                                    value={formik.values.user_type} // Use formik.values for controlled components
                                    >
                                    <option value="" disabled>-- Select User Type --</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Prof">Professor</option>
                                </select>
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
