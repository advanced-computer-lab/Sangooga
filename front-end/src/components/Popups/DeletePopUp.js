import axios from "axios";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Popup = ({ flight, setOriginalFlights, popupText }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchFlights = async () => {
    const result = await axios("http://localhost:5000/flight");
    setOriginalFlights(result.data);
  };

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/flight/${id}`, { _id: id });
    fetchFlights();
  };

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              size="small"
              onClick={() => {
                onDelete(flight._id);
                handleClose();
              }}
            >
              Delete
            </Button>
            <Button size="small" onClick={handleClose}>
              Go back
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Popup;