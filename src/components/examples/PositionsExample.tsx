import { useToastStore } from '@/store/useToastPositionStore';
import { ToastPosition, useToast } from '../common/toast';
import { ShoppingCart } from 'lucide-react';
import { SyntaxHighlighter } from '../common/SyntaxHighLighter/SyntaxHighLighter';
import Button, { ButtonIcon, ButtonText } from '../common/Button';

const positions: { label: string; value: ToastPosition; icon: string }[] = [
  { label: 'Top Left', value: 'top-left', icon: '↖️' },
  { label: 'Top Center', value: 'top-center', icon: '⬆️' },
  { label: 'Top Right', value: 'top-right', icon: '↗️' },
  { label: 'Bottom Left', value: 'bottom-left', icon: '↙️' },
  { label: 'Bottom Center', value: 'bottom-center', icon: '⬇️' },
  { label: 'Bottom Right', value: 'bottom-right', icon: '↘️' },
];

const PositionsExample = () => {
  const { position, setPosition } = useToastStore();
  const { addToast } = useToast();

  const positionsToast = (value: ToastPosition) => {
    setPosition(value);
    addToast({
      message: value,
      icon: <ShoppingCart className="w-5 h-5" />,
      variant: 'success',
      autoClose: 3000,
    });
  };

  return (
    <div className="w-full mx-auto ">
      <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Customize Toast Position</h3>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {positions.map(({ label, value, icon }) => (
            <Button
              key={value}
              onClick={() => positionsToast(value)}
              variant={position === value ? 'primary' : 'outline'}
              size={'xs'}
            >
              <ButtonIcon className="mr-2">{icon}</ButtonIcon>
              <ButtonText>{label}</ButtonText>
            </Button>
          ))}
        </div>
        <div className="">
          <SyntaxHighlighter code={`<Toaster\n  position="${position}"\n />`} language="jsx" />
        </div>
      </div>
    </div>
  );
};

export default PositionsExample;
