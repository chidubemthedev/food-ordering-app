import CartListItem from "@/components/CartListItem";
import { useCart } from "@/providers/CartProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, Text, View } from "react-native";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
