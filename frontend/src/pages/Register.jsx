import { useState } from "react";
import { registerUser } from "../api/authApi";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);
      alert("Account created! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-box">
      <h2>Create Account</h2>

      <form onSubmit={submit}>
        <input type="text" placeholder="Full Name"
        onChange={(e) => setName(e.target.value)} />

        <input type="email" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
