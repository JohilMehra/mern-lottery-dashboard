import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", data);

      alert(res.data.msg);

      navigate("/"); // go to login

    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input
        placeholder="name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />
      <br /><br />

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

      <button onClick={handleRegister}>Register</button>

      <br /><br />

      <p>
        Already have an account?{" "}
        <Link to="/" style={{ color: "cyan" }}>
          Login
        </Link>
      </p>
    </div>
  );
}