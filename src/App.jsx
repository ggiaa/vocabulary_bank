import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { createContext, useState } from "react";
import BoardInfo from "./components/BoardInfo";
import AddEditForm from "./components/AddEditForm";
import List from "./components/List";

export const vocabularyContext = createContext();
function App() {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <vocabularyContext.Provider
      value={{ vocabularies, setVocabularies, loading, setLoading }}
    >
      <Container sx={{ width: "75%" }}>
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          <Grid item xs={5}>
            <BoardInfo />
            <AddEditForm />
          </Grid>
          <Grid item xs={7}>
            <List />
          </Grid>
        </Grid>
      </Container>
    </vocabularyContext.Provider>
  );
}

export default App;
