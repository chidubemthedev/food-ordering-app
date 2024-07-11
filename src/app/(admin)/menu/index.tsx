import { useProductList } from "@/api/products";
import ProductListItem from "@/components/ProductListItem";
import Products from "@assets/data/products";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to get products.</Text>;
  }
  return (
    <FlatList
      data={products}
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
