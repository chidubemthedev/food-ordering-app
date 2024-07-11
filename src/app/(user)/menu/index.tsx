import { supabase } from "@/app/lib/supabase";
import ProductListItem from "@/components/ProductListItem";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

export default function MenuScreen() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

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
