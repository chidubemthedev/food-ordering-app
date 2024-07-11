import { supabase } from "@/app/lib/supabase";
import ProductListItem from "@/components/ProductListItem";
import Products from "@assets/data/products";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function MenuScreen() {
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        console.log("error", error);
      }
      if (data) {
        console.log(data);
      }
    };

    fetchProducts();
  }, []);

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
