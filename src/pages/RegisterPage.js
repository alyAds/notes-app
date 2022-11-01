import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, onFullnameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  async function onRegisterHandler(e) {
    e.preventDefault();

    const { error, data } = await register({name, email, password, confirmPassword});

    if (!error) {
      navigate("/");
      toast.success(`Akun ${name} berhasil terdaftar!`);
    } else {
      toast.warn(data);
    }
  }

  return (
    <>
      <div className="head">
        <h2>Register</h2>
        <span>untuk menggunakan Note</span>
      </div>
      <form methodd="post" action="#" onSubmit={onRegisterHandler}>
        <div className="form-group">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            id="fullname"
            value={name}
            onChange={onFullnameChange}
            className="form-login"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            className="form-login"
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
            className="form-login"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            className="form-login"
            autoComplete="off"
          />
        </div>
        <button>Mendaftar</button>
      </form>
      <p>Sudah memiliki akun? <Link to="/">Masuk</Link>.</p>
    </>
  );
}

export default RegisterPage;