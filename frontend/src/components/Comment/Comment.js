import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { Link } from 'react-router-dom';

function Comment(props) {
    const { text, userName ,userId} = props;

    const commentStyle = {
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        display: 'flex',
    };

    const linkStyle = {
        textDecoration: 'none',
        boxShadow: 'none',
    }

    return (
        <div style={commentStyle}>
        <div style={{width: "15%"}}>
        <CardHeader
            avatar={
              <Link style={linkStyle} to={"/users/" + userId}>
              <Avatar sx={{ backgroundImage: "linear-gradient(45deg, #139A43, #58B09C)" }} aria-label="recipe">
                Y
              </Avatar>
              </Link>
            }
        />
        </div>
        <div style={{width: "70%"}}>
            <p><strong>{userName}</strong></p>
            <p>{text}</p>
        </div></div>
    );
}

export default Comment;