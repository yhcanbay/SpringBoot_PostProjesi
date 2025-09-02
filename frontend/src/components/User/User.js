import React from "react";
import { useParams } from "react-router-dom";

function User() {
    let userId = localStorage.getItem("currentUser");

    return (
        <div>
            <h1>Kullanıcı Sayfası</h1>
            <p>Kullanıcı ID: {userId}</p>
        </div>
    );
}

export default User;