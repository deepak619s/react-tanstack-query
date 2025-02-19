import { useQuery } from "@tanstack/react-query";
import { fetchIndivPosts } from "../../api/api";
import { NavLink, useParams } from "react-router-dom";

export const Fetchindiv = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id], // useState
    queryFn: () => fetchIndivPosts(id), // useEffect
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <h1>Post ID Number - {id}</h1>
      <ul className="section-accordion">
        <li>
          <p>Id: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Body: {data.body}</p>
        </li>
      </ul>

      <NavLink to="/rq">
        <button style={{ marginLeft: "69rem", marginTop: "3rem" }}>
          Go Back
        </button>
      </NavLink>
    </div>
  );
};
