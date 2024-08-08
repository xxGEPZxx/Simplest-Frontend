import { Card, Container, Text, Group, Button, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import api from "../../../api/api";
import Navbar from "../../../components/Navbar/Navbar";
import classes from "./profile.module.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const [dateBirth, setDateBirth] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("authToken")
          )}`,
        },
      });
      setUser(response.data.data);
      setDateBirth(response.data.data.dateBirth);
    };
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Container size={420} my={40}>
        <Card withBorder padding="xl" radius="md" className={classes.card}>
          <Title ta="center">Perfil</Title>
          <Text ta="center" fz="md" mt="sm">
            Nombre: {user.name}
          </Text>
          <Text ta="center" fz="sm" mt="sm">
            Apellido: {user.lastName}
          </Text>
          <Group mt="md" justify="center" gap={30}>
            Correo: {user.email}
          </Group>
          <Group mt="md" justify="center" gap={30}>
            <Text ta="center" fz="sm">
              Fecha de nacimiento: {dateBirth.substring(0, 10)}
            </Text>
          </Group>

        </Card>
      </Container>
    </>
  );
}
