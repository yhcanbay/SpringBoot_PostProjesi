import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './PostForm.css';

const PostStyle = {
  width: '100%',
  maxWidth: '800px',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px',
  borderRadius: '50px'
}

const linkStyle = {
  textDecoration: 'none',
  boxShadow: 'none',
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        // transform: 'rotate(180deg)',
      },
    },
  ],
}));


function PostFrame(props) {
  const { userId, userName, refreshPage } = props;
  const [expanded, setExpanded] = React.useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [yayımlama, setYayımlama] = useState("Yayımla");
  const [isAlert, setIsAlert] = useState(false);

  const handleExpandClick = () => {
    setExpanded(expanded);
  };

  const handleText = (value) => {
    setText(value);
  }

  const handleTitle = (value) => {
    setTitle(value);
  }

  const handlePost = async () => {
    await savePost();
    setExpanded(!expanded);
    setText("");
    setTitle("");
    setYayımlama("Yayımlandı");
    setIsAlert(true);
    refreshPage();
  }

  useEffect(() => {
    if (title !== "" || text !== "") {
      setYayımlama("Yayımla");
    }
  }, [title, text]);

  const savePost = async () => {
    await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="post-form-container">
      <Snackbar
        open={isAlert}
        autoHideDuration={6000}
        onClose={() => setIsAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert className="success-alert" severity="success">
          ✅ Post Başarıyla Yayımlandı!
        </Alert>
      </Snackbar>

      <Card className="post-form-card">
        <CardHeader
          className="post-form-header"
          avatar={
            <Link style={linkStyle} to={"/users/" + userId}>
              <Avatar className="post-form-avatar" aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title=<OutlinedInput
            id='outlined-basic'
            className="post-form-input"
            multiline
            fullWidth
            placeholder='Başlık (max 30 karakter)'
            value={title}
            inputProps={{ maxLength: 30 }}
            onChange={(e) => handleTitle(e.target.value)}>
          </OutlinedInput>
        />
        <CardContent className="post-form-content">
          <Typography variant="body2">
            <OutlinedInput
              id='outlined-basic'
              className="post-form-input"
              multiline
              fullWidth
              placeholder='İçerik (max 300 karakter)'
              value={text}
              inputProps={{ maxLength: 300 }}
              onChange={(e) => handleText(e.target.value)}>
            </OutlinedInput>
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="post-form-actions">
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Button
              onClick={handlePost}
              className="publish-button"
              variant="contained"
              disabled={!title || !text}
            >
              {yayımlama === "Yayımlandı" ? "✅ " : "📝 "}{yayımlama}
            </Button>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>

          </CardContent>
        </Collapse>
      </Card>
    </div>
  );

}

export default PostFrame;