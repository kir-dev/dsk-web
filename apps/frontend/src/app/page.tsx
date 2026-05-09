'use client';

import { News } from '@/components/news';
import { useRef } from 'react';
import { newsEntityMock } from '@/mocks/newsEntityMock';
import { NewsEntity } from '@/types/newsEntity';

export default function Home() {
  const newsRef = useRef<NewsEntity[] | null>(newsEntityMock);
  return (
    <main className={'px-[15dvw] py-[5dvh]'}>
      <div className='px-[5dvw] py-[5dvh] flex-col gap-4 flex bg-gray-400'>
        {newsRef.current?.map((newsObj, index) => <News key={index} newsObj={newsObj} />)}
      </div>
    </main>
  );
}
