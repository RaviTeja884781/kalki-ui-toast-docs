import { cva } from 'class-variance-authority';

export const boxVariants = cva('block', {
  variants: {
    display: {
      block: 'block',
      flex: 'flex',
      inline: 'inline',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      normal: 'shadow',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
      inner: 'shadow-inner',
    },
    rounded: {
      true: 'rounded-lg',
      false: '',
    },
    outlined: {
      true: 'border border-gray-300',
      false: '',
    },
    flexDirection: {
      row: 'flex-row',
      column: 'flex-col',
    },
    flexWrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
    },
    justifyContent: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    alignItems: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
    alignContent: {
      start: 'content-start',
      center: 'content-center',
      end: 'content-end',
    },

    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      4: 'gap-4',
      8: 'gap-8',
      12: 'gap-12',
    },
  },
  defaultVariants: {
    display: 'block',
    shadow: 'none',
    rounded: false,
    outlined: false,
    gap: 0,
  },
});
