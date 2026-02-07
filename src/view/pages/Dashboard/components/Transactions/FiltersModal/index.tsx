import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Modal } from '../../../../../components/Modal';
import { Button } from '../../../../../components/Button';
import { useFiltersModalController } from './useFiltersModalController';
import { cn } from '../../../../../../app/utils/cn';

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    bankAccountId: string | undefined;
    year: number;
  }) => void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    accounts,
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleSelectYear,
  } = useFiltersModalController();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div className="text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">Conta</span>
        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              className={cn(
                'p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors',
                selectedBankAccountId === account.id && '!bg-gray-200',
              )}
              onClick={() => handleSelectBankAccount(account.id)}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">Ano</span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleSelectYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center text-sm font-medium tracking-[-0.5px]">
            <span>{selectedYear}</span>
          </div>
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleSelectYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Button
        className="mt-10 w-full"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
