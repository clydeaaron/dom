import React, { useEffect, useState } from 'react'
import Navigation from '../../components/cards/Navigation'
import Header from '../../components/cards/header'
import { EditClassGrade, FetchEnroll, ViewAllSubject } from '../../functions';

export default function UpdateClassRoom() {
    const [student, setStudent] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classSubject, setClassSubject] = useState("")
    const [classroom, setClassroom] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        FetchSubject()
        const urlParams = new URLSearchParams(window.location.search);
        setClassroom(urlParams.get('classroom'));
        FetchStudents({classs: urlParams.get('classroom')})
    },[])

    async function FetchSubject() {
        const response = await ViewAllSubject();
        const { valid, data } = response;
        if(valid) setSubjects(data)
    }
    async function FetchStudents({classs}) {
        console.log(classs)
        const response = await FetchEnroll({id: classs});

        const { valid, data, msg } = response;
        console.log(data)

        if(valid) {
            setStudent(data)
        } 
    }

    async function onSubmit() {
        const response = await EditClassGrade({ students: student});

        const { valid, msg } = response;
        alert(msg)
        window.history.back()
    }
    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-white shadow-md w-full'>
                <Header />
            </div>
            <div className='flex pt-1 w-screen h-screen'>
                <div className='w-64'>
                    <Navigation/>
                </div>
                <div className='flex flex-row  static h-[600px] w-screen pl-12 pr-2 pt-2 shadow-lg min-w-[1300px]'>
                    <div className=' w-screen h-80 text-[20px] p-3'>
                        <div className='flex flex-row justify-end items-end p-4'>
                            <div className='px-5'>
                            
                            </div>
                            <div className='px-5'>Search Student: </div>
                            <input type='text' className='rounded-sm border p-1' id="filter_name" onChange={e => setFilter(e.target.value)} placeholder='Search'/>
                        </div>
                        <div className='max-h-[500px] overflow-auto'>
                            <div className='w-full rounded '>
                                <table className='table-auto text-center w-full rounded-md '>
                                    <thead className='bg-slate-700'>
                                        <tr>
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Student ID</th>
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Student Name</th>
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Year & Section</th>
                                    
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Prelim</th>
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Mid term</th>
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Semi Finals</th>
                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Finals</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            student
                                            .filter((item) => { 
                                                return item.student_no.toLowerCase().indexOf(filter) >= 0 || item.student.toLowerCase().indexOf(filter) >= 0 || filter === ""
                                            })
                                            .map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.student_no}</td>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.student}</td>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.classroom + "  - " + item.year_level}</td>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                            <input type="text" className='px-4 w-[100px] py-2 border border-gray rounded-md' defaultValue={item.first} onChange={(e) => item['first'] = e.target.value}/>
                                                        </td>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                            <input type="text" className='px-4 w-[100px] py-2 border border-gray rounded-md' defaultValue={item.second} onChange={(e) => item['second'] = e.target.value}/>
                                                        </td>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                            <input type="text" className='px-4 w-[100px] py-2 border border-gray rounded-md' defaultValue={item.third} onChange={(e) => item['third'] = e.target.value}/>
                                                        </td>
                                                        <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                            <input type="text" className='px-4 w-[100px] py-2 border border-gray rounded-md' defaultValue={item.fourth} onChange={(e) => item['fourth'] = e.target.value}/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                        <div className='flex flex-row justify-end items-end w-full p-3'>
                            <button className='text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-green rounded-md border p-2' onClick={onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
