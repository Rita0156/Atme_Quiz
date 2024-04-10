import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/home/homepage";
import Login from "./pages/login/loginpage";
import Signup from "./pages/signup/signuppage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `https://atme-quiz.onrender.com/auth/login/success`;
      console.log(url, "url--------");
      const { data } = await axios.get(url, { withCredentials: true });
      data = JSON.parse(data);
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user, "%^^^^^^^^^^^^^^^^^^^%");
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
