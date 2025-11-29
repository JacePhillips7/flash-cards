import "../global.css";
import { Drawer } from "expo-router/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
    </Drawer>
  );
}
