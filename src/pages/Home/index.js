import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import Navigation from '../../components/cards/Navigation'
import { ViewAllClass, ViewAllStudent, ViewProfessorChecklist } from '../../functions';
import routes from '../pagename';
import { getName } from '../../helper';
import Popup from 'reactjs-popup';
import GradeCreation from '../../components/cards/GradeCreation';

export default function Home() {
    const [students, setStudents] = useState([]);
    const [checklist, setChecklist] = useState([]);
    const [filter, setFilter] = useState("");
    const [ids, setID] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setID(urlParams.get('username'));
        FetchAllStudent();
        fetchChecklist();
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

    const fetchChecklist = async() => {
        const response = await ViewProfessorChecklist({id: ids});
        const { valid, data } = response;
        if(valid) {
            setChecklist(data);
        }
    }
    
    console.log(checklist)
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
                        <div className='w-full flex'>
                            <div className='text-[20px] w-full font-bold'>Checklist</div>
                            <div className='flex flex-row justify-end items-end p-3'>
                                <div className='px-5'>Search: </div>
                                <input type='text' className='rounded-sm border px-1' id="filter_name" onChange={(e) => setFilter(e.target.value)} placeholder='Search'/>
                            </div>
                        </div>
                        
                        <div className='h-screen max-h-[1000px] overflow-auto '>
                            <div className='w-full h-full rounded '>
                                <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full gap-4'>
                                    {
                                        checklist
                                        .filter((item) => { 
                                            const search = filter.toLowerCase();
                                            return (item.professor_id == ids) && (item.label.toLowerCase().includes(search) || item.id.toLowerCase().includes(search) || search == "")
                                        })
                                        .map((item, index) => {
                                            return (
                                                <>
                                                    <div className='h-full w-full border rounded-md mt-2'>
                                                        <div className='p-3 w-full text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                            <span className='font-bold'>Subject:</span> {item.label}    
                                                        </div>
                                                        <div className='w-full mt-10% p-3 rounded'>
                                                            {/* <Popup trigger={<button className='shadow w-full mt-[15%] rounded bg-green text-white text-center'>
                                                                View Students
                                                            </button>}>
                                                                <GradeCreation data={item} />
                                                            </Popup> */}
                                                            <a href={routes.ChecklistGrade + "?id=" + item.id} className='shadow w-full mt-[15%] rounded bg-green text-white text-center'>
                                                                View Students
                                                            </a>
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
    </div>
    )
}
