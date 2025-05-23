import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../types';
import DropdownComponent from './Dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Modificar'>;

export default function MotoChange({ route, navigation }: Props) {
  const { moto } = route.params;

  const [modelo, setModelo] = useState(moto.modelo);
  const [placa, setPlaca] = useState(moto.placa);
  const [mensagem, setMensagem] = useState('');
  const [estilo, setEstilo] = useState<"red" | "#008c30">("#008c30");

  useEffect(() => {
    setModelo(moto.modelo);
    setPlaca(moto.placa);
  }, [moto]);

  const salvar = async () => {
    try {
      if (modelo.trim() === '' || placa.trim() === '') {
        setMensagem("Por favor preencha todos os campos");
        setEstilo("red");
        return;
      }

      const armazenadas = await AsyncStorage.getItem("motos");
      const lista: Moto[] = armazenadas ? JSON.parse(armazenadas) : [];

      const index = lista.findIndex(m => m.id === moto.id);
      if (index === -1) {
        setMensagem("Moto não encontrada");
        setEstilo("red");
        return;
      }

      const placaExistente = lista.find(m => m.placa === placa && m.id !== moto.id);
      if (placaExistente) {
        setMensagem("Outra moto já usa essa placa");
        setEstilo("red");
        return;
      }

      lista[index] = { id: moto.id, modelo, placa };

      await AsyncStorage.setItem("motos", JSON.stringify(lista));
      setMensagem("Moto atualizada com sucesso!");
      setEstilo("#008c30");

    } catch (error) {
      setMensagem("Erro ao atualizar a moto: " + error);
      setEstilo("red");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontFamily: 'Quicksand_700Bold', fontSize: 24 }}>Editar Moto</Text>
      <View style={{ padding: 9 }}>
        <Text style={{ fontFamily: 'Quicksand_400Regular', fontSize: 18, marginBottom: 4 }}>Id: {moto.id}</Text>
        <DropdownComponent value={modelo} onChange={setModelo} />
        <TextInput
          placeholder="ABC1234"
          value={placa}
          onChangeText={setPlaca}
          style={{
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginTop: 8
          }}
        />
        <Text style={{ fontFamily: 'Quicksand_400Regular', fontSize: 16, color: estilo, padding: 10 }}>
          {mensagem}
        </Text>
        <Button
          color="#008c30"
          title="Salvar Alterações"
          onPress={async () => {
            await salvar();
            navigation.navigate('Motos');
          }}
        />
      </View>
    </View>
  );
}
