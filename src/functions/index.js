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
        const response = await fetch('http://localhost/DOM_PHP/LoginValidation/index.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: Email,
                Password: Password
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { valid, data } = await response.json();

        if (valid) {
            return { valid, data };
        } else {
            return { valid, data };
        }
    } catch (err) {
        console.error(err);
        throw new Error('An error occurred during the login validation.');
    }
}


export {
    LoginValid,
}