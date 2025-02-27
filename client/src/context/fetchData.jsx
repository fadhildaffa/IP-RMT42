import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
const baseUrl = "https://server-p2_ip_fadhild.yoiego.my.id"
// const baseUrl = "http://localhost:3000"


export const TeamContext = createContext() // bikin context

export const TeamContextProvider = ({ children }) => { // bikin context provider

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
    
    const fetchData = async () => {
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
    
        useEffect(() => {
            fetchData()
        }, [])
    
    return (
        <TeamContext.Provider
            value={{teams, fetchData}}
        >
            {children}
        </TeamContext.Provider>
    )
} 