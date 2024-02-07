import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import Navigation from '../../components/cards/Navigation'
import { ViewAllClass, ViewAllStudent } from '../../functions';
import routes from '../pagename';
import { getName } from '../../helper';

export default function Home() {
    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState("");
    const [ids, setID] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setID(urlParams.get('id'));
        FetchAllStudent();
    }, []);
    
    async function FetchAllStudent() {
        const response = await ViewAllStudent();
        const { valid, data, error } = response;
        if (valid) {
            setStudents(data);
        } else {
            console.error(error);
        }
    }

    
    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex flex-row w-screen h-screen border'>
                <div className='min-w-[250px] '>
                    <Navigation />
                </div>
                <div className='flex h-screen  min-w-[1000px] pt-5'>
                <div className='flex flex-row  static h-[600px] w-screen pl-12 pt-2 min-w-[1300px] pr-3'>
                    <div className=' w-screen h-80 text-[20px] p-3'>
                        <div className='flex flex-row justify-end items-end p-4'>
                            <div className='px-5'>Search Student: </div>
                            <input type='text' className='rounded-sm border p-1' id="filter_name" onChange={(e) => setFilter(e.target.value)} placeholder='Search'/>
                        </div>
                        <div className='max-h-[500px] overflow-auto border '>
                            <div className='w-full rounded '>
                                <table className='table-auto text-center w-full rounded-md '>
                                    <thead className='bg-slate-700'>
                                        <tr>
                                            <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Student No</th>
                                            <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Student Name</th>
                                            <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Year & Section</th>
                                            <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Status</th>
                                            <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {students
                                        .filter((item) => {
                                            const fullname = getName(item.firstname, item.middlename, item.lastname).toLowerCase();
                                            const student_id = item.student_id.toLowerCase();
                                            const searchTerm = filter.toLowerCase();
                                            return  item.course === ids && (filter == "" || fullname.includes(searchTerm) || student_id.includes(searchTerm));
                                        })
                                        .map((item, index) => {
                                            
                                            return (
                                            <tr key={index}>
                                                <td className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 w-1/7'>{item.student_id}</td>
                                                <td className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 w-1/7'>{getName(item.firstname, item.middlename, item.lastname)}</td>
                                                <td className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 w-1/7'>{item.course + " - " + item.year_level}</td>
                                                <td className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 w-1/7'>{item.status}</td>
                                                <td className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 w-1/7'> 
                                                    <a href={routes.createGrade + "?id=" +item.student_id} className='p-3 bg-blue rounded-md'>View</a>
                                                </td>
                                            </tr>
                                        )}
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
