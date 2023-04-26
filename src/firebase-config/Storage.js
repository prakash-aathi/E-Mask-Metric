
export  const storeUserDate = (data) => { 
    localStorage.setItem('idToken', data);
}

export const getUserData = () => { 
    return localStorage.getItem('idToken');
}

export const removeUserData = () => { 
    localStorage.removeItem('idToken');
    localStorage.removeItem('email');
}

export const storeTime = (time) => {
    localStorage.setItem('time',JSON.stringify(time))
}

export const getTime = () => {
    return (JSON.parse(localStorage.getItem('time')))
}