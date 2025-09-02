import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleButton = async (path) => {
  const result = await sendRequest(path); // ✅ veri gelene kadar bekle
  setPassword("");
  setUsername("");

  if (path === "/login" && result?.token) {
    window.location.href = "/";
  } else {
    window.location.href = "/auth";
  }

  console.log("Token:", localStorage.getItem("token"));
};

    const sendRequest = async (path) => {
      try {
        const response = await fetch("/auth" + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        });
      
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error("Giriş başarısız: " + errorText);
        }
      
        const result = await response.json();
        if(path==="/login"){
        localStorage.setItem("token", result.massage);
        localStorage.setItem("currentUser", result.id);
        localStorage.setItem("userName", username);}
        return result;
      
      } catch (error) {
        console.error("Login hatası:", error.message);
      }
    };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", // sayfa ortalama için
      }}
    >
      <FormGroup
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "20px",
          width: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          style={{ width: "100%", marginTop: "20px" }}
          id="username"
          label="UserName"
          variant="filled"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ width: "100%", marginTop: "20px" }}
          id="password"
          label="Password"
          variant="filled"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Butonları yan yana grupladık */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "30px",
            gap: "10px",
          }}
        >
          <Button
            style={{ flex: 1, background: "#139A43", color: "white" }}
            variant="contained"
            onClick={() => handleButton("/login")}
          >
            Login
          </Button>
          <Button
            style={{ flex: 1, background: "#139A43", color: "white" }}
            variant="contained"
            onClick={() => handleButton("/register")}
          >
            Register
          </Button>
        </div>
      </FormGroup>
    </div>
  );
}

export default Auth;