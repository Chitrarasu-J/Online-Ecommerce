import { useState, useContext } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);
      login(email, res.token);
      alert("Login Success!");
      window.location.href = "/";
    } catch (err) {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="auth-box">
      <h2>Sign In</h2>

      <form onSubmit={submit}>
        <input type="email" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
