import { cn } from '@/lib/utils';

export function News({ newsObj }: { newsObj: { title: string; content: string } }) {
  return (
    <div className={'bg-gray-500 px-[2dvw] py-[2dvh]'}>
      <h1>{newsObj.title}</h1>
      <p>{newsObj.content}</p>
    </div>
  );
}
