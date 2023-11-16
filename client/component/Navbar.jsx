import { Link } from "react-router-dom"
export const Navbar = () => {
    return (
        <nav className="px-1.5 py-1.5 flex bg-cyan-500">
       <Link to="/home"><img className="rounded-3xl w-36" src="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2021/10/11091243/Lionel-Messi-Argentina-Uruguay-Dribble.jpg" alt="God Dribble level" /></Link> 
        <div className="flex justify-center w-full text-teal-50 flex-col p-0">
            <div className="flex justify-center">
            <h1> Welcome to Club [yourname]</h1>
            </div>
            <div className="flex justify-center">
            <p>Just see the magic what is the best team in the world</p>
            </div>
        </div>
        <button className="btn btn-danger">Log Out</button>
    </nav>
    )
}