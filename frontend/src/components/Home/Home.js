import Post from "../Post/Post";
import React, { useState, useEffect,} from "react";
import "./Home.scss";
import CssBaseline from "@mui/material/CssBaseline";
import PostForm from "../Post/PostForm";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPage = async () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList([...result].reverse()); // 👈 burada dikkat!
                
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }

    useEffect(() => {
        refreshPage()      
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
                    {localStorage.getItem("currentUser") == null ? "" : 
                    <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} id={0} refreshPage={refreshPage}></PostForm>}
                    {postList.map(post => (
                        <Post title={post.title} text={post.text} userId={localStorage.getItem("currentUser")==null ? 0 : localStorage.getItem("currentUser")} userName={post.userName} id={post.id} postUserId={post.userId}></Post>
                    ))}
                    </div>
                </CssBaseline>
            </React.Fragment>
            
        );
    }
}

export default Home;