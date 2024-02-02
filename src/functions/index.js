import axios from "axios"

// async function LoginValid({ Email, Password}) { 
//         await axios.post (
//             "http://localhost/DOM_PHP/LoginValidation",
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
        const response = await axios.post('http://localhost/DOM_PHP/LoginValidation/', JSON.stringify({
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

async function insertSubject({ Subject, Type }) {
    try {
        const response = await axios.post(
            'http://localhost/DOM_PHP/AddSubject/',
            {
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewSubjectCourse/',
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewAllClass/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)

        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the class viewable")
    }
}

async function ViewSpecifyClasses(name) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/ViewSpecifyClasses/', 
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewAllStudent/', {},
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewSpecifyClasses/', 
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
        const response = await axios.post('http://localhost/DOM_PHP/CreateClass/', {
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
        console.log(response.data)

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

async function InsertStudent({firstname, middlename,lastname, Gender, Birthdate,Year,Course, Contact}) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/AddStudent/', {
            first_name: firstname,
            middle_name: middlename,
            last_name: lastname,
            birthdate: Birthdate,
            gender: Gender,
            year_level: Year,
            course: Course,
            contact: Contact,
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)

        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred during the class insertion")
    }
}

async function InsertCourse({Course, Shorten, years}) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/CreateCourse/', {
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewAllCourse/', {},
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewSpecifyCourse/', {
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewAllSubject/', {},
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
        const response = await axios.post('http://localhost/DOM_PHP/UpdateSubject/',{
            id: id,
            subject: Subject,
            type: Type
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function DeleteSubject({ id }) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/DeleteSubject/',{
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

async function UpdateCourses({ id, course, shorten, years, details}) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/UpdateCourses/', {
            id: id,
            course: course,
            shortcut: shorten,
            years: years,
            detail: details
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
        const response = await axios.post('http://localhost/DOM_PHP/DeleteCourse/', {
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

async function UpdateStudents({id, firstname, middlename,lastname, Gender, Birthdate,Year,Course, Contact}) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/UpdateStudent/', {
            id: id,
            first_name: firstname,
            middle_name: middlename,
            last_name: lastname,
            birthdate: Birthdate,
            gender: Gender,
            year_level: Year,
            course: Course,
            contact: Contact,
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)

        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred during the class insertion")
    }
}

async function DeleteStudent({id}) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/DeleteStudent/', {
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewClassDetail/', {
            id: id
        }, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function UpdateClassroom({ Room, course, level, Subject  }){
    try{ 
        const response = await axios.post('http://localhost/DOM_PHP/UpdateClass/', {
            room: Room,
            course: course,
            level: level,
            detail: Subject
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function ViewAllUser() {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/ViewAllUsers/', {},
        {
            header: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data gathering")
    }
}

async function CreateUser({ user, email, password, fname, mname, lname, birthdate, gender, type}) {
    try {
        const response = await axios.post('http://localhost/DOM_PHP/CreateUser/', {
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
    
        console.log(response);
        return response.data;
        } catch (err) {
        console.error(err);
    
        // Handle different HTTP status codes if needed
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
        const response = await axios.post('http://localhost/DOM_PHP/UpdateUser/', {
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
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function EnrollClass({ id, student }) {
    try{ 
        const response = await axios.post('http://localhost/DOM_PHP/EnrollClass/', {
            id: id,
            student: student
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function FetchEnroll({ id }) {
    try{ 
        const response = await axios.post('http://localhost/DOM_PHP/ViewSpecifyEnroll/', {
            room: id
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function EditClassGrade({ students }) {
    try{ 
        const response = await axios.post('http://localhost/DOM_PHP/EditClassGrade/', {
            students: students
        },{ 
            header: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data update")
    }
}

async function CreationCourse({course, shorten, year, details}) {
    try{
        const response = await axios.post('http://localhost/DOM_PHP/CreationCourse/', JSON.stringify({
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

async function EditCourse({ id, course, shorten, year, details}) {
    try {
        const response = await axios.post('http://localhost/DOM_PHP/EditCourse/', JSON.stringify({
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
        const response = await axios.post('http://localhost/DOM_PHP/SpecificCourse/', {
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
        const response = await axios.post('http://localhost/DOM_PHP/ViewSpecificGrades/', {
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

async function UpdateGrades ({ id, prelim, midterm, prefi, finals }) {
    try {
        const response = await axios.post('http://localhost/DOM_PHP/UpdateGrade/', {
            id: id,
            prelim: prelim,
            midterm: midterm,
            prefi: prefi,
            finals: finals
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

async function UpdateCourse({id, course, shorten, years, details}) {
    try {
        const response = await axios.post('http://localhost/DOM_PHP/UpdateCourses/', {
            id: id,
            course: course,
            shorten: shorten,
            years: years,
            detail: details
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
    UpdateCourse
}