import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Header from '../../components/cards/header';
import AdminNavigation from '../../components/cards/AdminNavigation';
import { EnrollClass, FetchEnroll, ViewAllStudent, ViewAllSubject } from '../../functions';
import Popup from 'reactjs-popup';
import { getName } from '../../helper';

export default function Enroll() {
    const [id, setID] = useState([]);
    const [getSubject, setGetSubjects] = useState([]);
    const [rowsData, setRowsData] = useState([]);
    const [count, setCount] = useState(0);

    const [student, setStudent] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        ViewSubject();
        fetchStudent();
        const urlParams = new URLSearchParams(window.location.search);
        setID(urlParams.get('id'));
        fetchEnroll({room: urlParams.get('id')});
    },[])

    async function fetchStudent() {
        const response = await ViewAllStudent();
        setStudent(response.data);
    }

    async function fetchEnroll({ room }) {
        const response = await FetchEnroll({ id: room });
        const { valid, data } = response;
    
        if (valid) {
            const newRowsData = data.map((item) => ({
                counter: count + 1, // Increment the counter
                student: item.student_no,
                name: item.student,
                year: item.year_level,
            }));
    
            // Assuming setRowsData is the correct function to update the state
            setRowsData((prevRowsData) => {
                const filteredRowsData = prevRowsData.filter(
                    (row) => !newRowsData.some((newRow) => newRow.student === row.student)
                );
                return [...filteredRowsData, ...newRowsData];
            });
    
            console.log(rowsData);
        }
    }

    const handleStudents = (data) => {
        const updatedRows = [...rowsData];
    
        const rowInput = {
            counter: count + 1, // Increment the counter
            student: data.student_id,
            name: getName(data.firstname, data.middlename, data.lastname),
            year: data.year_level,
        };
        updatedRows.push(rowInput);
        setRowsData(updatedRows);
        
        console.log(rowsData)
    };

    const filteredStudents = student.filter(
        (item) =>
        item.student_id.includes(searchText) ||
        getName(item.firstname, item.middlename, item.lastname)
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    const removeRows = (index) => {
        const updatedRows = [...rowsData];
        updatedRows.splice(index, 1);
        setRowsData(updatedRows);
    };

    const ViewSubject = async () => {
        // Use await to wait for the asynchronous operation to complete
        const response = await ViewAllSubject();
        console.log(response)

        if (!response.valid) {
            return;
        }

        setGetSubjects(response.data);
    };


    async function handleSubmit() {
        const response = await EnrollClass({ id: id, student: rowsData});
        const { msg } = response;
        alert(msg);
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
                <div className='flex h-screen  min-w-[1000px] w-full pt-5 pr-3'>
                    <div className='flex-col justify-center bg-white w-full h-auto rounded-xl '>
                        <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                            <h1 className='w-full'>Add Student in {id}</h1>
                            <div className='flex justify-end items-end w-full'>
                                <button><ion-icon name="close-outline"></ion-icon></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                            <div className='flex flex-row'>
                                <div className='flex p-2'>
                                    <div className='px-3'>Classroom:</div>
                                    <label>{id}</label>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className="flex flex-row gap-2 h-9 justify-center items-center ">
                                    <Popup trigger={
                                        <button className=' px-4 h-full hover:bg-red bg-[#cc2609]  text-white rounded-md text-sm whitespace-nowrap'> Search Student </button>
                                        }>
                                            <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
                                                <div className='flex h-screen justify-center items-center '>
                                                    <div className='flex-col justify-center bg-white w-[1000px] h-auto rounded-xl'>
                                                        <div className='flex flex-row justify-start items-start bg-slate-100 w-full rounded-t-md h-auto p-5 '>
                                                            <h1 className='w-full'>Update Course</h1>
                                                            <div className='flex justify-end items-end w-full'>
                                                                <button>
                                                                    <ion-icon name='close-outline'></ion-icon>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                                                            <div className='w-full'>
                                                                <input
                                                                    type="text"
                                                                    className='border p-2'
                                                                    placeholder="Search by Student ID or Name"
                                                                    onChange={(e) => setSearchText(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className='w-full'>
                                                                <table className='w-full'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Student ID</th>
                                                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Student Name</th>
                                                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Year</th>
                                                                            <th className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {filteredStudents.map((item) => {
                                                                            if (rowsData.every((row) => row.student !== item.student_id)) {
                                                                                return (
                                                                                <tr key={item.student_id}>
                                                                                    <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.student_id}</td>
                                                                                    <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{getName(item.firstname, item.middlename, item.lastname)}</td>
                                                                                    <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>{item.year_level}</td>
                                                                                    <td className='text-center border-b-2 py-2 p-auto text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] bg-[#fff7f7] w-1/7'>
                                                                                    <button className='border p-1' onClick={() => handleStudents(item)}>Add Student</button>
                                                                                    </td>
                                                                                </tr>
                                                                                );
                                                                            } else {
                                                                                return null;
                                                                            }
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </Popup>
                                </div>
                                
                                {/**
                                 * Start Rows
                                 */
                                    rowsData.map((data, index) => (
                                        <div className='flex py-1 gap-5' key={index}>
                                            <div className="flex shadow rounded-l-sm w-full h-9 justify-center items-center">
                                                <div className='bg-slightwhite text-lightgray px-2 py-2 text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] justify-center items-center whitespace-nowrap italic'>
                                                {index + 1} <ion-icon name="mail"></ion-icon>
                                                </div>
                                                <div className=" block w-full rounded-sm text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  py-2 px-3 ">{data.student}</div>
                                            </div>
                                        
                                            <div className="bg-slightwhite flex rounded-l-sm w-full h-9 justify-center items-center">
                                                <div className=" block w-full rounded-sm text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  py-2 px-3 ">{data.name}</div>
                                            </div>
                                            <div className="bg-slightwhite flex rounded-l-sm w-full h-9 justify-center items-center ">
                                                <div className=" block w-full rounded-sm text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px]  bg-slightwhite  py-2 px-3 ">{data.year}</div>
                                            </div>
                                            <div className="bg-slightwhite flex w-[35%] rounded-l-sm p-auto h-9 justify-center items-center">
                                                <button
                                                className='p-1 w-full rounded-lg text-sm whitespace-nowrap border'
                                                onClick={() => removeRows(index)}
                                                >
                                                <ion-icon name="trash-outline"></ion-icon>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex flex-row justify-end items-end p-3'>
                                <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={() => handleSubmit()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
