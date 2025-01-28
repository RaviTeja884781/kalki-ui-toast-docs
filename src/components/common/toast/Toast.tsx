import { useEffect, useState, forwardRef, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { ToastProps } from './types';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'relative flex items-center w-fit justify-between shadow-lg transition-all duration-500 max-w-[calc(100vw-2rem)]',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-800 border border-gray-300',
        primary: 'bg-blue-50 text-blue-800 border border-blue-200',
        secondary: 'bg-gray-50 text-gray-800 border border-gray-200',
        success: 'bg-green-50 text-green-800 border border-green-200',
        info: 'bg-cyan-50 text-cyan-800 border border-cyan-200',
        warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        danger: 'bg-red-50 text-red-800 border border-red-200',
        help: 'bg-purple-50 text-purple-800 border border-purple-200',
        light: 'bg-gray-50 text-gray-800 border border-gray-200',
        dark: 'bg-gray-800 text-gray-100 border border-gray-700',
      },
      rounded: {
        true: 'rounded-lg',
        false: 'rounded-sm',
      },
      visible: {
        true: 'opacity-100 translate-y-0',
        false: 'opacity-0 translate-y-[-16px]',
      },
      hiding: {
        true: 'opacity-0 scale-95',
        false: 'scale-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: false,
      visible: false,
      hiding: false,
    },
  }
);

export type ToastVariantProps = VariantProps<typeof toastVariants>;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'default',
      message,
      onClose,
      showClose = true,
      autoClose = 5000,
      icon,
      rounded = false,
      className = '',
      style,
      id,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const remainingTimeRef = useRef<number>(typeof autoClose === 'number' ? autoClose : 0);
    const startTimeRef = useRef<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startTimer = () => {
      if (autoClose === false || remainingTimeRef.current <= 0) return;

      startTimeRef.current = Date.now();
      timeoutRef.current = setTimeout(() => {
        setIsHiding(true);
        setTimeout(onClose, 500);
      }, remainingTimeRef.current);
    };

    const pauseTimer = () => {
      if (timeoutRef.current && startTimeRef.current) {
        clearTimeout(timeoutRef.current);
        const elapsedTime = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsedTime);
        startTimeRef.current = null;
      }
    };

    useEffect(() => {
      const showTimeout = setTimeout(() => setIsVisible(true), 100);
      startTimer();

      return () => {
        clearTimeout(showTimeout);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref}
        id={id.toString()}
        className={cn(
          toastVariants({
            variant,
            rounded,
            visible: isVisible,
            hiding: isHiding,
          }),
          className
        )}
        style={style}
        role="alert"
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        {...props}
      >
        <div className="flex items-center gap-3 px-2 py-1 w-full min-w-0">
          {icon && <span className="flex-shrink-0 text-current">{icon}</span>}
          <div className="flex-1 text-sm font-medium break-words">{message}</div>
          {showClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg bg-inherit transition-colors ml-2"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';