import ProductListItem from "@/components/ProductListItem";
import { StyleSheet, View } from "react-native";
import Products from "../../../assets/data/products";

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <ProductListItem product={Products[0]} />
      <ProductListItem product={Products[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
});
