import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { locationType } from "../guide";
import { useLocationStore } from "../../globalStore/locationStore";
import LanguageSelector from "../../../components/CDropDownCustom";
import DateTime from "../../../components/DateTime";

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
  const data = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
  ];

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
          <View>
            {locationStore.locations.map((item) => (
              <LocationCard key={item.id} item={item} />
            ))}
          </View>
          <View className="mt-5">
            <View className="bg-gray-300 p-4 rounded-md gap-3">
              <View className="flex-row items-center">
                <Text>No of People:</Text>
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
              <View className="flex-row items-center justify-between">
                <Text>Language</Text>
                <LanguageSelector
                  setSelectedLanguages={setSelectedLanguages}
                  selectedLanguages={selectedLanguages}
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Text>Search DeadLine</Text>
                <DateTime />
              </View>
            </View>
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
