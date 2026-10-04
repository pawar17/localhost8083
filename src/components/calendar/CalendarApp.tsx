import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, PanelLeft, Plus, Search, X } from 'lucide-react';
import { CalendarId, EVENTS, PortfolioEvent } from '@/data/portfolio';
import Sidebar from './Sidebar';
import TimeGrid from './TimeGrid';
import MonthGrid from './MonthGrid';
import EventInspector from './EventInspector';
import TextFileViewer from '../TextFileViewer';
import { addDays, startOfWeek } from './dates';
import './calendar.css';

export type View = 'day' | 'week' | 'month';

export type Selection = {
  event: PortfolioEvent;
  date: Date;
  rect: DOMRect;
  key: string;
};

const matches = (e: PortfolioEvent, q: string) => {
  if (!q) return true;
  const hay = [e.title, e.role, e.location, e.summary, ...(e.bullets ?? []), ...(e.skills ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return hay.includes(q.toLowerCase());
};

const CalendarApp: React.FC = () => {
  const [date, setDate] = useState(() => new Date());
  const [view, setView] = useState<View>('week');
  const [hidden, setHidden] = useState<Set<CalendarId>>(new Set());
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [file, setFile] = useState<{ name: string; path: string } | null>(null);

  useEffect(() => {
    const hideSidebar = () => setSidebarOpen(window.innerWidth > 1000);
    hideSidebar();
    window.addEventListener('resize', hideSidebar);
    return () => window.removeEventListener('resize', hideSidebar);
  }, []);

  const events = useMemo(
    () => EVENTS.filter((e) => !hidden.has(e.calendar) && matches(e, query.trim())),
    [hidden, query],
  );

  const toggleCalendar = (id: CalendarId) =>
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const step = (dir: 1 | -1) => {
    setSelection(null);
    setDate((d) => {
      if (view === 'day') return addDays(d, dir);
      if (view === 'week') return addDays(d, dir * 7);
      return new Date(d.getFullYear(), d.getMonth() + dir, 1);
    });
  };

  const select = useCallback((s: Selection | null) => setSelection(s), []);

  const days = useMemo(() => {
    if (view === 'day') return [new Date(date.getFullYear(), date.getMonth(), date.getDate())];
    const start = startOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [date, view]);

  const monthLabel = date.toLocaleDateString('en-US', { month: 'long' });
  const title =
    view === 'day' ? (
      <>
        {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}{' '}
        <span>{date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
      </>
    ) : (
      <>
        {monthLabel} <span>{date.getFullYear()}</span>
      </>
    );

  return (
    <div className="cal">
      {sidebarOpen && (
        <Sidebar
          date={date}
          onPickDate={(d) => {
            setDate(d);
            setSelection(null);
          }}
          hidden={hidden}
          onToggle={toggleCalendar}
        />
      )}

      <div className="cal-main">
        <div className="cal-toolbar">
          <div className="cal-tool-left">
            {!sidebarOpen && (
              <div className="cal-lights" style={{ padding: '0 8px 0 4px', height: 'auto' }}>
                <span />
                <span />
                <span />
              </div>
            )}
            <button
              className="cal-icon-btn"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((o) => !o)}
            >
              <PanelLeft size={17} strokeWidth={1.6} />
            </button>
            <button className="cal-icon-btn" aria-label="New event" title="Calendar is read-only">
              <Plus size={18} strokeWidth={1.6} />
            </button>
          </div>

          <div className="cal-seg" role="tablist">
            {(['day', 'week', 'month'] as View[]).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                className={view === v ? 'active' : ''}
                onClick={() => {
                  setView(v);
                  setSelection(null);
                }}
              >
                {v[0].toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          <label className="cal-search">
            <Search size={14} strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelection(null);
              }}
              placeholder="Search"
              aria-label="Search events"
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery('')}>
                <X size={13} />
              </button>
            )}
          </label>
        </div>

        <div className="cal-titlebar">
          <div className="cal-title">{title}</div>
          <div className="cal-nav">
            <button aria-label="Previous" onClick={() => step(-1)}>
              <ChevronLeft size={15} strokeWidth={2} />
            </button>
            <button
              className="today-btn"
              onClick={() => {
                setDate(new Date());
                setSelection(null);
              }}
            >
              Today
            </button>
            <button aria-label="Next" onClick={() => step(1)}>
              <ChevronRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        {view === 'month' ? (
          <MonthGrid
            month={date}
            events={events}
            selectedKey={selection?.key}
            onSelect={select}
            onOpenDay={(d) => {
              setDate(d);
              setView('day');
            }}
          />
        ) : (
          <TimeGrid
            days={days}
            events={events}
            detailed={view === 'day'}
            selectedKey={selection?.key}
            onSelect={select}
          />
        )}
      </div>

      {selection && (
        <EventInspector
          selection={selection}
          onClose={() => setSelection(null)}
          onOpenFile={(f) => setFile(f)}
        />
      )}

      {file && (
        <TextFileViewer
          filePath={file.path}
          fileName={file.name}
          isOpen
          onClose={() => setFile(null)}
        />
      )}
    </div>
  );
};

export default CalendarApp;
