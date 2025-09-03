import React, { useEffect, useState, useRef } from 'react';
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
  width: '100%',
  maxWidth: '800px',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px'
};

const linkStyle = {
  textDecoration: 'none',
  boxShadow: 'none',
};

const likeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post({ title, text, userId, userName, id }) {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [error, setError] = useState(null);

  const [likesLoaded, setLikesLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const [commentList, setCommentList] = useState([]);

  // Kullanıcı bu postu beğenmiş mi kontrolü
  const isLikedByUser = (postId, userId) => {
    fetch(`/likes?postId=${postId}&userId=${userId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setLiked(result && result.length > 0);
        },
        (error) => {
          setError(error);
          console.error("Error fetching like status:", error);
        }
      );
  };

  // Yorumları yenile
  const refreshComments = () => {
    fetch(`/comments?postId=${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCommentList(result);
          setCommentsLoaded(true);
        },
        (error) => {
          setError(error);
          console.error("Error fetching comments:", error);
        }
      );
  };

  // Like listesini çek
  useEffect(() => {
    fetch(`/likes?postId=${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setLikeList(result);
          setLikesLoaded(true);
        },
        (error) => {
          setError(error);
          console.error("Error fetching likes:", error);
        }
      );
  }, [id]);

  // İlk yüklemede like durumu ve yorumlar
  useEffect(() => {
    isLikedByUser(id, userId);
    refreshComments();
  }, [id, userId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      refreshComments();
    }
  };

  const clickLike = () => {
    if (!liked) {
      fetch("/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId: userId,
          postId: id,
        }),
      })
        .then((response) => response.json())
        .then((newLike) => {
          setLikeList(prev => [...prev, newLike]);
          setLiked(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch(`/likes?userId=${userId}&postId=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("token"),
        }
      })
        .then((response) => {
          if (response.ok) {
            fetch(`/likes?postId=${id}`)
            .then(res => res.json())
            .then(data => {
              setLikeList(data);
              setLiked(false);
            });
            setLiked(false);
          } else {
            console.error("Failed to delete like");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
      console.log("Like list: ", likeList);
  };

  if (error) {
    return <div>Error !!!</div>;
  }
  if (!likesLoaded || !commentsLoaded) {
    return <div>Loading...</div>;
  }
  if (!Array.isArray(commentList)) {
    return <div>Veri format hatası</div>;
  }

  return (
    <div style={PostStyle}>
      <Card style={{ borderRadius: '40px' }}>
        <CardHeader
          avatar={
            <Link style={linkStyle} to={`/users/${userId}`}>
              <Avatar
                sx={{ background: "linear-gradient(45deg, #139A43, #58B09C)", color: "white" }}
                aria-label="recipe"
              >
                {userName?.charAt(0)?.toUpperCase() || "?"}
              </Avatar>
            </Link>
          }
          title={<h3>{title}</h3>}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <IconButton onClick={clickLike} aria-label="add to favorites">
            {localStorage.getItem("currentUser") == null ?
              <div style={likeStyle}><FavoriteIcon /><h5>{" " + likeList.length}</h5></div> :
              <div style={likeStyle}><FavoriteIcon style={liked ? { color: "red" } : null} /><h5>{" " + likeList.length}</h5></div>}
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
            {localStorage.getItem("currentUser") == null ?
              <h4 style={{ textAlign: "left" }}>Yorum yapmak için giriş yapınız</h4> :
              <div>
                <h4 style={{ textAlign: "left" }}>Yorum Yap</h4>
                <CommentForm
                  userId={userId}
                  userName={localStorage.getItem("userName")}
                  id={id}
                  refreshComments={refreshComments}
                />
              </div>}
            <h4 style={{ textAlign: "left" }}>Yorumlar</h4>
            {commentList.length === 0 ?
              <h5 style={{ textAlign: "left" }}>Henüz yorum yapılmadı...</h5> :
              <div>
                {commentList.map(comment => (
                  <Comment
                    key={comment.id}
                    text={comment.text}
                    userName={comment.userName}
                    userId={comment.userId}
                  />
                ))}
              </div>}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;