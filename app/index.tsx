import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../global.css";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Deck</CardTitle>
          <CardDescription>Create a new deck of flash cards</CardDescription>
        </CardHeader>
      </Card>
    </View>
  );
}
