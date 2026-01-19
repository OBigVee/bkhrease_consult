'use client';

import React, { useState, useEffect } from 'react';
import { NewsItem } from '@/types/strapi';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui';

interface EventReminderProps {
  events: NewsItem[];
  className?: string;
}

interface ReminderSettings {
  eventId: number;
  reminderTimes: ('1day' | '1hour' | '30min')[];
  notified: ('1day' | '1hour' | '30min')[];
}

const EventReminder: React.FC<EventReminderProps> = ({
  events,
  className = '',
}) => {
  const [reminders, setReminders] = useState<ReminderSettings[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Load existing reminders from localStorage
    const savedReminders = localStorage.getItem('eventReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  useEffect(() => {
    // Check for reminders that need to be triggered
    const checkReminders = () => {
      const now = new Date().getTime();

      reminders.forEach(reminder => {
        const event = events.find(e => e.id === reminder.eventId);
        if (!event || !event.eventDate) return;

        const eventTime = new Date(event.eventDate).getTime();

        reminder.reminderTimes.forEach(reminderType => {
          if (reminder.notified.includes(reminderType)) return;

          let triggerTime = 0;
          switch (reminderType) {
            case '1day':
              triggerTime = eventTime - 24 * 60 * 60 * 1000;
              break;
            case '1hour':
              triggerTime = eventTime - 60 * 60 * 1000;
              break;
            case '30min':
              triggerTime = eventTime - 30 * 60 * 1000;
              break;
          }

          if (now >= triggerTime && now < eventTime) {
            // Trigger notification
            showNotification(event, reminderType);

            // Mark as notified
            setReminders(prev => {
              const updated = prev.map(r =>
                r.eventId === reminder.eventId
                  ? { ...r, notified: [...r.notified, reminderType] }
                  : r
              );
              localStorage.setItem('eventReminders', JSON.stringify(updated));
              return updated;
            });
          }
        });
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Check immediately

    return () => clearInterval(interval);
  }, [reminders, events]);

  const showNotification = (event: NewsItem, reminderType: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const timeText =
        reminderType === '1day'
          ? '1 day'
          : reminderType === '1hour'
            ? '1 hour'
            : '30 minutes';

      new Notification(`Event Reminder: ${event.title}`, {
        body: `This event starts in ${timeText}. Don't forget to attend!`,
        icon: '/favicon.ico',
        tag: `event-${event.id}-${reminderType}`,
      });
    } else {
      // Fallback to browser alert
      const timeText =
        reminderType === '1day'
          ? '1 day'
          : reminderType === '1hour'
            ? '1 hour'
            : '30 minutes';
      alert(
        `Event Reminder: ${event.title}\n\nThis event starts in ${timeText}. Don't forget to attend!`
      );
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const toggleReminder = async (
    eventId: number,
    reminderType: '1day' | '1hour' | '30min'
  ) => {
    // Request notification permission if not granted
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      alert('Please enable notifications to receive event reminders.');
      return;
    }

    setReminders(prev => {
      const existingIndex = prev.findIndex(r => r.eventId === eventId);
      let updated: ReminderSettings[];

      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        const hasReminder = existing.reminderTimes.includes(reminderType);

        if (hasReminder) {
          // Remove reminder
          updated = prev
            .map(r =>
              r.eventId === eventId
                ? {
                    ...r,
                    reminderTimes: r.reminderTimes.filter(
                      t => t !== reminderType
                    ),
                    notified: r.notified.filter(t => t !== reminderType),
                  }
                : r
            )
            .filter(r => r.reminderTimes.length > 0);
        } else {
          // Add reminder
          updated = prev.map(r =>
            r.eventId === eventId
              ? { ...r, reminderTimes: [...r.reminderTimes, reminderType] }
              : r
          );
        }
      } else {
        // Create new reminder
        updated = [
          ...prev,
          {
            eventId,
            reminderTimes: [reminderType],
            notified: [],
          },
        ];
      }

      localStorage.setItem('eventReminders', JSON.stringify(updated));
      return updated;
    });
  };

  const hasReminder = (
    eventId: number,
    reminderType: '1day' | '1hour' | '30min'
  ) => {
    const reminder = reminders.find(r => r.eventId === eventId);
    return reminder?.reminderTimes.includes(reminderType) || false;
  };

  const upcomingEvents = events.filter(
    event =>
      event.type === 'event' &&
      event.isUpcoming &&
      event.eventDate &&
      new Date(event.eventDate) > new Date()
  );

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <Card variant="elevated" className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900">Event Reminders</h3>
          <p className="text-sm text-gray-600">
            Set notifications for upcoming events
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {upcomingEvents.slice(0, 3).map(event => (
          <div key={event.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                  {event.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {formatDate(event.eventDate!)}
                </p>
              </div>
            </div>

            {showSettings && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-2">Remind me:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: '1day', label: '1 day before' },
                    { key: '1hour', label: '1 hour before' },
                    { key: '30min', label: '30 min before' },
                  ].map(option => (
                    <button
                      key={option.key}
                      onClick={() =>
                        toggleReminder(event.id, option.key as any)
                      }
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                        hasReminder(event.id, option.key as any)
                          ? 'bg-primary-100 text-primary-800 border border-primary-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {upcomingEvents.length > 3 && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            {showSettings
              ? 'Show Less'
              : `View ${upcomingEvents.length - 3} More Events`}
          </button>
        </div>
      )}
    </Card>
  );
};

export default EventReminder;
