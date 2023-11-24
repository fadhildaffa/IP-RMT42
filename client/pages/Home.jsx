import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
// const baseUrl = "http://localhost:3000"
import { TeamContext } from "../src/context/fetchData";
import Swal from "sweetalert2";
export const Home = () => {
    const [name, setName] = useState("")
    const [logo, setLogo] = useState("")
    const [win, setWin] = useState(0)
    const [draw, setDraw] = useState(0)
    const [lose, setLose] = useState(0)
    const [cleanSheet, setCleanSheet] = useState(0)
    const [goalAverage, setGoalAverage] = useState(0)
    const [failedToScore, setFailedToScore] = useState(0)
    const { teams, fetchData} = useContext(TeamContext)
    const handleAddTeam = async (e) => {
        e.preventDefault();
        try {
            await axios.post(baseUrl + "/teams", {
                name,
                win,
                draw,
                lose,
                logo,
                clean_sheet: cleanSheet,
                goal_average: goalAverage,
                failed_to_score: failedToScore
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            Swal.fire({
                title: 'Succes Add!',
                text: "Succes Adding Team to List",
                icon: 'success',
                confirmButtonText: "OK"
            });
           fetchData()
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK"
            });
        }
    }
    const handleDelete = async (teamId) => {
        try {
            const {data} = await axios.delete(baseUrl + `/teams/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            Swal.fire({
                title: 'Succes Delete!',
                text: data.message,
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchData()
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK"
            });
        }
        
    }
   
    return (
        <>
            <Navbar />
            <div className="modal fade" id="exampleModal" tabIndex="100" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="flex justify-center modal-title fs-5">Add Team</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAddTeam}>
                            <div className="modal-body">
                            <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Team Name</label>
                                            <input value={name} onChange={e => {setName(e.target.value)}} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Logo</label>
                                            <input value={logo} onChange={e => {setLogo(e.target.value)}} type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Win</label>
                                            <input value={win} onChange={e => {setWin(e.target.value)}} type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Draw</label>
                                            <input value={draw} onChange={e => {setDraw(e.target.value)}} type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Lose</label>
                                            <input value={lose} onChange={e => {setLose(e.target.value)}} type="number" className="form-control"  aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Goal Average</label>
                                            <input value={goalAverage} onChange={e => {setGoalAverage(e.target.value)}} type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Clean Sheet</label>
                                            <input value={cleanSheet} onChange={e => {setCleanSheet(e.target.value)}} type="number" className="form-control"  aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Failed to Score</label>
                                            <input value={failedToScore} onChange={e => {setFailedToScore(e.target.value)}} type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Link to="/home"><button className="btn btn-secondary" data-bs-dismiss="modal">Close</button></Link>
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-blue-500">
                <div className="flex ml-14 pt-14">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Team
                    </button>
                </div>
                <div className="flex flex-wrap p-24 gap-7 ml-3 justify-center">
                    {teams.map((el) => (
                        <div className="card w-72" key={el.id} >
                            <img src={el.logo} className="rounded-3xl h-72" alt={el.name} />
                            <div className="card-body">
                                <h5 className="card-title mb-10 text-center">{el.name}</h5>
                                <div className="flex justify-center gap-2">
                                    <Link to={`/home/${el.id}`} ><button className="btn btn-success">See statistic</button></Link>
                                    <button className="btn btn-danger" onClick={() => {handleDelete(el.id)}}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}