import { Image, KeyboardAvoidingView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import UploadImage from "../components/CImagePicker";
import InputWithLogo from "../components/InputWithLogo";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import { useStore } from "zustand";
import { useRegisterUser } from "./globalStore/globalStore";
import Colors from "../constants/Colors";
import { CheckBox } from "react-native-btr";
export default function Modal() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [citizenShipNo, setCitizenShipNo] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { signin } = useAuth();
  const userData = useRegisterUser((state) => state);

  const [checked, setChecked] = useState(false);

  const handleRegister = () => {
    if (firstname === "" || lastname === "" || citizenShipNo === "") {
      alert("Please fill in all fields");
      return;
    }
    if (image == null) {
      alert("Please upload profile picture");
      return;
    }
    signin(userData.username, "password");
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <View>
        <Image
          className="absolute -top-[290px] -left-[250px]"
          source={require("../assets/images/registerVector.jpg")}
        />
      </View>
      <View className={"p-4 mt-auto mb-auto mx-5"}>
        <UploadImage image={image} setImage={setImage} />
        <InputWithLogo
          logo="user"
          value={firstname}
          onChangeText={(text) => setFirstName(text)}
          placeholder="FirstName"
        />
        <InputWithLogo
          logo="user"
          value={lastname}
          onChangeText={(text) => setLastName(text)}
          placeholder="LastName"
        />
        <InputWithLogo
          logo="unlock"
          value={citizenShipNo}
          onChangeText={(text) => setCitizenShipNo(text)}
          placeholder="CitizenShip"
        />
        <View className="flex-row justify-center mt-5">
          <View className="w-5 rounded-md mb-5 mr-5">
            <CheckBox
              checked={checked}
              onPress={() => setChecked(!checked)}
              color={Colors.primary.btn}
            />
          </View>
          <Text>I read & agree to the</Text>
          <Text className="text-blue-500 font-bold ml-1">
            terms & conditions
          </Text>
        </View>

        <CustomButton
          title="Create Account"
          onPress={handleRegister}
          disabled={!checked}
          style={{ width: "100%", alignSelf: "flex-end", borderRadius: 40 }}
        />
        <CustomButton
          title="Previous"
          onPress={() => router.push("/signup")}
          style={{ width: "100%", marginTop: 10, borderRadius: 40 }}
        />

        <View className="flex-row items-center mb-10 gap-3 justify-center mt-5">
          <Text className={"text-sm"}>Already have an account?</Text>
          <Link className="text-blue-500 font-bold" href={"/login"}>
            Login
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
