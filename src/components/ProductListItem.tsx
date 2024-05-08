import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";

type Props = {
  product: any;
};

const ProductListItem = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
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
