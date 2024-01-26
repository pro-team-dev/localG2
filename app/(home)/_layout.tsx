import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { Alert, StyleSheet, Text } from "react-native";
import { View } from "../../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
import useUserSocketStore from "../globalStore/websocketStore";
import useAuth from "../hooks/useAuth";
import { useJwtToken } from "../globalStore/globalStore";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const config = {};
  const { connectWebSocket, data, disconnectWebSocket } = useUserSocketStore();
  const { user, logout } = useAuth();
  const { jwtToken } = useJwtToken();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      let data = await fetch(`https://api.localg.biz/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      let result = await data.json();
      if (result.errors) {
        Alert.alert(result.errors.code);
        logout();
        return;
      }
      connectWebSocket(result.id);
    };
    getUserInfo();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (data && count > 0) {
      setShowNotification(true);
      setCount(1);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <>
      {showNotification && (
        <View
          style={{
            backgroundColor: "rgb(100,150,100)",
            position: "absolute",
            right: 0,
            top: 0,
            padding: 10,
            zIndex: 1,
          }}
        >
          <Text style={{ color: "white" }}>You have Notifications</Text>
        </View>
      )}
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
            title: "LocalG",
            tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
            headerRight() {
              return (
                <TouchableOpacity
                  onPress={() => router.replace("/(home)/profile")}
                >
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
          }}
        />
        <Tabs.Screen
          name="maps"
          options={{
            title: "Maps",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            tabBarItemStyle: { display: "none" },
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="offers"
          options={{
            title: "Offers",
            tabBarIcon: () => (
              <MaterialIcons name="pending-actions" size={24} color="black" />
            ),
            ...config,
          }}
        />
        <Tabs.Screen
          name="ongoing"
          options={{
            title: "Ongoing",
            tabBarIcon: () => (
              <MaterialIcons name="tour" size={24} color="black" />
            ),
            ...config,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="book/index"
          options={{
            title: "Guide",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            headerShown: false,
            tabBarItemStyle: { display: "none" },
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="book/locationView"
          options={{
            title: "Guide",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            headerShown: false,
            tabBarItemStyle: { display: "none" },
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="book/bookingArea"
          options={{
            title: "Guide",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            headerShown: false,
            tabBarItemStyle: { display: "none" },
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="book/reachOuts"
          options={{
            title: "Guide",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            headerShown: false,
            tabBarItemStyle: { display: "none" },
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="book/matches"
          options={{
            title: "Guide",
            tabBarIcon: () => <AntDesign name="API" size={24} color="black" />,
            ...config,
            headerShown: false,
            tabBarItemStyle: { display: "none" },
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({});
