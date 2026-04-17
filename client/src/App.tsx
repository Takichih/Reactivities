import { useEffect, useState } from "react"
import axios from "axios"
import { ListItemText, ListItem, Typography } from "@mui/material"



function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  
  useEffect(
    ()=> {
      axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
    }, []
  )
  return (
    <>
      <Typography>Reactivities</Typography>
      <ul>
        {activities.map((activity)=>(
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </ul>
    </>
  )
}

export default App
