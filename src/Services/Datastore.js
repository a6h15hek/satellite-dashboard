import axios from 'axios';

const getCollections = (start=0, end=10, wait, result) =>{
    wait();
    axios.get('/api/datastore/collection/get.php',  { params: { start : start, end : end}})
        .then(response => {
            result(response.data);
        })
        .catch(error => { 
            const errorResponse = error.response;
            result({
                success : errorResponse.data.success,
                message : errorResponse.data.message
            });
    });
}

const createCollection = (collection_name, read="private", write="private", wait, result) =>{
    const body = {
        collection_name : collection_name,
        write : write,
        read : read
    }
    wait();
    axios.post('/api/datastore/collection/create.php', body)
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

const updateCollectionPermissions = (collection_name, read, write, wait, result) =>{
    const body = {
        collection_name : collection_name,
        write : write,
        read : read
    }
    wait();
    axios.post('/api/datastore/collection/update_permission.php', body)
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

const deleteCollection = (collection_name, wait, result) =>{
    const body = {
        collection_name : collection_name
    }
    wait();
    axios.post('/api/datastore/collection/delete.php', body)
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

const getDocumentNameArray = (collection_name, start, end, wait, result) =>{
    wait();
    axios.get('/api/datastore/document/getdocnames.php', { params: {collection : collection_name, start : start, end : end}})
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

const getDocument = (collection_name, document_name, wait, result) =>{
    wait();
    axios.get('/api/datastore/document/get.php', { params: {collection : collection_name, document : document_name}})
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

const addDocument = (collection_name, data_object, wait, result) =>{
    const body = {
        collection_name : collection_name,
        data_object : data_object
    }
    wait();
    axios.post('/api/datastore/document/add.php', body)
    .then(response => {
        result({
            success : response.data.success,
            message : response.data.message,
            document_name : response.data.document_name
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

const setDocument = (collection_name, document_name, data_object, merge = false, wait, result) =>{
    const body = {
        collection_name : collection_name,
        document_name : document_name,
        data_object : data_object,
        merge : merge
    }
    wait();
    axios.post('/api/datastore/document/set.php', body)
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

const updateArray = (collection_name, document_name, array_field, array_element, action="add", wait, result) =>{
    const body = {
        collection_name : collection_name,
        document_name : document_name,
        arrayfield : array_field,
        arrayelement : array_element
    }
    wait();
    if(action === "add"){
        axios.post('/api/datastore/document/updatearray.php?action=add', body)
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
    }else if(action === "remove"){
        axios.post('/api/datastore/document/updatearray.php?action=remove', body)
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
} 

const deleteDocument = (collection_name, document_name, wait, result) =>{
    const body = {
        collection_name : collection_name,
        document_name : document_name
    }
    wait();
    axios.post('/api/datastore/document/delete.php', body)
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

export {getCollections, getDocumentNameArray, getDocument, addDocument, setDocument, updateArray, deleteDocument, createCollection, deleteCollection, updateCollectionPermissions};