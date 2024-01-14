import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import routes from '../pagename';
import { ViewAllClass, ViewSpecifyClasses } from '../../functions';

export default function Rooms() {
    const [classs, setClasses] = useState([]);


    useEffect(() => {
        ViewClasses()
    }, [])

    async function ViewClasses() {
        const response = await ViewAllClass();
        console.log(response)

        if(response.valid) {
            setClasses(response.data);
        } else {
            console.log(response.error)
        }
    }

    async function ViewSpecifyClass(name) {
        setClasses([]);
        const response = await ViewSpecifyClasses(name);

        if(name === "") {
            return ViewClasses();
        }

        if(response.valid) {
            return setClasses(response.data);
        } else {
            return console.log(response.error)
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
                            <h2 className='text-[30px] font-bold'>Class List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                        <a href={routes.createclass} className='p-1 rounded border bg-slate-400'><ion-icon name="add-circle-outline"></ion-icon> Add Classes</a>
                                </div>
                                <div className='flex justify-end items-end gap-4 w-full rounded'>
                                    <h1 className='font-bold'>Search Student: </h1>
                                    <input type='text' id="Search" className='border rounded-md px-2' onChange={e => ViewSpecifyClass(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-5'></hr>
                            <div className='grid grid-cols-4 gap-3 p-5'>
                                {
                                    classs.map((item, index) => {
                                        return (
                                            <div className='h-[250px] w-[250px] border rounded-md bg-white cursor-pointer'>
                                                <div className='m-2 border h-[100px] rounded-md'>
                                                    Logo
                                                </div>
                                                <div className='p-2 text-[14px] text-[#287128]'>
                                                    <div className='font-sans'>
                                                        Class: { item.room }
                                                    </div>
                                                    <div className='font-sans'>
                                                        Student Number: { item.course }
                                                    </div>
                                                    <div className='font-sans'>
                                                        Course: { item.year }
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
