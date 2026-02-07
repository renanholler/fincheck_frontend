import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Valor é obrigatório'),
    z
      .number()
      .nonnegative('Valor não pode ser negativo')
      .gt(0, 'Valor deve ser maior que 0'),
  ]),
  name: z.string().min(1, 'Nome é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  bankAccountId: z.string().min(1, 'Conta é obrigatória'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: '0',
      name: '',
      categoryId: '',
      bankAccountId: '',
      date: new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa criada com sucesso!'
          : 'Receita criada com sucesso!',
      );
      closeNewTransactionModal();
      reset();
    },
    onError: () => {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao criar despesa!'
          : 'Erro ao criar receita!',
      );
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync({
      ...data,
      value: currencyStringToNumber(data.value),
      type: newTransactionType!,
      date: data.date.toISOString(),
    });
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
  };
}
