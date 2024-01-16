import React, { useEffect, useState } from 'react'
import AddStudent from '../../components/cards/AddStudent'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import Popup from 'reactjs-popup'
import { ViewAllStudent, ViewSpecifyStudent } from '../../functions'
import { getName } from '../../helper'

export default function Admin() {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        ViewAllStudents()
    }, [])

    async function ViewAllStudents() {
        const response = ViewAllStudent();

        if(response.valid){
            setStudent(response.data);
        } else {
            console.log(response.error)
        }
    }

    async function ViewSpecifyStudents(name) {
        setStudent([]);
        const response = ViewSpecifyStudent(name);

        if(name === "") {
            return ViewAllStudents();
        }

        if(response.valid){
            setStudent(response.data);
        } else {
            console.log(response.error)
        }
    }

    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex flex-row w-screen h-screen border'>
                <div className='min-w-[300px] '>
                    <AdminNavigation />
                </div>
                <div className='flex h-screen  min-w-[1000px] pt-5'>
                    <div className=' w-screen h-80 text-[20px] p-3'>
                        <div className='w-full rounded'>
                            <h2 className='text-[30px] font-bold'>Students List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                    <Popup trigger={
                                        <button className='p-1 rounded border bg-[#468f29] text-white'><ion-icon name="add-circle-outline"></ion-icon> Add Student</button>
                                    } >
                                        <AddStudent />
                                    </Popup>
                                </div>
                                <div className='flex justify-end items-end gap-4 w-full rounded'>
                                    <h1 className='font-bold'>Search Student: </h1>
                                    <input type='text' id="Search" className='border rounded-md'/>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex items-center justify-center pt-10'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-green p-2 rounded-tl-md'>Student ID</th>
                                        <th className='bg-green p-2'>Student Name</th>
                                        <th className='bg-green p-2'>Year & Course</th>
                                        <th className='bg-green p-2'>Status</th>
                                        <th className='bg-green p-2 rounded-tr-md'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        student.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.student_id}</td>
                                                    <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{getName(item.firstname, item.middlename, item.lastname)}</td>
                                                    <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.year_level + " - " + item.course}</td>
                                                    <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.status}</td>
                                                    <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
