// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./firebase/index";
import RegisterComponent from "./components/RegisterComponent";

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
