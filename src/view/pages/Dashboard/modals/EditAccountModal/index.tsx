import { Modal } from '../../../../components/Modal';
import { useEditAccountModalController } from './useEditAccountModalController';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { Button } from '../../../../components/Button';
import { Controller } from 'react-hook-form';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
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
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isPending={isRemoving}
        onConfirm={handleConfirmDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    );
  }

  return (
    <Modal
      title="Editar conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo Inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={[
                  { label: 'Conta corrente', value: 'CHECKING' },
                  { label: 'Investimentos', value: 'INVESTMENT' },
                  { label: 'Dinheiro', value: 'CASH' },
                ]}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                className="-mt-1"
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Button className="mt-2" type="submit" isLoading={isPending}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
