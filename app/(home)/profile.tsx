import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import UploadBackgroundImage from "../../components/uploadBackgroundImage";
import { router } from "expo-router";
import useStore from "../hooks/useStore";
import UploadImage from "../../components/CImagePicker";
import { IMAGE_DIVIDER } from "../../constants/utils";
import UserReviewCard from "../../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import useAuth from "../hooks/useAuth";


const Profile: React.FC = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <UploadBackgroundImage />
      <View
        style={{
          marginTop: Dimensions.get("window").height / IMAGE_DIVIDER - 70,
        }}
      >
        <UploadImage setImage={setImage} image={image} />
      </View>
      <Text style={styles.username}>Rabin Lamichhane</Text>
      <Text style={styles.email}>rabin@gmail.com</Text>
      <CustomButton
        title="Logout"
        onPress={logout}// Changed from onPress to onClick
        style={{
          marginLeft: Dimensions.get("window").height / IMAGE_DIVIDER - 70,
          top: -20,

        }}

      />
      <ScrollView className="w-full my-5" style={{ marginTop: 0 }}>
        <UserReviewCard
          rating={5}
          reviewText={
            "I had an amazing experience with the tourist guide. They were very knowledgeable and showed me all the hidden gems of the city. I highly recommend their services to anyone looking for a memorable and insightful tour."
          }
          username={"Atul Tiwari"}
          avatar={"https://i.pravatar.cc/300"}
        />
        <UserReviewCard
          rating={3.5}
          reviewText={
            "I had an amazing experience with the tourist guide. They were very knowledgeable and showed me all the hidden gems of the city. I highly recommend their services to anyone looking for a memorable and insightful tour."
          }
          username={"Anuj Paudel"}
          avatar={"https://i.pravatar.cc/400"}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    paddingTop: 50,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "black",
    position: "absolute",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 30,
    top: 35,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    top: -4,
    fontSize: 25,
    color: "black",
  },
  username: {
    position: "absolute",
    paddingTop: Dimensions.get("window").height / 2.6 - 100,
    fontSize: 20,
    color: "white",
  },
  email: {
    position: "absolute",
    paddingTop: Dimensions.get("window").height / 2.6 - 70,
    fontSize: 13,
    color: "white",
  },
});

export default Profile;
