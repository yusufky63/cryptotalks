/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-undef */
import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { styles } from "./Login.style";
import Input from "../../components/Input";

import auth from "@react-native-firebase/auth";
import { Formik } from "formik";

import { ErrorShowMessage } from "../../utils/ErrorShowMessage";
import ErrorMessage from "../../utils/ErrorMessages";

function Login({ navigation }) {

    function goChatRooms() {
        navigation.navigate('ChatRoomsScreen');
    }

    function handleRegister() {
        navigation.navigate("RegisterScreen");
    }
    const initialValues = {
        email: "",
        password: "",
    };
    const handleFormSubmit = async (values) => {
        if (values.email == "" || values.password == "") {
            ErrorShowMessage(
                "Parolanız eşleşmiyor veya boş alan bırakmayınız.",
                "warning"
            );
            return;
        }
        try {
            await auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                    ErrorShowMessage("Giriş Başarılı.", "success");
                    goChatRooms()
                })
                .catch((error) => {
                    ErrorShowMessage(ErrorMessage(error.code), "danger");
                });
        } catch (error) {
            ErrorShowMessage(ErrorMessage(error.code), "danger");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>
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
                        <Button title="Giriş Yap" onPress={handleSubmit} theme="primary" />
                    </>
                )}
            </Formik>
            <Button title={"Kayıt Ol"} onPress={handleRegister} />
        </View>
    );
}

export default Login;
