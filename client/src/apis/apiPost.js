export const create = async (userId, token, post) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/new/${userId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
          body: post
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const list = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "GET"
      });
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  // export const getIdForPost = async postId => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/post/${postId}`,
  //       {
  //         method: "GET"
  //       }
  //     );
  //     return response.json();
  //   } catch (err) {
  //     return console.log(err);
  //   }
  // };
  
  // with pagination
  // export const list = async page => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`, {
  //       method: "GET"
  //     });
  //     return response.json();
  //   }
  //   catch (err) {
  //     return console.log(err);
  //   }
  // };
  
  export const singlePost = async postId => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
        {
          method: "GET"
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const listByUser = async (userId, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/by/${userId}`,
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
  
  export const remove = async (postId, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
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
  
  export const update = async (postId, token, post) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
          body: post
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const like = async (userId, token, postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
      });
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const unlike = async (userId, token, postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/unlike`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId, postId })
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const comment = async (userId, token, postId, comment) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
      });
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };
  
  export const uncomment = async (userId, token, postId, comment) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/uncomment`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId, postId, comment })
        }
      );
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  };