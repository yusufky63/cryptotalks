/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-undef */

import React from 'react';
import { styles } from "./Register.style";
import { View, Text } from "react-native";
import Input from '../../components/Input';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';

import { ErrorShowMessage } from '../../utils/ErrorShowMessage';
import ErrorMessage from '../../utils/ErrorMessages';
import { Formik } from "formik";

function Register({ navigation }) {
  function handleLogin() {
    navigation.navigate('LoginScreen');
  }

  function goChatRooms() {
    navigation.navigate('ChatRoomsScreen');
  }

  const initialValues = {
    email: '',
    password: '',
    repassword: '',
  };
  const handleFormSubmit = async (values) => {
    if (
      values.email == '' ||
      values.password == '' ||
      values.repassword == '' ||
      values.password != values.repassword
    ) {
      ErrorShowMessage(
        'Parolanız eşleşmiyor veya boş alan bırakmayınız.',
        'warning'
      );
      return;
    }
    try {
      await auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(() => {
          ErrorShowMessage('Kayıt Başarılı.', 'success');
          goChatRooms();
        })
        .catch((error) => {
          ErrorShowMessage(ErrorMessage(error.code), 'danger');
        });
    } catch (error) {
      ErrorShowMessage(ErrorMessage(error.code), 'danger');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ handleChange, handleSubmit, values }) => (
          <>
            <Input
              value={values.email}
              placeholder={"Email"}
              onChangeText={handleChange("email")}
              secureTextEntry={false}
            />
            <Input
              value={values.password}
              placeholder={"Şifre"}
              onChangeText={handleChange("password")}
              secureTextEntry={true}
            />
            <Input
              value={values.repassword}
              placeholder={'Tekrar Şifre'}
              onChangeText={handleChange("repassword")}
              secureTextEntry={true}
            />
            <Button title="Kayıt Ol" onPress={handleSubmit} theme="primary" />
          </>
        )}
      </Formik>
      <Button title={'Giriş Yap'} onPress={handleLogin} />
    </View>
  );
}

export default Register;
