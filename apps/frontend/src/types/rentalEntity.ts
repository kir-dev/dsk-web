export type RentalEntity = {
  id: string;
  startTime: string;
  endTime: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'RETURNED';
  user?: {
    name: string;
  };
  issuer?: {
    name: string;
  };
  receiver?: {
    name: string;
  };
};

