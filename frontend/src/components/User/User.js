import React, { useState } from "react";
import Avatar from "./Avatar";
import { useParams } from "react-router-dom";


function User() {

    const {userId} = useParams();

    return (
        <div>
          <h1>Kullanıcı Sayfası</h1>
          <Avatar userId = {userId} ></Avatar>
        </div>
    );
}

export default User;