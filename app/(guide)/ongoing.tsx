import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useJwtToken } from "../globalStore/globalStore";
import MapsComponent from "../../components/mapsComponent";
import useGuideUserSocketStore from "../globalStore/guideSocketStore";

const OnGoing = () => {
  const [data, setData] = useState<any>();
  const { jwtToken } = useJwtToken();
  const { data: render } = useGuideUserSocketStore();

  useEffect(() => {
    async function getOnGoing() {
      try {
        const res = await fetch(
          "https://api.localg.biz/api/user/ongoing-tours/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (res.status !== 200) {
          console.log("error");
          return;
        }

        const data1 = await res.json();
        if (data1.status === "success") {
          setData(data1.tour);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }

    getOnGoing();
  }, [render]);

  return (
    <View style={{ height: Dimensions.get("window").height - 130 }}>
      <View style={{ flex: 1 }}>
        <MapsComponent />
      </View>
      {data && <Card data={data} />}
    </View>
  );
};

const Card = ({ data }) => {
  return (
    <View style={[styles.card, { marginTop: 10 }]}>
      <Text style={styles.text}>Location: {data.locations[0].name}</Text>
      <Text style={styles.text}>Status: {data.status}</Text>
      <Text style={styles.text}>Price: {data.price}</Text>
      <Text style={styles.text}>Duration: {data.duration}</Text>
      <Text style={styles.text}>No. of People: {data.no_of_people}</Text>
      <Text style={styles.text}>
        Travel Coverage: {data.travel_coverage ? "Yes" : "No"}
      </Text>
      <Text style={styles.text}>
        Food Coverage: {data.food_coverage ? "Yes" : "No"}
      </Text>
      <Text style={styles.text}>Personal Request: {data.personal_request}</Text>
      <Text style={styles.text}>Tourist: {data.tourist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default OnGoing;
