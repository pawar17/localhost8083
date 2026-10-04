// Event shape used by the mobile view (MobileMessage).
export type EventType = {
  id: string;
  title: string;
  time: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  description: string;
  location?: string;
  day?: number; // 0-6 for Sunday-Saturday
  endTime?: string;
  notes?: string;
  hasTime?: boolean;
  url?: string;
  isExpandable?: boolean;
};
