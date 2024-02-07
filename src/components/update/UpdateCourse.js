import { useFormik } from 'formik';
import React from 'react';
import { DeleteCourse, UpdateCourses } from '../../functions';
import * as Yup from 'yup';
import routes from '../../pages/pagename';

export default function UpdateCourse(data) {
    const { id, course_name, shortcut, years } = data.data;

    const validationSchema = Yup.object().shape({
        Course: Yup.string().label('Course Name').required(),
        Shorten: Yup.string().label('Course Shorten'),
        Years: Yup.number().integer().label('Course Years').required(),
    });

    const formik = useFormik({
        initialValues: {
        id: id,
        Course: course_name,
        Shorten: shortcut,
        Years: years,
        },
        validationSchema,
        onSubmit,
    });

    async function onSubmit(value) {
        const response = await UpdateCourses({
        id: value?.id,
        course: value?.Course,
        shortcut: value?.Shorten,
        years: value?.Years,
        });

        const { msg, valid } = response;
        if (valid) {
            alert(msg);
            window.location.href = routes.courses;
        } else {
        alert(msg);
        }
    }

    async function onDelete() {
        const response = await DeleteCourse({ id: id });
        const { msg, valid } = response;
        if (valid) {
        alert(msg);
        window.location.href = routes.courses;
        } else {
        alert(msg);
        }
    }

    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
        <div className='flex h-screen justify-center items-center '>
            <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
            <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                <h1 className='w-full'>Update Course</h1>
                <div className='flex justify-end items-end w-full'>
                <button onClick={() => window.location.reload()}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
                </div>
            </div>
            <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                <div className='flex flex-row'>
                <div className='flex p-2'>
                    <div className='px-3'>
                    Course Name:<span className='text-red'>*</span>
                    </div>
                    <input
                    type='text'
                    id='Course'
                    className='border rounded-md p-1'
                    onChange={formik.handleChange}
                    defaultValue={formik.values.Course}
                    />
                </div>
                <div className='flex p-2'>
                    <div className='px-5'>Course Shorten:</div>
                    <input
                    type='text'
                    id='Shorten'
                    className='border rounded-md p-1'
                    onChange={formik.handleChange}
                    defaultValue={formik.values.Shorten}
                    />
                </div>
                <div className='flex p-2'>
                    <div className='px-6'>
                    Course Years:<span className='text-red'>*</span>
                    </div>
                    <input
                    type='number'
                    id='Years'
                    className='border rounded-md p-1'
                    onChange={formik.handleChange}
                    defaultValue={formik.values.Years}
                    />
                </div>
                </div>
                <div className='flex flex-row'></div>
                <div className='flex flex-row justify-end items-end p-3'>
                <button
                    type='button'
                    className='border rounded-md px-10 py-2 bg-red text-white'
                    onClick={onDelete}
                >
                    Delete
                </button>
                <button
                    type='submit'
                    className='border rounded-md p-2 bg-[#00A36C] text-white'
                    onClick={formik.handleSubmit}
                >
                    Submit
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}