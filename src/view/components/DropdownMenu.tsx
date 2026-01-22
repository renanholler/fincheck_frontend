import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../app/utils/cn';

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger asChild className="cursor-pointer outline-none">
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuContent({
  children,
  className = '',
}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'bg-white rounded-2xl p-2 space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50',
          'data-[side=bottom]:animate-slide-down-and-fade',
          'data-[side=top]:animate-slide-up-and-fade',
          className,
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

function DropdownMenuItem({
  children,
  className = '',
  onSelect,
}: DropdownMenuItemProps) {
  return (
    // prettier-ignore
    <RdxDropdownMenu.Item 
      onSelect={onSelect}
      className={cn(
        "min-h-[40px] outline-none flex items-center px-4 py-2 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

export {
  DropdownMenuRoot as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
};
