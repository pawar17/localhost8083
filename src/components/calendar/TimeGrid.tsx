import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { calendarById, formatMinutes, formatRange, PortfolioEvent } from '@/data/portfolio';
import { dayKey, sameDay } from './dates';
import type { Selection } from './CalendarApp';

const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_PX = 48;

type Props = {
  days: Date[];
  events: PortfolioEvent[];
  detailed: boolean;
  selectedKey?: string;
  onSelect: (s: Selection) => void;
};

type Placed = { event: PortfolioEvent; col: number; cols: number };

// Side-by-side columns for events that overlap in time.
const layoutDay = (evs: PortfolioEvent[]): Placed[] => {
  const sorted = [...evs].sort((a, b) => a.start! - b.start! || b.end! - a.end!);
  const out: Placed[] = [];
  let cluster: Placed[] = [];
  let clusterEnd = -1;
  const flush = () => {
    const cols = Math.max(1, ...cluster.map((p) => p.col + 1));
    cluster.forEach((p) => out.push({ ...p, cols }));
    cluster = [];
  };
  for (const e of sorted) {
    if (e.start! >= clusterEnd) {
      flush();
      clusterEnd = -1;
    }
    const used = new Set(cluster.filter((p) => p.event.end! > e.start!).map((p) => p.col));
    let col = 0;
    while (used.has(col)) col++;
    cluster.push({ event: e, col, cols: 1 });
    clusterEnd = Math.max(clusterEnd, e.end!);
  }
  flush();
  return out;
};

const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const TimeGrid: React.FC<Props> = ({ days, events, detailed, selectedKey, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const now = useNow();
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
  const style = { '--days': days.length } as React.CSSProperties;

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = HOUR_PX * 0.75;
  }, []);

  const timed = events.filter((e) => !e.allDay && e.start !== undefined);
  const allDay = events.filter((e) => e.allDay);
  const hasAllDay = days.some((d) => allDay.some((e) => e.day === d.getDay()));

  const pick = (event: PortfolioEvent, date: Date) => (ev: React.MouseEvent<HTMLElement>) => {
    ev.stopPropagation();
    onSelect({
      event,
      date,
      rect: ev.currentTarget.getBoundingClientRect(),
      key: `${event.id}@${dayKey(date)}`,
    });
  };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowInRange = nowMinutes >= START_HOUR * 60 && nowMinutes <= END_HOUR * 60;
  const nowTop = ((nowMinutes - START_HOUR * 60) / 60) * HOUR_PX;
  const showsToday = days.some((d) => sameDay(d, now));

  return (
    <div className="cal-grid-wrap">
      <div className="cal-cols cal-dayhead" style={style}>
        <div />
        {days.map((d) => {
          const isToday = sameDay(d, now);
          const weekend = d.getDay() === 0 || d.getDay() === 6;
          return (
            <div
              key={d.toISOString()}
              className={`cal-dayhead-cell${isToday ? ' today' : ''}${weekend ? ' weekend' : ''}`}
              style={detailed ? { justifyContent: 'flex-start', paddingLeft: 12 } : undefined}
            >
              {d.toLocaleDateString('en-US', { weekday: detailed ? 'long' : 'short' })}
              <span className="num">{d.getDate()}</span>
            </div>
          );
        })}
      </div>

      {hasAllDay && (
        <div className="cal-cols cal-allday" style={style}>
          <div className="cal-allday-label">all-day</div>
          {days.map((d) => (
            <div key={d.toISOString()} className="cal-allday-cell">
              {allDay
                .filter((e) => e.day === d.getDay())
                .map((e) => {
                  const key = `${e.id}@${dayKey(d)}`;
                  return (
                    <button
                      key={e.id}
                      className={`ev-allday${selectedKey === key ? ' selected' : ''}`}
                      style={{ '--c': calendarById(e.calendar).color } as React.CSSProperties}
                      onClick={pick(e, d)}
                    >
                      {e.title}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      )}

      <div className="cal-scroll" ref={scrollRef}>
        <div className="cal-cols cal-body" style={style}>
          <div style={{ position: 'relative' }}>
            {hours.map((h) => (
              <div key={h} className="cal-hour-label">
                {h !== START_HOUR && !(showsToday && nowInRange && Math.abs(nowTop - (h - START_HOUR) * HOUR_PX) < 12) && (
                  <span>{formatMinutes(h * 60)}</span>
                )}
              </div>
            ))}
            {showsToday && nowInRange && (
              <div className="cal-now-label" style={{ top: nowTop }}>
                {formatMinutes(nowMinutes)}
              </div>
            )}
          </div>

          {days.map((d) => {
            const isToday = sameDay(d, now);
            const weekend = d.getDay() === 0 || d.getDay() === 6;
            const placed = layoutDay(timed.filter((e) => e.day === d.getDay()));
            return (
              <div
                key={d.toISOString()}
                className={`cal-col${weekend ? ' weekend' : ''}`}
                style={{ height: hours.length * HOUR_PX }}
              >
                {placed.map(({ event: e, col, cols }) => {
                  const top = ((e.start! - START_HOUR * 60) / 60) * HOUR_PX;
                  const height = Math.max(((e.end! - e.start!) / 60) * HOUR_PX - 2, 18);
                  const short = e.end! - e.start! < 60;
                  const key = `${e.id}@${dayKey(d)}`;
                  const widthPct = 100 / cols;
                  return (
                    <button
                      key={e.id}
                      className={`ev${short ? ' compact' : ''}${selectedKey === key ? ' selected' : ''}`}
                      style={
                        {
                          '--c': calendarById(e.calendar).color,
                          top: top + 1,
                          height,
                          left: `calc(${col * widthPct}% + 2px)`,
                          right: `calc(${100 - (col + 1) * widthPct}% + 3px)`,
                        } as React.CSSProperties
                      }
                      onClick={pick(e, d)}
                    >
                      <span className="ev-title">{e.title}</span>
                      <span className="ev-meta">{formatRange(e.start!, e.end!)}</span>
                      {!short && detailed && e.role && <span className="ev-meta">{e.role}</span>}
                      {!short && (detailed || e.end! - e.start! >= 120) && e.location && (
                        <span className="ev-meta">{e.location}</span>
                      )}
                    </button>
                  );
                })}
                {isToday && nowInRange && <div className="cal-now" style={{ top: nowTop }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeGrid;
