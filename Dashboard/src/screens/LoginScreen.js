import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/userActions";
import Message from "./../components/LoadingError/Error";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="login" >
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "200px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}

          <h4 className="card-title mb-4 text-center" style={{"color":"#15446D" , "font-family": "'Roboto', sans-serif"}}>S'identifier</h4>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link style={{ textDecoration: 'none' , color: '#717171' }} to="/password/forgot"><p className="">Mot de passe oublié ?</p></Link> 

            <div className="mb-4">
              <button type="submit" className="btn btn-login w-100">
                Connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
