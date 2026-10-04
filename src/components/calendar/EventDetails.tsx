import React from 'react';
import { ArrowUpRight, FileText, Link2 } from 'lucide-react';
import { EventAttachment, PortfolioEvent } from '@/data/portfolio';

// The body of an event: role, results, links. Shared by the desktop popover and the phone sheet.
const EventDetails: React.FC<{
  event: PortfolioEvent;
  onOpenFile: (f: EventAttachment) => void;
}> = ({ event: e, onOpenFile }) => {
  const hasDetail = e.role || e.period || e.summary || e.bullets?.length || e.skills?.length || e.embed;
  const hasLinks = e.links?.length || e.attachments?.length;

  return (
    <>
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
    </>
  );
};

export default EventDetails;
