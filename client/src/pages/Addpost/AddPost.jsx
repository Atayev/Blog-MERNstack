import { TextField, Paper, Button, Box } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";

import styles from "./Addpost.module.scss";
import "easymde/dist/easymde.min.css";
import { useState,useMemo,useCallback } from "react";
import { Link } from "react-router-dom";

export const AddPost = () => {
  const imageUrl = "";
  const [value, setValue] = useState("");

  const handleChangeFile = () => {};
  const removeImage = () => {};
  const onChange = useCallback((value) => {
    setValue(value);
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
  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Load a preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={removeImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img src={`http://localhost:4444/${imageUrl}`} alt="uploaded" />
      )}

      <br />
      <br />
      <TextField
        className={styles.title}
        variant="standard"
        placeholder="Post title"
        fullWidth
      />
      <TextField
        className={styles.tags}
        variant="standart"
        placeholder="Tags"
        fullwidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <Box className={styles.buttons}>
        <Button size="large" variant="contained">
          Publish
        </Button>
        <Link to="/">
          <Button size="large">Discard</Button>
        </Link>
      </Box>
    </Paper>
  );
};
