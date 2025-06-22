import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
