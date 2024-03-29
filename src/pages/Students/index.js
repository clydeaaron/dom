import React, { useEffect, useState } from 'react'
import AddStudent from '../../components/cards/AddStudent'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import Popup from 'reactjs-popup'
import { ViewAllStudent } from '../../functions'
import { getName } from '../../helper'
import UpdateStudent from '../../components/update/UpdateStudent'
import ImportStudent from '../../components/cards/ImportStudent'

export default function Students() {
    const [student, setStudent] = useState([]);
    const [filter, setFilter] = useState("");
    const [semester, setSemester] = useState("");

    useEffect(() => {
        ViewAllStudents()
    }, [])

    async function ViewAllStudents() {
        const response = await ViewAllStudent();

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
                            <h2 className='text-[30px] font-bold text-black'>Student List</h2>
                            <div className='flex flex-row w-full rounded pt-4'>
                                <div className='flex justify-start items-start gap-4 w-full rounded' >
                                    <Popup trigger={
                                        <button className='p-1 rounded border bg-[#468f29] text-white'><ion-icon name="add-circle-outline"></ion-icon> Add Student</button>
                                    } >
                                        <AddStudent />
                                    </Popup>
                                    <Popup trigger={<button className='p-1 rounded border bg-primary text-black' > Import </button>} >
                                        <ImportStudent />
                                    </Popup>
                                    
                                </div>
                                
                                <div className='flex justify-end items-end gap-4 w-full rounded' >
                                    <h1 className='font-bold'>Semester: </h1>
                                    <select className='border rounded-md' onChange={e => setSemester(e.target.value)}>
                                        <option selected disabled> -- Select Semester --</option>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                    </select>
                                    <h1 className='font-bold'>Search: </h1>
                                    <input type='text' id="Search" className='border rounded-md' onChange={e => setFilter(e.target.value)}/>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex items-center justify-center pt-10 overflow-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-green p-2 rounded-tl-md'>Student ID</th>
                                        <th className='bg-green p-2'>Student Name</th>
                                        <th className='bg-green p-2'>Year & Course</th>
                                        <th className='bg-green p-2'>Semester</th>
                                        <th className='bg-green p-2'>Status</th>
                                        <th className='bg-green p-2 rounded-tr-md'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        student
                                        .filter(item => {
                                            const fullName = getName(item.firstname, item.middlename, item.lastname).toLowerCase();
                                            const studentID = item.student_id.toLowerCase();
                                            const searchTerm = filter.toLowerCase();
                                            const course = item.course.toLowerCase();

                                            return (filter === "" || 
                                                (studentID.includes(searchTerm) || 
                                                fullName.includes(searchTerm) ||
                                                course.includes(searchTerm) ||
                                                searchTerm === "")
                                            ) && (semester == "" || item.semester.toString() === semester.toString());
                                        })
                                        .map((item, index) => (
                                            <tr key={index}>
                                                <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.student_id}</td>
                                                <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{getName(item.firstname, item.middlename, item.lastname)}</td>
                                                <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.year_level + " - " + item.course}</td>
                                                <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.semester}</td>
                                                <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.status}</td>
                                                <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                    <Popup trigger={<button className='shadow rounded-md p-1 text-white bg-green mx-2'> Update </button>}>
                                                        <UpdateStudent data={item} />
                                                    </Popup>
                                                </td>
                                            </tr>
                                        ))
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
