import React, {  use, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';

const PostStyle = {
    width : '100%',
    maxWidth : '800px',
    justifyContent : 'center',
    alignItems : 'center',
    margin : '20px'
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


function Post(props) {
    const { title, text, userId, userName ,id} = props;
    const [liked,setLiked] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [likeList, setLikeList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]); 
    const isInitialMount = React.useRef(true);

    const isLikedByUser = (likes, userId) => {
      fetch("/likes?postId=" + id + "&userId=" + 1)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                if(result == null || result.length === 0){
                  setLiked(false);
                }else{
                  setLiked(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.error("Error fetching comments:", error);
            }
        );  
    }

    useEffect(() => {
    isLikedByUser(id, userId);
  }, [id, userId]);
  
    const refreshComments = () => {
      fetch("/comments?postId=" + id)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result); // 👈 burada dikkat!
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.error("Error fetching comments:", error);
            }
        );
      }

    useEffect(() => {
      fetch("/likes?postId=" + id)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setLikeList(result); // 👈 burada dikkat!
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.error("Error fetching comments:", error);
            }
        );
    } , [id]);

    useEffect(() => {
  refreshComments(); 
}, [id]); 

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const clickLike = () => {
    if(!liked){
      fetch("/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          postId: id,
        }),
      })
        .then((response) => response.json())
        .then((newLike) => {
          setLikeList([...likeList, newLike]);
        })
        .catch((error) => {
          console.error("Error:", error); 
        });
    } else {
      fetch("/likes?userId=" + userId +"&postId=" + id, {
        method: "DELETE",
      })
      .then((response) => {
          if (response.ok) {
            setLikeList(likeList.filter((like) => like.userId !== userId || like.postId !== id));
          } else {
            console.error("Failed to delete like");
          }})
        .catch((error) => {
          console.error("Error:", error); 
        });
    }

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
    <Card style={{borderRadius: '40px'}}>
      <CardHeader
        avatar={
          <Link style={linkStyle} to={"/users/" + userId}>
          <Avatar sx={{ backgroundImage: "linear-gradient(45deg, #139A43, #58B09C)" }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        title=<h3>{title}</h3>
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{borderBottom : '1px solid #ccc', marginBottom : '10px'}}>
        <IconButton onClick={clickLike} aria-label="add to favorites">
          <FavoriteIcon style={liked? {color : "red"} : null} /><h5>{" " + likeList.length}</h5>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <h5>{commentList.length + " "}</h5><CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h4 style={{textAlign : "left"}}>Yorum Yap</h4>
          <CommentForm userId={userId} userName={"ynez"} id={id} refreshComments={refreshComments}></CommentForm>
          <h4 style={{textAlign : "left"}}>Yorumlar</h4>
          {commentList.map(comment => (
            <Comment text={comment.text} userName={comment.userName} userId={comment.userId} ></Comment>
          ))}
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
  }
}

export default Post;