import { useEffect, useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import type { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
import type { Transaction } from '../../../../../app/entities/Transaction';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<Transaction | null>(null);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;
      setFilters((prev) => ({
        ...prev,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  const { transactions, isFetching, isInitialLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditTransactionModal(transaction: Transaction) {
    setIsEditTransactionModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditTransactionModal() {
    setIsEditTransactionModalOpen(false);
    setTransactionBeingEdited(null);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading: isFetching,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
    handleApplyFilters,
    isEditTransactionModalOpen,
    transactionBeingEdited,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
  };
}
