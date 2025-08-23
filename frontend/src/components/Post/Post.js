import React from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';

const PostStyle = {
    width : '100%',
    maxWidth : '800px',
    justifyContent : 'center',
    alignItems : 'center',
    margin : 'o auto'
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
    const { title, text } = props;

    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={PostStyle}>
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title=<h3>{title}</h3>
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
    
}

export default Post;