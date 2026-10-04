import { useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { X } from 'lucide-react';
import {
  calendarById,
  EVENTS,
  EventAttachment,
  formatMinutes,
  PortfolioEvent,
  RESUME_URL,
} from '@/data/portfolio';
import EventDetails from './calendar/EventDetails';
import TextFileViewer from './TextFileViewer';
import { addDays } from './calendar/dates';
import './calendar/calendar.css';

type Open = { event: PortfolioEvent; date: Date };

// Phone layout: an iOS Calendar-style list of the week, built from the same events as the desktop.
export function MobileMessage() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState<Open | null>(null);
  const [file, setFile] = useState<EventAttachment | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const week = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i);
      const items = EVENTS.filter((e) => e.day === date.getDay()).sort((a, b) =>
        a.allDay ? -1 : b.allDay ? 1 : a.start! - b.start!,
      );
      return { date, items, isToday: i === 0 };
    });
  }, []);

  if (!isMobile) return null;

  return (
    <div className="m-cal">
      <header className="m-head">
        <div className="m-name">Aadya Pawar</div>
        <div className="m-sub">Technical Business Analyst at Bank of America · New York</div>
        <div className="m-links">
          <a href="https://www.linkedin.com/in/aadyapawar/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:aadyapawar7104@gmail.com">Email</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <a href="https://github.com/pawar17" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </header>

      {week.map(({ date, items, isToday }) => (
        <section key={date.toISOString()} className="m-day">
          <h2 className={isToday ? 'today' : ''}>
            {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' })}
            <span>{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
          </h2>
          {items.map((e) => (
            <button
              key={e.id}
              className="m-ev"
              style={{ '--c': calendarById(e.calendar).color } as React.CSSProperties}
              onClick={() => setOpen({ event: e, date })}
            >
              <span className="m-time">
                {e.allDay ? (
                  'all-day'
                ) : (
                  <>
                    {formatMinutes(e.start!)}
                    <small>{formatMinutes(e.end!)}</small>
                  </>
                )}
              </span>
              <span className="m-bar" />
              <span className="m-text">
                <strong>{e.title}</strong>
                {(e.role || e.location) && <small>{e.role ?? e.location}</small>}
              </span>
            </button>
          ))}
        </section>
      ))}

      <p className="m-note">Open this on a laptop to see it as a macOS desktop.</p>

      {open && (
        <>
          <div className="m-sheet-backdrop" onClick={() => setOpen(null)} />
          <div
            className="m-sheet"
            role="dialog"
            aria-label={open.event.title}
            style={{ '--c': calendarById(open.event.calendar).color } as React.CSSProperties}
          >
            <div className="m-grab" />
            <div className="insp-head">
              <div className="insp-bar" />
              <div style={{ minWidth: 0 }}>
                <div className="insp-title">{open.event.title}</div>
                {open.event.location && <div className="insp-sub">{open.event.location}</div>}
                <div className="insp-sub">
                  {open.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  {open.event.allDay
                    ? ' · All day'
                    : ` · ${formatMinutes(open.event.start!)} – ${formatMinutes(open.event.end!)}`}
                </div>
              </div>
              <button className="insp-close" aria-label="Close" onClick={() => setOpen(null)}>
                <X size={16} strokeWidth={2.2} />
              </button>
            </div>
            <EventDetails event={open.event} onOpenFile={setFile} />
            <div className="m-sheet-foot">
              <span className="dot" />
              {calendarById(open.event.calendar).name}
            </div>
          </div>
        </>
      )}

      {file && (
        <TextFileViewer filePath={file.path} fileName={file.name} isOpen onClose={() => setFile(null)} />
      )}
    </div>
  );
}
