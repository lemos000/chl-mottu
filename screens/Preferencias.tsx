import React, { useEffect, useState } from "react";
import { View, Text, Switch, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Preferencias">;

export default function PreferenciasScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState("");

  const salvarUsuario = async () => {
    await AsyncStorage.setItem("usuario", usuario);
    navigation.navigate("Home", { refresh: true });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontFamily: "Quicksand_700Bold", fontSize: 24 }}>
        Preferências
      </Text>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 18 }}>
          Nome do Usuário
        </Text>
        <TextInput
          value={usuario}
          onChangeText={setUsuario}
          placeholder="Digite seu nome"
          style={{
            borderWidth: 1,
            padding: 8,
            marginTop: 4,
            marginBottom: 16,
            borderRadius: 4,
            borderColor: "#008c30",
          }}
        />
         <View
          style={{
            gap: 10,
          }}>
        <Button color="#008c30" title="Salvar Nome" onPress={salvarUsuario} />
        <Button
          color="#008c30"
          
          title="Voltar"
          onPress={() => navigation.navigate("Home")}
        />
        </View>
      </View>
    </View>
  );
}
