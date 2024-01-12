import React from 'react'
import AddStudent from '../../components/cards/AddStudent'
import AdminNavigation from '../../components/cards/AdminNavigation'
import Popup from 'reactjs-popup'
import Header from '../../components/cards/header'

export default function Admin() {


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
                            <h2 className='text-[30px] font-bold'>Students List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                    <Popup trigger={
                                        <button className='p-1 rounded border bg-slate-400'><ion-icon name="add-circle-outline"></ion-icon> Add Student</button>
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
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
