//Common utility to perform getlocalstorage, setlocalstorage and email mobile validation

const getLocalStorage = (key) => {
    if(typeof localStorage !== 'undefined' && localStorage.getItem(key)){
      return JSON.parse(localStorage.getItem(key))
    } else {
        return []
    }
}

const setLocalStorage = (key, value) => {
    if(typeof localStorage !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value));
    }
    return;
}

const  emailValidator = (email) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) 
    {
        return false;
    }
    return true;
}

module.exports = {
    getLocalStorage,
    setLocalStorage,
    emailValidator
}