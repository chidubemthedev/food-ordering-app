import ProductListItem from "@/components/ProductListItem";
import { FlatList, StyleSheet, View } from "react-native";
import Products from "@assets/data/products";

export default function MenuScreen() {
  return (
    <FlatList
      data={Products}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{ gap: 10 }}
      bounces={true}
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});
