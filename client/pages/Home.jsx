import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
import Swal from "sweetalert2";
export const Home = () => {
    const [teams, setTeam] = useState([{
        "id": 1,
        "name": "Manchester United",
        "logo": "https://media-4.api-sports.io/football/teams/33.png",
        "win": 16,
        "draw": 10,
        "lose": 12,
        "goal_average": 1.5,
        "clean_sheet": 8,
        "failed_to_score": 9,
        "authorId": 1
    },
    {
        "id": 2,
        "name": "Liverpool",
        "logo": "https://media-4.api-sports.io/football/teams/40.png",
        "win": 28,
        "draw": 8,
        "lose": 2,
        "goal_average": 2.5,
        "clean_sheet": 21,
        "failed_to_score": 1,
        "authorId": 1
    },
    {
        "id": 3,
        "name": "Arsenal",
        "logo": "https://media-4.api-sports.io/football/teams/41.png",
        "win": 22,
        "draw": 3,
        "lose": 13,
        "goal_average": 1.6,
        "clean_sheet": 13,
        "failed_to_score": 11,
        "authorId": 1
    },
    {
        "id": 4,
        "name": "Tottenham",
        "logo": "https://media-4.api-sports.io/football/leagues/47.png",
        "win": 22,
        "draw": 5,
        "lose": 11,
        "goal_average": 1.8,
        "clean_sheet": 16,
        "failed_to_score": 10,
        "authorId": 1
    },
    {
        "id": 5,
        "name": "Chelsea",
        "logo": "https://media-4.api-sports.io/football/leagues/49.png",
        "win": 21,
        "draw": 11,
        "lose": 6,
        "goal_average": 2.0,
        "clean_sheet": 16,
        "failed_to_score": 4,
        "authorId": 1
    },
    {
        "id": 6,
        "name": "Manchester City",
        "logo": "https://media-4.api-sports.io/football/leagues/50.png",
        "win": 29,
        "draw": 6,
        "lose": 3,
        "goal_average": 2.6,
        "clean_sheet": 21,
        "failed_to_score": 4,
        "authorId": 1
    },
    {
        "id": 7,
        "name": "Brighton",
        "logo": "https://media-4.api-sports.io/football/leagues/51.png",
        "win": 12,
        "draw": 15,
        "lose": 11,
        "goal_average": 1.1,
        "clean_sheet": 11,
        "failed_to_score": 13,
        "authorId": 1
    },
    {
        "id": 8,
        "name": "Crystal Palace",
        "logo": "https://media-4.api-sports.io/football/leagues/52.png",
        "win": 11,
        "draw": 15,
        "lose": 12,
        "goal_average": 1.3,
        "clean_sheet": 12,
        "failed_to_score": 6,
        "authorId": 1
    },
    {
        "id": 9,
        "name": "Newcastle",
        "logo": "https://media-4.api-sports.io/football/leagues/34.png",
        "win": 13,
        "draw": 10,
        "lose": 15,
        "goal_average": 1.2,
        "clean_sheet": 8,
        "failed_to_score": 9,
        "authorId": 1
    },
    {
        "id": 10,
        "name": "Watford",
        "logo": "https://media-4.api-sports.io/football/leagues/35.png",
        "win": 6,
        "draw": 5,
        "lose": 27,
        "goal_average": 0.9,
        "clean_sheet": 4,
        "failed_to_score": 18,
        "authorId": 1
    },
    {
        "id": 11,
        "name": "Wolves",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "win": 15,
        "draw": 6,
        "lose": 17,
        "goal_average": 1.0,
        "clean_sheet": 11,
        "failed_to_score": 16,
        "authorId": 1
    },
    {
        "id": 12,
        "name": "Southampton",
        "logo": "https://media-4.api-sports.io/football/leagues/41.png",
        "win": 9,
        "draw": 3,
        "lose": 16,
        "goal_average": 1.1,
        "clean_sheet": 10,
        "failed_to_score": 15,
        "authorId": 1
    }

    ]);
    const [name, setName] = useState("")
    const [logo, setLogo] = useState("")
    const [win, setWin] = useState(0)
    const [draw, setDraw] = useState(0)
    const [lose, setLose] = useState(0)
    const [cleanSheet, setCleanSheet] = useState(0)
    const [goalAverage, setGoalAverage] = useState(0)
    const [failedToScore, setFailedToScore] = useState(0)
    const [show, setShow] = useState(false);
    
    
    async function getData() {
        try {
            const { data } = await axios.get(baseUrl + "/teams", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setTeam(data)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK"
            });
        }
    }
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
            getData()
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
            getData()
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: "OK"
            });
        }
        
    }
    useEffect(() => {
        getData()
    }, [])
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