// write initial react native code

import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import useAuth from "../hooks/useAuth";
import CustomButton from "../../components/CustomButton";
import Seperator from "../../components/seperator";
import { useEffect, useState } from "react";
import { useJwtToken } from "../globalStore/globalStore";

const Guide = () => {
  const [data, setData] = useState<any[]>([]);
  const { jwtToken } = useJwtToken();
  useEffect(() => {
    async function getPending() {
      try {
        const res = await fetch(
          "https://api.localg.biz/api/user/pending-tours/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const data = await res.json();
        if (data.status === "success") {
          setData(data.pending_tours);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPending();
  });
  const { logout } = useAuth();
  return (
    <View>
      <CustomButton onPress={logout} title="Logout" />
      <ScrollView style={{ height: Dimensions.get("window").height - 180 }}>
        {data.length > 0 ? (
          data.map((item) => {
            return <GuideItem item={item} />;
          })
        ) : (
          <Text>No Pending Tours</Text>
        )}
      </ScrollView>
    </View>
  );
};

function GuideItem(props: { item: any }) {
  return (
    <View className="p-4">
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={{ height: 50, width: 50, borderRadius: 100 }}
        />
        <View>
          <Text className="text-xl font-semibold">John Doe</Text>
          <Text className="text-base font-light">
            {props.item.locations.map((item: any, index: number) => {
              return (
                item.name.split(",")[0] +
                (index === props.item.locations.length - 1 ? "" : ", ")
              );
            })}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View className="left">
          <Text className="font-light">
            <Text className="font-medium">Langage: {"         "}</Text> Eng,
            Esp, Nep
          </Text>
          <Text className="font-light">
            <Text className="font-medium">Time: {"               "}</Text> Eng,
            Esp, Nep
          </Text>
          <Text className="font-light">
            <Text className="font-medium">No of People: {"  "}</Text>3
          </Text>
        </View>
        <View className="right">
          <Text className="text-primary-primary-0">Travel Coverage </Text>
          <Text className="text-primary-primary-0">Food Coverage</Text>
        </View>
      </View>
      <View>
        <CustomButton
          title="Reach"
          style={{ marginTop: 10, marginLeft: "auto" }}
        />
      </View>
    </View>
  );
}

export default Guide;
