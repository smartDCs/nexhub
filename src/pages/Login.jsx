import React from "react";

function Login() {
  return (
    <div className="containerLogin ">
      <div className="login ">
        <form>
          <h1>Login</h1>
          <h2>Email</h2>
          <input type="email" name="email" />
          <h2>Password</h2>
          <input type="password" name="password" />
          <button>Login</button>
        </form>

        <p>
          If you don't have an account, please <a href="/"> Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
