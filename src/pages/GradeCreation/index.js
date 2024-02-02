import React, { useEffect, useState } from 'react'
import { ViewStudentNo } from '../../functions';
import { GWA, getName } from '../../helper';
import Header from '../../components/cards/header';
import Navigation from '../../components/cards/Navigation';
import Popup from 'reactjs-popup';
import UpdateGrade from '../../components/cards/UpdateGrade';

export default function GradeCreation() {
    const [formData, setFormData] = useState({
        ids: '',
        student: [],
        details: [],
        unit: 0
    });
    
    const [filter, setFilter] = useState('');

    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    
            fetchStudent(id);
            console.log(formData)
        
    }, []); 
    
    async function fetchStudent(value) {
        const response = await ViewStudentNo({ ids: value });
        const { valid, data, data2, msg } = response;
    
        setFormData((prevData) => ({
            ...prevData,
            ids: value,
            student: [...prevData.student, ...data],
            details: [...prevData.details, ...data2],
        }));
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
                <div className='flex flex-row  static h-[1200px] w-screen pl-12 pr-2 pt-2  min-w-[500px]'>
                    <div className=' w-screen h-[1200px] text-[20px] p-3'>
                        <div className='flex flex-col w-full p-4'>
                            <div className='flex flex-col gap-4 px-5 w-full p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                {
                                    formData.student
                                    .map((item, index) => {
                                        return(
                                            <>
                                                <div className='grid grid-col-2 '>
                                                    <div className='p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                        Student No.: {item.student_id}
                                                    </div>
                                                    
                                                </div>
                                                <div className='p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                    Student Name: {getName(item.firstname, item.middlename, item.lastname)}
                                                </div>
                                                <div className='p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                    Course: {item.course}
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <hr className='pt-3'></hr>
                            <div className='flex justify-start items-start px-5 text-[20px]'>
                                Subject List:
                            </div>
                        </div>
                        <div className='max-h-[2200px] overflow-auto'>
                            <div className='w-full rounded h-[2200px]'>
                                
                                <div className='grid grid-cols-4 w-full h-[200px] gap-4'>
                                    {
                                        formData.details
                                        .filter((item) => { 
                                            return item.subject.toLowerCase().indexOf(filter) >= 0 || filter === ""
                                        })
                                        .map((item, index) => {
                                            return (
                                                <>
                                                    <div className='h-full w-full border rounded-md mt-2'>
                                                        <div className='p-3 w-full'>
                                                            {item.subject}
                                                            <div className='p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                                GWA: 
                                                                <span className='px-3'>
                                                                    {
                                                                        GWA(item.prelim, item.midterm, item.prefinal, item.finals, item.unit)
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='w-full mt-10% p-3 rounded'>
                                                            <Popup trigger={<button className='shadow w-full mt-[10%] rounded  bg-green text-white text-center'>
                                                                View Grade
                                                            </button>}>
                                                                <UpdateGrade data={item}/>
                                                            </Popup>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
