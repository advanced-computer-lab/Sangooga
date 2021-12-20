import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <Box
        px={{ xs: 1, sm: 5 }}
        py={{ xs: 3, sm: 5 }}
        bgcolor="text.primary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box> beep boop</Box>
              <Box>
                <Link href="/" color="inherit">
                  beep boop
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  beep boop
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>Messages</Box>
              <Box>
                <Link href="/" color="inherit">
                  beep boop
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  beep boop
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  beep boop
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Flight Reservation System &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
