import axios from 'axios';

const getClientList = (wait, result) =>{
    wait();
    axios.get('api/auth/client/getclients.php')
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

const deleteClient = (client_id, wait, result) => {
    const body = {
        client_id : client_id
    }
    wait();
    axios.post('api/auth/client/deleteclient.php', body)
    .then(response => {
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

const createClient = (app_name, wait, result) => {
    const body = {
        app_name : app_name
    }
    wait();
    axios.post('api/auth/client/createclient.php', body)
    .then(response => {
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

const generateSecretKey = (client_id, wait, result) => {
    const body = {
        client_id : client_id
    }
    wait();
    axios.post('api/auth/client/getsecretkey.php', body)
    .then(response => {
        result({
            success : response.data.success,
            message : response.data.message,
            token : response.data.token
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

export {getClientList,  deleteClient, createClient, generateSecretKey};