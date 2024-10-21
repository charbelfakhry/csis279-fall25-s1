import { Routes, Route, Link, useNavigate } from "react-router-dom"; // Updated to use Routes
import UserPage from "./components/user/UserPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "./components/user/UserForm";
import { useEffect, useState } from "react";
import DateTimeLabel from "./utils/DateTimeLabel";
import { FiLogOut, FiEdit } from "react-icons/fi";
import AboutUs from "./pages/AboutUs";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setIsNavCollapsed(true); // Reset the navbar collapse state
    navigate("/"); // Use navigate instead of history.push
  };

  const getUser = () => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    return parsedUser;
  };

  const getUserNameFromLocalStorage = () => {
    return getUser()?.client_first_name;
  };

  const isAdmin = () => {
    const user = getUser();
    // we should implement is Admin later
    //return user?.role === "admin";
    return true;
  };

  return (
    <div className="App">
      {isLoggedIn && (
        <div>
          <DateTimeLabel />
          <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "#3498db" }}
          >
            <div className="container">
              <Link to="/" className="navbar-brand text-light">
                CSIS 279 S.1
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`${
                  isNavCollapsed ? "collapse" : ""
                } navbar-collapse`}
                id="navbarNav"
              >
                <ul className="navbar-nav ms-auto">
                  {isAdmin() && (
                    <li className="nav-item">
                      <Link to="/users" className="nav-link text-light">
                        Users
                      </Link>
                    </li>
                  )}
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle btn btn-link text-light"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FiEdit className="dropdown-icon" /> {/* Edit Profile Icon */}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <FiLogOut className="dropdown-item-icon" /> Logout
                        </button>
                      </li>
                      <li>
                        <Link to="/userForm" className="dropdown-item">
                          <FiEdit className="dropdown-item-icon" /> Edit Profile
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
      <div className="container mt-3">
        <Routes>
          {isLoggedIn ? (
            <>
              {isAdmin() && <Route path="/users" element={<UserPage />} />}
              <Route path="/userForm" element={<UserForm />} />
            </>
          ) : (
            <>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/aboutus" element={<AboutUs />} />
            </>
          )}
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
