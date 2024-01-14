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

async function insertSubject({ Subject, Course, Type }) {
    try {
        const response = await axios.post(
            'http://localhost/DOM_PHP/AddSubject/',
            {
                Subject: Subject,
                Course: Course,
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
        console.log(response)

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
        const { msg } = response.data
        
        return msg;
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
        console.log(response)
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error("An error occurred during the data gathering")
    }
}

export {
    LoginValid,
    insertSubject,
    InsertStudent,
    InsertCourse,
    ViewAllSubject,
    ViewSubjectCourse,
    CreateClass,
    ViewAllClass,
    ViewSpecifyClasses,
    ViewAllStudent,
    ViewSpecifyStudent,
    ViewAllCourse,
    ViewSpecifyCourse
}