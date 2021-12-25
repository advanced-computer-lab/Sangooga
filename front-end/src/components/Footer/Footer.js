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
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Flight Reservation System &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
