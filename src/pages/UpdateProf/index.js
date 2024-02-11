import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import { FetchEnroll, UpdateCheckList, ViewAllCourse, ViewAllSubject } from '../../functions';
import { getName } from '../../helper';

export default function UpdateProf() {
    const [filterSubject, setFilterSubject] = useState("");
    const [professor, setProfessor] = useState("");
    const [filterStudent, setFilterStudent] = useState("");
    const [course, setCourse] = useState("");
    const [subject, setSubject] = useState([]);
    const [allCourse, setAllCourse] = useState([]);
    const [student, setStudent] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setFilterSubject(urlParams.get('id'));
        setProfessor(urlParams.get("professor"))
        FetchSubject();
        FetchStudent();
        FetchCourse();
    }, [])

    const FetchSubject = async() => {
        const response = await ViewAllSubject();
        const { valid, data} = response;

        if(valid) {
            setSubject(data)
        }
    };
    const FetchCourse = async() => {
        const response = await ViewAllCourse();
        const { valid, data } = response;
        if(valid) {
            setAllCourse(data)
        }
    }

    const FetchStudent = async() => {
        const response = await FetchEnroll();
        const { valid, data } = response;
        
        if(valid) {
            setStudent(data)
        }
    }

    async function onDelete(value) {
        const response = await UpdateCheckList({ id: value, professor: ""});

        alert(response.msg)
        window.location.reload();
        // window. history.back()
    }

    async function onSubmit(value) {
        const response = await UpdateCheckList({ id: value, professor: professor});

        alert(response.msg)
        window.location.reload()
    }

console.log(student)
    return (
        <div className='fixed justify-items-start p-auto w-screen h-full font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex flex-row w-screen max-h-[80%] overflow-auto'>
                <div className='min-w-[300px] '>
                    <AdminNavigation />
                </div>
                <div className='flex h-full w-full p-5'>
                    <div className='flex-col justify-center bg-white w-full h-auto rounded-xl'>
                        <div className='flex flex-col justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                            <button onClick={() => window.history.back()} className='flex justify-center items-center text-blue first-letter:text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]'><ion-icon name="chevron-back-outline"></ion-icon> Back</button>
                            <h1 className='w-full'>Update Check List</h1>
                        </div>
                        <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                            <div className='flex flex-row w-full\'>
                                <div className='w-1/2 p-2'>
                                    <div className='px-3'>Professor :<span className='text-red'>*</span></div>
                                    <label className="border block w-3/4 rounded-md text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-gray bg-slightwhite  p-1">{professor}</label>
                                </div>
                                <div className='w-1/2 p-2'>
                                    <div className='px-3'>Subject:<span className='text-red'>*</span></div>
                                    <select id="Subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} disabled className="border block w-3/4 rounded-md text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  p-1">
                                        <option selected disabled> -- Select Subject --</option>
                                            {subject.map((item, index) => (
                                                <option key={index} value={item.id}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-1/2 p-2'>
                                    <div className='px-3'>Course :<span className='text-red'>*</span></div>
                                    <select id="course" onChange={(e) => setCourse(e.target.value)} className="border block w-3/4 rounded-md text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  p-1">
                                        <option selected disabled> -- Select Course --</option>
                                            {allCourse.map((item, index) => (
                                                    <option key={index} value={item.shortcut}>{item.course_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-1/2 p-2'>
                                    <div className='px-3'>Student :<span className='text-red'>*</span></div>
                                    <input type="text" className="border block w-3/4 rounded-md text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] bg-slightwhite p-1" onChange={(e) => setFilterStudent(e.target.value)}/>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className="flex flex-row gap-2 h-9 justify-center items-center ">
                                    {/* <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button> */}
                                </div>
                                <table className='shadow rounded-l-sm p-4 w-full h-9 justify-center items-center'>
                                    <tr>
                                        <th className='bg-slightwhite text-lightgray px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] justify-center items-center whitespace-nowrap italic'>&nbsp;</th>
                                        <th className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-center whitespace-nowrap italic'>Student ID</th>
                                        <th className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-center whitespace-nowrap italic'>Student Name</th>
                                        <th className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-center whitespace-nowrap italic'>Action</th>
                                    </tr>
                                    {
                                        student
                                        .filter((item) => { 
                                            const student_course = item.course.toLowerCase();
                                            const student_subject = item.subject.toLowerCase();
                                            const fullname =getName(item.firstname, item.middlename, item.lastname).toLowerCase();
                                            const student_id = item.student_id.toLowerCase();
                                            const search = filterStudent.toLowerCase();
                                            return (student_subject.includes(filterSubject.toLowerCase()) || filterSubject == "") && (student_course.includes(course.toLowerCase()) || course == "") && (fullname.includes(search) || student_id.includes(search) || search == "")
                                        } )
                                        .map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-center whitespace-nowrap italic'>{index + 1}</td>
                                                    <td className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-center whitespace-nowrap italic'>{item.student_id}</td>
                                                    <td className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-center whitespace-nowrap italic'>{getName(item.firstname, item.middlename, item.lastname)}</td>
                                                    <td className='bg-slightwhite px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] text-centerwhitespace-nowrap italic'>
                                                        
                                                        {
                                                            item.professor ? 
                                                                <button className='p-1 w-full rounded-lg text-sm flex justify-center items-center bg-red whitespace-nowrap border' onClick={() => onDelete(item.id)}><ion-icon name="trash-outline"></ion-icon> Delete</button>
                                                                : <button className='p-1 w-full rounded-lg bg-blue text-sm whitespace-nowrap border' onClick={() => onSubmit(item.id)}>Update</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
