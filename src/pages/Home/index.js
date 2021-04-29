import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, View, Text } from "react-native";
import * as Location from "expo-location";

import api, { key } from "../../services/api";

import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Conditions from "../../components/Conditions";
import Forecast from "../../components/Forecast";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: "cloud", color: "#fff" });
  const [background, setBackground] = useState(["#1ed6ff", "#97c1ff"]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Permissão negada para acessar localização.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await api.get(
        `/weather?key=${key}&lat=${latitude}&lon=${longitude}`
      );

      setWeather(response.data);

      if (response.data.results.currently === "noite") {
        setBackground(["#0c3741", "#0f2f61"]);
      }

      switch (response.data.results.condition_slug) {
        case "clear_day":
          setIcon({ name: "partly-sunny", color: "#ffb300" });
          break;
        case ("rain", "storm"):
          setIcon({ name: "rainy", color: "#fff" });
          break;
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text styled={{ fontSize: 17, fontStyle: "italic" }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu />

      <Header background={background} weather={weather} icon={icon} />

      <Conditions weather={weather} />

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
        data={weather.results.forecast}
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
    paddingTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0ff",
  },

  list: {
    marginTop: 10,
    marginLeft: 10,
  },
});
