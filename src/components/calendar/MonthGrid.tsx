import React from 'react';
import { calendarById, PortfolioEvent } from '@/data/portfolio';
import { dayKey, monthMatrix, sameDay } from './dates';
import type { Selection } from './CalendarApp';

const MAX_PER_DAY = 3;

type Props = {
  month: Date;
  events: PortfolioEvent[];
  selectedKey?: string;
  onSelect: (s: Selection) => void;
  onOpenDay: (d: Date) => void;
};

const MonthGrid: React.FC<Props> = ({ month, events, selectedKey, onSelect, onOpenDay }) => {
  const today = new Date();
  const cells = monthMatrix(month);
  const rows = cells[35].getMonth() !== month.getMonth() ? cells.slice(0, 35) : cells;

  return (
    <div className="cal-month">
      <div className="cal-month-dow">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="cal-month-grid">
        {rows.map((d) => {
          const dayEvents = events
            .filter((e) => e.day === d.getDay())
            .sort((a, b) => (a.allDay ? -1 : b.allDay ? 1 : a.start! - b.start!));
          const extra = dayEvents.length - MAX_PER_DAY;
          const cls = [
            'cal-month-cell',
            d.getMonth() !== month.getMonth() && 'out',
            sameDay(d, today) && 'today',
            (d.getDay() === 0 || d.getDay() === 6) && 'weekend',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={d.toISOString()} className={cls}>
              <button className="cal-month-num" onClick={() => onOpenDay(d)}>
                {d.getDate() === 1
                  ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : d.getDate()}
              </button>
              {dayEvents.slice(0, extra > 0 ? MAX_PER_DAY - 1 : MAX_PER_DAY).map((e) => {
                const key = `${e.id}@${dayKey(d)}`;
                return (
                  <button
                    key={e.id}
                    className={`cal-month-ev${selectedKey === key ? ' selected' : ''}`}
                    style={{ '--c': calendarById(e.calendar).color } as React.CSSProperties}
                    onClick={(ev) =>
                      onSelect({
                        event: e,
                        date: d,
                        rect: ev.currentTarget.getBoundingClientRect(),
                        key,
                      })
                    }
                  >
                    <span className={e.allDay ? 'dot bar' : 'dot'} />
                    <span className="name">{e.title}</span>
                  </button>
                );
              })}
              {extra > 0 && (
                <button className="cal-month-more" onClick={() => onOpenDay(d)}>
                  {extra + 1} more
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthGrid;
