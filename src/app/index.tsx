import {
  BottomSheet,
  Button,
  Goals,
  Header,
  Input,
  Transactions,
} from "@/components";
import { GoalsType } from "@/components/goals/goals.type";
import { TransactionType } from "@/components/transactions/transactions.type";
import { useGoalRepository, useTransactionRepository } from "@/hooks";
import Bottom from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Keyboard, View } from "react-native";

export default function Home() {
  const { create, listAll, deleteGoalById } = useGoalRepository();
  const { findLatest } = useTransactionRepository();

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
    router.navigate(`/details/${id}`);
  }

  async function fetchGoals() {
    try {
      const response = listAll();

      setGoals(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTransactions() {
    try {
      const res = findLatest();

      setTransactions(
        res.map((i) => ({
          ...i,
          date: dayjs(i.created_at).format("DD/MM/YYYY [às] HH:mm"),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreate() {
    try {
      const totalAsNumber = Number(total.toString().replace(",", "."));
      if (isNaN(totalAsNumber)) return Alert.alert("Erro", "Valor inválido.");

      create({ name, total: totalAsNumber });

      Keyboard.dismiss();
      handleBottomSheetClose();
      Alert.alert("Sucesso", "Meta cadastrada!");

      setName("");
      setTotal("");

      fetchGoals();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar.");
      console.log(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const idAsNumber = Number(id);
      if (isNaN(idAsNumber)) return Alert.alert("Erro", "Valor inválido.");

      deleteGoalById(idAsNumber);
      fetchGoals();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir.");
      console.log(error);
    }
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
        onDeleteGoal={handleDelete}
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
