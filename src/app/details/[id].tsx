import { useEffect, useRef, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Bottom from "@gorhom/bottom-sheet";

import { DetailsType } from "./details.type";
import {
  BackButton,
  BottomSheet,
  Button,
  Header,
  Input,
  Loading,
  Progress,
  TransactionSelect,
  Transactions,
} from "@/components";
import { useGoalRepository, useTransactionRepository } from "@/hooks";
import { currencyFormat } from "@/utils";
import dayjs from "dayjs";

export default function Details() {
  const routeParams = useLocalSearchParams();
  const { get } = useGoalRepository();
  const { create, findByGoaldId } = useTransactionRepository();

  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<"up" | "down">("up");
  const [goal, setGoal] = useState({} as DetailsType);
  const bottomSheetRef = useRef<Bottom>(null);

  const goalId = Number(routeParams.id);

  function handleBottomSheetOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleBottomSheetClose() {
    bottomSheetRef.current?.snapToIndex(0);
  }

  function fetchDetails() {
    try {
      if (goalId) {
        const goal = get(goalId);
        const transactions = findByGoaldId(goalId);

        if (!goal || !transactions) {
          return router.back();
        }

        setGoal({
          name: goal.name,
          current: currencyFormat(goal.current),
          total: currencyFormat(goal.total),
          percentage: (goal.current / goal.total) * 100,
          transactions: transactions.map((i) => ({
            ...i,
            date: dayjs(i.created_at).format("DD/MM/YYYY [às] HH:mm"),
          })),
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNewTransaction() {
    try {
      let amountAsNumber = Number(amount.replace(",", "."));
      if (isNaN(amountAsNumber)) return Alert.alert("Erro", "Valor inválido.");

      if (type === "down") {
        amountAsNumber = amountAsNumber * -1;
      }

      create({ amount: amountAsNumber, goalId });

      Alert.alert("Sucesso", "Transação registrada!");

      handleBottomSheetClose();
      Keyboard.dismiss();
      setAmount("");
      setType("up");

      fetchDetails();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar.");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 p-8 pt-12">
      <BackButton />

      <Header title={goal.name} subtitle={`${goal.current} de ${goal.total}`} />

      <Progress percentage={goal.percentage} />

      <Transactions transactions={goal.transactions} />

      <Button title="Nova transação" onPress={handleBottomSheetOpen} />

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova transação"
        snapPoints={[0.01, 284]}
        onClose={handleBottomSheetClose}
      >
        <TransactionSelect onChange={setType} selected={type} />

        <Input
          placeholder="Valor"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
        />

        <Button title="Confirmar" onPress={handleNewTransaction} />
      </BottomSheet>
    </View>
  );
}
