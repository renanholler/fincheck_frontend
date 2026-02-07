import { createContext } from 'react';
import type { BankAccount } from '../../../../../app/entities/BankAccount';

export interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  isNewAccountModalOpen: boolean;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  openEditAccountModal: (account: BankAccount) => void;
  closeEditAccountModal: () => void;
  accountBeingEdited: BankAccount | null;
  isEditAccountModalOpen: boolean;
}

export const DashboardContext = createContext({} as DashboardContextValue);
