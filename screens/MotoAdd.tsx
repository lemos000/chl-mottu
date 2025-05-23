import React, { Component, useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Moto } from "../types";
import DropdownComponent from "./Dropdown";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export default function MotoAdd({ navigation }: Props) {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [estilo, setEstilo] = useState<"red" | "#008c30">("#008c30");
  const [id, setId] = useState<number>(0);

  const getNextMotoId = async (): Promise<number> => {
    const armazenadas = await AsyncStorage.getItem("motos");
    const lista: Moto[] = armazenadas ? JSON.parse(armazenadas) : [];
    if (lista.length === 0) return 1;
    const ids = lista.map((m) => m.id);
    return Math.max(...ids) + 1;
  };

  const motoJaExiste = (lista: Moto[], placa: string): boolean => {
    return lista.some((m) => m.placa === placa);
  };

  const salvar = async () => {
    try {
      if (modelo !== "" && placa !== "") {
        const armazenadas = await AsyncStorage.getItem("motos");
        const lista: Moto[] = armazenadas ? JSON.parse(armazenadas) : [];
        if (motoJaExiste(lista, placa)) {
          setMensagem("Moto já existe");
          setEstilo("red");
          return;
        }
        const novoId = await getNextMotoId();
        const novaMoto: Moto = { id: novoId, modelo, placa };
        lista.push(novaMoto);
        await AsyncStorage.setItem("motos", JSON.stringify(lista));
        setModelo("");
        setPlaca("");
        setMensagem("Moto adicionada com sucesso");
        setEstilo("#008c30");
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigation.navigate("Home");
      } else {
        setMensagem("Por favor preencha os dados");
        setEstilo("red");
      }
    } catch (error) {
      alert("Erro ao salvar a moto: " + error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontFamily: "Quicksand_700Bold" }}>
        Cadastro de Moto
      </Text>
      <View style={{ padding: 9 }}>
        <DropdownComponent
          value={modelo}
          onChange={setModelo}
        ></DropdownComponent>
        <TextInput
          placeholder="ABC1234"
          placeholderTextColor={"#cacaca"}
          value={placa}
          onChangeText={setPlaca}
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginTop: 8,
          }}
        />
        <Text
          style={{
            color: estilo,
            padding: 10,
            fontFamily: "Quicksand_400Regular",
            fontSize: 16,
          }}
        >
          {mensagem}
        </Text>
        <View
          style={{
            gap: 10,
          }}>
        <Button
          color="#008c30"
          title="Salvar Moto"
          onPress={async () => {
            await salvar();
          }}
        />
        
        <Button
          color="#008c30"
          title="Voltar"
          onPress={() => navigation.navigate("Home")}
        ></Button>
        </View>
      </View>
    </View>
  );
}
