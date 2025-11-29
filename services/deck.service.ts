import { createAsyncStorage } from "@react-native-async-storage/async-storage";

export interface IDeck {
  name: string;
  desc: string;
  cards: ICard[];
}

export interface ICard {
  question: string;
  answer: string;
  type: ICardType;
}

export type ICardType = "multi-choice";
const storage = createAsyncStorage("deck-store");

export async function createDeck(name: string, desc: string) {
  const deck: IDeck = {
    name,
    desc,
    cards: [],
  };
  await storage.setItem(name, JSON.stringify(deck));
}
export async function saveDeck(name: IDeck["name"], deck: IDeck) {
  await storage.setItem(name, JSON.stringify(deck));
}
export async function deleteDeck(name: string) {
  await storage.removeItem(name);
}
export async function getAllDecks(): Promise<string[]> {
  let keys = await storage.getAllKeys();
  return keys;
}
export async function getDeck(name: IDeck["name"]): Promise<IDeck> {
  let d = await storage.getItem(name);
  if (!d) throw new Error("Deck does not exist");
  return JSON.parse(d) as IDeck;
}
export async function getCards(name: IDeck["name"]): Promise<ICard[]> {
  let d = await storage.getItem(name);
  if (!d) {
    return [];
  }
  let deck: IDeck = JSON.parse(d);
  return deck.cards;
}
export async function upsertCard(d: IDeck["name"], card: ICard) {
  let deck = await getDeck(d);
  let cards = deck.cards;
  //see if question already exists
  if (cards.map((ca) => ca.question).includes(card.question)) {
    let i = cards.findIndex((ca) => {
      return ca.question === card.question;
    });
    deck.cards[i] = card;
  } else {
    deck.cards.push(card);
  }
  saveDeck(d, deck);
}
export async function deleteCard(
  d: IDeck["name"],
  question: ICard["question"],
) {
  let deck = await getDeck(d);
  let index = deck.cards.findIndex((c) => {
    return c.question === question;
  });
  deck.cards.splice(index, 1);
  await saveDeck(deck.name, deck);
}
