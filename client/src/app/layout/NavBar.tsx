import { AppBar, Box, Button, Container, Toolbar, Typography, ListItem } from "@mui/material";
import Group from "@mui/icons-material/Group";

type Props = {
  openForm : () => void;
}
export default function NavBar({openForm}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            
            <Box>
              <ListItem sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4">Reactivities</Typography>
              </ListItem>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Activities
              </Button>
              <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                About
              </Button>
              <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Context
              </Button>
            </Box>

            <Button onClick={openForm} size="large" variant="contained" color="warning">
              Create activity
            </Button>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
