import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  Paper,
  Text,
  Title,
  Container,
  Group,
  Button,
  SimpleGrid,
} from "@mantine/core";

import { updatePost } from "../../../context/authContext";
import classes from "./update.module.css";
import Navbar from "../../../components/Navbar/Navbar";

export default function UpdatePost() {
  const [createPostError, setLoginError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const { post } = location.state;

  async function submitUpdatePost(title, description) {
    await updatePost(
      post.idPost,
      !title ? post.title : title,
      !description ? post.description : description
    )
      .then(() => {
        navigate("/post/user");
      })
      .catch((error) => {
        setLoginError(error.response.data.message);
      });
  }

  return (
    <>
      <Navbar />
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Actualiza tu post
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            placeholder={`Titulo anterior: ${post.title}`}
            required
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            placeholder={`Descripción anterior: ${post.description}`}
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
          <SimpleGrid cols={2}>
            <Button
              className={classes.buttonRegresar}
              mt="xl"
              onClick={() => navigate("/post/user")}
            >
              Regresar
            </Button>
            <Button
              fullWidth
              mt="xl"
              onClick={() => submitUpdatePost(title, description)}
            >
              Actualizar Post
            </Button>
          </SimpleGrid>
        </Paper>
      </Container>
    </>
  );
}
