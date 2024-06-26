import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "./lib/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  console.log(isAdmin);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)/menu"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
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
