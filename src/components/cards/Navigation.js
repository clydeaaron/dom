import React, { useState, useEffect } from 'react';
import routes from '../../pages/pagename';

export default function Navigation() {
    const [navigator, setNavigator] = useState([]);
    const [isActive, setActive] = useState(null);


    // Setting up the navigator state
    useEffect(() => {
        FetchNavigation();
    }, []);


    function FetchNavigation () {
        setNavigator([
            { id: 0, label: "BSA", link: routes.login, icon: <ion-icon name="home-outline"></ion-icon> },
            { id: 1, label: "help", link: routes.login, icon: <ion-icon name="bookmark-outline"></ion-icon> }
        ]);
    }
    
    const handleItemClick = (index) => {
        setActive(index);
    }

    return (
        
        // <div>
        //     <nav classNameName="flex flex-col justify-start  items-start bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-64 h-screen text-black">
        //         <ul classNameName='p-5'> 
        //             {navigator.map((item, index) => (
        //                 <li key={index} classNameName='p-2'>

        //                     <a href={item.link} classNameName={`dark:text-black w-48 ${isActive === index ? 'bg-gray-200' : '' }`} onClick={() => handleItemClick(index)}>
        //                         <div classNameName='w-48  rounded-[10px] border border-gray hover:shadow-lg'>
        //                             <div classNameName='p-3 text-[16px]'>
        //                                 {item.icon} &nbsp; {item.label}
        //                             </div>
        //                         </div>
        //                     </a>
        //                 </li>
        //             ))}
        //         </ul>
        //     </nav>
        // </div>
        <>
            <nav className="sidebar">

                <div className="menu-bar">

                        <ul className="menuTabs">

                            <li className="nav-links">
                            <a href={routes.login } >
                                <i className='bx bx-home-alt icon' ></i>
                                <span className="text nav-text">Home</span>
                            </a>
                            </li>

                            <li className="dropdown">
                            <a href={routes.home + "?id=BSBM"}>
                                <i className='bx bxs-book-alt icon' ></i>
                                <span className="text nav-text">BSBM</span>
                            </a>
                                <ul>
                                    <li><a href={routes.home + "?id=BSBMF"} ><i className='bx bxs-book-open icon'></i><span className="text nav-text">Major in Financial Management</span></a></li>
                                    <li><a href={routes.home + "?id=BSBMO"} ><i className='bx bxs-book-open icon'></i><span className="text nav-text">Major in Operations Management</span></a></li>
                                    <li><a href={routes.home + "?id=BSBMH"} ><i className='bx bxs-book-open icon'></i><span className="text nav-text">Major in Human Resource Development Management</span></a></li>
                                    <li><a href={routes.home + "?id=BSBMM"} ><i className='bx bxs-book-open icon'></i><span className="text nav-text">Major in Marketing Management</span></a></li>
                                </ul>
                            </li>
                            
                            <li className="nav-links">
                            <a href={routes.home  + "?id=BSOA"} >
                                <i className='bx bxs-book-alt icon' ></i>
                                <span className="text nav-text">BSOA</span>
                            </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-buttons">
                        <li className="nav-links">
                        <a href={routes.login}>
                            <i className='bx bx-log-out icon' ></i>
                            <span className="text nav-text">Logout</span>
                        </a>
                        </li>
                        
                        {/* <li className="mode">
                            
                            <a href={routes.login}>
                                <div className="light-dark">
                                    <i className='bx bx-moon icon moon'></i>
                                    <i className='bx bxs-sun icon sun' ></i>
                                </div>
                                <span className="text mode-text">Dark Mode</span>

                                <div className="toggle-switch">
                                    <span className="switch"></span>
                                </div>
                            </a>
                        </li> */}
                    </div>
            </nav>
        </>
    );
}