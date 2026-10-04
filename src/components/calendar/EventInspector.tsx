import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Link2, X } from 'lucide-react';
import { calendarById, EventAttachment, formatRange } from '@/data/portfolio';
import type { Selection } from './CalendarApp';

type Props = {
  selection: Selection;
  onClose: () => void;
  onOpenFile: (f: EventAttachment) => void;
};

const WIDTH = 340;
const GAP = 10;

const EventInspector: React.FC<Props> = ({ selection, onClose, onOpenFile }) => {
  const { event: e, date, rect } = selection;
  const cal = calendarById(e.calendar);
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; side: 'left' | 'right'; arrow: number }>();

  useLayoutEffect(() => {
    const h = ref.current?.offsetHeight ?? 300;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fitsRight = rect.right + GAP + WIDTH < vw - 8;
    const left = fitsRight
      ? rect.right + GAP
      : Math.max(8, Math.min(rect.left - GAP - WIDTH, vw - WIDTH - 8));
    const anchorY = rect.top + Math.min(rect.height, 80) / 2;
    const top = Math.max(36, Math.min(anchorY - 40, vh - h - 12));
    const arrow = Math.max(16, Math.min(anchorY - top - 7, h - 30));
    setPos({ left, top, side: fitsRight ? 'left' : 'right', arrow });
  }, [rect, selection.key]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const when = `${date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })}${e.allDay ? ' · All day' : ` · ${formatRange(e.start!, e.end!)}`}`;

  const hasDetail = e.role || e.period || e.summary || e.bullets?.length || e.skills?.length || e.embed;
  const hasLinks = e.links?.length || e.attachments?.length;

  return (
    <>
      <div className="insp-backdrop" onClick={onClose} />
      <div
        ref={ref}
        className="insp"
        role="dialog"
        aria-label={e.title}
        style={
          {
            '--c': cal.color,
            left: pos?.left ?? -9999,
            top: pos?.top ?? 0,
          } as React.CSSProperties
        }
      >
        {pos && <div className={`insp-arrow ${pos.side}`} style={{ top: pos.arrow }} />}

        <div className="insp-scroll">
          <div className="insp-head">
            <div className="insp-bar" />
            <div style={{ minWidth: 0 }}>
              <div className="insp-title">{e.title}</div>
              {e.location && <div className="insp-sub">{e.location}</div>}
              <div className="insp-sub">{when}</div>
            </div>
            <button className="insp-close" aria-label="Close" onClick={onClose}>
              <X size={14} strokeWidth={2.2} />
            </button>
          </div>

          {hasDetail && (
            <div className="insp-section">
              {e.role && <div className="insp-role">{e.role}</div>}
              {e.period && <div className="insp-period">{e.period}</div>}
              {e.summary && <p className="insp-summary">{e.summary}</p>}
              {e.bullets && (
                <ul className="insp-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {e.skills && <div className="insp-skills">{e.skills.join(' · ')}</div>}
              {e.embed === 'strava' && (
                <div className="insp-embed">
                  <iframe
                    title="Strava activity"
                    height={160}
                    width="100%"
                    frameBorder={0}
                    scrolling="no"
                    src="https://www.strava.com/athletes/115399087/activity-summary/a1820ea9344acfa99d738eda0f018ce7dda1072e"
                  />
                </div>
              )}
            </div>
          )}

          {hasLinks && (
            <div className="insp-section" style={{ paddingBottom: 4 }}>
              {e.links?.map((l) => (
                <a key={l.url} className="insp-row" href={l.url} target="_blank" rel="noopener noreferrer">
                  <Link2 size={14} strokeWidth={2} />
                  <span className="grow">{l.label}</span>
                  <ArrowUpRight size={13} className="go" />
                </a>
              ))}
              {e.attachments?.map((f) => (
                <button key={f.path} className="insp-row" onClick={() => onOpenFile(f)}>
                  <FileText size={14} strokeWidth={2} />
                  <span className="grow">{f.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="insp-foot">
          <span className="dot" />
          {cal.name}
        </div>
      </div>
    </>
  );
};

export default EventInspector;
