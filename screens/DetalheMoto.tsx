import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhe">;

const deletarMoto = (id: number) => {
  AsyncStorage.getItem("motos").then((data) => {
    if (data) {
      const motos = JSON.parse(data);
      const novasMotos = motos.filter((m: any) => m.id !== id);
      AsyncStorage.setItem("motos", JSON.stringify(novasMotos));
    }
  });
};

export default function DetalheMoto({ navigation, route }: Props) {
  const { moto } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Moto</Text>
      <Text style={styles.label}>
        Id: <Text style={styles.value}>{moto.id}</Text>
      </Text>
      <Text style={styles.label}>
        Modelo: <Text style={styles.value}>{moto.modelo}</Text>
      </Text>
      <Text style={styles.label}>
        Placa: <Text style={styles.value}>{moto.placa}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Modificar"
          color="#008c30"
          onPress={() => navigation.navigate("Modificar", { moto })}
        />
        <Button
          title="Deletar"
          color="#008c30"
          onPress={() => setModalVisible(true)}
        />
        <Button color="#008c30" title="Voltar" onPress={() => navigation.navigate('Motos')} />
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 16, fontFamily: "Quicksand_700Bold"}}>Deseja realmente deletar?</Text>
            <View style={{flexDirection: "row", gap: 8}}>
          <Button
            title="Sim"
            color="#d32f2f"
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("Motos");
              deletarMoto(moto.id);
            }}
          />
          <View style={{ height: 8 }} />
          <Button
            title="Não"
            color="#008c30"
            onPress={() => setModalVisible(false)}
          />
          </View>
      	  </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 28,
    marginBottom: 24,
    color: "#222",
    textAlign: "center",
  },
  label: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 20,
    marginBottom: 12,
    color: "#444",
  },
  value: {
    fontFamily: "Quicksand_400Regular",
    color: "#008c30",
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 250,
    margin: 3

  },
});
