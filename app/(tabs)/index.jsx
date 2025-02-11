import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, Text, TouchableOpacity, View, Image } from "react-native";
import "../../global.css";
import { Feather, FontAwesome } from "@expo/vector-icons";

const HomePageFile = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [captureImage, setCaptureImage] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-[1.3rem] text-center text-black font-[700]">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCaptureImage(photo.uri);
        }
      } catch (err) {
        console.error("Error taking photo", err);
      }
    }
  };

  return (
    <View className="flex-1 justify-center relative">
      {!captureImage ? (
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
          <View className="flex-1 absolute bottom-0 left-[1rem] bg-transparent flex-row">
            <TouchableOpacity
              className=" items-center justify-center mb-[1rem] h-[4rem] w-[4rem] 
            bg-[#ffffff] rounded-[50%] "
              onPress={toggleCameraFacing}
            >
              <Feather name="rotate-cw" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 absolute bottom-0 left-[11.3rem] bg-transparent flex-row">
            <TouchableOpacity
              className=" items-center justify-center mb-[1rem] h-[4rem] w-[4rem] 
            bg-[#ffffff] rounded-[50%] "
              onPress={takePicture}
            >
              <FontAwesome name="camera" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image
            source={{ uri: captureImage }}
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            className="absolute bottom-[2rem] bg-[#000000] px-4 py-2 rounded-full"
            onPress={() => setCaptureImage(null)}
          >
            <Text className="text-white text-lg">Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomePageFile;
