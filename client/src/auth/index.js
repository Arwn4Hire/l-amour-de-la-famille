export const signup = async user => {
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
  };

export const signin = async user => {
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
  };

  export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt" , JSON.stringify(jwt))
        next()
    }
  }

export const signout = async (next) => {
    if(typeof window !== "undefined") localStorage.removeItem('jwt')
    next()
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET"
    });
    console.log('singout', response);
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }

    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    } 
}

export const forgotPassword = async email => {
  console.log('email: ', email);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    console.log('forgot password response: ', response);
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
};

export const resetPassword = async resetInfo => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resetInfo)
    });
    console.log('forgot password response: ', response);
    return response.json();
  }
  catch (err) {
    return console.log(err);
  }
};