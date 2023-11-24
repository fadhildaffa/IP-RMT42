import { useEffect, useState } from "react"
import axios from "axios";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { useNavigate, useParams } from "react-router-dom";
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
// const baseUrl = "http://localhost:3000"
import { Navbar } from "../component/Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export const Detail = () => {
  const [name, setName] = useState("")
  const [logo, setLogo] = useState("")
  const [win, setWin] = useState(0)
  const [draw, setDraw] = useState(0)
  const [lose, setLose] = useState(0)
  const [cleanSheet, setCleanSheet] = useState(0)
  const [goalAverage, setGoalAverage] = useState(0)
  const [failedToScore, setFailedToScore] = useState(0)
  const [detailTeam, setDetailTeam] = useState({});
  const navigate = useNavigate()
  const { teamId } = useParams();
  const getData = async () => {
    try {
      const { data } = await axios.get(baseUrl + `/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }

      })
      setDetailTeam(data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    setName(detailTeam.name)
    setLogo(detailTeam.logo)
    setWin(detailTeam.win)
    setDraw(detailTeam.draw)
    setLose(detailTeam.lose)
    setGoalAverage(detailTeam.goal_average)
    setCleanSheet(detailTeam.clean_sheet)
    setFailedToScore(detailTeam.failed_to_score)
  }, [detailTeam])
  useEffect(() => {
    getData()
  }, [])
  const team = [
    {
      "subject": "Win",
      "A": detailTeam.win,
      "fullMark": 40
    },
    {
      "subject": "Lose",
      "A": detailTeam.lose,
      "fullMark": 38
    },
    {
      "subject": "Draw",
      "A": detailTeam.draw,
      "fullMark": 38
    },
    {
      "subject": "Goal Average",
      "A": detailTeam.goal_average,
      "fullMark": 10
    },
    {
      "subject": "Clean Sheets",
      "A": detailTeam.clean_sheet,
      "fullMark": 10
    },
    {
      "subject": "Failed to Score",
      "A": detailTeam.failed_to_score,
      "fullMark": 10
    }
  ]
  const handleEdit = async (e) => {
    e.preventDefault()
    try {
       await axios({
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        url: baseUrl + `/teams/${teamId}`,
        data: {
          name,
          win,
          draw,
          lose,
          logo,
          clean_sheet: cleanSheet,
          goal_average: goalAverage,
          failed_to_score: failedToScore
        }
      })
      Swal.fire({
        title: 'Succes Updated Team!',
        text: "The is updated",
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
  const editPhoto = () => {
    console.log("masukk sini")
  } 
  return (
    <>
      <Navbar />
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="flex justify-center modal-title fs-5">Edit Team</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleEdit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Team Name</label>
                      <input value={name} onChange={e => { setName(e.target.value) }} type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Logo</label>
                      <input value={logo} onChange={e => { setLogo(e.target.value) }} type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Win</label>
                      <input value={win} onChange={e => { setWin(e.target.value) }} type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Draw</label>
                      <input value={draw} onChange={e => { setDraw(e.target.value) }} type="number" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Lose</label>
                      <input value={lose} onChange={e => { setLose(e.target.value) }} type="number" className="form-control" aria-describedby="emailHelp" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Goal Average</label>
                      <input value={goalAverage} onChange={e => { setGoalAverage(e.target.value) }} type="number" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Clean Sheet</label>
                      <input value={cleanSheet} onChange={e => { setCleanSheet(e.target.value) }} type="number" className="form-control" aria-describedby="emailHelp" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Failed to Score</label>
                      <input value={failedToScore} onChange={e => { setFailedToScore(e.target.value) }} type="number" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link to={`/home/${detailTeam.id}`}><button className="btn btn-secondary" data-bs-dismiss="modal">Close</button></Link>
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-500">
        <div className="flex justify-center pt-10">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit Team
          </button>
        </div>
        <div className="flex justify-center p-32">
          <img className="h-80 rounded-2xl ml-7" src={detailTeam.logo} alt={detailTeam.name}  onClick={editPhoto}/>
          <div>
            <RadarChart outerRadius={90} width={730} height={250} data={team}>
              <PolarGrid stroke="#253237" />
              <PolarAngleAxis dataKey="subject" stroke="#253237" />
              <PolarRadiusAxis angle={30} domain={[0, 35]} stroke="#253237" />
              <Radar name={detailTeam.name} dataKey="A" stroke="#28965A" fill="#28965A" fillOpacity={0.8} />
              <Legend />
            </RadarChart>
          </div>
        </div>
      </div>
    </>
  )
}