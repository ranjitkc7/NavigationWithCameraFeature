import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

const ProfilePage = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission to access microphone is required.");
        }
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access microphone is required.");
        }
      }
    };

    requestPermissions();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true, 
      });

      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingObject.startAsync();
      setRecording(recordingObject);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };
  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
      setRecording(null);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  const playRecording = async () => {
    try {
      if (!recordingUri) return;

      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.error("Failed to play recording:", err);
    }
  };

  const speak = () => {
    Speech.speak("Hello, Ranjit");
  };

  return (
    <View className="flex-1 items-center justify-start bg-slate-100 p-[1rem]">
      <View>
        <TouchableOpacity
          className="h-[5rem] w-[5rem] bg-black rounded-full items-center justify-center"
          onPress={speak}
        >
          <FontAwesome size={40} name="microphone" color={"#ccff33"} />
        </TouchableOpacity>
      </View>
      <View className="h-[15rem] mt-[1rem] w-full bg-pink-300 items-center justify-center">
        <TouchableOpacity
          className="py-3 w-full bg-black rounded-md items-center justify-center"
          onPress={recording ? stopRecording : startRecording}
        >
          <Text className="text-white text-[1.3rem]">
            {recording ? "Stop Recording" : "Start Recording"}
          </Text>
        </TouchableOpacity>

        {recordingUri && (
          <TouchableOpacity
            className="py-3 mt-[1rem] w-full bg-black rounded-md items-center justify-center"
            onPress={playRecording}
          >
            <Text className="text-white text-[1.3rem]">Play Recording</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfilePage;
