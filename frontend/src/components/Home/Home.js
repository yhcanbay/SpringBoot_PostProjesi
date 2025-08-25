import Post from "../Post/Post";
import React, { useState, useEffect,} from "react";
import "./Home.scss";
import CssBaseline from "@mui/material/CssBaseline";
import PostFrame from "../Post/PostForm";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
    fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("API result:", result);
                setIsLoaded(true);
                setPostList(result); // 👈 burada dikkat!
                
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    
    }, []);

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (!Array.isArray(postList)){
        return <div>Veri format hatası</div>
    } else {
        return (
            
            <React.Fragment>
                <CssBaseline>
                    <div className="container" maxWidth="md">
                    <PostFrame title={"srsrg"} text={"srgrs"} userId={1} userName={"dthbtd"} id={0}></PostFrame>
                    {postList.map(post => (
                        <Post title={post.title} text={post.text} userId={post.userId} userName={post.userName} id={post.id}></Post>
                    ))}
                    </div>
                </CssBaseline>
            </React.Fragment>
            
        );
    }
}

export default Home;