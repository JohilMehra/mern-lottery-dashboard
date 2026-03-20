import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      alert("Login success");

      navigate("/dashboard"); // redirect

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="password"
        type="password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <p>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "cyan" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}