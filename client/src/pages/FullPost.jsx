import Post from "../components/Post/Post";
import { Index } from "../components/AddComment/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios/axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
export const FullPost = () => {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("There is no such post");
      });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        _id={post.id}
        title={post.title}
        imageUrl={`http://localhost:4000$${post.imageUrl}`}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={post.text} />
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
