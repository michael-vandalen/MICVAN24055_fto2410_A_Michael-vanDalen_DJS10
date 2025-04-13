import { useEffect, useState } from "react";

export default function Blogpost() {
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Data Fetching Failed</h1>;
  }

  const blogPosts = blog.map((blogs) => (
    <div key={blogs.id} className="blog--container">
      <h1>
        {blogs.id}. {blogs.title}
      </h1>
      <p>{blogs.body}</p>
    </div>
  ));

  return (
    <div>
      <h1 className="post--title">Posts</h1>
      <div>{blogPosts}</div>
    </div>
  );
}
