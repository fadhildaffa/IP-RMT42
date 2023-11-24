import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from "axios";
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
// const baseUrl = "http://localhost:3000"
import { GoogleLogin } from '@react-oauth/google';

export const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios({
                url: baseUrl + "/register",
                method: "post",
                data: {
                    name: name,
                    email,
                    password
                }
            })
            navigate('/login')
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
            const {data} = await axios.post(baseUrl+"/login/google", null, {
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
        <>
            <section id="register">
                <div className="row bg-slate-600">
                    <div className="col-6 p-3 mt-24">
                        <div className="flex justify-center text-slate-200 text-4xl ">
                            <h1>Welcome to the club sportsmania!!!</h1>
                        </div>
                        <div className="flex justify-center text-slate-200 text-2xl ">
                            <h2>Register your data first</h2>
                        </div>
                        <form onSubmit={handleRegister}>
                            <div className="flex ml-36">
                                <label className="text-slate-200">Name</label>
                            </div>
                            <div className="flex justify-center ">
                                <input value={name} onChange={e => { setName(e.target.value) }} type="text" className="flex form-control w-96 justify-center" placeholder="john doe" />
                            </div>
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
                                <button className="btn btn-primary w-96">Register</button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <div className="ml-36 text-slate-200">
                            <p>Have account already? or Login with google</p>
                        </div>
                        <div className="flex gap-3 ml-36 text-slate-200">
                            <Link to='/login'><button className="btn btn-outline-primary">Sign In</button></Link>
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
                        <img className="h-screen" src="https://www.chatgptguide.ai/wp-content/uploads/2023/08/Messi.png" alt="Abang Messi" />
                    </div>
                </div>
            </section>
        </>
    )
}