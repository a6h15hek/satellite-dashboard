const PostData = (type, Data) => {
    let BaseUrl = process.env.REACT_APP_BASE_URL;
    return new Promise((resolve, reject) => { 
        fetch(BaseUrl+type, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
        .then((response)=> {
                return response.json();
        })
        .then((responseJson) => resolve(responseJson))
        .catch((error) => {
            reject(error);
        })        
    });
};
export default  PostData ;


