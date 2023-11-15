
export const Register = () => {

    return (
        <>
            <section id="register">
                {/* <nav className="px-1.5 py-1.5 flex bg-cyan-500">
                    <img className="rounded-3xl w-24" src="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2021/10/11091243/Lionel-Messi-Argentina-Uruguay-Dribble.jpg" alt="God Dribble level" />
                    <div className="flex justify-center w-full text-teal-50 flex-col p-0">
                        <div className="flex justify-center">
                        <h1> Welcome to Club </h1>
                        </div>
                        <div className="flex justify-center">
                        <p>Daftarkan dirimu untuk mengetahui prediksi siapa tim terbaik!!!</p>
                        </div>
                    </div>
                    <button> ini tombol</button>
                </nav> */}
                <div className="row bg-slate-600 ">
                    
                    <div className="col-6 p-3 mt-24">
                    <div className="flex justify-center text-slate-200 text-4xl ">
                        <h1>Welcome to the club sportsmania!!!</h1>
                    </div>
                    <div className="flex justify-center text-slate-200 text-2xl ">
                        <h2>Register your data first</h2>
                    </div>
                        <form>
                            <div className="flex ml-36">
                                <label className="text-slate-200">Name</label>
                            </div>
                            <div className="flex justify-center ">
                            <input type="text" className="flex form-control w-96 justify-center" placeholder="john doe"/>
                            </div>
                            <div className="flex ml-36">
                                <label className="text-slate-200">Email</label>
                            </div>
                            <div className="flex justify-center">
                            <input type="email" className="flex form-control w-96 justify-center" placeholder="name@example.com"/>
                            </div>
                            <div className="flex ml-36">
                                <label className="text-slate-200">Password</label>
                            </div>
                            <div className="flex justify-center">
                            <input type="password" className="flex form-control w-96 justify-center" placeholder="generate password"/>
                            </div>
                            <div className="flex justify-center mt-3">
                            <button className="btn btn-primary w-96">Register</button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <div className="ml-36 text-slate-200">
                        <p>Are you have already account?</p>
                        </div>
                        <div className="ml-36 text-slate-200">
                        <button className="btn btn-outline-primary">Sign In</button>
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