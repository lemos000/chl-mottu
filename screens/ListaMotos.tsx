import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Moto } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Motos'>;

export default function ListaMotos({ navigation }: Props) {
  const [motos, setMotos] = useState<Moto[]>([]);

  const motosMock = [
    { id: 1, modelo: 'Mottu Pop', placa: 'ABC-1234' },
    { id: 2, modelo: 'Mottu Sport', placa: 'XYZ-5678' },
    { id: 3, modelo: 'Mottu E', placa: 'LMN-9101' },
    { id: 4, modelo: 'Mottu Pop', placa: 'DEF-2345' },
    { id: 5, modelo: 'Mottu Sport', placa: 'GHI-6789' },
    { id: 6, modelo: 'Mottu Sport', placa: 'JKL-3456' },
    { id: 7, modelo: 'Mottu E', placa: 'MNO-7890' },
    { id: 8, modelo: 'Mottu Pop', placa: 'PQR-4567' },
    { id: 9, modelo: 'Mottu Sport', placa: 'STU-8901' },
    { id: 10, modelo: 'Mottu E', placa: 'VWX-2345' },
  ];

  useEffect(() => {
    const carregar = async () => {
      let storedMotos = await AsyncStorage.getItem('motos');
      if (!storedMotos) {
        await AsyncStorage.setItem('motos', JSON.stringify(motosMock));
        storedMotos = JSON.stringify(motosMock); 
      }
      setMotos(JSON.parse(storedMotos));
    };

    carregar();
  }, []);

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontFamily: 'Quicksand_700Bold', fontSize: 24,}}>Lista de Motos</Text>
      {motos.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Quicksand_400Regular', fontSize: 18, marginTop: 16 }}>Nenhuma moto cadastrada :(</Text>
          <Image
            source={{ uri: 'https://media.tenor.com/qZWBLoqn4cgAAAAj/frown-sad.gif' }}
            style={{width: 200, height: 200, marginTop: 16 }}
          />
        </View>
      )}
      <FlatList
        data={motos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalhe', { moto: item })}>
            <Text style={{ fontFamily: 'Quicksand_400Regular', fontSize: 18, borderWidth: 1, marginVertical: 4, padding: 8 }}>
              {item.id}: {item.modelo} - {item.placa}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button color="#008c30" title="Voltar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
