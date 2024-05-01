import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { Card, Container } from "./styles";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";

export const Summary = () => {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acumulator, transaction) => {
      if (transaction.type === "income") {
        acumulator.income += transaction.price;
        acumulator.total += transaction.price;
      } else {
        acumulator.outcome += transaction.price;
        acumulator.total -= transaction.price;
      }

      return acumulator;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <Card>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </Card>

      <Card>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </Card>

      <Card $variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </Card>
    </Container>
  );
};
