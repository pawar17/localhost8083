import React, { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { CALENDARS, CalendarId } from '@/data/portfolio';
import { monthMatrix, sameDay } from './dates';

type Props = {
  date: Date;
  onPickDate: (d: Date) => void;
  hidden: Set<CalendarId>;
  onToggle: (id: CalendarId) => void;
};

const Sidebar: React.FC<Props> = ({ date, onPickDate, hidden, onToggle }) => {
  const [shown, setShown] = useState(() => new Date(date.getFullYear(), date.getMonth(), 1));
  const today = new Date();

  useEffect(() => {
    setShown(new Date(date.getFullYear(), date.getMonth(), 1));
  }, [date]);

  const cells = monthMatrix(shown);
  // Trim a trailing week that belongs entirely to the next month.
  const visible = cells[35].getMonth() !== shown.getMonth() ? cells.slice(0, 35) : cells;

  const move = (n: number) => setShown((s) => new Date(s.getFullYear(), s.getMonth() + n, 1));

  return (
    <aside className="cal-sidebar">
      <div className="cal-lights" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="cal-mini">
        <div className="cal-mini-head">
          <span>{shown.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <div className="cal-mini-nav">
            <button aria-label="Previous month" onClick={() => move(-1)}>
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
            <button aria-label="Next month" onClick={() => move(1)}>
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="cal-mini-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="cal-mini-dow">
              {d}
            </div>
          ))}
          {visible.map((d) => {
            const cls = [
              'cal-mini-day',
              d.getMonth() !== shown.getMonth() && 'out',
              sameDay(d, today) && 'today',
              sameDay(d, date) && 'selected',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <button key={d.toISOString()} className={cls} onClick={() => onPickDate(d)}>
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="cal-section-title">iCloud</div>
      {CALENDARS.map((c) => {
        const on = !hidden.has(c.id);
        return (
          <button
            key={c.id}
            className={`cal-cal-row${on ? '' : ' off'}`}
            style={{ '--c': c.color } as React.CSSProperties}
            onClick={() => onToggle(c.id)}
            aria-pressed={on}
          >
            <span className={`cal-check${on ? ' on' : ''}`}>
              {on && <Check size={10} strokeWidth={3.5} color="#fff" />}
            </span>
            <span className="cal-name">{c.name}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
