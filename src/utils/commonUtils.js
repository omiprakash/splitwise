//Common utility to perform getlocalstorage, setlocalstorage and email mobile validation

export const getLocalStorage = (key) => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        return []
    }
}

export const setLocalStorage = (key, value) => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
    return;
}

export const emailValidator = (email) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
        return false;
    }
    return true;
}

export const formatCurrency = (value, locale = 'en-IN', currency = 'INR') => {
    const formattedValue = parseInt(value, 10).toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
    })
    return formattedValue
}
