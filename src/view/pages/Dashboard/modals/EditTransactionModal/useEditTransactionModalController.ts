import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo, useState } from 'react';
import type { Transaction } from '../../../../../app/entities/Transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import toast from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Valor é obrigatório'),
    z.number().nonnegative('Valor não pode ser negativo'),
  ]),
  name: z.string().min(1, 'Nome é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  bankAccountId: z.string().min(1, 'Conta é obrigatória'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: transaction?.value,
      name: transaction?.name,
      categoryId: transaction?.categoryId,
      bankAccountId: transaction?.bankAccountId,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: transactionsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Transação atualizada com sucesso');
      onClose();
    },
    onError: () => {
      toast.error('Erro ao atualizar transação');
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isPending: isRemoving, mutateAsync: removeTransaction } = useMutation(
    {
      mutationFn: transactionsService.remove,
      onSuccess: () => {
        toast.success('Transação excluída com sucesso');
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
        onClose();
      },
      onError: () => {
        toast.error('Erro ao excluir transação');
      },
    },
  );

  const handleConfirmDeleteModal = () => {
    removeTransaction(transaction!.id);
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = hookFormSubmit(async (data) => {
    await updateTransaction({
      ...data,
      id: transaction!.id,
      type: transaction!.type,
      value: currencyStringToNumber(data.value),
      date: data.date.toISOString(),
    });
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDeleteModal,
    isRemoving,
  };
}
