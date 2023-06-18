import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { red } from "@mui/material/colors";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import dayjs from "dayjs";

const schema = yup
  .object({
    word: yup.string().required(),
  })
  .required();

function AddEditForm() {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    data = {
      ...data,
      created_at: new Date(),
    };
    await addDoc(collection(db, "vocabularies"), data);

    setVocabularies({ data, ...vocabularies });
    reset({ word: "", meaning: "", example1: "", example2: "" });
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "vocabularies"),
        orderBy("created_at")
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
    <Box mt={2}>
      <Card>
        <CardContent>
          <Typography mb={2}>Form</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
              <Box>
                <TextField
                  {...register("word")}
                  name="word"
                  label="Word/Sentence"
                  size="small"
                  fullWidth
                />
                <Typography variant="body2" sx={{ color: red[600] }}>
                  {errors.word?.message}
                </Typography>
              </Box>
              <TextField
                {...register("meaning")}
                name="meaning"
                label="Meaning"
                size="small"
                fullWidth
              />
              <TextField
                {...register("example1")}
                name="example1"
                label="Example 1"
                size="small"
                fullWidth
              />
              <TextField
                {...register("example2")}
                name="example2"
                label="Example 2"
                size="small"
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
