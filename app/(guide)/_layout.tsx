import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { StyleSheet, Text } from "react-native";
import { View } from "../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
import useAuth from "../hooks/useAuth";

export default function AppLayout() {
  const { logout } = useAuth();
  const config = {};
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight(props) {
            return (
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <View className="w-10 h-10 bg-slate-200 rounded-full mr-5 justify-center items-center overflow-hidden">
                  <Entypo
                    name="user"
                    size={30}
                    color="white"
                    style={{ transform: [{ translateY: 5 }] }}
                  />
                </View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerRight(props) {
            return (
              <TouchableOpacity onPress={() => logout()}>
                <View className="w-10 h-10 bg-slate-100 rounded-full mr-5 justify-center items-center overflow-hidden">
                  <AntDesign name="logout" size={20} color="gray" />
                </View>
              </TouchableOpacity>
            );
          },
          title: "Profile",
          tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
          ...config,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
