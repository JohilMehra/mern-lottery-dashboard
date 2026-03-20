import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [status, setStatus] = useState("Inactive");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchScores();
  }, []);

  // 🔹 Fetch scores
  const fetchScores = async () => {
    try {
      const res = await API.get("/score/my", {
        headers: { Authorization: token }
      });
      setScores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Add score
  const addScore = async () => {
    try {
      await API.post(
        "/score/add",
        { score },
        { headers: { Authorization: token } }
      );

      setScore("");
      fetchScores();

    } catch (err) {
      alert("Error adding score");
    }
  };

  // 🔹 Subscription
  const subscribe = async () => {
    try {
      await API.post(
        "/user/subscribe",
        {},
        { headers: { Authorization: token } }
      );

      setStatus("Active");
      alert("Subscription Activated");

    } catch (err) {
      alert("Error subscribing");
    }
  };

  // 🔹 Charity selection
  const selectCharity = async (id) => {
    try {
      await API.post(
        "/user/charity",
        { charityId: id },
        { headers: { Authorization: token } }
      );

      alert("Charity selected");

    } catch (err) {
      alert("Error selecting charity");
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">

        {/* STATUS */}
        <h3>Status: {status}</h3>

        {/* INPUT */}
        <input
          placeholder="Enter score (1-45)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        {/* BUTTONS */}
        <button onClick={addScore}>Add Score</button>
        <button onClick={subscribe}>Activate Subscription</button>

        {/* CHARITY */}
        <select onChange={(e) => selectCharity(e.target.value)}>
          <option>Select Charity</option>
          <option value="1">Charity A</option>
          <option value="2">Charity B</option>
        </select>

        {/* SCORES */}
        <h3>Your Scores</h3>
        <ul>
          {scores.map((s, i) => (
            <li key={i}>{s.score}</li>
          ))}
        </ul>

        {/* LOGOUT */}
        <button onClick={logout} style={{ background: "red", color: "white" }}>
          Logout
        </button>

      </div>
    </div>
  );
}