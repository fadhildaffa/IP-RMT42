import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
// const baseUrl = "http://localhost:3000"
export const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }
    const handleSubscribe = async () => {
        try {
            const { data } = await axios.get(baseUrl + "/payment/midtrans", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            window.snap.pay(data.transaction_token, {
                onSuccess: async function (result) {
                    /* You may add your own implementation here */
                    // console.log(result.order_id)
                    localStorage.setItem("success", result.order_id)

                    if (localStorage.getItem("success")) {
                    await axios.patch(baseUrl + '/users/role', null, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                    }

                    localStorage.removeItem("success")
                    navigate('/home')
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("wating your payment!"); console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("payment failed!"); console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    Swal.fire({
                        title: 'Your payment didnt succesfully',
                        text: 'you closed the popup without finishing the payment',
                        icon: 'info',
                        confirmButtonText: "OK"
                    });
                }
            })
            console.log(data)
        } catch (error) {

        }


    }
    return (
        <nav className="px-1.5 py-1.5 flex bg-cyan-500 p-0">
            <Link to="/home"><img className="rounded-3xl w-28 mx-3 h-full" src="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2021/10/11091243/Lionel-Messi-Argentina-Uruguay-Dribble.jpg" alt="God Dribble level" /></Link>
            <div className="flex justify-center w-full text-teal-50 flex-col p-0">
                <div className="flex justify-center">
                    <h1> Welcome to Club [yourname]</h1>
                </div>
                <div className="flex justify-center">
                    <p>Just see the magic what is the best team in the world</p>
                </div>
                <div className="flex justify-center">
                    <button className="btn btn-primary w-28" onClick={handleSubscribe}>Subscribe</button>
                </div>
            </div>
            <button className="btn btn-danger mx-1.5" onClick={handleLogout}>Log Out</button>
        </nav>
    )
}