import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts, updatePost } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], // useState
    queryFn: () => fetchPosts(pageNumber), // useEffect
    placeholderData: (prevData) => prevData,

    // cacheTime: 3000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  //! Mutation fn. to delete the post :-
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // queryClient.setQueryData() -  It is used to access the local cached data
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

  //! Mutation fn. to update the post :-
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      // console.log(apiData, postId);
      // queryClient.setQueryData() -  It is used to access the local cached data
      queryClient.setQueryData(["posts", pageNumber], (postData) => {
        return postData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
              </NavLink>
              <button
                onClick={() =>
                  deleteMutation.mutate(id) || alert(`hii, post ${id} deleted.`)
                }
              >
                Delete
              </button>

              <button
                onClick={() =>
                  updateMutation.mutate(id) || alert(`hii, post ${id} updated.`)
                }
              >
                Update
              </button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2 style={{ color: "#fff" }}>{pageNumber / 3 + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};
