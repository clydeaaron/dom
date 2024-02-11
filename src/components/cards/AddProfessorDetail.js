import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ViewAllSubject, insertCheckList } from '../../functions';
import * as Yup from 'yup';

export default function AddProfessorDetail(prop) {
    const professor  = prop.data;
    const [subject, setSubject] = useState([]);

    const validationSchema = Yup.object().shape({
        professor: Yup.string().label("Professor").required(),
        subject: Yup.string().label("Subject").required()
    })

    useEffect(() => {
        FetchSubject();
    },[])

    const FetchSubject = async() => {
        const response = await ViewAllSubject();
        const { valid, data } = response;
        if(valid) {
            setSubject(data)
        }
    }
    
    async function onSubmit(value) {
        const response = await insertCheckList({professor: value?.professor, subject: value?.subject})
        const { msg } = response;
        alert(msg)
    }

    const formik = useFormik({
        initialValues: {
            professor: professor,
            subject: null,
        },
        validationSchema,
        onSubmit
    })
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-row shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
                        <h1 class="w-full">Add Check List</h1>
                        <div className='flex justify-end items-end w-full'>
                            <button onClick={() => window.location.reload()}><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        
                        <div className='flex flex-row'>
                        <div className='flex p-2'>
                                <div className='px-2'>Professor username: </div>
                                <div>
                                    <input type='text' id="professor" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.professor} disabled/>
                                    {formik.touched.professor && formik.errors.professor ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.professor}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-2'>Subject:<span className='text-red'>*</span></div>
                                <div>
                                    <select id="subject" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.subject}>
                                        <option selected disabled> -- Select Subject --</option>
                                        {
                                            subject.map((item, index) => (
                                                <option value={item.id}>{item.label}</option>
                                            ))
                                        }
                                    </select>
                                    {formik.touched.subject && formik.errors.subject ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.subject}</div>
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
