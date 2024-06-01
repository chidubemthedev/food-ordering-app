import ProductListItem from "@/components/ProductListItem";
import Products from "@assets/data/products";
import { FlatList, StyleSheet } from "react-native";

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
