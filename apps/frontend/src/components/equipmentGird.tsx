import { EquipmentEntity } from '@/types/equipmentEntity';
import { Equipment } from '@/components/equipment';

export function EquipmentGird({
  equipment,
  isRentable,
}: Readonly<{ equipment: EquipmentEntity[]; isRentable: boolean }>) {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {equipment?.map((item, index) => <Equipment key={index} equipment={item} isRentable={isRentable} />)}
    </div>
  );
}
