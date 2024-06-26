import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }
  return <Stack />;
}
