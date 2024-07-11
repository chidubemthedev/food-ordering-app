import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button";
import { defaultimage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useInsertProduct } from "@/api/products";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isUpdating = !!id;

  const { data, error, mutate: insertProduct } = useInsertProduct();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = () => {
    onValidate();
    if (errors.length > 0) {
      console.log("Errors", errors);
      return;
    }
    console.log("Update product", name, price);
    setName("");
    setPrice("");
  };

  const onCreate = () => {
    onValidate();
    if (errors.length > 0) {
      console.log("Errors", errors);
      return;
    }
    console.log("Create product", name, price);

    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          setName("");
          setPrice("");
          setImage(null);
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    console.log("Delete product", name, price);
  };

  const onConfirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(),
          style: "destructive",
        },
      ]
    );
    console.log("open modal");
  };

  const onValidate = () => {
    setErrors("");

    if (name.length <= 0) {
      setErrors("Name is required");
    } else if (price.length <= 0) {
      setErrors("Price is required");
    } else if (parseFloat(price) <= 0) {
      setErrors("Price must be greater than 0");
    } else if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
    } else {
      setErrors("");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <Image source={{ uri: image || defaultimage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.selectImage}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {errors.length > 0 && <Text style={{ color: "red" }}>{errors}</Text>}

      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Pressable onPress={onConfirmDelete} style={styles.pressable}>
          <Text style={styles.pressableText}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 0.3,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  selectImage: {
    alignSelf: "center",
    marginVertical: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  pressable: {
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  pressableText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});
