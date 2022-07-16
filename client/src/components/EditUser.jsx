import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { EditContext } from "../store/EditContext";
import axios from "axios";
function EditUser() {
  const navigate = useNavigate();
  const { editData } = useContext(EditContext);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  let userId = editData._id;
  const editUser = (e) => {
    e.preventDefault();
    const newData = {
      name: userName,
      email: userEmail,
      id: userId,
    };
    axios
      .post("http://localhost:5000/api/edit-user", newData)
      .then(alert("User Details Changed Successfully"))
      .then(navigate("/admin-dashboard"));
  };
  useEffect(() => {
    setUserName(editData.name);
    setUserEmail(editData.email);
  }, []);

  return (
    <div className="body">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h1 className="heading">Edit User</h1>
          </div>
          <form onSubmit={editUser}>
            <input
              type="text"
              className="fadeIn second"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              className="fadeIn second"
              placeholder="Email ID"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <input type="submit" className="fadeIn fourth" value="Submit" />
          </form>
          <div id="formFooter">
            <a
              className="underlineHover"
              onClick={() => navigate("/admin-dashboard")}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
