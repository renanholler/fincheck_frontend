import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService';
import type { TransactionsFilters } from '../services/transactionsService/getAll';

export function useTransactions(filters: TransactionsFilters) {
  const {
    data,
    isFetching,
    isLoading: isInitialLoading,
    refetch,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () =>
      transactionsService.getAll({
        month: filters.month,
        year: filters.year,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
      }),
  });

  return { transactions: data ?? [], isFetching, isInitialLoading, refetch };
}
