import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';

type PostInfoProps = {
  dateTime: string;
  url: string;
  title: string;
  as: 'h1' | 'h2';
  children: React.ReactNode;
};

export function PostInfo({
  dateTime,
  url,
  title,
  as = 'h2',
  children,
}: PostInfoProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <PostDate dateTime={dateTime} />
      <PostHeading as={as} url={url}>
        {title}
      </PostHeading>
      <p>{children}</p>
    </div>
  );
}
