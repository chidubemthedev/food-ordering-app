import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Account successfully created.");
    }

    setLoading(false);
  };

  const onValidate = () => {
    setErrors("");

    if (email.length <= 0) {
      setErrors("Email is required");
    } else if (password.length <= 0) {
      setErrors("Password is required");
    } else {
      setErrors("");
    }
  };

  const onSubmit = () => {
    onValidate();
    if (errors.length > 0) {
      console.log("Errors", errors);
      return;
    }
    console.log("Sign In", email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="example@gmail.com"
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a password"
        keyboardType="visible-password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errors.length > 0 && <Text style={{ color: "red" }}>{errors}</Text>}

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Loading..." : "Create Account"}
      />

      <Link href="/(auth)/signin" asChild>
        <Text style={styles.pressableText}>Sign In</Text>
      </Link>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 0.3,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  pressableText: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: "auto",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.tint,
    textAlign: "center",
  },
});
