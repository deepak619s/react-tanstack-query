import { useEffect, useState } from "react";
import { fetchPosts } from "../api/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      //   console.log(res);
      if (res.status === 200) {
        setPosts(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
