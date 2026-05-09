'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EquipmentGird } from '@/components/equipmentGird';
import { useRef } from 'react';
import { SportEntity } from '@/types/sportEntity';
import { sportEntityMock } from '@/mocks/sportEntityMock';
import { EquipmentEntity } from '@/types/equipmentEntity';
import { equipmentEntityMock } from '@/mocks/equipmentEntityMock';

export default function EquipmentRentalPage() {
  const sports = useRef<SportEntity[] | null>(sportEntityMock);
  const equipment = useRef<EquipmentEntity[] | null>(equipmentEntityMock);
  return (
    <main className={'px-[15dvw] py-[5dvh]'}>
      <div className='px-[5dvw] py-[5dvh] gap-4 bg-gray-400'>
        <div className={'flex pb-[2dvh]'}>
          <div className='flex gap-1'>
            <input type={'text'} placeholder={'Keresés név szerint'} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Minden sport</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {sports.current?.map((sport, index) => (
                    <DropdownMenuItem key={index}>{sport.title}</DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Sorrend</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>ABC sorrend</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex grow justify-end'>
            <Button>Search</Button>
          </div>
        </div>
        <EquipmentGird equipment={equipment.current || []} isRentable={true} />
      </div>
    </main>
  );
}
