import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDashboard from "./components/UserDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import EditUser from "./components/EditUser";
import Edit from "./store/EditContext";
import AddUser from "./components/AddUser";
function App() {
  return (
    <div>
      <Edit>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/add-user" element={<AddUser/>} />
          </Routes>
        </Router>
      </Edit>
    </div>
  );
}

export default App;
