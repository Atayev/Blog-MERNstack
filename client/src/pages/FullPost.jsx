import Post  from '../components/Post/Post'
import { Index } from '../components/AddComment/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import axios from '../axios/axios'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
export const FullPost = () => {
  const [post, setPost] = useState()
  const [isLoading,setIsLoading]= useState(true)
  const {id} = useParams()
  
  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data)
        setIsLoading(false)
    })
      .catch(err => {
        console.warn(err)
        alert('There is no such post')
    })
  }, [])
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
    return (
      <>
        <Post
          _id={post.id}
          title={post.title}
          imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
          user={post.user}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={3}
          tags={post.tags}
          isFullPost
        >
          <p>
            {post.text}
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
  