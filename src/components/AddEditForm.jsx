import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import * as yup from "yup";
import { red } from "@mui/material/colors";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { vocabularyContext } from "../App";
import { useFormik } from "formik";

const validationSchema = yup.object({
  word: yup.string().required("Insert a word/sentence"),
});
function AddEditForm() {
  const { vocabularies, setVocabularies, loading, setLoading } =
    useContext(vocabularyContext);

  const formik = useFormik({
    initialValues: {
      word: "",
      meaning: "",
      example1: "",
      example2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { resetForm }) => {
      data = {
        ...data,
        created_at: new Date(),
        status: "unlearn",
      };
      await addDoc(collection(db, "vocabularies"), data).then((docRef) => {
        setVocabularies([{ ...data, id: docRef.id }, ...vocabularies]);
      });
      resetForm();
    },
  });

  return (
    <Box mt={2}>
      <Card>
        <CardContent>
          <Typography mb={2}>Form</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "12px" }}
            >
              <Box>
                <TextField
                  name="word"
                  label="Word/Sentence"
                  size="small"
                  value={formik.values.word}
                  onChange={formik.handleChange}
                  error={formik.touched.word && Boolean(formik.errors.word)}
                  helperText={formik.touched.word && formik.errors.word}
                  fullWidth
                />
              </Box>
              <TextField
                name="meaning"
                label="Meaning"
                size="small"
                value={formik.values.meaning}
                onChange={formik.handleChange}
                fullWidth
              />
              <TextField
                name="example1"
                label="Example 1"
                size="small"
                value={formik.values.example1}
                onChange={formik.handleChange}
                fullWidth
              />
              <TextField
                name="example2"
                label="Example 2"
                size="small"
                value={formik.values.example2}
                onChange={formik.handleChange}
                fullWidth
              />
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddEditForm;
