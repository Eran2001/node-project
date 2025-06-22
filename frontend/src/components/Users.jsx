import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    password: "",
    status: "active",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/users", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: "", age: "", password: "", status: "active" });
      fetchUsers();
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3002/auth/login", {
        email: "test@example.com", // Replace with form input
        password: "password",
      });
      localStorage.setItem("token", response.data.token);
      fetchUsers();
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Users List</h1>
      <button onClick={handleLogin}>Login</button>
      <div className="form-section">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit">Add User</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
