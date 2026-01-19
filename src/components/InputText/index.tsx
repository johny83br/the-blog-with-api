import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        className={clsx(
          'bg-white outline-0 text-base/tight',
          'ring-2 ring-slate-400 rounded',
          'p-2 transition focus:ring-blue-600',
          'placeholder-slate-300',
          'disabled:bg-slate-100 disabled:ring-slate-200 disabled:placeholder-slate-200 disabled:cursor-not-allowed disabled:text-slate-400',
          'read-only:bg-slate-100 read-only:ring-slate-200 read-only:placeholder-slate-200 read-only:cursor-not-allowed read-only:text-slate-400 read-only:focus:ring-slate-200',
          props.className,
        )}
        id={id}
        {...props}
      />
    </div>
  );
}
