import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";

function CommentForm(props) {
    const {userId, userName ,id ,refreshComments} = props;
    const [expanded, setExpanded] = React.useState(false);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [yayımlama, setYayımlama] = useState("Yayımla");
    const [isAlert, setIsAlert] = useState(false);

  

  const handleText = (value) => {
    setText(value);
  }

  const handleTitle = (value) => {
    setTitle(value); 
  }

  const handlePost = () => {
    savePost();
    setExpanded(!expanded);
    setText("");
    setTitle("");
    setYayımlama("Yayımlandı");
    setIsAlert(true);
    refreshComments();
  }

  useEffect(() => {
    if(title !== "" || text !== ""){
        setYayımlama("Yayımla");
    }
  }, [title,text]);

  const savePost = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("token"),
      },
      body: JSON.stringify({
        text: text,
        userId: userId,
        postId: id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error); 
      });
  };

  return (
    <div>
      <Snackbar open={isAlert} autoHideDuration={6000} onClose={() => setIsAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert  severity="success">Yorum Başarıyla Yayımlandı...</Alert>
            </Snackbar>
      <OutlinedInput
        id='outlined-basic'
        multiline
        fullWidth   
        placeholder='Text'
        value={text}
        inputProps={{ maxLength: 300 }}
        onChange={(e) => handleText(e.target.value)}
        endAdornment={
          <Button onClick={handlePost} style={{backgroundImage: "linear-gradient(45deg, #139A43, #58B09C)"}} variant="contained">{yayımlama}</Button>
        }
        >
        </OutlinedInput>
    </div>
  );
}
export default CommentForm;