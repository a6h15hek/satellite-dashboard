import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_PHP_SATELLITE_SERVER_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer '+getCookie('satellite_data') ;

function setHeader(login_token){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+login_token ;
    setCookie('satellite_data',login_token,3);
}
function getHeader(){
    return getCookie('satellite_data');
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' '){
            c = c.substring(1);
        }
 
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export {setHeader, getHeader} ;