import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserList from "./pages/UserList/UserList";
import UserCreate from "./pages/UserCreate";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLoggedIn, login, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  });

  return (
    <Router>
      <div className="bg-[#FAFAFA] min-h-screen w-screen text-black">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/list" /> : <LoginPage login={login} />
            }
          />
          <Route
            path="/list"
            element={isLoggedIn ? <UserList /> : <Navigate to="/" />}
          />
          <Route
            path="/createUser"
            element={isLoggedIn ? <UserCreate /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
