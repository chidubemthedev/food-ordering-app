import Button from "@/components/Button";
import CartListItem from "@/components/CartListItem";
import { useCart } from "@/providers/CartProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, Text, View } from "react-native";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />

      <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "600" }}>
        Total: ${total}
      </Text>

      <View style={{ marginTop: "auto" }}>
        <Button text="Checkout" />
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
