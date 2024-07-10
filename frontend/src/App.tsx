import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserList from "./pages/UserList/UserList";
import UserCreate from "./pages/UserCreate";

const App = () => {
  return (
    <Router>
      <div className="bg-[#FAFAFA] min-h-screen w-screen text-black">
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/createUser" element={<UserCreate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
