import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const LayoutPage = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#ccff33",
          borderBottomColor: "#000000",
          borderBottomWidth: 1,
        },
        tabBarStyle: {
          backgroundColor: 'black', 
          borderTopColor: "#ccff33", 
          borderTopWidth: 2, 
        },
        tabBarActiveTintColor: "#ccff33",
        tabBarInactiveTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default LayoutPage;
