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
        const { valid , data } = response
        console.log(response)

        if(valid) {
            switch(data) {
                case "Admin":
                    window.location.href = routes.student;
                    break;
                case "Prof":
                    window.location.href = routes.home;
                    break;
            }
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
            {/* <div className='w-screen '>
                    <Header />
            </div> */}
            <div className='flex flex-row justify-center items-center static p-auto w-screen h-screen'>
                <div className='w-full h-full bg-Login bg-cover bg-no-repeat'></div>
                <div className='flex flex-row justify-center items-center h-80 w-full '>
                    <div className='w-[50%] text-[14px] flex flex-col justify-center items-center shadow-md rounded-md bg-white'>
                        <div className='p-4 text-[20px] sm:text-[22px] md:text-[25px] lg:text-[28px] text-center  flex flex-col justify-center items-center'>
                            <div className='bg-Logo bg-cover bg-no-repeat w-20 h-14'></div>
                            Welcome to CAVSU Academic Depertment Management
                        </div>
                        <div className='p-4'>
                            <div>Enter Username: </div>
                            <input type="text" placeholder='Enter Username...' id="Email"  className='px-4 w-72 py-2 border border-gray rounded-[10px] ' onChange={formik.handleChange} />
                            {formik.touched.Email && formik.errors.Email ? (
                                    <div className='text-red text-[10px] py-2'>{formik.errors.Password}</div>
                                ) : null}
                        </div>
                        <div className='p-4'>
                            <div>Enter Password: </div>
                            <input type="password" placeholder='Enter Password...' id="Password" className='px-4 w-72 py-2 border border-gray rounded-[10px] ' onChange={formik.handleChange} onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                    }
                                }} />
                            {formik.touched.Password && formik.errors.Password ? (
                                    <div className='text-red text-[10px] py-2'>{formik.errors.Password}</div>
                                ) : null}
                        </div>
                        <div className="flex justify-center items-center p-2">
                            <button type="submit" className='w-[150px] h-[37px] mx-auto mt-5 hover:bg-[#4eda49de] bg-[#23CD0799] rounded-[10px] text-[14px]' onClick={formik.handleSubmit}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
