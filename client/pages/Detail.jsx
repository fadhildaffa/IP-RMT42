import { useEffect, useState } from "react"
import axios from "axios";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000"
import { Navbar } from "../component/Navbar";

export const Detail = () => {
    const[detailTeam, setDetailTeam] = useState({});
    const {teamId} = useParams();
    const getData = async () => {
        try {
            const {data} = await axios.get(baseUrl+`/teams/${teamId}`, {
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
    return (
        <>
        <Navbar/>
        <div className="bg-gradient-to-r from-indigo-500">
        <div className="flex justify-center p-32">
          <img className="h-80 rounded-2xl ml-7" src={detailTeam.logo} alt={detailTeam.name} />
          <div>
        <RadarChart outerRadius={90} width={730} height={250} data={team}>
            <PolarGrid stroke="#253237"/>
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