import React, { useState, useEffect } from 'react';
import routes from '../../pages/pagename';
import { ViewAllCourse } from '../../functions';

export default function Navigation() {
    const [navigator, setNavigator] = useState([]);
    const [isActive, setActive] = useState(null);

    useEffect(() => {
        fetchNavigations();
        
    }, []);

    async function fetchNavigations() {
        const response = await ViewAllCourse();
        const { valid, data } = response;

        if (valid) {
            setNavigator(data.map((item) => ({
                id: item.course_name, // assuming course_name is unique
                label: item.course_name,
                link: `${routes.home}?id=${item.shortcut}`,
                icon: <ion-icon name="bookmark-outline"></ion-icon>
            })));
        }
    }

    const handleItemClick = (item) => {
        setActive(item.id);
    };

    let [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        // <div className="navigation-container">
        //     <nav className="flex flex-col p-2 justify-start items-start bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-64 h-screen text-black">
        //         <ul className="p-5">
        //             {navigator.map((item) => (
        //                 <li key={item.id} className="navigation-item m-3">
        //                     <a
        //                         href={item.link}
        //                         className={`dark:text-black w-48 ${isActive === item.id && 'bg-gray-200'}`}
        //                         onClick={() => handleItemClick(item)}
        //                     >
        //                         <div className="w-full rounded-[10px] border border-gray hover:shadow-lg">
        //                             <div className="p-2 text-[16px] w-full">
        //                                 {item.icon} &nbsp; {item.label}
        //                             </div>
        //                         </div>
        //                     </a>
        //                 </li>
        //             ))}
        //         </ul>
        //     </nav>
        // </div>
        <div className='shadow-md fixed w-64 '>
                <ul className={`md:flex md:flex-col md:items-center md:my-0 md:pb-0 pb-10 absolute md:static w-full h-screen transition-all duration-300 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                    {
                        navigator.map((link) => (
                            <li key={link.label} className='md:flex justify-center items-center bg-slate-50 p-5 w-full text-[19px] font-sansserif font-semibold my-2'>
                                <a href={link.link} className='text-black hover:text-white duration-500 '>{link.icon}<span>{link.label}</span></a>
                            </li>
                        ))
                    }
                    <li className='md:flex justify-center items-center bg-slate-50 p-5 w-full text-[19px] font-sansserif font-semibold my-2'>
                        <a href={routes.login} className='text-black hover:text-white duration-500 '><ion-icon name="log-out-outline"></ion-icon><span>Logout</span></a>
                    </li>
                </ul>
        </div>
    );
}