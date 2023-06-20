import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useContext } from "react";
import { vocabularyContext } from "../App";

function BoardInfo() {
  const { vocabularies, setVocabularies, loading, setLoading } =
    useContext(vocabularyContext);

  const toLearn = vocabularies.filter((c) => c.status === "unlearn").length;
  const learned = vocabularies.filter((c) => c.status === "learned").length;

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container textAlign="center">
            <Grid item xs={4}>
              <Typography fontWeight={600} variant="body2">
                Words
              </Typography>
              <Typography fontWeight={600}>
                {Object.keys(vocabularies).length}
              </Typography>
            </Grid>
            <Grid item xs={4} color={red[600]}>
              <Typography fontWeight={600} variant="body2">
                To Learn
              </Typography>
              <Typography fontWeight={600}>{toLearn}</Typography>
            </Grid>
            <Grid item xs={4} color={green[600]}>
              <Typography fontWeight={600} variant="body2">
                Learned
              </Typography>
              <Typography fontWeight={600}>{learned}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BoardInfo;
