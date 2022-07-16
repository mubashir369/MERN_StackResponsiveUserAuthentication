import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {EditContext} from '../store/EditContext'
import $ from "jquery";
import axios from "axios";
function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const {setEditData} =useContext(EditContext)

  const deleteUser = (id, name, e) => {
    e.preventDefault();
    const conf = window.confirm(`Are You want to delete user ${name}`);
    if (conf) {
      axios.get(`http://localhost:5000/api/delete-user/${id}`).then(setUsers(users.filter((user) => user._id !== id)));
    }
  };
  const editUser=async(id,e)=>{
      e.preventDefault()
       // setEditData(users.find((user) => user._id !== id)
       await axios.get(`http://localhost:5000/api/edit-user/${id}`).then((res)=>{
           console.log(res.data);
           setEditData(res.data.user)
       }).then(()=>navigate('/edit-user'))
       
       
      navigate('/edit-user')
  }
  const addUser=(e)=>{
    e.preventDefault()
    navigate('/add-user')
  }
  useEffect(() => {
    axios.get("http://localhost:5000/api/get-users").then((res) => {
      setUsers(res.data.users);
      console.log(res.data.users);
    });
  }, []);
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    <div className="MainDiv">
      <div class="jumbotron text-center">
        <h3>Users Data</h3>
      </div>
      <button style={{ color: "black" }} onClick={addUser} >Add User +</button>
      <div className="container">
        <table id="example" class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((result, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{result._id}</td>
                  <td>{result.email}</td>
                  <td>{result.name}</td>
                  <td>
                    <a
                      className="btn btn-danger"
                      onClick={(e) => deleteUser(result._id, result.name, e)}
                    >
                      Delete
                    </a>{" "}
                    <a className="btn btn-info m-2" onClick={(e)=>editUser(result._id,e)} >edit</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
