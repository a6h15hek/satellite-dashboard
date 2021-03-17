import axios from 'axios';
import { getHeader, setHeader} from './Satellite';


const getIndex = () =>{
    axios.get('/')
    .then(response => console.log(response.data));
}

const createUser = (firstname, lastname, email, password, wait, result) =>{
    const body = {
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password
    }
    wait();
    axios.post('api/auth/user/create_user.php', body)
    .then(response => {
        result(response.data);
    })
    .catch(error => {
        const errorResponse = error.response;
        result({
            status : errorResponse.status,
            success : errorResponse.data.success,
            message : errorResponse.data.message
        });
    });
}

const signIn = (email, password, wait, result) =>{
    const body = {
        email : email,
        password : password
    }
    wait();
    axios.post('api/auth/user/login.php', body)
    .then(response => {
        if(response.data.role !== "admin"){
            return result({
                    success : false,
                    message : "You are not admin."
            });
        }
        if(response.data.success){
            const login_token = response.data.token;
            setHeader(login_token);
        }
        result({
            success : response.data.success,
            message : response.data.message
        });
    })
    .catch(error => { 
        const errorResponse = error.response;
        result({
            status : errorResponse.status,
            success : errorResponse.data.success,
            message : errorResponse.data.message
        });
    });
}

const signOut = (wait, result) =>{
    wait();
    axios.get('api/auth/user/logout.php')
    .then(response => {
        setHeader("");
        result({
            success : response.data.success,
            message : response.data.message
        });
    })
    .catch(error => { 
        const errorResponse = error.response;
        result({
            statuscode : errorResponse.status,
            success : errorResponse.data.success,
            message : errorResponse.data.message
        });
    });
}


const authState = (wait, result) =>{
    wait();
    const login_token = getHeader();
    if(login_token === undefined || login_token === "" ){
        result(false);   
    }else{
        axios.get('api/auth/user/validate_token.php')
        .then(response => {
            result(true);
        })
        .catch(error => { 
            setHeader("");
            result(false);
        });
    }
}

const getUser = (wait, result) =>{
    wait();
    axios.get('/api/auth/user/getuser.php')
        .then(response => {
            result(response.data.data);
        })
        .catch(error => { 
            const errorResponse = error.response;
            result({
                status : errorResponse.status,
                success : errorResponse.data.success,
                message : errorResponse.data.message
            });
        });
}

const changePassword = (password, new_password , wait, result) =>{
    const body = {
        password : password,
        new_password : new_password
    }
    wait();
    axios.post('api/auth/user/changepassword.php', body)
    .then(response => {
        result(response.data);
    })
    .catch(error => {
        const errorResponse = error.response;
        result({
            status : errorResponse.status,
            success : errorResponse.data.success,
            message : errorResponse.data.message
        });
    });
}


export {getIndex, createUser, signIn, signOut, authState, getUser, changePassword};