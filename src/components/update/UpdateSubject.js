import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { DeleteSubject, UpdateSubjects } from '../../functions'
import routes from '../../pages/pagename'

export default function UpdateSubject(data) {
    const { id, label, subject_type } = data.data

    const validationSchema = Yup.object().shape({
        Subjects: Yup.string().label("Subjects").required(),
        Type: Yup.string().label("Subject Type").required(),
    })

    async function onSubmit(value) {
        const response = await UpdateSubjects({ id: value?.id, Subject: value?.Subjects, Type: value?.Type });
        alert(response.msg)
        
        window.location.href = routes.subjects;
    }

    async function onDelete(id) {
        const response = await DeleteSubject({id: id});
        console.log(response)
        const { msg, valid } = response;
        if(valid) {
            alert(msg);
            window.location.href = routes.subjects
        } else {
            alert(msg)
        }
    }

    const formik = useFormik({
        initialValues: {
            id: id,
            Subjects: label,  // Use the actual values for initialValues
            Type: subject_type,
        },
        validationSchema,
        onSubmit,
    })

    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                        <h1 className='w-full'>Update Subjects</h1>
                        <div className='flex justify-end items-end w-full'>
                            <button><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-3'>Subject Name:<span className='text-red'>*</span></div>
                                <input type='text' id="Subjects" value={formik.values.Subjects} className='border rounded-md p-1' onChange={formik.handleChange}/>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6'>Subject Type:<span className='text-red'>*</span></div>
                                <select id="Type" className='border rounded-md p-1' onChange={formik.handleChange} value={formik.values.Type}>
                                    <option value="" disabled>-- Selected Subject Type --</option>
                                    <option value="Minor">Minor</option>
                                    <option value="Major">Major</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className='flex flex-row justify-end items-end p-3'>
                            <button type="submit" className='border rounded-md px-10 py-2 bg-red text-white' onClick={() => onDelete(id)}>Delete</button>
                            <button type="submit" className='border rounded-md px-10 py-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}