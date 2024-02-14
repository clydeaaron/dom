import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { DeleteStudent, UpdateStudents, ViewAllCourse } from '../../functions';
import routes from '../../pages/pagename';

export default function UpdateStudent( data ) {
    const { student_id, firstname, middlename, lastname, birthdate, gender, course, year_level, semester, contact_number, status} = data.data
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        FetchCourse();
    },[])

    const validationSchema = Yup.object().shape({
        StudentID: Yup.string().label("Student ID").required(),
        FirstName: Yup.string().label("First Name").required(),
        MiddleName: Yup.string().label("Middle Name"),
        LastName: Yup.string().label("First Name").required(),
        Birthdate: Yup.date().label("Birthdate").default(() => new Date()),
        Year: Yup.number().integer().positive().label("Year").required(),
        Gender: Yup.string().label("Gender").required(),
        Course: Yup.string().label("Course").required(),
        status: Yup.string().label("Status").required(),
        Contact: Yup.string().label("Contact Number").matches(/^\d+$/, "Contact number must contain only digits").max(11, "Contact number must be at most 11 digits").required("Contact number is required")
    })

    async function FetchCourse(){
        const response = await ViewAllCourse();

        return setCourses(response.data)
    }

    async function onDelete(id) {
        const response = await DeleteStudent ({id});
        const { msg, valid } = response;
        if (valid) {
            alert(msg);
            window.location.reload();
        } else {
            alert(msg);
        }
    }

    async function onSubmit(value){
        const response = await UpdateStudents({
            id: value?.StudentID,
            firstname: value?.FirstName,
            middlename: value?.MiddleName,
            lastname: value?.LastName,
            Birthdate: value?.Birthdate,
            Gender: value?.Gender,
            Year: value?.Year,
            Semester: value?.Semester,
            Course: value?.Course,
            Contact: value?.Contact,
            status: value?.status
        });

        alert(response.msg);
        window.location.href = routes.student;
    }


    const formik = useFormik({
        initialValues: {
            StudentID: student_id,
            FirstName: firstname,
            MiddleName: middlename,
            LastName: lastname,
            Birthdate: birthdate,
            Gender: gender,
            Year: year_level,
            Semester: semester,
            Course: course,
            Contact: contact_number,
            status: status
        },
        validationSchema,
        onSubmit
    })

    console.log(formik)

    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-row shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
                        <h1 className='w-full'>Update Student</h1>
                        <div className='flex justify-end items-end w-full'>
                            <form>
                                <button type="submit"><ion-icon name="close-outline"></ion-icon></button>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        <div className='flex flex-row'>
                            <div className='flex p-2'>
                                <div className='px-6'>Student ID:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="StudentID" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.StudentID} disabled/>
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
                                    <input type='text' id="FirstName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.FirstName}/>
                                    {formik.touched.FirstName && formik.errors.FirstName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.FirstName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-5'>Middle Name: </div>
                                <div>
                                    <input type='text' id="MiddleName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.MiddleName}/>
                                    {formik.touched.MiddleName && formik.errors.MiddleName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.MiddleName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6'>Last Name:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="LastName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.LastName}/>
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
                                    <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Birthdate}/>
                                    {formik.touched.Birthdate && formik.errors.Birthdate ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Birthdate}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[25%]'>Course:<span className='text-red'>*</span></div>
                                <div>
                                <select id="Course" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Course} disabled>
                                    <option disabled>--- Select a course ---</option>
                                    {courses.map((item, index) => (
                                        <option key={index} value={item.shortcut}>{item.course_name}</option>
                                    ))}
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
                                    <select id="Gender" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Gender}>
                                        <option selected disabled>--- Select a Gender ---</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {formik.touched.Gender && formik.errors.Gender ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.gender}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[25%]'>Year:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='number' id="Year" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Year}/>
                                    {formik.touched.Year && formik.errors.Year ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Year}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[35%]'>Semester:<span className='text-red'>*</span></div>
                                <div>
                                    <select id='Semester'  className='border rounded-md p-1 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]' defaultValue={formik.values.Semester} onChange={formik.handleChange}>
                                        <option value="" disable>-- Semseter --</option>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                    </select>
                                    {formik.touched.Semester && formik.errors.Semester ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Semester}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex p-2  w-full'>
                                <div className='px-6'>Contact Number:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='string' pattern="[0-9]*" id="Contact" className='border rounded-md p-1' maxLength="11" onChange={formik.handleChange} defaultValue={formik.values.Contact}/>
                                    {formik.touched.Contact && formik.errors.Contact ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Contact}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6'>Status:<span className='text-red'>*</span></div>
                                <div>
                                    <select id="status" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Gender}>
                                        <option selected disabled>--- Select a Status ---</option>
                                        <option value="Regular">Regular</option>
                                        <option value="Irregular">Irregular</option>
                                    </select>
                                    {formik.touched.status && formik.errors.status ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.status}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-end items-end'>
                            <button className='border rounded-md p-2 bg-red text-white' onClick={() => onDelete(student_id)}> Delete</button>
                            <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
