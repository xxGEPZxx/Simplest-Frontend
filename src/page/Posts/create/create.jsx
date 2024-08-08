import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Paper,
  Text,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";

import { createPost } from "../../../context/authContext";
import classes from "./create.module.css";
import Navbar from "../../../components/Navbar/Navbar";

export default function CratePost() {
  const [createPostError, setLoginError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function submitCreatePost(title, description) {
    await createPost(title, description)
      .then((response) => {
        console.log(response);
        if (response.status === "success") navigate("/home");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  }

  return (
    <>
      <Navbar />
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Registra un Post
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Registra un post para que otros usuarios puedan verlo
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            placeholder="Your title"
            required
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            placeholder="Your description"
            required
            mt="md"
          />

          {createPostError && (
            <Group mt="sm" justify="center">
              <Text c="red" size="sm">
                {createPostError}
              </Text>
            </Group>
          )}

          <Button
            fullWidth
            mt="xl"
            onClick={() => submitCreatePost(title, description)}
          >
            Registra tu post
          </Button>
        </Paper>
      </Container>
    </>
  );
}
