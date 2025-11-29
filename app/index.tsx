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
import { Text, View } from "react-native";
import "../global.css";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createDeck, getAllDecks } from "@/services/deck.service";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
interface ICreateDeck {
  name: string;
  desc: string;
}

export default function Index() {
  const [decks, setDecks] = useState<string[]>([]);
  const setAllDecks = async function () {
    let d = await getAllDecks();
    setDecks(d);
  };
  useEffect(() => {
    setAllDecks();
  }, []);
  function handleNewDeck(value: ICreateDeck) {
    console.log("new deck:", value);
    createDeck(value.name, value.desc);
    setAllDecks();
  }
  return (
    <View className="flex-1 justify-center items-center">
      <CreateDeckButton submit={handleNewDeck} />
      <Text>You have {decks.length} decks</Text>
    </View>
  );
}

// Create Deck button
function CreateDeckButton({ submit }: { submit: (d: ICreateDeck) => void }) {
  const defaultDeck = { name: "", desc: "" };
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm({
    defaultValues: defaultDeck,
    onSubmit: ({ value }) => {
      let d: ICreateDeck = {
        name: value.name,
        desc: value.desc,
      };
      submit(d);
      setOpen(false);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
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
