import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './registerLogin.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dooper-chatbot.onrender.com/api/auth/register', { email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
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
          <div class='heading-big'>Create Account</div>
          <div class="heading-small">Welcome to <span class="span-red">DOOPER </span>
          please signup with your eamil and password</div>

          <form onSubmit={handleRegister}>
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
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <br />
            <button class="submit-btn" type="submit">Register</button>
          </form>

        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
    </div>


    </div>


      );
};

export default Register;
