import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import Popup from 'reactjs-popup'
import AdditionalSubject from '../../components/cards/AdditionalSubject.js'
import { ViewAllSubject } from '../../functions/index.js'
import UpdateSubject from '../../components/update/UpdateSubject.js'

export default function Subjects() {

    const [subject, setSubject] = useState([]);

    useEffect(() => {
        ViewSubject()
    }, []);

    async function ViewSubject() {
        const response = await ViewAllSubject();
        setSubject(response.data);
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
                        <div className='w-full rounded bg-[]'>
                            <h2 className='text-[30px] font-bold text-black'>Subject List</h2>
                            <div className='flex flex-row w-full rounded pt-4'>
                                <div className='flex justify-start items-start w-full'>
                                    <Popup trigger={
                                        <button className='p-1 rounded border bg-[#468f29] text-white'><ion-icon name="add-circle-outline"></ion-icon> Add New Subjects</button>
                                    } >
                                        <AdditionalSubject />
                                    </Popup>
                                </div>
                                <div className='flex flex-row justify-end items-end gap-4 w-full'>
                                    <h1 className='font-bold'>Search Subject: </h1>
                                    <input type='text' id="Search" className='border rounded-md'/>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center mt-2 pt-5 h-full overflow-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-green p-2 rounded-tl-md'>Code</th>
                                        <th className='bg-green p-2'>Subject Name</th>
                                        <th className='bg-green p-2'>Type</th>
                                        <th className='bg-green p-2'>Status</th>
                                        <th className='bg-green p-2 rounded-tr-md'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subject.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.id}</td>
                                            <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.label}</td>
                                            <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.subject_type}</td>
                                            <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.status}</td>
                                            <td className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                <Popup trigger={
                                                    <button className='shadow rounded-md p-1 text-white bg-green mx-2'> View </button>
                                                }>
                                                    <UpdateSubject data={item} />
                                                </Popup>
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
