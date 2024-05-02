import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});
type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    const { description, price, category, type } = data;

    await createTransaction({
      description,
      price,
      category,
      type,
    });

    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <Dialog.Title>Nova Transação</Dialog.Title>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register("description")}
            />
            <input
              type="number"
              placeholder="Preço"
              step={0.01}
              required
              {...register("price", { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register("category")}
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TypeButton $variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TypeButton>

                  <TypeButton $variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TypeButton>
                </TransactionType>
              )}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
};
