import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
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

export default function Details() {
  const routeParams = useLocalSearchParams();

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
    console.log("fetchDetails");
  }

  async function handleNewTransaction() {
    console.log("handleNewTransaction");
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
