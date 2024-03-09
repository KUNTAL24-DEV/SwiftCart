import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 1000);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login - SwiftCart">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;













// import React, { useState } from 'react';
// import Layout from "./../../components/Layout/Layout.js";
// import "./../../styles/AuthStyle.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';
// import { useAuth } from '../../context/auth.js';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [submitted, setSubmitted] = useState(false);
//     const [auth,setAuth] = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 setAuth({
//                     ...auth,
//                     user: res.data.user,
//                     token: res.data.token,
//                 });
//                 localStorage.setItem("auth", JSON.stringify(res.data));
//                 setTimeout(() => {
//                     navigate("/");
//                 }, 1000); // Delay navigation by 2 seconds (2000 milliseconds)
//                 setSubmitted(true); // Move setSubmitted inside the success block
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong");
//         }
//     };

//     return (
//         <Layout title={"Swiftcart-Login"}>
//             <div className='form-container'>
//                 <h1>Login</h1>
//                 {submitted ? (
//                     <p>All fields are registered!</p>
//                 ) : (
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Email' required />
//                         </div>
//                         <div className="mb-3">
//                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your password' required />
//                         </div>
//                         <button type="submit" className="btn btn-primary">LOGIN</button>
//                     </form>
//                 )}
//             </div>
//         </Layout>
//     );
// }

// export default Login;

