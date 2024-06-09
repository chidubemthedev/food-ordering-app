import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(auth)/signin"} asChild>
        <Button text="Get Started" />
      </Link>
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(user)/menu"} asChild>
        <Button text="User" />
      </Link>
    </View>
  );
};

export default index;
