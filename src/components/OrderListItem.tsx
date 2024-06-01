import Colors from "@/constants/Colors";
import { Order, Product } from "@/types";
import { Link, useSegments } from "expo-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export const defaultimage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type Props = {
  order: Order;
};

const OrderListItem = ({ order }: Props) => {
  const segments = useSegments();
  dayjs.extend(relativeTime);

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>Order #{order.id}</Text>
            <Text style={styles.price}>
              {dayjs(order.created_at).fromNow()}
            </Text>
          </View>
          <View>
            <Text style={styles.status}>{order.status}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    // flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  status: {
    fontWeight: "bold",
    color: "gray",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    // height: 100,
  },
});
