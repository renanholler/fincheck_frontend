import { useState } from 'react';
import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts';

export function useFiltersModalController() {
  const { accounts } = useBankAccounts();
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prev) =>
      prev === bankAccountId ? undefined : bankAccountId,
    );
  }

  function handleSelectYear(step: number) {
    setSelectedYear((prev) => prev + step);
  }

  return {
    accounts,
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleSelectYear,
  };
}
