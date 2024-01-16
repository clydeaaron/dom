import React, { useState, useEffect } from 'react';
import routes from '../../pages/pagename';
import { ViewAllCourse } from '../../functions';

export default function Navigation() {
    const [navigator, setNavigator] = useState([]);
    const [isActive, setActive] = useState(null);

    useEffect(() => {
        fetchNavigations();
        navigator.push({
            id: "Logout",
            label: "Logout",
            link: routes.login,
        })
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

    return (
        <div className="navigation-container">
            <nav className="flex flex-col p-2 justify-start items-start bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-64 h-screen text-black">
                <ul className="p-5">
                    {navigator.map((item) => (
                        <li key={item.id} className="navigation-item m-3">
                            <a
                                href={item.link}
                                className={`dark:text-black w-48 ${isActive === item.id && 'bg-gray-200'}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="w-full rounded-[10px] border border-gray hover:shadow-lg">
                                    <div className="p-2 text-[16px] w-full">
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