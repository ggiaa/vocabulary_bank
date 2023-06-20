import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { createContext, useEffect, useState } from "react";
import BoardInfo from "./components/BoardInfo";
import AddEditForm from "./components/AddEditForm";
import List from "./components/List";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./config/firebase";

export const vocabularyContext = createContext();
function App() {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "vocabularies"), orderBy("created_at", "desc"))
      );

      const filteredData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setVocabularies(filteredData);
      setLoading(false);
    };

    getData();
  }, []);

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
