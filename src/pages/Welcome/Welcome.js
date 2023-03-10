import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { styles } from "./Welcome.style";
import Icon from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuth } from "../Auth/GoogleAuth";
function Welcome({ navigation }) {
  function handleLogin() {
    navigation.navigate("LoginScreen");
  }
  function handleRegister() {
    navigation.navigate("RegisterScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <View style={styles.btn}>
        <Button title="Giriş Yap" onPress={handleLogin} />
      </View>
      <View style={styles.btn}>
        <Button title="Kayıt Ol" onPress={handleRegister} />
      </View>
      <View style={styles.btn}>
        <Button title="Google ile Giriş" theme="primary" onPress={GoogleAuth} />
      </View>
    </View>
  );
}

export default Welcome;
