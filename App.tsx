
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ListaMotos from './screens/ListaMotos';
import DetalheMoto from './screens/DetalheMoto';
import PreferenciasScreen from './screens/Preferencias';
import { Moto } from './types';
import MotoAdd from './screens/MotoAdd';
import { Image } from 'react-native';
import MotoChange from './screens/MotoChange';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

  



export type RootStackParamList = {
  Home: { refresh: boolean } | undefined;
  Cadastro: undefined;
  Motos: undefined;
  Detalhe: { moto: Moto };
  Preferencias: undefined;
  Modificar: { moto: Moto };
};



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold
    

  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false}} name="Cadastro" component={MotoAdd} />
        <Stack.Screen  options={{ headerShown: false}} name="Motos" component={ListaMotos} />
        <Stack.Screen  options={{ headerShown: false}} name="Modificar" component={MotoChange} />
        <Stack.Screen options={{ headerShown: false}} name="Detalhe" component={DetalheMoto} />
        <Stack.Screen  options={{ headerShown: false}} name="Preferencias" component={PreferenciasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



