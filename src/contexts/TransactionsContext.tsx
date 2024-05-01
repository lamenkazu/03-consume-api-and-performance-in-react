import { createContext, ReactNode, useEffect, useState } from "react";
import { jsonServerApi } from "../lib/axios";

export const TransactionsContext = createContext({} as TransactionContextType);
interface TransactionsProviderProps {
  children: ReactNode;
}

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const createTransaction = async (data: CreateTransactionInput) => {
    const { category, description, price, type } = data;
    const response = await jsonServerApi.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((prevState) => [response.data, ...prevState]);
  };

  const fetchTransactions = async (query?: string) => {
    const response = await jsonServerApi.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
