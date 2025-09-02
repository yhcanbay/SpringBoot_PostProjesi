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

const PostStyle = {
    width : '100%',
    maxWidth : '800px',
    justifyContent : 'center',
    alignItems : 'center',
    margin : '20px',
    borderRadius : '50px'
}

const linkStyle = {
    textDecoration: 'none',
    boxShadow: 'none',
}

const commentStyle = {
    border: '1px solid #ccc',
    borderRadius: '20px',
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
    const {userId, userName ,id , refreshPage} = props;
    const [expanded, setExpanded] = React.useState(false);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
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

  const handlePost = () => {
    savePost();
    setExpanded(!expanded);
    setText("");
    setTitle("");
    setYayımlama("Yayımlandı");
    setIsAlert(true);
    refreshPage();
  }

  useEffect(() => {
    if(title !== "" || text !== ""){
        setYayımlama("Yayımla");
    }
  }, [title,text]);

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("token"),
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
    <div style={PostStyle}>
      <Snackbar open={isAlert} autoHideDuration={6000} onClose={() => setIsAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert  severity="success">Post Başarıyla Yayımlandı...</Alert>
      </Snackbar>
    <Card style={{borderRadius: '20px'}}>
      <CardHeader
        avatar={
          <Link style={linkStyle} to={"/users/" + userId}>
          <Avatar sx={{ backgroundImage: "linear-gradient(45deg, #139A43, #58B09C)" }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        title = <OutlinedInput
        id='outlined-basic'
        multiline
        fullWidth   
        placeholder='Title'
        value={title}
        inputProps={{ maxLength: 30 }}
        onChange={(e) => handleTitle(e.target.value)}>
        </OutlinedInput>
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <OutlinedInput
        id='outlined-basic'
        multiline
        fullWidth   
        placeholder='Text'
        value={text}
        inputProps={{ maxLength: 300 }}
        onChange={(e) => handleText(e.target.value)}>
        </OutlinedInput>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <Button onClick={handlePost} style={{backgroundImage: "linear-gradient(45deg, #139A43, #58B09C)"}} variant="contained">{yayımlama}</Button>
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