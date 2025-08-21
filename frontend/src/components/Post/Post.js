import React from 'react';
import './Post.scss'; // Assuming you have a Post.scss for styling

function Post(props) {
    const { title, text } = props;

    return (
        <li className="post-item">
            <h2>{title}</h2>
            <p>{text}</p>
        </li>
    );


    
}

export default Post;