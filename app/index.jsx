import { View, Text, TouchableHighlight, Pressable } from "react-native";
import React from "react";
import "../global.css";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();
  return (
    <View
      className="flex-1 items-center justify-center h-screen
     bg-[#ccff33] px-[1rem]"
    >
      <Pressable
        className="border-[1px] border-[#000000] bg-black shadow-md 
      shadow-[#000000] rounded-md w-full p-[10px] "
        onPress={() => router.push("/(tabs)")}
      >
        <Text className="text-[1.3rem] text-center text-white font-[700]">Go to Tab Navigation</Text>
      </Pressable>
    </View>
  );
};

export default HomePage;
