function getToken(){
    if (window.localStorage){
        return localStorage.getItem('token');
    }
    return false;
}
function getUserid(){
    if (window.localStorage){
        return localStorage.getItem('user_id');
    }
    return false;
}


function setuserData(token,userid) {
    if (window.localStorage) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userid);
    }
}
function setUserAdress(address) {
    if (window.localStorage) {
        localStorage.setItem("home",address );
        
    }
}


function removeToken(token) {
    window.localStorage.clear()
}

export {getToken,getUserid,setUserAdress,   removeToken,setuserData};