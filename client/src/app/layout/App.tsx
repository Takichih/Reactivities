import {CssBaseline, Container, Box} from "@mui/material"
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import { Outlet } from "react-router"

function App() {

  return (
    <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar/>
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <Outlet />
      </Container>
      <Box></Box>
    </Box>
  )
}

export default App
