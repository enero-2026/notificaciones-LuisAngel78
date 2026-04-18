import * as Notifications from 'expo-notifications';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [contador, setContador] = useState(0);


  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };
  const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };

  const enviarNotificacion = async (contador) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hola, mundo 🌍",
        body: `El valor de tu contador es ${contador}`,
      },
      trigger: null,
    });
  };
  
  const pedirPermiso = async () => {
    await Notifications.requestPermissionsAsync();
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Notificaciones</Text>

      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <Button title="Enviar notificación" onPress={() => enviarNotificacion(contador)} />
     <Text style={{ fontSize: 20 }}>
        Contador: {contador}
      </Text>
      <Button title="Incrementar" onPress={incrementar} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
