import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import { FlatList, StyleSheet } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={orders}
      numColumns={1}
      contentContainerStyle={styles.container}
      bounces={true}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});
