import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function AddEditForm() {
  return (
    <Box mt={2}>
      <Card>
        <CardContent>
          <Typography mb={2}>Form</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
            <TextField label="Word/Sentence" size="small" fullWidth />
            <TextField label="Meaning" size="small" fullWidth />
            <TextField label="Example 1" size="small" fullWidth />
            <TextField label="Example 2" size="small" fullWidth />
            <Button variant="contained">Save</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddEditForm;
