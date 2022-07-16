import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
function UserDashboard() {
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const navigate = useNavigate();
  const updateQuote = async (e) => {
    e.preventDefault();
    const req = await fetch("http://localhost:8080/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await req.json();
    console.log(data);
    if (data.status == "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.err);
    }
  };
  const populateQuote = async () => {
    const req = await fetch("http://localhost:8080/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
    if (data.status == "ok") {
      setQuote(data.quote);
    } else {
      alert(data.err);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateQuote();
      }
    }
  }, []);
  return (
    <div class="banner">
      <div className="navbar">
        <div></div>

        <ul>
          <li>
            <a href="">User</a>{" "}
          </li>
          <li className="logout">
            <a href="">Log Out</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <h1>Welcome</h1>
        <p>
          <b>Your Quote:</b> {quote || "No Quote Found"}
        </p>
        <div>
          <form onSubmit={updateQuote}>
            <input
              className="dashboard-input"
              type="text"
              placeholder="Type Your Quote Here..."
              value={tempQuote}
              onChange={(e) => setTempQuote(e.target.value)}
            />
            <button type="submit">
              <span></span>Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
