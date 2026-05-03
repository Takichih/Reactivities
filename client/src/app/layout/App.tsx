import {useState } from "react"
import {CssBaseline, Container, Box, Typography } from "@mui/material"
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import {useActivities } from "../../lib/hooks/useActivities"

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false)
  const { activities, isPending } = useActivities();
  
  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id))
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleOpenForm = (id?: string) => {
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

  /*const handleSubmitForm = (activity: Activity) => {

    if (activity.id) 
      setActivities(activities!.map(x => x.id === activity.id ? activity : x))
      } else {
        const newActivity = {...activity, id: activities!.length.toString()}
        setSelectedActivity(newActivity)
        setActivities([...activities, newActivity])
    
    console.log(activity)
    setEditMode(false)
  }*/


  return (
    <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar
        openForm={handleOpenForm}
      />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (<Typography>Loading...</Typography>) :
          (
            <ActivityDashboard
              activities={activities}
              selectActivity={handleSelectedActivity}
              cancelSelectActivity={handleCancelSelectedActivity}
              selectedActivity={selectedActivity}
              openForm={handleOpenForm}
              closeForm={handleCloseForm}
              editMode={editMode}
            />
          )}
      </Container>
      <Box></Box>
    </Box>
  )
}

export default App
