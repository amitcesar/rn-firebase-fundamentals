import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>();

  const handleGetAllProducts = async () => {
    const subscribe = firestore()
      .collection("products")
      .orderBy("description")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });
    return () => subscribe();
  };

  const handleGetOneProduct = async () => {
    firestore()
      .collection("products")
      .doc("4AR7fTm2I9rM4Rjz8RDT")
      .get()
      .then((response) => {
        console.log({
          id: response.id,
          ...response.data(),
        });
      });
  };

  useEffect(() => {
    handleGetAllProducts();
    // handleGetOneProduct();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
