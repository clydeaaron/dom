import React from 'react'
import Header from '../../components/cards/header'
import * as Yup from "yup";
import Navigation from '../../components/cards/Navigation'
import { useFormik } from 'formik';
import { LoginValid } from '../../functions';
import routes from '../pagename';

export default function Login() { 
    const validationSchema = Yup.object().shape({
        Email: Yup.string().label("Username").required(),
        Password: Yup.string().label("Password").required()
    })

    async function onSubmit(value) {
        const response = await LoginValid({ Email: value?.Email, Password: value?.Password});
        console.log(response);

        if(response?.valid) {
            window.location.href = routes.student;
        } else {
            alert(response.msg)
        }
    }

    const formik = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },
        validationSchema,
        onSubmit
    })

    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex flex-row justify-center items-center static p-auto w-screen h-screen'>
                
                {/* <div className='w-screen '>
                    <Navigation />
                </div> */}
                <div className='flex flex-row justify-center items-center h-80 w-96 shadow-lg '>
                    <div className='text-[14px]'>
                        <div className='p-4'>
                            <div>Enter Username: </div>
                            <input type="text" placeholder='Enter Username...' id="Email"  className='px-4 w-72 py-2 border border-gray rounded-[10px] ' onChange={formik.handleChange} />
                            {formik.touched.Email && formik.errors.Email ? (
                                    <div className='text-red text-[10px] py-2'>{formik.errors.Password}</div>
                                ) : null}
                        </div>
                        <div className='p-4'>
                            <div>Enter Password: </div>
                            <input type="text" placeholder='Enter Password...' id="Password" className='px-4 w-72 py-2 border border-gray rounded-[10px] ' onChange={formik.handleChange} />
                            {formik.touched.Password && formik.errors.Password ? (
                                    <div className='text-red text-[10px] py-2'>{formik.errors.Password}</div>
                                ) : null}
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="submit" className='w-[150px] h-[37px] mx-auto mt-5 hover:bg-[#4eda49de] bg-[#23CD0799] rounded-[10px] text-[14px] ' onClick={formik.handleSubmit}> 
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
