import React from 'react'
import Header from '../../components/cards/header'
import Navigation from '../../components/cards/Navigation'

export default function Login() {
    return (
        <div className='fixed justify-items-start p-auto w-screen h-screen font-serif'>
            <div className='bg-slate-700 w-screen'>
                <Header />
            </div>
            <div className='flex flex-row static p-auto w-100'>
                
                <div className='w-screen h-screen'>
                    <Navigation />
                </div>
                <div className='flex justify-center items-center w-screen h-screen'>
                    <div className='text-[14px]'>
                        <div className='p-4'>
                            <div>Enter Username: </div>
                            <input type="text" placeholder='Enter Username...' id="username" className='px-4 w-72 py-2 border border-gray rounded-[10px] ' />
                        </div>
                        <div className='p-4'>
                            <div>Enter Password: </div>
                            <input type="text" placeholder='Enter Password...' id="password" className='px-4 w-72 py-2 border border-gray rounded-[10px] ' />
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="submit" className='w-[150px] h-[37px] mx-auto mt-5 hover:bg-[#4eda49de] bg-[#23CD0799] rounded-[10px] text-[14px] '> 
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
