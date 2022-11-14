import React from "react";
import clsx from "clsx";
import styles from "./Post.module.scss";
import {UserInfo} from "../UserInfo/UserInfo";
import {PostSkleton} from './Skleton'
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
function Post({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) {

    if (isLoading) {
        return <PostSkleton />
    }
  const handleRemove = () => {};

  return (
    <Box className={clsx(styles.main, { [styles.mainFull]: isFullPost })}>
      {isEditable && (
        <Box className={styles.editButton}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        />
      )}
      <Box className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <Box className={styles.indention}>
          <Typography
            variant="h2"
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </Typography>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <Box className={styles.content}>{children}</Box>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default Post;
