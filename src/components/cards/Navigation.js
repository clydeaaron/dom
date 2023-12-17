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
            { label: "BSA", link: routes.login },
            { label: "help", link: routes.login }
        ]);
    }

    return (
        
        <div>
            <nav className="flex flex-col w-1/2 bg-slate-700 border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-black">
                <ul>
                    {navigator.map((item, index) => (
                        <li key={index}>
                            <a href={item.link} class="dark:text-black ">{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}