import { TextField, Paper, Button, Box } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import { selectIsAuth } from "../../components/redux/slices/auth";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./Addpost.module.scss";
import "easymde/dist/easymde.min.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../axios/axios";
export const AddPost = () => {
  const inputFileRef = useRef();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  };
  const removeImage = () => {
    setImageUrl("");
  };
  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autoFocus: true,
      placeholder: "Write something...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      const fields = {
        tags,
        text,
        imageUrl,
        title,
      };
      const { data } = await axios.post("/posts", fields);
      const id = data._id;
      navigate(`posts/${id}`);
    } catch (err) {
      console.warn("Something went wrong");
      alert("Something went wrong");
    }
  };
  if (!localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  console.log(imageUrl.url);
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Load a preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={removeImage}>
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4000${imageUrl}`}
            alt="uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        className={styles.title}
        variant="standard"
        placeholder="Post title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        className={styles.tags}
        variant="standard"
        placeholder="Tags"
        fullwidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <Box className={styles.buttons}>
        <Button onClick={handlePublish} size="large" variant="contained">
          Publish
        </Button>
        <Link to="/">
          <Button size="large">Discard</Button>
        </Link>
      </Box>
    </Paper>
  );
};
