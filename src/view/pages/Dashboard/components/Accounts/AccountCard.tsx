import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useDashboard } from '../DashboardContext/useDashboard';
import { cn } from '../../../../../app/utils/cn';
import type { BankAccount } from '../../../../../app/entities/BankAccount';

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, name, currentBalance, type } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  return (
    <div
      className="bg-white rounded-2xl p-4 h-[200px] flex flex-col justify-between border-b-4 border-teal-950 cursor-pointer"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] block',
            !areValuesVisible && 'blur-sm',
          )}
        >
          {formatCurrency(currentBalance ?? 0)}
        </span>
        <small className="text-gray-600 text-sm block">Saldo atual</small>
      </div>
    </div>
  );
}
