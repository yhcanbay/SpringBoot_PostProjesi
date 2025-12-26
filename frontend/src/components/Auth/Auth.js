import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import './Auth.css';

function Auth() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleButton = async (path) => {
    const result = await sendRequest(path); // ✅ veri gelene kadar bekle
    setPassword("");
    setUsername("");

    if (path === "/login" && result?.accsessToken) {
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
      if (path === "/login") {
        // Backend'den dönen token zaten "Bearer " prefix'i ile geliyor
        localStorage.setItem("token", result.accsessToken);
        localStorage.setItem("currentUser", result.id);
        localStorage.setItem("userName", username);
      }
      return result;

    } catch (error) {
      console.error("Login hatası:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🚀 Hoş Geldiniz</h1>

        <FormGroup className="auth-form">
          <TextField
            className="auth-input"
            id="username"
            label="Kullanıcı Adı"
            variant="filled"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            className="auth-input"
            id="password"
            label="Şifre"
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <div className="auth-buttons">
            <Button
              className="auth-button login-button"
              variant="contained"
              onClick={() => handleButton("/login")}
            >
              Giriş Yap
            </Button>
            <Button
              className="auth-button register-button"
              variant="contained"
              onClick={() => handleButton("/register")}
            >
              Kayıt Ol
            </Button>
          </div>
        </FormGroup>
      </div>
    </div>
  );
}

export default Auth;
