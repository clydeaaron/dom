import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import routes from '../pagename';
import { ViewAllClass, ViewSpecifyClasses } from '../../functions';
import Popup from 'reactjs-popup';
import UpdateClass from '../../components/update/UpdateClass';

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
            <div className='flex flex-row w-screen h-screen border overflow-hidden'>
                <div className='min-w-[300px] '>
                    <AdminNavigation />
                </div>
                <div className='flex h-screen  min-w-[1000px] pt-5'>
                    <div className=' w-screen h-80 text-[20px] p-3'>
                        <div className='w-full rounded'>
                            <h2 className='text-[30px] font-bold'>Class List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                        <a href={routes.createclass} className='p-1 rounded border bg-[#468f29] text-white'><ion-icon name="add-circle-outline"></ion-icon> Add Classes</a>
                                </div>
                                <div className='flex justify-end items-end gap-4 w-full rounded'>
                                    <h1 className='font-bold'>Search Student: </h1>
                                    <input type='text' id="Search" className='border rounded-md px-2' onChange={e => ViewSpecifyClass(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-5'></hr>
                        <div className='flex flex-col h-[400px] gap-3 p-5 overflow-auto'>
                            {
                                classs.map((item, index) => {
                                    return (
                                        
                                        <Popup trigger={
                                            <div className='h-[125px] w-full border rounded-md bg-white hover:cursor-pointer text-[14px] text-[#287128]'>
                                                
                                                <div className='flex p-2 text-[14px] text-[#287128]'>
                                                    <div className=' w-full font-sans'>
                                                        Class: { item.room }
                                                    </div>
                                                    <div className='flex justify-end items-end w-full font-sans'>
                                                        Course: { item.course }
                                                    </div>
                                                    
                                                </div>
                                                <div className='p-2 font-sans '>
                                                    Year Level: { item.year }
                                                </div>
                                                <div className='text-[12px] flex items-center justify-center pt-3'>
                                                    Click here to view class!
                                                </div>
                                            </div>  
                                        }>
                                            <UpdateClass data={item} />
                                        </Popup>
                                            
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
