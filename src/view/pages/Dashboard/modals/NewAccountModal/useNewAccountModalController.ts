import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: '',
      name: '',
      type: 'CHECKING',
      color: '',
    },
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create,
    onSuccess: () => {
      toast.success('Conta criada com sucesso');
      closeNewAccountModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
    onError: () => {
      toast.error('Erro ao criar conta');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync({
      ...data,
      initialBalance: currencyStringToNumber(data.initialBalance),
    });
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    handleSubmit,
    errors,
    control,
    isPending,
  };
}
