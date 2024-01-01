import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Header from '../../components/cards/header'
import Navigation from '../../components/cards/Navigation'

export default function Home() {

    const [students, setStudent] = useState([]);
    const [filter, setFilter] = useState("");
    const [id, setID] = useState("");

    useEffect(() => {
        fetch_student();
        const urlParams = new URLSearchParams(window.location.search);
        setID(urlParams.get('id'));
    }, []);

    const fetch_student = async() => {
        setStudent([
            {student_no: 92, course: 'BSE', year: "4th", name: "dylan" },
            {student_no: 69, course: 'BSA', year: "3rd", name: "palacio" }
        ]);
    }

    const DataTable = (names) => {
        // Assuming students is defined somewhere in your component or passed as a prop
        const datatable = students.map((item, index) => {
            // Check if keys are provided
            if (id === item.course || names === item.name) {
                return (
                    <tr key={index}>
                        <td align="center">{item.student_no}</td>
                        <td align="center">{item.name}</td>
                        <td align="center">{item.course + " - " + item.year}</td>
                    </tr>
                );
            }
            return null; 
        });
    
        return datatable;
    };



    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-slate-700 shadow-md w-screen'>
                <Header />
            </div>
            <div className='flex  w-screen h-screen'>
                <div className='w-72'>
                    <Navigation/>
                </div>
                <div className='flex flex-row justify-center items-center static h-80 w-screen pl-12 pr-2 pt-2 shadow-lg min-w-[1300px] border'>
                    <div className=' w-screen h-80 text-[20px] p-3'>
                        <div className='flex flex-row justify-end items-end p-4'>
                            <div className='pr-5'>Search Name: </div>
                            <input type='text' className='rounded-sm border p-1' id="filter_name" onChange={(e) => setFilter(e.target.value)} placeholder='Search'/>
                        </div>
                        <div className='w-full rounded border'>
                            <table className='table-auto text-center w-full ronded-md '>
                                <thead className='bg-slate-700'>
                                    <tr>
                                        <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Student ID</th>
                                        <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Student Name</th>
                                        <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>Year & Section</th>
                                        <th className='text-center p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] py-3 bg-green w-1/7'>asda</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { DataTable(filter) }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
