import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { UpdatePassword, UpdateProfiles, ViewProfile } from '../../functions';
import * as Yup from 'yup'

export default function UpdateProfile() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().label("first name").required(),
        MiddleName: Yup.string().label("middle name").required(),
        LastName: Yup.string().label("last name").required(),
        username: Yup.string().label("username").required(),
        Email: Yup.string().email().label("Email").required(),
        gender: Yup.string().label("gender").required(),
        Birthdate: Yup.date().label("Birthdate").default(() => new Date())
    })

    useEffect(() => {
        const user = localStorage.getItem('username') 
        setUsername(user)
        fetchProfile(user);
    },[])

    console.log(username)
    const fetchProfile = async(user) => {
        const response = await ViewProfile({id: user});
        const { valid, data } = response;
        if(valid) {
            formik.setValues({
                id: data[0].id,
                FirstName: data[0].first_name,
                MiddleName: data[0].middle_name,
                LastName: data[0].last_name,
                Birthdate: data[0].birthdate,
                gender: data[0].gender,
                username: data[0].username,
                Email: data[0].email,
                profile: data[0].profile
            });
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFile(reader.result);
                formik.values.profile = file
                // formik.setFieldValue('profile', file); // Set formik field value
            };
            reader.readAsDataURL(file);
        }
    };


    async function onSubmit(value) {
        console.log(formik.values.profile)
        const response = await UpdateProfiles({
            id: value?.id, 
            user: value?.username, 
            email: value?.Email, 
            firstname: value?.FirstName, 
            mname: value?.MiddleName, 
            lname: value?.LastName, 
            birthdate: value?.Birthdate, 
            gender: value?.gender, 
            image: value?.profile
        })
        const { valid, msg } = response;
        alert(msg)
    }

    const formik = useFormik({
        initialValues: {
            id: null,
            FirstName: null,
            MiddleName: null,
            LastName: null,
            Birthdate: null,
            gender: null,
            username: null,
            Email: null,
            profile: null
        },
        validationSchema,
        onSubmit
    })

    const ChangePassword = async() => {
        if (password === "" || (password !== null && password.length < 8)) {
            return alert("Password must be at least 8 characters long and not null.");
        }

        const response = await UpdatePassword({username: username, password: password});
        const { valid, msg } = response;
        console.log(response)
        alert(msg)
    }
    return (
        <div className='bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 '>
            <div className='flex h-screen justify-center items-center '>
                <div className='flex-col justify-center bg-white w-auto h-auto rounded-xl'>
                    <div className='flex flex-row shadow-md bgf justify-start items-start bg-slate-200 w-full rounded-t-md h-auto p-5 '>
                        <h1 className='w-full'>Update User</h1>
                        <div className='flex justify-end items-end w-full'>
                                <button onClick={() => window.location.reload()}><ion-icon name="close-outline"></ion-icon></button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start bg-slate-100 w-full rounded-t-md h-auto p-5'>
                    <div style={{ textAlign: 'center' }}>
                        <input type="file" id="upload-button" accept="image/*" style={{ display: 'none' }}  onChange={handleFileChange}/>
                        <label htmlFor="upload-button">
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    margin: '0 auto',
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}
                            >
                            <img
                                src={selectedFile || `https://sbaesthetic.online/DOM_PHP/assets/${formik.values.profile ? formik.values.profile : 'profile-circle.svg'}`} // Provide a placeholder image
                                alt="Profile"
                                style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                }}
                            />
                            </div>
                        </label>
                        </div>
                            <div className='flex p-2'>
                                <div className='px-6 w-[32%]'>First Name:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text w-[32%]' id="FirstName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.FirstName}/>
                                    {formik.touched.FirstName && formik.errors.FirstName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.FirstName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-5 w-[32%]'>Middle Name: </div>
                                <div>
                                    <input type='text w-[32%]' id="MiddleName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.MiddleName}/>
                                    {formik.touched.MiddleName && formik.errors.MiddleName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.MiddleName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2'>
                                <div className='px-6 w-[32%]'>Last Name:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="LastName" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.LastName}/>
                                    {formik.touched.LastName && formik.errors.LastName ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.LastName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Username:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="username" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.username}/>
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.username}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex p-2  w-full'>
                                <div className='px-6 w-[32%]'>Email:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='text' id="Email" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Email}/>
                                    {formik.touched.Email && formik.errors.Email ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Email}</div>
                                    ) : null}
                                </div>
                                
                            </div>
                            
                            <div className='flex p-2  w-full'>
                                <div className='px-7 w-[32%]'>Birthdate:<span className='text-red'>*</span></div>
                                <div>
                                    <input type='date' id="Birthdate" className='border rounded-md p-1' onChange={formik.handleChange} defaultValue={formik.values.Birthdate}/>
                                    {formik.touched.Birthdate && formik.errors.Birthdate ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.Birthdate}</div>
                                    ) : null}
                                </div>
                            </div>
                        
                        <div className='flex p-2 w-full'>
                                <div className='px-6 w-[32%]'>Gender:<span className='text-red'>*</span></div>
                                <div>
                                    <select
                                        id="gender"
                                        className='border rounded-md p-1'
                                        onChange={formik.handleChange}
                                        value={formik.values.gender} // Use formik.values for controlled components
                                    >
                                        <option disabled>--- Select a Gender ---</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {formik.touched.gender && formik.errors.gender ? (
                                        <div className='text-red text-[10px] py-2'>{formik.errors.gender}</div>
                                    ) : null}
                                </div>
                            </div>
                        
                            <div className='flex flex-row justify-end items-end'>
                                <button type="submit" className='border rounded-md p-2 bg-[#00A36C] text-white' onClick={formik.handleSubmit}>Submit</button>
                            </div>
                        </div>
                        
                        <div className='flex flex-row'>
                            
                            
                        <div className='flex p-2 gap-4 w-full'>
                            <div className='px-6'>Password:<span className='text-red'>*</span></div>
                            <div>
                                <input type='password' id="password" className='border rounded-md p-1' onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <button className='border p-1 rounded-md bg-primary text-black' onClick={ChangePassword}> Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
