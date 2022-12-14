import React, { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInAnonymously = async () => {
    const { user } = await auth().signInAnonymously();
  };

  const handleCreateUserAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso!"))
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          return Alert.alert("Email não disponivel");
        }

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Email inválido");
        }

        if (error.code === "auth/weak-password") {
          return Alert.alert("pelo menos 6 digitos");
        }
      });
  };

  const handleCreateEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          Alert.alert("Usuario não encontrado");
        }
      });
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleCreateEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
