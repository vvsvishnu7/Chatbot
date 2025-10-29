import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './registerLogin.css';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/chat');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
        <div class="page">

      <div class="side-banner">

        <h1 class="banner-head">DOOPER</h1>

        <div class="banner-text">

          <div class="text1">Start your journey with us</div>
          <div class="text2">Discover the world’s best community of doctors and RHAs</div>

          <div class="card">
            <div className="card-text">
              Your health is our priority! Book your appointment today and get expert care from our trusted doctors.
            </div>
            <div className="card-author">
              <div class="flex">
                <img id="doctor" src="/doctor.png" alt="profile" />

                <div>
                  <div >Dr. Siddhartha</div>
                <ul id='rating'>
                  <li id='star'><img src="/star.png" alt=""/></li>
                  <li id='star'><img src="/star.png" alt=""/></li>
                  <li id='star'><img src="/star.png" alt=""/></li>
                  <li id='star'><img src="/star.png" alt=""/></li>
                  <li id='star'><img src="/star.png" alt=""/></li>
                </ul>
                </div>

                </div>
            </div>
          </div>
        </div>


      </div>

    <div class='signup-container'>
      <div class='heading-big'>User Login</div>
          <div class="heading-small">Welcome back to <span class="span-red">DOOPER </span>
          please login with your eamil and password</div>

      <form onSubmit={handleLogin}>
        <input class="input-field"
          id='email'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input class="input-field"
          id='password'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button class="submit-btn" type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>


    </div>
  );
};

export default Login;
