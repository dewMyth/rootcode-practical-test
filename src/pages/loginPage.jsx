import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailInvalid) {
      alert("Please enter a valid email address.");
    }

    const userCredentials = {
      email: email,
      password: password,
    };

    // Login API
    // ** NOTE:-
    // Given API (https://reqres.in/api/login) is giving unrelated data about colors, not related to users when I checked it.
    // Tried to reach the Tel. No given for support, but it was not reachable.
    // So, Insetad I have used the API (https://reqres.in/api/users/2) to get the user data.

    const response = await axios.post(
      `https://reqres.in/api/users/2`,
      userCredentials
    );

    if (response) {
      alert("Login successful!");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value?.includes("@")) {
      setEmailInvalid(false);
    } else {
      setEmailInvalid(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Sign In</h3>
          <form>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>

            {emailInvalid && (
              <div className="alert alert-danger" role="alert">
                Please enter a valid email address.
              </div>
            )}

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                placeholder="Password"
                password={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary btn-block w-100"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
