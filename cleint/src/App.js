import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDashboard from "./components/UserDashboard";
import AdminLogin from "./components/AdminLogin";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/user-dashboard" element={<UserDashboard/>}/>
          <Route path="/admin-login" element={<AdminLogin/>} />
        </Routes>
      </Router>
      
  
    </div>
  );
}

export default App;
