import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../global.css";
import { View } from "react-native";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      {createDeckButton()}
    </View>
  );
}
function createDeckButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:bg-slate-200 hover:cursor-pointer">
          <CardHeader>
            <CardTitle>Create Deck</CardTitle>
            <CardDescription>Create a new deck of flash cards</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Deck</DialogTitle>
        </DialogHeader>
        Form goes here
      </DialogContent>
    </Dialog>
  );
}
