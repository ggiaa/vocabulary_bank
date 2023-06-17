import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Icon,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

function List() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  return (
    <Box sx={{ height: "100%" }}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Vocabulary List</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => setModalOpen(true)}
            >
              Learn Now
            </Button>
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mt={2} sx={{ height: "75vh", overflow: "auto" }}>
            {[1, 1, 1, 1, , 1, 1, 1, 1].map((data) => {
              return (
                <>
                  <Box paddingY={1}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography fontWeight={600} fontSize="14px">
                        Sleep
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="#6b6b6b">
                      not awake
                    </Typography>
                    <Typography variant="body2" color="#6b6b6b">
                      • he is sleeping right now
                    </Typography>
                    <Typography variant="body2" color="#6b6b6b">
                      • he is sleeping right now
                    </Typography>
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* MODAL */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalContent(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setModalContent(true)}
              >
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  Sleep
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                  {modalContent ? "ada" : ""}
                </Typography>
              </Box>
              <Box mt={7} display="flex">
                <Button variant="outlined" sx={{ width: "50%" }} color="error">
                  Not Learn Yet
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: "50%" }}
                  color="primary"
                >
                  I Know
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default List;
