import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import Products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { onAddItem } = useCart();
  const router = useRouter();

  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const product = Products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    onAddItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Stack.Screen
        options={{
          // title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>Title: {product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
