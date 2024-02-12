import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { getName } from '../../helper';

export default function GradeCreation(prop) { 
    const { id, label} = prop.data
    const formik = useFormik({

    })

    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-col justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                        <h1>Create a Grade</h1>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        {
                            
                        }
                        <div className='flex flex-row'>
                            <div className='flex p-2 text-[14px]'>
                                <div className='px-7 font-bold'>Subject Code: </div>
                                <div>{id}</div>
                            </div>
                            <div className='flex p-2 text-[14px]'>
                                <div className='px-7 font-bold'>Subject Label: </div>
                                <div>{label}</div>
                            </div>
                            <div className='flex p-2 font-bold text-[14px]'>
                                <div className='px-7'>Subject: </div>
                                <div>
                                    <select id='Subject' className='p-1' onChange={formik.handleChange}>
                                        <option value="" disabled>--- Select Course ---</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
