import { useCallback, useState } from 'react';

import { DashboardContext } from './DashboardContext';
import type { BankAccount } from '../../../../../app/entities/BankAccount';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((account: BankAccount) => {
    setIsEditAccountModalOpen(true);
    setAccountBeingEdited(account);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdited(null);
  }, []);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        isNewAccountModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
        openEditAccountModal,
        closeEditAccountModal,
        isEditAccountModalOpen,
        accountBeingEdited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
