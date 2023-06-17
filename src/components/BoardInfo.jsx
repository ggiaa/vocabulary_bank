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
import React from "react";

function BoardInfo() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container textAlign="center">
            <Grid item xs={4}>
              <Typography fontWeight={600} variant="body2">
                Words
              </Typography>
              <Typography fontWeight={600}>20</Typography>
            </Grid>
            <Grid item xs={4} color={red[600]}>
              <Typography fontWeight={600} variant="body2">
                To Learn
              </Typography>
              <Typography fontWeight={600}>20</Typography>
            </Grid>
            <Grid item xs={4} color={green[600]}>
              <Typography fontWeight={600} variant="body2">
                Learned
              </Typography>
              <Typography fontWeight={600}>20</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BoardInfo;
