import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { View } from "react-native";
import "../global.css";

import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      {CreateDeckButton()}
    </View>
  );
}

// Create Deck button
function CreateDeckButton() {
  const defaultDeck = { name: "", desc: "" };
  const form = useForm({
    defaultValues: defaultDeck,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:bg-slate-200 hover:cursor-pointer">
            <CardHeader>
              <CardTitle>Create Deck</CardTitle>
              <CardDescription>
                Create a new deck of flash cards
              </CardDescription>
            </CardHeader>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <form.Field name="name">
                {(f) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      value={f.state.value}
                      onChange={(e) => {
                        f.handleChange(e.target.value);
                      }}
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="desc">
                {(f) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Input
                      id="desc"
                      type="text"
                      value={f.state.value}
                      onChange={(e) => {
                        f.handleChange(e.target.value);
                      }}
                    />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <Button onClick={form.handleSubmit} type="submit">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
