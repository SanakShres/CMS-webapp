import React, { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { dispatch: authDispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        authDispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__img">
          <img
            src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
            alt=""
          />
        </div>
        <div className="login__form">
          {error && (
            <div className="login__invalid">Invalid email or password</div>
          )}
          <h1>Log In</h1>
          <div className="login__create">
            Don't have an account? <a href="#">Create an account</a>
          </div>
          <form onSubmit={handleLogin}>
            <div className="formInput">
              <label htmlFor="">Email</label>
              <input
                className="formInput__input"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error"></p>
            </div>
            <div className="formInput">
              <label htmlFor="">Password</label>
              <input
                className="formInput__input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error"></p>
            </div>
            <div className="formInput">
              <label htmlFor="">
                <input type="checkbox" />
                &nbsp;Remember Password
              </label>
            </div>
            <button type="submit" className="formBtn">
              Login
            </button>
          </form>
          <div className="login__forgot">Forgot Your Password?</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
