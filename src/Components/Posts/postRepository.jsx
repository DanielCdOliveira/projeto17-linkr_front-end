import axios from "axios";

export function updateMessage(
  info,
  tokenStorage,
  setPromiseReturned,
  setMessage,
  setEdit,
  updateHashtags,
  setTrendingUpdate,
  message,
  trendingUpdate,
  URL
) {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };

  const obj = { postId: info.postid, message: message };
  updateHashtags(obj, config);

    const promise = axios.post(`${URL}/edit/post`, obj, config);
    setPromiseReturned(true);

    promise.then((response) => {
      setMessage(response.data);
      setEdit(false);
      setPromiseReturned(false);
    });
    promise.catch((error) => {
      alert("Deu algum erro, não foi possivel salvar as alterações...");
      setEdit(true);
    });
    setTrendingUpdate(!trendingUpdate);
}

export function postLike(info, tokenStorage, setLikes, URL) {
  const id = info.postid;
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };
  const promise = axios.post(`${URL}/like/post/${id}`, id, config);

  promise.then((response) => {
    setLikes(true);
  });
  promise.catch((error) => {
    alert("an error has ocurred, unable to like the post...");
  });
}

export function deleteLike(info, tokenStorage, setLikes, URL) {
  const id = info.postid;
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };
  const promise = axios.delete(`${URL}/deslike/post/${id}`, config);

  promise.then((response) => {
    setLikes(false);
  });
  promise.catch((error) => {
    alert("an error has ocurred, unable to dislike the post...");
  });
}

export function toggleModalDelete(setIsOpenDelete, isOpenDelete) {
  setIsOpenDelete(!isOpenDelete);
}

export function toggleModalRepost(setIsOpenRepost, isOpenRepost) {
  console.log("aquisera?")
  setIsOpenRepost(!isOpenRepost);
}

export function deletePost(
  info,
  tokenStorage,
  setAllPosts,
  deleteHashtag,
  URL,
  setIsOpenDelete,
  isOpenDelete
) {
  const id = info.postid;
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };

  deleteHashtag(id, config);

  const promise = axios.delete(`${URL}/delete/post/${id}`, config);
  promise.then((response) => {
    toggleModalDelete(setIsOpenDelete, isOpenDelete);
    const promise2 = axios.get(`${URL}/get/posts?userId=${info.userId}`,config);
    promise2.then((response) => {
      setAllPosts(response.data);
    });
    promise2.catch((error) => {
      alert("an error has ocurred, unable to delete the post...");
    });
  });
  promise.catch((error) => {
    alert("an error has ocurred, unable to delete the post...");
    toggleModalDelete(setIsOpenDelete, isOpenDelete);
  });
}

export function postShare (info, tokenStorage, URL, setAllPosts, setIsOpenRepost, isOpenRepost){
  const id = info.postid;
  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`,
    },
  };
  const promise = axios.post(`${URL}/share/post/${id}`, id, config);
  promise.then((response) => {
    const promise2 = axios.get(`${URL}/get/posts?userId=${info.userId}`,config);
    promise2.then((response) => {
      toggleModalRepost(setIsOpenRepost, isOpenRepost);
      setAllPosts(response.data)
    });
    promise2.catch((error) => {
      alert("an error has ocurred, unable to delete the post...");
    });
  });
  promise.catch((error) => {
    alert("an error has ocurred, unable to share the post...");
    toggleModalRepost(setIsOpenRepost, isOpenRepost);
  });
}