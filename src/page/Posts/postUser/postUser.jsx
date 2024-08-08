import {
  Text,
  Title,
  SimpleGrid,
  Container,
  Group,
  Button,
  TypographyStylesProvider,
  Paper,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { postUser, deletePost } from "../../../context/authContext";
import classes from "./postUser.module.css";
import Navbar from "../../../components/Navbar/Navbar";

function PostUser() {
  const [post, setPost] = useState([]);
  const [postError, setPostError] = useState("");
  const [errorPostDelete, setErrorPostDelete] = useState([]);

  const navigator = useNavigate();

  async function submitPostDelete(id) {
    await deletePost(id)
      .then(() => {
        setPost([]);
        postUser()
          .then((response) => {
            setPost(response.data);
          })
          .catch((error) => {
            setPostError(error.response.data.message);
          });
      })
      .catch((error) => {
        if (error.response.data.message === "Post_not_found") {
          setErrorPostDelete([id, "La publicación no existe"]);
        }
      });
  }

  useEffect(() => {
    postUser()
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setPostError(error.response.data.message);
      });
  }, []);

  return (
    <>
      <Navbar />
      {postError && (
        <div className={classes.root}>
          <Container>
            <div className={classes.label}>No existen publicaciones</div>
            <Title className={classes.title}>
              No se han encontrado publicaciones
            </Title>
            <Text size="lg" ta="center" className={classes.description}>
              Parece que no hay publicaciones en la base de datos, intenta
              refrescar la página para ver si hay nuevas publicaciones.
            </Text>
            <Group justify="center">
              <Link to="/post/create">
                <Button color="blue" variant="outline">
                  Crear publicación
                </Button>
              </Link>
            </Group>
          </Container>
        </div>
      )}
      <Container my={40}>
        <SimpleGrid cols={4}>
          {post.map((post, index) => (
            <Paper
              withBorder
              radius="md"
              className={classes.comment}
              key={index}
            >
              <Group>
                <div>
                  <Text fz="sm">
                    {post.user.name} {post.user.lastName}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {post.user.email}
                  </Text>
                </div>
              </Group>
              <Title order={3} mt={8}>
                {post.title}
              </Title>
              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              </TypographyStylesProvider>
              <Container my={5} w={150}>
                <SimpleGrid cols={1}>
                  <Button
                    variant="light"
                    className={classes.buttonEdit}
                    onClick={() => navigator(`/post/update/${post.idPost}`, {
                        state: { post },
                    })}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="filled"
                    color="red"
                    onClick={() => submitPostDelete(post.idPost)}
                  >
                    Eliminar
                  </Button>
                  {errorPostDelete[0] === post.idPost && (
                    <Text c="red" w={150} fz={12} size="sm">
                      {errorPostDelete[1]}
                    </Text>
                  )}
                </SimpleGrid>
              </Container>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default PostUser;
