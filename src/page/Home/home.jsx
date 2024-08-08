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
import { Link } from "react-router-dom";

import api from "../../api/api";
import classes from "./home.module.css";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      const response = await api.get("/post");
      setPost(response.data.data);
    };
    getAllPost();
  }, []);

  return (
    <>
      <Navbar />
      {post.length === 0 && (
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
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Home;
