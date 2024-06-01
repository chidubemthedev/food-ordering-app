import OrderItemList from "@/components/OrderList";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const order = orders.find((order) => order.id.toString() === id);

  console.log(order);

  if (!order) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: order.id.toString() }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        numColumns={1}
        contentContainerStyle={styles.container}
        bounces={true}
        renderItem={({ item }) => <OrderItemList item={item} />}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
});
