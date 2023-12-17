import React, { useState, useEffect } from 'react';
import routes from '../../pages/pagename';

export default function Navigation() {
    const [navigator, setNavigator] = useState([]);

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

    return (
        
        <div>
            <nav className="flex flex-col justify-start  items-start bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-64 h-screen text-black">
                <ul className='p-5'> 
                    {navigator.map((item, index) => (
                        <li key={index} className='p-2'>
                            <a href={item.link} className="dark:text-black w-48">
                                <div className='w-48  rounded-[10px] border border-gray hover:shadow-lg'>
                                    <div className='p-3 text-[16px]'>
                                        {item.icon} &nbsp; {item.label}
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}