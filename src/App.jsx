import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import BoardInfo from "./components/BoardInfo";
import AddEditForm from "./components/AddEditForm";
import List from "./components/List";

function App() {
  const [count, setCount] = useState(0);

  return (
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
  );
}

export default App;
