import clsx from 'clsx';

type ButtonVariants = 'default' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx(
      'bg-blue-500',
      'text-white',
      'hover:bg-blue-600',
      'disabled:bg-blue-300',
    ),
    ghost: clsx(
      'bg-slate-200',
      'text-slate-500',
      'hover:bg-slate-300',
      'disabled:hover:bg-slate-200',
      'disabled:text-slate-400',
    ),
    danger: clsx(
      'bg-red-500',
      'text-white',
      'hover:bg-red-600',
      'disabled:bg-red-300',
    ),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      'text-sm/tight',
      'px-2',
      'py-1',
      'rounded-sm',
      '[&_svg]:w-3 [&_svg]:h-3 gap-1',
    ),
    md: clsx(
      'text-md/tight',
      'px-4',
      'py-2',
      'rounded-md',
      '[&_svg]:w-4 [&_svg]:h-4 gap-2',
    ),
    lg: clsx(
      'text-lg/tight',
      'px-6',
      'py-4',
      'rounded-lg',
      '[&_svg]:w-5 [&_svg]:h-5 gap-4',
    ),
  };

  const buttonClass = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    clsx(
      'font-medium focus:outline-none',
      'flex items-center justify-center',
      'cursor-pointer',
      'disabled:cursor-not-allowed',
      props.className,
    ),
  );

  return <button {...props} className={buttonClass} />;
}
