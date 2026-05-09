'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReservationEntity } from '@/types/reservationEntity';
import { reservationEntityMock } from '@/mocks/reservationEntityMock';

const DAYS_OF_WEEK = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
const HOURS = Array.from({ length: 17 }, (_, i) => i + 8); // 8:00 to 24:00
const HOUR_HEIGHT = 60; // pixels per hour

interface ReservationBlock {
  startHour: number;
  startMinute: number;
  duration: number;
  day: number;
}

function parseReservation(reservation: ReservationEntity): ReservationBlock | null {
  const fromMatch = reservation.from.match(/(\d{4})\.(\d{2})\.(\d{2})T:(\d{2}):(\d{2})/);
  const toMatch = reservation.to.match(/(\d{4})\.(\d{2})\.(\d{2})T:(\d{2}):(\d{2})/);

  if (!fromMatch || !toMatch) return null;

  const [, , , fromDay, fromHour, fromMinute] = fromMatch;
  const [, , , toDay, toHour, toMinute] = toMatch;

  if (fromDay !== toDay) return null;

  const dayOfMonth = parseInt(fromDay);
  const startDate = new Date(2026, 4, 9); // May 9, 2026 is Friday (day 5)
  const day = (dayOfMonth - 9 + 5) % 7;

  return {
    startHour: parseInt(fromHour),
    startMinute: parseInt(fromMinute),
    duration: (parseInt(toHour) - parseInt(fromHour)) * 60 + (parseInt(toMinute) - parseInt(fromMinute)),
    day,
  };
}

export default function ReservationPage() {
  const [usedTimes] = useState<ReservationEntity[]>(reservationEntityMock);
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);

  const reservationBlocks = usedTimes
    .map(parseReservation)
    .filter((block): block is ReservationBlock => block !== null);

  const getReservationsForDay = (day: number): ReservationBlock[] => {
    return reservationBlocks.filter((block) => block.day === day);
  };

  const getTopPosition = (hour: number, minute: number): number => {
    return (hour - 8) * HOUR_HEIGHT + (minute / 60) * HOUR_HEIGHT;
  };

  const getHeight = (durationMinutes: number): number => {
    return (durationMinutes / 60) * HOUR_HEIGHT;
  };

  return (
    <main className='px-[5dvw] py-[5dvh]'>
      <div className='bg-white rounded-lg p-6'>
        {/* Calendar Grid */}
        <div className='flex gap-0 border border-gray-300 rounded'>
          {/* Time column */}
          <div className='w-24 flex flex-col border-r border-gray-300'>
            <div className='h-12 border-b border-gray-300 flex items-center justify-center font-semibold'>Idő</div>
            {HOURS.map((hour) => (
              <div
                key={`time-${hour}`}
                className='h-16 border-b border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600'
              >
                {String(hour).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Days columns */}
          {DAYS_OF_WEEK.map((dayName, dayIndex) => {
            const reservations = getReservationsForDay(dayIndex);
            return (
              <div key={`day-${dayIndex}`} className='flex-1 border-r border-gray-300 relative'>
                {/* Day header */}
                <div className='h-12 border-b border-gray-300 flex items-center justify-center font-semibold bg-gray-100'>
                  {dayName}
                </div>

                {/* Time slots background */}
                <div className='relative bg-gray-100'>
                  {HOURS.map((hour) => (
                    <div
                      key={`slot-${dayIndex}-${hour}`}
                      className='h-16 border-b border-gray-300 relative hover:bg-gray-200 transition-colors'
                    />
                  ))}

                  {/* Reservation blocks */}
                  {reservations.map((reservation, idx) => (
                    <div
                      key={`reservation-${dayIndex}-${idx}`}
                      className='absolute left-1 right-1 bg-white border-2 border-gray-400 rounded px-2 py-1 text-sm font-semibold flex items-center justify-center'
                      style={{
                        top: `${getTopPosition(reservation.startHour, reservation.startMinute) + 48}px`,
                        height: `${getHeight(reservation.duration)}px`,
                      }}
                    >
                      Foglalt
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className='mt-6 flex items-center gap-4 bg-gray-100 p-4 rounded'>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Kezdés:</label>
            <select
              className='border border-gray-300 rounded px-3 py-2'
              value={selectedStart || ''}
              onChange={(e) => setSelectedStart(e.target.value)}
            >
              <option value=''>Válassz...</option>
              {HOURS.map((hour) => (
                <option key={`start-${hour}`} value={`${hour}:00`}>
                  {String(hour).padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Vége:</label>
            <select
              className='border border-gray-300 rounded px-3 py-2'
              value={selectedEnd || ''}
              onChange={(e) => setSelectedEnd(e.target.value)}
            >
              <option value=''>Válassz...</option>
              {HOURS.map((hour) => (
                <option key={`end-${hour}`} value={`${hour}:00`}>
                  {String(hour).padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>

          <Button
            className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-2'
            disabled={!selectedStart || !selectedEnd}
          >
            Foglalás
          </Button>
        </div>
      </div>
    </main>
  );
}
