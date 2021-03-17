import axios from 'axios';

const getUsersList = (start, end, wait, result) =>{
    wait();
    axios.get('api/auth/user/get_users.php', { params: {start : start, end : end}})
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

const deleteUser = (user_id, wait, result) => {
    const body = {
        user_id : user_id
    }
    wait();
    axios.post('api/auth/user/delete.php', body)
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



export {getUsersList,  deleteUser};