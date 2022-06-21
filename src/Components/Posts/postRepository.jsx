import axios from "axios";

export function updateMessage(
  info,
  tokenStorage,
  setPromiseReturned,
  setMessage,
  setEdit,
  updateHashtags,
  hashtagsUpdated,
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

  if (hashtagsUpdated) {
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

export function toggleModal(setIsOpen, isOpen) {
  setIsOpen(!isOpen);
}

export function deletePost(
  info,
  tokenStorage,
  setAllPosts,
  deleteHashtag,
  URL,
  setIsOpen,
  isOpen
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
    toggleModal(setIsOpen, isOpen);
    const promise2 = axios.get(`${URL}/get/posts`);
    promise2.then((response) => {
      setAllPosts(response.data);
    });
    promise2.catch((error) => {
      alert("an error has ocurred, unable to delete the post...");
    });
  });
  promise.catch((error) => {
    alert("an error has ocurred, unable to delete the post...");
    toggleModal(setIsOpen, isOpen);
  });
}
