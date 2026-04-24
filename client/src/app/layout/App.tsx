import {useEffect, useState } from "react"
import axios from "axios"
import {CssBaseline, Container, Box} from "@mui/material"
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); 
  const [editMode, setEditMode] = useState<boolean> (false)


  useEffect(
    () => {
      axios.get<Activity[]>('https://localhost:5001/api/activities')
        .then(response => setActivities(response.data))
    }, []
  )
  //Selecting the activity that matches the id passed.
  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  //cancelling the activity (doesn't require an id)
  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined)
  }

 const handleOpenForm = (id ?: string) => {
  // if we want to edit the activity, we need to pass the activity to the form
  if (id) handleSelectedActivity(id)
  //otherwise, we don't want the activity info on the form
  else handleCancelSelectedActivity()
  // Else form closed
  setEditMode(true)
 }
 
 const handleCloseForm = () => {
  setEditMode(false);
 }

 const handleDeleteActivity = (id: string) => {
  setActivities(activities.filter(x => x.id !== id))
 }

 const handleSubmitForm = (activity: Activity) => {
  //we can have 2 submits (for editing an existing activity or creating a new one)
  if (activity.id) {
    setActivities(activities.map(x => x.id === activity.id ? activity : x))
  } else {
    //we create an activity here
    //...activities: Current list of activities listed as activity 1, activity 2...
    //...activity,id :something -> is the activity we are adding to the list
    const newActivity = {...activity, id: activities.length.toString()}
    setSelectedActivity(newActivity)
    setActivities([...activities, newActivity])
  }
  setEditMode(false)
 }

  return (
    <Box sx={{backgroundColor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar 
        openForm = {handleOpenForm}
      />
      <Container maxWidth='xl' sx={{mt:3}}>
        <ActivityDashboard 
        activities={activities} 
        //parse the functions to the dashbaord
        selectActivity = {handleSelectedActivity}
        cancelSelectActivity = {handleCancelSelectedActivity}
        selectedActivity = {selectedActivity}
        openForm = {handleOpenForm}
        closeForm = {handleCloseForm}
        editMode = {editMode}
        submitForm = {handleSubmitForm}
        deleteActivity = {handleDeleteActivity}
        />
      </Container>
      <Box></Box>
    </Box>
  )
}

export default App
