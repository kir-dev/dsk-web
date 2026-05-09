'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReservationEntity } from '@/types/reservationEntity';
import { reservationEntityMock } from '@/mocks/reservationEntityMock';

const DAYS_OF_WEEK = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
const TIMELINE_START_HOUR = 8;
const TIMELINE_END_HOUR = 24;
const TOTAL_HOURS = TIMELINE_END_HOUR - TIMELINE_START_HOUR;
const TOTAL_TIMELINE_MINUTES = TOTAL_HOURS * 60;
const PADDING_ROWS = 1; // empty row before and after
const TOTAL_GRID_ROWS = TOTAL_HOURS + PADDING_ROWS * 2;
const HOURS = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => TIMELINE_START_HOUR + i);
const TIME_LABELS = Array.from({ length: 9 }, (_, i) => TIMELINE_START_HOUR + i * 2);

interface ReservationBlock {
  startMinutes: number;
  endMinutes: number;
  day: number;
}

function parseTimestamp(value: string) {
  const match = /(\d{4})\.(\d{2})\.(\d{2})T:(\d{2}):(\d{2})/.exec(value);
  if (!match) return null;

  const [, year, month, day, hour, minute] = match;
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
  };
}

function parseReservation(reservation: ReservationEntity): ReservationBlock | null {
  const from = parseTimestamp(reservation.from);
  const to = parseTimestamp(reservation.to);

  if (!from || !to) return null;
  if (from.year !== to.year || from.month !== to.month || from.day !== to.day) return null;

  const weekDay = (new Date(from.year, from.month - 1, from.day).getDay() + 6) % 7;

  return {
    startMinutes: from.hour * 60 + from.minute,
    endMinutes: to.hour * 60 + to.minute,
    day: weekDay,
  };
}

function clampToTimeline(minutes: number) {
  return Math.min(Math.max(minutes - TIMELINE_START_HOUR * 60, 0), TOTAL_TIMELINE_MINUTES);
}

function getBlockStyle(block: ReservationBlock) {
  const start = clampToTimeline(block.startMinutes);
  const end = clampToTimeline(block.endMinutes);

  if (end <= 0 || start >= TOTAL_TIMELINE_MINUTES || end <= start) {
    return null;
  }

  const visibleStart = Math.max(start, 0);
  const visibleEnd = Math.min(end, TOTAL_TIMELINE_MINUTES);

  // Offset by padding row, then convert to percentage of total grid rows
  const topPercent = ((PADDING_ROWS + (visibleStart / TOTAL_TIMELINE_MINUTES) * TOTAL_HOURS) / TOTAL_GRID_ROWS) * 100;
  const heightPercent =
    ((((visibleEnd - visibleStart) / TOTAL_TIMELINE_MINUTES) * TOTAL_HOURS) / TOTAL_GRID_ROWS) * 100;

  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
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

  return (
    <main className='flex justify-center px-[5dvw] py-[5dvh]'>
      <div className='flex h-[75dvh] w-[80dvw] min-w-0 flex-col overflow-hidden rounded-lg bg-white p-4 shadow-sm'>
        {/* Calendar Grid */}
        <div className='flex min-h-0 flex-1 overflow-visible rounded border border-gray-300 bg-gray-100'>
          {/* Time column */}
          <div className='flex basis-16 flex-shrink-0 flex-col border-r border-gray-300 bg-white'>
            <div className='flex h-12 items-center justify-center border-b border-gray-300 font-semibold text-sm'>
              Idő
            </div>
            <div className='relative flex-1 overflow-visible'>
              {/* Grid lines */}
              <div className='absolute inset-0 grid grid-rows-[repeat(18,minmax(0,1fr))]'>
                {Array.from({ length: 18 }, (_, i) => (
                  <div key={`grid-${i}`} className='border-b border-gray-200' />
                ))}
              </div>

              {/* Time labels */}
              {TIME_LABELS.map((hour) => (
                <div
                  key={`time-label-${hour}`}
                  className='pointer-events-none absolute left-1 right-1 -translate-y-1/2 text-center text-[0.7rem] font-medium text-gray-600'
                  style={{
                    top: `${((PADDING_ROWS + (hour - TIMELINE_START_HOUR)) / TOTAL_GRID_ROWS) * 100}%`,
                  }}
                >
                  {String(hour).padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>

          {/* Days columns */}
          {DAYS_OF_WEEK.map((dayName) => {
            const dayIndex = DAYS_OF_WEEK.indexOf(dayName);
            const reservations = getReservationsForDay(dayIndex);

            return (
              <div key={dayName} className='flex min-w-0 flex-1 flex-col border-r border-gray-300 last:border-r-0'>
                {/* Day header */}
                <div className='flex h-12 items-center justify-center border-b border-gray-300 bg-white font-semibold text-sm'>
                  {dayName}
                </div>

                {/* Time grid and reservations */}
                <div className='relative flex-1 overflow-visible bg-gray-200'>
                  {/* Grid lines */}
                  <div className='absolute inset-0 grid grid-rows-[repeat(18,minmax(0,1fr))]'>
                    {Array.from({ length: 18 }, (_, i) => (
                      <div key={`slot-${dayName}-${i}`} className='border-b border-gray-300/70' />
                    ))}
                  </div>

                  {/* Reservation blocks */}
                  {reservations.map((reservation) => {
                    const blockStyle = getBlockStyle(reservation);
                    if (!blockStyle) return null;

                    return (
                      <div
                        key={`${dayName}-${reservation.startMinutes}-${reservation.endMinutes}`}
                        className='absolute left-1 right-1 flex items-center justify-center rounded border-2 border-gray-400 bg-white px-2 py-1 text-sm font-semibold'
                        style={blockStyle}
                      >
                        Foglalt
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className='mt-4 flex flex-wrap items-center gap-4 rounded bg-gray-100 p-3'>
          <div className='flex items-center gap-2'>
            <label htmlFor='reservation-start' className='font-semibold text-sm'>
              Kezdés:
            </label>
            <select
              id='reservation-start'
              className='rounded border border-gray-300 px-3 py-2 text-sm'
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
            <label htmlFor='reservation-end' className='font-semibold text-sm'>
              Vége:
            </label>
            <select
              id='reservation-end'
              className='rounded border border-gray-300 px-3 py-2 text-sm'
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
            className='bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600'
            disabled={!selectedStart || !selectedEnd}
          >
            Foglalás
          </Button>
        </div>
      </div>
    </main>
  );
}
