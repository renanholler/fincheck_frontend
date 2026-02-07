import { Modal } from '../../../../components/Modal';
import { useNewTransactionModalController } from './useNewTransactionModalController';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Button } from '../../../../components/Button';
import { Controller } from 'react-hook-form';

export function NewTransactionModal() {
  const {
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
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova despesa' : 'Nova receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor da {isExpense ? 'despesa' : 'receita'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
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
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
            error={errors.name?.message}
            {...register('name')}
          />
          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                className="-mt-1"
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map((account) => ({
                  label: account.name,
                  value: account.id,
                }))}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                className="-mt-1"
                error={errors.date?.message}
                value={value}
                onChange={onChange}
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
