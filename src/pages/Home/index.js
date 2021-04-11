import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";

import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Conditions from "../../components/Conditions";
import Forecast from "../../components/Forecast";

const myList = [
  {
    date: "10/04",
    weekday: "Sáb",
    max: 26,
    min: 15,
    description: "Ensolarado",
    condition: "clear_day",
  },
  {
    date: "11/04",
    weekday: "Dom",
    max: 27,
    min: 14,
    description: "Ensolarado",
    condition: "clear_day",
  },
  {
    date: "12/04",
    weekday: "Seg",
    max: 28,
    min: 16,
    description: "Parcialmente nublado",
    condition: "cloudly_day",
  },
  {
    date: "13/04",
    weekday: "Ter",
    max: 19,
    min: 16,
    description: "Trovoadas dispersas",
    condition: "storm",
  },
  {
    date: "14/04",
    weekday: "Qua",
    max: 20,
    min: 15,
    description: "Tempo nublado",
    condition: "cloud",
  },
  {
    date: "15/04",
    weekday: "Qui",
    max: 23,
    min: 15,
    description: "Tempo nublado",
    condition: "cloud",
  },
  {
    date: "16/04",
    weekday: "Sex",
    max: 23,
    min: 15,
    description: "Tempo nublado",
    condition: "cloud",
  },
  {
    date: "17/04",
    weekday: "Sáb",
    max: 21,
    min: 16,
    description: "Tempestades isoladas",
    condition: "storm",
  },
  {
    date: "18/04",
    weekday: "Dom",
    max: 21,
    min: 16,
    description: "Tempestades isoladas",
    condition: "storm",
  },
  {
    date: "19/04",
    weekday: "Seg",
    max: 20,
    min: 16,
    description: "Tempestades isoladas",
    condition: "storm",
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header />
      <Conditions />

      <FlatList
        horizontal
        style={styles.list}
        data={myList}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
        contentContainerStyle={{ paddingBottom: "5%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0ff",
  },

  list: {
    marginTop: 10,
    marginLeft: 10,
  },
});
