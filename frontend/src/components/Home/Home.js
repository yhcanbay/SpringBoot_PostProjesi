import Post from "../Post/Post";
import React, { useState, useEffect,} from "react";
import "./Home.scss";
import CssBaseline from "@mui/material/CssBaseline";
import PostForm from "../Post/PostForm";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPage = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result); // 👈 burada dikkat!
                
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }

    useEffect(() => {
        refreshPage()      
    }, [postList]);

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
                    <PostForm userId={2} userName={"enez"} id={0} refreshPage={refreshPage}></PostForm>
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