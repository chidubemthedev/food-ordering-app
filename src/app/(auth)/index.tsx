import { Redirect } from "expo-router";

export default function MenuStack() {
  return <Redirect href={"/(auth)/signin"} />;
}
