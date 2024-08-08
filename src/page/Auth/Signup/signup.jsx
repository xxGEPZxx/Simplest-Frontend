import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import "@mantine/dates/styles.css";

import { signup } from "../../../context/authContext";
import classes from "./signup.module.css";

export default function Signup() {
  const [loginError, setLoginError] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [dateBirth, setDateBirth] = useState("");

  const navigate = useNavigate();

  async function submitRegister(name, lastName, email, password, dateBirth) {
    await signup(name, lastName, email, password, dateBirth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response.statusCode === 409)
          setLoginError("Correo ya registrado");
        else if (error.response.statusCode === 400)
          setLoginError("Datos incorrectos");
        else setLoginError("Error al registrar");
      });
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Bienvenido
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Ya tienes una cuenta?{" "}
        <Link to="/" className={classes.link}>
          Inicia sesión
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Your name"
          required
        />
        <TextInput
          label="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          placeholder="you@mantine.dev"
          required
        />
        <TextInput
          label="Email"
          value={Email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          label="Password"
          value={Password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Your password"
          required
          mt="md"
        />

        <DatePicker
          mt={25}
          allowDeselect
          value={dateBirth}
          onChange={setDateBirth}
        />

        {loginError && (
          <Group mt="sm" justify="center">
            <Text c="red" size="sm">
              {loginError}
            </Text>
          </Group>
        )}

        <Button
          fullWidth
          mt="xl"
          onClick={() =>
            submitRegister(name, lastName, Email, Password, dateBirth)
          }
        >
          Registrarse
        </Button>
      </Paper>
    </Container>
  );
}
