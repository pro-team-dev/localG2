import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import type { locationType } from "../book";
import { useLocationStore } from "../../globalStore/locationStore";
import LanguageSelector from "../../../components/CDropDownCustom";
import CustomButton from "../../../components/CustomButton";

interface CustomHeaderProps {
  onBackPress: () => void;
}
const CustomHeader: React.FC<CustomHeaderProps> = ({ onBackPress }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
      paddingTop: StatusBar.currentHeight + 10,
    }}
  >
    <TouchableOpacity onPress={onBackPress}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
    <Text className="text-xl mr-auto ml-auto">Guide Search</Text>
  </View>
);
const BookingArea = () => {
  const locationStore = useLocationStore();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [selected, setSelected] = useState(undefined);

  return (
    <View>
      <CustomHeader
        onBackPress={() => {
          router.replace("/book/");
        }}
      />
      <View className="p-4">
        <View>
          <Text className="text-xl mb-5">Destinations</Text>
          <View style={{ gap: 10, flexDirection: "row", marginBottom: 20 }}>
            {locationStore.locations.map((item) => (
              <LocationCard key={item.id} item={item} />
            ))}
          </View>
          <View className="mt-5">
            <View
              style={{
                backgroundColor: "rgb(230,230,230)",
                padding: 16,
                borderRadius: 10,
                gap: 10,
              }}
            >
              <View
                className="flex-row items-center"
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: "rgba(200,200,200,0.7)",
                }}
              >
                <Text className="text-lg">No of People:</Text>
                <TextInput
                  keyboardType="number-pad"
                  style={{
                    marginLeft: "auto",
                    width: 50,
                    borderRadius: 10,
                    backgroundColor: "rgb(230,230,230)",
                    textAlign: "center",
                  }}
                  value="0"
                />
              </View>
              <View
                className="flex-row items-center justify-between"
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: "rgba(200,200,200,0.7)",
                }}
              >
                <Text className="text-lg">Language</Text>
                <LanguageSelector
                  setSelectedLanguages={setSelectedLanguages}
                  selectedLanguages={selectedLanguages}
                />
              </View>
              <View
                className="flex-row items-center justify-between"
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: "rgba(200,200,200,0.7)",
                }}
              >
                <Text className="text-lg">Travel Coverage</Text>
                <Switch />
              </View>
              <View
                className="flex-row items-center justify-between"
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: "rgba(200,200,200,0.7)",
                }}
              >
                <Text className="text-lg">Food Coverage</Text>
                <Switch />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg">Lodging Coverage</Text>
                <Switch />
              </View>
            </View>
          </View>
          <View>
            <CustomButton
              title="Search"
              style={{ marginTop: 20, marginLeft: "auto" }}
              onPress={() => {
                router.push("/(home)/maps");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const LocationCard = (props: { item: locationType }) => {
  const { item } = props;
  return (
    <View className="w-28 items-center gap-2">
      <View className="w-20 h-20 rounded-md bg-gray-200"></View>
      <Text className="text-center">{item.text.split(",")[0]}</Text>
    </View>
  );
};

export default BookingArea;
