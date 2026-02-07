import { Modal } from '../../../../components/Modal';
import { useNewAccountModalController } from './useNewAccountModalController';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { Button } from '../../../../components/Button';
import { Controller } from 'react-hook-form';

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    handleSubmit,
    errors,
    control,
    isPending,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
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
              defaultValue="0"
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
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
