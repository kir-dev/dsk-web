'use client';

import { useState } from 'react';
import { EquipmentEntity } from '@/types/equipmentEntity';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function Equipment({
  equipment,
  isRentable = false,
}: Readonly<{ equipment: EquipmentEntity; isRentable?: boolean }>) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitRental = async () => {
    if (!startTime || !endTime) {
      alert('Please fill in both start and end times');
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      alert('End time must be after start time');
      return;
    }

    try {
      setLoading(true);
      // TODO: Call API to create rental request
      // const response = await fetch('/api/rentals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     equipmentId: equipment.id,
      //     startTime,
      //     endTime,
      //   }),
      // });

      console.log('Rental request submitted:', { equipment: equipment.name, startTime, endTime });
      alert('Rental request submitted successfully!');
      setOpen(false);
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Failed to submit rental request:', error);
      alert('Failed to submit rental request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-500 px-[2dvw] py-[2dvh]'>
      <div className='flex items-center justify-between gap-2'>
        <h2 className='text-xl font-bold'>{equipment.name}</h2>
        {isRentable && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button>Request Rental</Button>
            </PopoverTrigger>
            <PopoverContent className='w-96'>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold text-gray-900'>Request Rental</h3>
                  <p className='text-sm text-gray-600'>{equipment.name}</p>
                </div>

                <div className='space-y-3'>
                  <div>
                    <label htmlFor='start-time' className='block text-sm font-medium text-gray-700'>
                      Start Time
                    </label>
                    <input
                      id='start-time'
                      type='datetime-local'
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div>
                    <label htmlFor='end-time' className='block text-sm font-medium text-gray-700'>
                      End Time
                    </label>
                    <input
                      id='end-time'
                      type='datetime-local'
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                    />
                  </div>
                </div>

                <div className='flex gap-2 pt-2'>
                  <Button
                    onClick={handleSubmitRental}
                    disabled={loading}
                    className='flex-1 bg-blue-600 text-white hover:bg-blue-700'
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </Button>
                  <Button onClick={() => setOpen(false)} variant='outline' className='flex-1'>
                    Cancel
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
