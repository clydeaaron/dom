import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import Navigation from '../../components/cards/Navigation'
import { FetchEnroll, UpdateGrades } from '../../functions';
import { getName } from '../../helper';

export default function Checklist() {
    const [filter, setFilter] = useState("");
    const [id, setID] = useState("")
    const [student, setStudent] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        setID(id);
        fetchEnrolls();
    },[])

    const fetchEnrolls = async() => {
        const response = await FetchEnroll();
        const { valid, data } = response;
        if(valid) {
            setStudent(data)
        }
    }

    const handleChange = async({id, grade}) => {
        const response = await UpdateGrades({id: id, grade: grade})
        const { msg }  = response ;
        alert(msg)
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
                            <button onClick={() => window.history.back()}> <ion-icon name="chevron-back-outline"></ion-icon> Back </button>
                            <div className='text-[20px] w-full font-bold'>Checklist</div>
                            <div className='border rounded-md bg-white'>
                                <div className='text-[20px] font-bold w-full p-2 bg-green rounded-md'>
                                    STANDARD TRANSMUTATION TABLE FOR ALL COURSE
                                </div>
                                <div className='w-full flex '>
                                    <div className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-full'>
                                        <div>96.68 - 100.0 : <span className='px-5'>1.00</span></div>
                                        <div>93.34 - 96.67 : <span className='px-5'>1.25</span></div>
                                        <div>90.01 - 93.33 : <span className='px-5'>1.50</span></div>
                                        <div>86.68 - 90.00 : <span className='px-5'>1.75</span></div>
                                    </div>
                                    <div className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]  w-full'>
                                        <div>83.34 - 86.67 : <span className='px-5'>2.00</span></div>
                                        <div>80.01 - 83.33 : <span className='px-5'>2.25</span></div>
                                        <div>76.68 - 80.00 : <span className='px-5'>2.50</span></div>
                                        <div>73.34 - 76.67 : <span className='px-5'>2.75</span></div>
                                    </div>
                                    <div className='text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-full'>
                                        <div>70.00 - 73.33 : <span className='px-5'>3.00</span></div>
                                        <div>50.00 - 69.9 : <span className='px-5'>4.00</span></div>
                                        <div>Below 50 : <span className='px-5'>5.00</span></div>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center text-center py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-full'>
                                    <div className='font-bold'>INC - <span className='px-5 font-normal'>Passed But lack some requirements</span></div>
                                    <div className='font-bold'>DROP - <span className='px-5 font-normal'>if Inexcused absence is atleast 20% of Total Grade</span></div>
                                </div>
                            </div>
                            <div className='w-full flex'>
                                <div className='w-full text-[20px] font-bold'>
                                    
                                </div>
                                <div className='flex flex-row justify-end items-end p-3 '>
                                    <div className='px-5'>Search: </div>
                                    <input type='text' className='rounded-sm border px-1' id="filter_name" onChange={(e) => setFilter(e.target.value)} placeholder='Search'/>
                                </div>
                            </div>
                            <div className='h-screen max-h-[1000px] overflow-auto '>
                                <table className='w-full border'>
                                    <tr>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7 rounded-tl-md'>#</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7'>Student ID</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7'>Student Name</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7'>Course</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7 rounded-tr-md'>Grade</th>
                                    </tr>
                                    {
                                        student
                                        .filter((item) => {
                                            return id === item.classroom
                                        })
                                        .map((item, index) => {
                                            return (
                                                <tr>
                                                    <th className='p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-white w-1/7'>{index+1}</th>
                                                    <th className='p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-white  w-1/7'>{item.student_id}</th>
                                                    <th className='p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-white  w-1/7'>{getName(item.firstname, item.middlename, item.lastname)}</th>
                                                    <th className='p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-white  w-1/7'>{item.course}</th>
                                                    <th className='p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-white  w-1/7'>
                                                        <select className='w-full bg-white 'defaultValue={item.grade} onChange={(e) => {handleChange({id: item.id, grade: e.target.value})}}>
                                                            <option selected disabled>-- Select Grade --</option>
                                                            <option value="1.00">1.00</option>
                                                            <option value="1.25">1.25</option>
                                                            <option value="1.50">1.50</option>
                                                            <option value="1.75">1.75</option>
                                                            <option value="2.00">2.00</option>
                                                            <option value="2.25">2.25</option>
                                                            <option value="2.50">2.50</option>
                                                            <option value="2.75">2.75</option>
                                                            <option value="3.00">3.00</option>
                                                            <option value="4.00">4.00</option>
                                                            <option value="5.00">5.00</option>
                                                            <option value="INC">INC</option>
                                                            <option value="DROP">DROP</option>
                                                        </select>
                                                    </th>
                                                </tr>
                                            )
                                        }) 
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
