import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import { ViewAllCourse } from '../../functions';
import routes from '../pagename';

export default function Courses() {

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        ViewCourse()
    },[])

    async function ViewCourse(){
        const response = await ViewAllCourse();
        console.log(courses)

        setCourses(response.data)
    }

    // async function SpecifyCourse(course) {
    //     const response = await ViewSpecifyCourse({course: course});

    //     if(course === "") {
    //         return ViewCourse();
    //     }
    //     if(response.valid) return setCourses(response.data)
    // }

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
                            <h2 className='text-[30px] font-bold'>Courses List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                    <a href={routes.course_creation} className='p-1 rounded border bg-[#468f29] text-white'><ion-icon name="add-circle-outline"></ion-icon> Add Course</a>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex items-center justify-center pt-10'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-green p-2 rounded-tl-md'>Course</th>
                                        <th className='bg-green p-2'>Shorten Name</th>
                                        <th className='bg-green p-2'>Years of levels</th>
                                        <th className='bg-green p-2'>Status</th>
                                        <th className='bg-green p-2 rounded-tr-md'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((item, index) => {
                                        return (
                                            <tr>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.course_name}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.shortcut}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.years}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.status}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                    {/* <Popup trigger={
                                                        <button className='shadow rounded-md p-1 text-white bg-green mx-2'> View </button>
                                                    }>
                                                        <UpdateCourse data={item} />
                                                    </Popup> */}
                                                    <a href={routes.updateCourse + "?id=" + item.id} className='shadow rounded-md p-1 text-white bg-green mx-2' >View</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
