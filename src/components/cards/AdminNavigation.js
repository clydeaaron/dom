import React, { useState } from 'react'
import routes from '../../pages/pagename';
import { useNavigate } from 'react-router-dom';

export default function AdminNavigation() {
    const navigate = useNavigate()
    let Links = [
        // { name: "Dashboard", link: routes.Dashboard },
        { name: "Students", link: routes.student },
        { name: "Subject", link: routes.subjects },
        { name: "Courses", link: routes.courses },
        { name: "Users", link: routes.user },
        { name: "Logout", link: routes.login }
    ];

    
    let [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        // <div className='shadow-md fixed w-64 '>
        //         <ul className={`md:flex md:flex-col md:items-center md:my-0 md:pb-0 pb-10 absolute md:static w-full h-screen transition-all duration-300 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
        //             {
        //                 Links.map((link) => (
        //                     <li key={link.name} className='md:flex justify-center items-center bg-slate-50 p-5 w-full text-[19px] font-sansserif font-semibold my-2'>
        //                         <a href={link.link} className='text-black hover:text-white duration-500 '>{link.name}</a>
        //                     </li>
        //                 ))
        //             }
        //         </ul>

        
        <div className= "fixed grid grid-rows-3 grid-flow-col gap-4">
            <div className="row-span-3 pt-2 w-64 h-screen shadow">
                {
                    Links.map((link) => {
                        return (
                            <>
                                <button type="submit" className='w-full h-auto p-2 rounded-sm text-left text-md font-semibold indent-8 hover:bg-green active:bg-green focus:bg-green' onClick={() => navigate(link.link)}>
                                    <span>{link.name}</span>
                                </button>
                            </>
                        )
                    })
                }
                <button type="submit" className='w-full h-auto p-2 rounded-sm text-left text-sm font-semibold indent-14 hover:bg-green active:bg-green focus:bg-green' onClick={() => navigate(routes.login)}>
                    <ion-icon name="log-out-outline"></ion-icon> <span>logout</span>
                </button>
            </div>
        </div>
    )
}
