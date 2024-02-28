import axios from "axios"

// async function LoginValid({ Email, Password}) { 
//         await axios.post (
//             "https://sbaesthetic.online/DOM_PHP/LoginValidation",
//             {
//                 Email: Email,
//                 Password: Password
//             }
//         )
//         .then( response => {
//             const  { valid, data }  = response;
//             console.log(response)

//             if( valid ) {
//                 return data;
//             } else {
//                 return data;
//             }
//         })
//         .catch (err => {
//             console.log(err)
//         })
// }

async function LoginValid({ Email, Password }) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/LoginValidation/', JSON.stringify({
            Email: Email,
            Password: Password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('An error occurred during the login validation.');
    }
}

async function insertSubject({ code, Subject, Type }) {
    try {
        const response = await axios.post(
            'https://sbaesthetic.online/DOM_PHP/AddSubject/',
            {
                code: code,
                Subject: Subject,
                Type: Type
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('An error occurred during the subject insertion.');
    }
}

async function ViewSubjectCourse({courses}) {
    try {  
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSubjectCourse/',
        {
            course: courses
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('An error occurred during the subject insertion.');
    }
}

async function ViewAllClass() {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewAllClass/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the class viewable")
    }
}

async function ViewSpecifyClasses(name) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSpecifyClasses/', 
        {
            class: name
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the class viewable")
    }
}

async function ViewAllStudent() {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewAllStudent/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the student viewable")
    }
}

async function ViewSpecifyStudent(name) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSpecifyClasses/', 
        {
            student: name
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the class viewable")
    }
}

async function CreateClass ({ Room, course, level, Subject }) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/CreateClass/', {
            Room: Room,
            course: course,
            level: level,
            Details: Subject
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })

        const { valid, msg } = response.data

        if(!valid) {
            return msg;
        }
        
        return msg;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred during the class insertion")
    }

}

async function InsertStudent({student_id, firstname, middlename,lastname, Gender, Birthdate,Year, Semester, Course, Contact, status, SY, SY2, Section}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/AddStudent/', {
            code: student_id,
            first_name: firstname,
            middle_name: middlename,
            last_name: lastname,
            birthdate: Birthdate,
            gender: Gender,
            year_level: Year,
            semester: Semester,
            course: Course,
            contact: Contact,
            status: status,
            section: Section,
            sy: SY,
            sy2: SY2
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })

        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred during the class insertion")
    }
}

async function InsertCourse({Course, Shorten, years}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/CreateCourse/', {
            course: Course,
            shorten: Shorten,
            years: years
        },{
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred during the course insertion")
    }
}

async function ViewAllCourse() {
    try{
        const response = await axios.post('https://www.sbaesthetic.online/DOM_PHP/ViewAllCourse/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data gathering")
    }
}

async function ViewSpecifyCourse({course}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSpecifyCourse/', {
            course: course
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data gathering")
    }
}

async function ViewAllSubject() {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewAllSubject/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data gathering")
    }
}

async function UpdateSubjects({ id, Subject, Type }) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateSubject/',{
            id: id,
            subject: Subject,
            type: Type
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function DeleteSubject({ id }) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/DeleteSubject/',{
            id: id,
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update") 
    }
} 

async function UpdateCourses({ id, course, shorten, details}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateCourses/', {
            id: id,
            course: course,
            shortcut: shorten,
            detail: JSON.stringify(details)
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function DeleteCourse({id}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/DeleteCourse/', {
            id: id
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateStudents({id, firstname, middlename,lastname, Gender, Birthdate,Year, Semester, Course, Contact, status, SY, SY2, Section}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateStudent/', {
            id: id,
            first_name: firstname,
            middle_name: middlename,
            last_name: lastname,
            birthdate: Birthdate,
            gender: Gender,
            year_level: Year,
            semester: Semester,
            course: Course,
            contact: Contact,
            status: status,
            sy: SY,
            sy2: SY2,
            section: Section
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })

        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred during the class insertion")
    }
}

