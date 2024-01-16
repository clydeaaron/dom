import React, { useEffect, useState } from 'react'
import { ViewAllStudent } from '../../functions'
import { getName } from '../../helper'

export default function StudentSearch( {data, handle } ) {
    const { setRowsData} = handle
    const { rowsData } = data;
    const [student, setStudent] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchStudent();
    }, []);

    async function fetchStudent() {
        const response = await ViewAllStudent();
        setStudent(response.data);
    }

    const handleStudents = (data) => {
        setRowsData()
    }

    const filteredStudents = student.filter(
        (item) =>
        item.student_id.includes(searchText) ||
        getName(item.firstname, item.middlename, item.lastname)
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );
    
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-[1000px] h-auto rounded-xl'>
                    <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                        <h1 className='w-full'>Update Course</h1>
                        <div className='flex justify-end items-end w-full'>
                            <button onClick={() => window.history.back()}>
                                <ion-icon name='close-outline'></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                        <div className='w-full'>
                            <input
                                type="text"
                                className='border p-2'
                                placeholder="Search by Student ID or Name"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Student ID</th>
                                        <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Student Name</th>
                                        <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Year</th>
                                        <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((item) => (
                                        <tr key={item.student_id}>
                                            <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.student_id}</td>
                                            <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{getName(item.firstname, item.middlename, item.lastname)}</td>
                                            <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.year_level}</td>
                                            <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                <button className='border p-1' value={item} onClick={(e) => handleStudents(e.target.value)}>Add Student</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}