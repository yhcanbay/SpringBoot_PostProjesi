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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

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
    const { title, text, userId, userName ,id} = props;
    const [liked,setLiked] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]); 
  
    useEffect(() => {
    fetch("/comments?postId=" + id)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result); // 👈 burada dikkat!
                console.log("Comments API result:", result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.error("Error fetching comments:", error);
            }
        );
    
    
    }, [id]);

  const handleExpandClick = () => {
    setExpanded(expanded);
  };

  const clickLike = () => {
    setLiked(!liked);
  }


  if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (!Array.isArray(commentList)){
        return <div>Veri format hatası</div>
    } else {
  return (
    <div style={PostStyle}>
    <Card>
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
        inputProps={{ maxLength: 30 }}>
        </OutlinedInput>
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <OutlinedInput
        id='outlined-basic'
        multiline
        fullWidth   
        placeholder='Text'
        inputProps={{ maxLength: 300 }}>
        </OutlinedInput>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={clickLike} aria-label="add to favorites">
          {/* <FavoriteIcon style={liked? {color : "red"} : null} /> */}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <Button style={{backgroundImage: "linear-gradient(45deg, #139A43, #58B09C)"}} variant="contained">Yayımla</Button>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
          {commentList.map(comment => (
            <div style={commentStyle}><p>{comment.text}</p></div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
  }
}

export default PostFrame;