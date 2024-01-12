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

        const { valid, data, msg } = response.data;

        if (valid) {
            return { 
                valid: valid, 
                data: data 
            };
        } else {
            return { 
                valid: valid, 
                msg: msg 
            };
        }
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

async function ViewAllSubject({courses}) {
    try {  
        const response = await axios.post('http://localhost/DOM_PHP/ViewAllSubject/',
        {
            course: courses
        },
        {
            header: {
                'Content-Type': 'application/json'
            }
        });

        const { valid, data, msg } = response.data

        if(valid) {
            return {
                valid: true,
                data: data
            }
        } else {
            return {
                valid: false,
                msg: msg
            }
        }
    

    } catch (err) {
        console.error(err);
        throw new Error('An error occurred during the subject insertion.');
    }
}


export {
    LoginValid,
    insertSubject,
    ViewAllSubject,
}