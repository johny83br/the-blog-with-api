import { PostHeading } from '../PostHeading';

type PostInfoProps = {
  time: string;
  dateTime: string;
  url: string;
  title: string;
  as: 'h1' | 'h2';
  children: React.ReactNode;
};

export function PostInfo({
  time,
  dateTime,
  url,
  title,
  as = 'h2',
  children,
}: PostInfoProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <time className='text-slate-600 block text-sm/tight' title={dateTime}>
        {time}
      </time>
      <PostHeading as={as} url={url}>
        {title}
      </PostHeading>
      <p>{children}</p>
    </div>
  );
}
