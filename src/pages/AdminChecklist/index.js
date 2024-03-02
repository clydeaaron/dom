import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header'
import AdminNavigation from '../../components/cards/AdminNavigation'
import { ViewProfessorChecklist } from '../../functions';
import AddProfessorDetail from '../../components/cards/AddProfessorDetail';
import Popup from 'reactjs-popup';
import routes from '../pagename';

export default function AdminChecklist() {
    const [professor, setProfessor] = useState("");
    const [checklist, setCheckList] = useState([]);
    const [semester, setSemester] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setProfessor(urlParams.get('id'));
        fetchChecklist();
    },[])

    const fetchChecklist = async() => {
        const response = await ViewProfessorChecklist();
        const { valid, data } = response;
        if(valid) {
            setCheckList(data);
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
                            <h2 className='text-[30px] font-bold'>Check List</h2>
                            <div className='flex w-full pt-4'>
                                <div className='flex w-full'>
                                    <Popup trigger={ <button className='p-1 rounded border bg-[#468f29] text-white'> <ion-icon name="add-circle-outline"></ion-icon> Add List </button>}>
                                        <AddProfessorDetail data={professor}/>
                                    </Popup>
                                </div>
                            </div>
                            <div className='flex justify-end items-end gap-4 w-full rounded' >
                                    <h1 className='font-bold'>Semester: </h1>
                                    <select className='border rounded-md' onChange={e => setSemester(e.target.value)}>
                                        <option selected disabled> -- Select Semester --</option>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                    </select>
                                    <h1 className='font-bold'>Search: </h1>
                                    <input type='text' id="Search" className='border rounded-md' onChange={e => setFilter(e.target.value)}/>
                                </div>
                            </div>
                        <div className='flex items-center justify-center pt-10'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7 rounded-tl-md'>Subject</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7'>Status</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7'>Year & Semester</th>
                                        <th className='bg-green p-2 text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-1/7 rounded-tr-md'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    checklist
                                    .filter((item) => {
                                        const search = filter.toLowerCase();
                                        const label = item.label ? item.label.toLowerCase() : null;
                                    
                                        // Check if the item matches the professor and if the label includes the search term
                                        // Also, ensure that the item's semester matches the selected semester
                                        return item.professor_id === professor &&
                                            (filter === null || label.includes(search)) &&
                                            (semester === "" || item.semester.toString() === semester.toString());
                                    })
                                    .map((item, index) => {
                                        return (
                                            <tr>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.label}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.status}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{(item.year ? item  .year + " year" : "") + " - " + item.semester}</td>
                                                <td className='text-center  py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                    <a href={routes.UpdateCheckList + "?subject=" + item.code + "&professor=" + professor + "&id=" + item.id + "&semester=" + item.semester + "&year=" + item.year + "&section=" + item.section} className='shadow rounded-md p-1 text-white bg-green mx-2' >Update</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
