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
        <RadarChart outerRadius={90} width={730} height={250} data={team}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 30]} />
            <Radar name={detailTeam.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
        </>
    )
}