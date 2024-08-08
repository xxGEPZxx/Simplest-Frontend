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

import { login } from "../../../context/authContext";
import classes from "./signing.module.css";

export default function Signing() {
  const [loginError, setLoginError] = useState(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitLogin(email, password) {
    await login(email, password)
      .then((response) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify(response.data.accessToken)
        );
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.data.message === "Invalid_password")
          setLoginError("Contraseña incorrecta");
        else if (error.response.data.message === "Invalid_password")
          setLoginError("Correo incorrecto");
        else setLoginError("Correo o contraseña incorrectos");
      });
  }
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Bienvenido
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        No tienes una cuenta?{" "}
        <Link to="/signup" className={classes.link}>
          Regístrate aca
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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

        {loginError && (
          <Group mt="sm" justify="center">
            <Text c="red" size="sm">
              {loginError}
            </Text>
          </Group>
        )}

        <Button fullWidth mt="xl" onClick={() => submitLogin(Email, Password)}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
