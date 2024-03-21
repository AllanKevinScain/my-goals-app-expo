import {
  BottomSheet,
  Button,
  Goals,
  Header,
  Input,
  Transactions,
} from "@/components";
import { GoalsType } from "@/components/goals/goals.type";
import { TransactionType } from "@/components/transaction/transaction.type";
import Bottom from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [goals, setGoals] = useState<GoalsType[]>([]);
  const [name, setName] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const bottomSheetRef = useRef<Bottom>(null);

  function handleBottomSheetOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleBottomSheetClose() {
    bottomSheetRef.current?.snapToIndex(0);
  }

  function handleDetails(id: string) {
    console.log("handleDetails", id);
  }

  async function handleCreate() {
    console.log("handleCreate");
  }

  async function fetchGoals() {
    console.log("fetchGoals");
  }

  async function fetchTransactions() {
    console.log("fetchTransactions");
  }

  useEffect(() => {
    fetchGoals();
    fetchTransactions();
  }, []);

  return (
    <View className="flex-1 p-8">
      <Header
        title="Suas metas"
        subtitle="Poupe hoje para colher os frutos amanhã."
      />

      <Goals
        goals={goals}
        onAdd={handleBottomSheetOpen}
        onPress={handleDetails}
      />

      <Transactions transactions={transactions} />

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova meta"
        snapPoints={[0.01, 284]}
        onClose={handleBottomSheetClose}
      >
        <Input placeholder="Nome da meta" onChangeText={setName} value={name} />

        <Input
          placeholder="Valor"
          keyboardType="numeric"
          onChangeText={setTotal}
          value={total}
        />

        <Button title="Criar" onPress={handleCreate} />
      </BottomSheet>
    </View>
  );
}
