import React from "react";
import Avatar from "./Avatar";
import { useParams } from "react-router-dom";
import UserActivity from "./UserActivity";

function User() {

    const {userId} = useParams();

    return (
        <div>
          <h1>Kullanıcı Profili</h1>
        <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar userId = {userId} ></Avatar>
          <UserActivity userId={userId}></UserActivity>
        </div></div>
    );
}

export default User;