async function DeleteStudent({id}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/DeleteStudent/', {
            id: id
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewClassDetail({id}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewClassDetail/', {
            id: id
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateClassroom({ Room, course, level, Subject  }){
    try{ 
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateClass/', {
            room: Room,
            course: course,
            level: level,
            detail: Subject
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewAllUser() {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewAllUsers/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data gathering")
    }
}

async function CreateUser({ user, email, password, fname, mname, lname, birthdate, gender, type}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/CreateUser/', {
            user: user,
            email: email,
            password: password,
            firstname: fname,
            mname: mname,
            lname: lname,
            birthdate: birthdate,
            gender: gender,
            type: type
        }, {
            headers: {  
            'Content-Type': 'application/json'
            }
        });
    
        return response.data;
        } catch (err) {
        console.error(err);
    
        // Handle different https status codes if needed
        if (err.response) {
            // The request was made and the server responded with a status code
            console.error('Server responded with non-2xx status:', err.response.status, err.response.data);
        } else if (err.request) {
            // The request was made but no response was received
            console.error('No response received from the server:', err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', err.message);
        }
    
        throw new Error("An error occurred during the data update");
        }
    }

async function UpdateUsers({ id, user, email, password, fname, mname, lname, birthdate, gender, type}) {
    try{ 
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateUser/', {
            id: id,
            user: user,
            email: email,
            password: password,
            firstname: fname,
            mname: mname,
            lname: lname,
            birthdate: birthdate,
            gender: gender,
            type: type
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function EnrollClass({ id, student }) {
    try{ 
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/EnrollClass/', {
            id: id,
            student: student
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function FetchEnroll() {
    try{ 
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSpecifyEnroll/', {},
        { 
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function EditClassGrade({ students }) {
    try{ 
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/EditClassGrade/', {
            students: students
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function CreationCourse({course, shorten, details}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/CreationCourse/', {
            course: course,
            shorten: shorten,
            detail: JSON.stringify(details)
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function EditCourse({ id, course, shorten, year, details}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/EditCourse/', JSON.stringify({
            course: course,
            shorten: shorten,
            years: year,
            detail: details
        }), {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewSpecificCourse ({id}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/SpecificCourse/', {
            id: id
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewStudentNo({ids}) {
    try{
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSpecificGrades/', {
            student: ids
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateGrades ({ id, grade }) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateGrade/', {
            id: id,
            grade: grade,
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateCourse({id, course, shorten, details}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdateCourses/', {
            id: id,
            course: course,
            shorten: shorten,
            detail: JSON.stringify(details)
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function FetchAllProfessor() {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewAllProfessor/', {}, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateCheckList({id, professor, student}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/InsertProfessor/', {
            id: id,
            professor: professor,
            student: student
        }, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewProfessorChecklist() {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/FetchProfessorChecklist/', {}, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function insertCheckList({professor, subject, semester, year, Section}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/AddChecklist/', {
            professor: professor,
            subject: subject,
            semester: semester,
            year: year,
            section: Section
        }, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewProfile({id}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/ViewSpecificUser/', {
            user: id,
        }, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdatePassword({password, username}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/UpdatePassword/', {
            password: password,
            username: username
        }, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateProfiles({ id, user, email, firstname, mname, lname, birthdate, gender, image }) {
    try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('user', user);
        formData.append('email', email);
        formData.append('firstname', firstname);
        formData.append('mname', mname);
        formData.append('lname', lname);
        formData.append('birthdate', birthdate);
        formData.append('gender', gender);
        formData.append('profile', image); // Assuming profile is a File object

        const response = await axios.post(
            'https://sbaesthetic.online/DOM_PHP/UpdateProfile/',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'// Use multipart/form-data for file upload
                }
            }
        );

        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error("An error occurred during the data update");
    }
}

// async function StudentReader({ file }) {
//     try {
//         const formData = new FormData();
//         form Data.append('student', file); 

//         const response = await axios.post(
//             'https://sbaesthetic.online/DOM_PHP/CreateClass/',
//             formData,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data' // Use multipart/form-data for file upload
//                 }
//             }
//         );

//         return response.data;
//     } catch (err) {
//         console.error(err);
//         throw new Error("An error occurred during the data update");
//     }
// }

async function StudentReader({ files }) {
    try {
        const formData = new FormData();
        formData.append('student', files); // Assuming only one file is selected

        const response = await axios.post(
            'https://sbaesthetic.online/DOM_PHP/CreateClass/',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // Change content type to multipart/form-data
                }
            }
        );

        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error("An error occurred during the data update");
    }
}

async function countStudent({id}) {
    try {
        const response = await axios.post('https://sbaesthetic.online/DOM_PHP/CountStudent/', {
            id: id,
        }, 
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        return response.data    
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

export {
    LoginValid,
    insertSubject,
    InsertStudent,
    InsertCourse,
    ViewAllSubject,
    DeleteSubject,
    ViewSubjectCourse,
    CreateClass,
    ViewAllClass,
    ViewSpecifyClasses,
    ViewAllStudent,
    ViewClassDetail,
    DeleteStudent,
    ViewSpecifyStudent,
    ViewAllCourse,
    DeleteCourse,
    ViewSpecifyCourse,
    
    EnrollClass,
    EditClassGrade,
    FetchEnroll,
    CreateUser,
    ViewAllUser,
    UpdateUsers,
    UpdateSubjects,
    UpdateStudents,
    UpdateCourses,
    UpdateClassroom,

    CreationCourse,
    EditCourse,
    ViewSpecificCourse,
    ViewStudentNo,
    UpdateGrades,
    UpdateCourse,
    FetchAllProfessor,
    UpdateCheckList,
    ViewProfessorChecklist,
    insertCheckList,
    ViewProfile,
    UpdateProfiles,
    UpdatePassword,
    StudentReader,
    countStudent
}