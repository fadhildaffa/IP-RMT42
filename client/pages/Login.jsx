import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import axios from "axios";
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
// const baseUrl = "http://localhost:3000"
import { GoogleLogin } from '@react-oauth/google';


export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(baseUrl + '/login', { email, password });
            localStorage.setItem("token", data.access_token)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });
            setTimeout(() => {
                navigate('/home')
            }, 2000)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK"
            })
        }
    }
    async function handleCredentialResponse(response) {
        try {
            const { data } = await axios.post(baseUrl + "/login/google", null, {
                headers: {
                    g_token: response.credential
                }
            })
            localStorage.setItem("token", data.access_token)
            navigate('/home')
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <section id="login" >
            <div className="row bg-slate-600">
                <div className="col-6 p-3 mt-36">
                    <div className="flex justify-center text-slate-200 text-2xl ">
                        <h2>Login first</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="flex ml-36">
                            <label className="text-slate-200">Email</label>
                        </div>
                        <div className="flex justify-center">
                            <input value={email} onChange={e => { setEmail(e.target.value) }} type="email" className="flex form-control w-96 justify-center" placeholder="name@example.com" />
                        </div>
                        <div className="flex ml-36">
                            <label className="text-slate-200">Password</label>
                        </div>
                        <div className="flex justify-center">
                            <input value={password} onChange={e => { setPassword(e.target.value) }} type="password" className="flex form-control w-96 justify-center" placeholder="generate password" />
                        </div>
                        <div className="flex justify-center mt-3">
                            <button className="btn btn-primary w-96">Sign In</button>
                        </div>
                    </form>
                    <br />
                    <div className="ml-36 text-slate-200">
                        <p>Don't have account? or Sign in with google</p>
                    </div>
                    <div className=" flex gap-2 ml-36 text-slate-200">
                        <Link to='/'><button className="btn btn-outline-primary">Register</button></Link>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                handleCredentialResponse(credentialResponse)
                            }}
                            onError={() => {
                                Swal.fire({
                                    title: 'Error!',
                                    text: error.response.data.message,
                                    icon: 'error',
                                    confirmButtonText: "OK"
                                });
                            }}
                        />;
                    </div>
                </div>
                <div className="col-6 p-0 ">
                    <img className="h-screen" src="https://www.the-sun.com/wp-content/uploads/sites/6/2022/01/NINTCHDBPICT000283898937.jpg?strip=all&quality=100&w=1920&h=1440&crop=1" alt="Abang Messi" />
                </div>
            </div>
        </section>
    )
}