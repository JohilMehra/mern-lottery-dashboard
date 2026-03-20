import API from "../api/axios";

export default function Admin() {

  const runDraw = async () => {
    const res = await API.get("/draw/run");
    console.log(res.data);
    alert("Draw executed");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={runDraw}>Run Draw</button>
    </div>
  );
}