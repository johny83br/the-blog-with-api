import clsx from 'clsx';

export default function HomePage() {
  return (
    <div>
      <h1
        className={clsx(
          'text-xl',
          'font-bold',
          'text-blue-500',
          'hover:bg-blue-500',
          'hover:text-white',
          'transition',
        )}
      >
        Home page
      </h1>
    </div>
  );
}
