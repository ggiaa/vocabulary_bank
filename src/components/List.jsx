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
import React, { useContext, useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import SearchIcon from "@mui/icons-material/Search";
import { vocabularyContext } from "../App";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

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
  display: "flex",
  flexDirection: "column",
};

function List() {
  const { vocabularies, setVocabularies, loading, setLoading } =
    useContext(vocabularyContext);

  const [unlearnData, setUnlearnData] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  const filteredVocabularies = vocabularies.filter((vocab) =>
    vocab.word.toLowerCase().includes(searchInput.toLowerCase())
  );

  const needToLearn = () => {
    setUnlearnData(unlearnData.slice(1));
  };

  const learned = async (id) => {
    await updateDoc(doc(db, "vocabularies", id), {
      status: "learned",
    })
      .then(() => setUnlearnData(unlearnData.slice(1)))
      .then(() =>
        setVocabularies(
          vocabularies.filter((vocab) =>
            vocab.id == id ? (vocab.status = "learned") : vocab
          )
        )
      );
  };

  const deleteVocab = async (id) => {
    await deleteDoc(doc(db, "vocabularies", id));
    setVocabularies(vocabularies.filter((vocab) => vocab.id != id));
  };

  useEffect(() => {
    setUnlearnData(vocabularies.filter((vocab) => vocab.status == "unlearn"));
  }, [modalOpen]);

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
              name="search"
              onChange={(e) => setSearchInput(e.target.value)}
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
            {!loading &&
              filteredVocabularies.map((data, i) => {
                return (
                  <Box key={i}>
                    <Box paddingY={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography fontWeight={600} fontSize="14px">
                          {data.word}
                        </Typography>
                        <DeleteIcon
                          fontSize="small"
                          sx={{ cursor: "pointer", color: red[600] }}
                          onClick={() => deleteVocab(data.id)}
                        />
                      </Box>
                      <Typography variant="body2" color="#6b6b6b">
                        {data.meaning}
                      </Typography>

                      <Typography variant="body2" color="#6b6b6b">
                        {data.example1 ? "• " + data.example1 : ""}
                      </Typography>
                      <Typography variant="body2" color="#6b 6b6b">
                        {data.example2 ? "• " + data.example2 : ""}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
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
          {unlearnData.length ? (
            <>
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
                  {unlearnData[0].word}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                  {modalContent ? unlearnData[0].meaning : ""}
                </Typography>
              </Box>
              <Box mt={7} display="flex">
                <Button
                  variant="outlined"
                  sx={{ width: "50%" }}
                  color="error"
                  onClick={needToLearn}
                >
                  Need to Learn
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: "50%" }}
                  color="primary"
                  onClick={() => learned(unlearnData[0].id)}
                >
                  I Know
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: "#dedede" }}
              >
                Empty
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default List;
