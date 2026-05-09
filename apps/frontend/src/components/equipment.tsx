import { EquipmentEntity } from '@/types/equipmentEntity';

export function Equipment({ equipment }: { equipment: EquipmentEntity }) {
  return (
    <div className='bg-gray-500 px-[2dvw] py-[2dvh]'>
      <h2 className='text-xl font-bold'>{equipment.name}</h2>
    </div>
  );
}
