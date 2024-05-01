import { Container, Content, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export const Header = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </Content>
    </Container>
  );
};
