import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import { UpdateGrades } from '../../functions';

export default function UpdateGrade(data) {
    const { id, prelim, midterm, prefinal, finals, subject } = data.data;
    
    const validationSchema = Yup.object().shape({
        prelim: Yup.number().integer().label("Prelim").required(),
        midterm: Yup.number().integer().label("Midterm").required(),
        prefinal: Yup.number().integer().label("Pre-Finals").required(),
        finals: Yup.number().integer().label("Finals").required(),
    })

    async function onSubmit(value) {
        const response = await UpdateGrades({ id: value?.id , prelim: value?.prelim, midterm: value?.midterm, prefi: value?.prefinal, finals: value?.finals});
        const { msg } = response;

        alert(msg)
        return window.location.reload()
    }
    
    const formik = useFormik({
        initialValues: {
            id: id,
            prelim: prelim,
            midterm: midterm,
            prefinal: prefinal,
            finals: finals    
        },
        validationSchema,
        onSubmit

    })
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-[1000px] h-auto rounded-xl'>
                    <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                        <h1 className='w-full'>Update Grade</h1>
                        <div className='flex justify-end items-end w-full'>
                            <button onClick={() => window.location.reload()}>
                                <ion-icon name='close-outline'></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        <div className='flex items-center justify-center w-full text-[20px] text-center font-sans pb-[5%]'>
                            {subject}
                        </div>
                        <div className='grid grid-cols-2 gap-3 '>
                            <div className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-center'>
                                Prelim:
                            </div>
                            <div>
                                <input type='text' className='p-2 border rounded text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7' id="prelim" defaultValue={formik.values.prelim} onChange={formik.handleChange}/>
                            </div>
                            <div className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-center'>
                                Midterm:
                            </div>
                            <div>
                                <input type='text' className='p-2 border rounded text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7' id="midterm" defaultValue={formik.values.midterm} onChange={formik.handleChange}/>
                            </div>
                            <div className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-center'>
                                Pre-Finals:
                            </div>
                            <div>
                                <input type='text' className='p-2 border rounded text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7' id="prefinal" defaultValue={formik.values.prefinal} onChange={formik.handleChange}/>
                            </div>
                            <div className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-center'>
                                Finals:
                            </div>
                            <div>
                                <input type='text' className='p-2 border rounded text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7' id="finals" defaultValue={formik.values.finals} onChange={formik.handleChange}/>
                            </div>
                        </div>
                        <div className='flex flex-row justify-end items-end w-full p-3'>
                            <button type="submit" className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-green rounded-md border p-2' onClick={formik.handleSubmit} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
