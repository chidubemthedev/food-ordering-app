import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "./lib/supabase";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      {/* <Link href={"/(auth)/signin"} asChild>
        <Button text="Get Started" />
      </Link> */}
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(user)/menu"} asChild>
        <Button text="User" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
