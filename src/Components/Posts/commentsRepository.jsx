import axios from "axios";

export function postComments(info, URL, tokenStorage, setAddComment, addComment, setComments) {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };

  const obj = {
    postId: info.postid,
    comment: addComment,
  };

  const promise = axios.post(`${URL}/post/comments`, obj, config);

  promise.then((response) => {
    setAddComment("")
    getComments(URL, tokenStorage, setComments, info)
  });
  promise.catch((error) => {
    alert("an error has ocurred...");
  });
}

export function getComments(URL, tokenStorage, setComments, info) {
  const id = info.postid;
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };

  const promise = axios.get(`${URL}/get/comments/${id}`, config);

  promise.then((response) => {
    setComments(response.data);
  });
  promise.catch((error) => {
    alert("an error has ocurred...");
  });
}
