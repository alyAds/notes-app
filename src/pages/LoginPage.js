import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login } from "../utils/network-data";
import { toast } from "react-toastify";

function LoginPage({loginSuccess}) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  async function onLoginHandler(e) {
    e.preventDefault();

    const { error, data } = await login({email, password});

    if (!error) {
      loginSuccess(data);
    } else {
      toast.warn(data)
    }
  }

  return (
    <>
      <div className="head">
        <h2>Login</h2>
        <span>untuk masuk ke Note</span>
      </div>
      <form methodd="post" action="#" onSubmit={onLoginHandler}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            className="form-login form-input-email"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            className="form-login form-input-password"
            autoComplete="off"
          />
        </div>
        <button>Masuk</button>
      </form>
      <p>Belum memiliki akun? <Link to="/register">Daftar</Link>.</p>
    </>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;