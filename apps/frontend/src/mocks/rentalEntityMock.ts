import { RentalEntity } from '@/types/rentalEntity';

export const rentalEntityMock: RentalEntity[] = [
  {
    id: '1',
    startTime: '2026-05-09T10:00:00',
    endTime: '2026-05-09T12:00:00',
    status: 'APPROVED',
    user: { name: 'John Doe' },
    issuer: { name: 'Admin' },
    receiver: { name: 'John Doe' },
  },
  {
    id: '2',
    startTime: '2026-05-10T14:00:00',
    endTime: '2026-05-10T16:30:00',
    status: 'SUBMITTED',
    user: { name: 'Jane Smith' },
    issuer: { name: 'Admin' },
    receiver: { name: 'Jane Smith' },
  },
  {
    id: '3',
    startTime: '2026-05-11T09:00:00',
    endTime: '2026-05-11T11:00:00',
    status: 'APPROVED',
    user: { name: 'Bob Johnson' },
    issuer: { name: 'Admin' },
    receiver: { name: 'Bob Johnson' },
  },
];

