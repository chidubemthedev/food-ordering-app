import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { Product } from "@/types";

export const defaultimage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type Props = {
  product: Product;
};

const ProductListItem = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultimage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 7,
  },
  price: {
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    // height: 100,
    // resizeMode: "contain",
  },
});
