import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import Popup from 'reactjs-popup'
import routes from '../pagename';

export default function Rooms() {
    const [classs, setClasses] = useState([
        { class: "class 1", student: 40 },
        { class: "class 2", student: 50 },
        { class: "class 3", student: 70 }
    ]);

    useEffect(() => {
        setClasses([
            { class: "class 1", student: 40, course: "BSE" },
            { class: "class 2", student: 50, course: "BSA"},
            { class: "class 3", student: 70, course: "BSIT" },
            { class: "class 3", student: 70, course: "BSIT" },
        ])
    }, [])
    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex w-screen h-screen border'>
                <div className='w-80 '>
                    <AdminNavigation />
                </div>
                <div className='flex flex-row static min-h-[500px] w-screen pl-12 pr-2 pt-2 shadow-lg min-w-[1300px]'>
                    <div className=' w-screen h-80 text-[20px] p-3'>
                        <div className='w-full rounded'>
                            <h2 className='text-[30px] font-bold'>Class List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                        <a href={routes.createclass} className='p-1 rounded border bg-slate-400'><ion-icon name="add-circle-outline"></ion-icon> Add Classes</a>
                                </div>
                                <div className='flex justify-end items-end gap-4 w-full rounded'>
                                    <h1 className='font-bold'>Search Student: </h1>
                                    <input type='text' id="Search" className='border rounded-md'/>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-5'></hr>
                            <div className='grid grid-cols-4 gap-3 p-5'>
                                {
                                    classs.map((item, index) => {
                                        return (
                                            <div className='h-[250px] w-[300px] border rounded-md bg-white cursor-pointer'>
                                                <div className='m-2 border h-[100px] rounded-md'>
                                                    Logo
                                                </div>
                                                <div className='p-2 text-[18px] text-[#287128]'>
                                                    <div className='font-sans'>
                                                        Class: { item.class }
                                                    </div>
                                                    <div className='font-sans'>
                                                        Student Number: { item.student }
                                                    </div>
                                                    <div className='font-sans'>
                                                        Course: { item.course }
                                                    </div>
                                                    <div className='text-[12px] flex items-center justify-center pt-3'>
                                                        Click here to view class!
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        
                                    })
                                }
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
