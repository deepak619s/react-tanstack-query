import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//todo fetching the data :-
// export const fetchPosts = async() => {
//   return api.get("/posts");
// };

export const fetchPosts = async (pageNumber) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

//todo fetching the individual data :-
export const fetchIndivPosts = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

//todo deleting the data :-
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//todo updating the data :-
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "I have updated" });
};
