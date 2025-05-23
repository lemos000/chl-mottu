import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const value = await AsyncStorage.getItem('usuario');
      if (value) setUser(value);
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/grafite.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Image
          source={{ uri: 'https://mottu.com.br/wp-content/uploads/2022/02/Mottu-grupo-verde-horizontal.png' }}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Bem-vindo, {user || 'usuário'}</Text>
        <Text style={styles.subtitle}>Gestão de Motos</Text>
        <View style={styles.buttonGroup}>
          <Button color="#008c30" title="Cadastrar Moto" onPress={() => navigation.navigate('Cadastro')} />
          <Button color="#008c30" title="Ver Motos" onPress={() => navigation.navigate('Motos')} />
          <Button color="#008c30" title="Preferências" onPress={() => navigation.navigate('Preferencias')} />
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.9,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'rgb(255, 255, 255)',
    margin: 10,
    borderRadius: 20,
    width: 'auto',
  
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Quicksand_400Regular',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Quicksand_400Regular',
  },
  buttonGroup: {
    width: '70%',
    gap: 10,
  },
});
