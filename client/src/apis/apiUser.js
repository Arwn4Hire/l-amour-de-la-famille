export const read = async (userId, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const remove = async (userId, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const list = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET"
      });
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const update = async (userId, token, user) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
          body: user
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("jwt")) {
        let auth = JSON.parse(localStorage.getItem("jwt"));
        auth.user = user;
        localStorage.setItem("jwt", JSON.stringify(auth));
        next();
      }
    }
  };
  
  export const follow = async (userId, token, followId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/follow`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId, followId })
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const unfollow = async (userId, token, unfollowId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/unfollow`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId, unfollowId })
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const findPeople = async (userId, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  