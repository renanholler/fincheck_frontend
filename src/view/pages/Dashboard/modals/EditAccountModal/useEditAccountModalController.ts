import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useState } from 'react';

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number().nonnegative('Saldo inicial não pode ser negativo'),
  ]),
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountsService.update,
    onSuccess: () => {
      toast.success('Conta atualizada com sucesso');
      closeEditAccountModal();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
    onError: () => {
      toast.error('Erro ao salvar as alterações');
    },
  });

  const { isPending: isRemoving, mutateAsync: removeAccount } = useMutation({
    mutationFn: bankAccountsService.remove,
    onSuccess: () => {
      toast.success('Conta excluída com sucesso');
      closeEditAccountModal();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
    onError: () => {
      toast.error('Erro ao excluir conta');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await updateAccount({
      ...data,
      initialBalance: currencyStringToNumber(data.initialBalance),
      id: accountBeingEdited!.id,
    });
  });

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteModal = () => {
    setIsDeleteModalOpen(false);
    removeAccount(accountBeingEdited!.id);
  };

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
    register,
    handleSubmit,
    errors,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDeleteModal,
    isRemoving,
  };
}
