import { ExitIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from './DropdownMenu';
import { useAuth } from '../../app/hooks/useAuth';

export function UserMenu() {
  const { signout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100"
        >
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            RH
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-28 mr-8 mt-1">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signout}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
