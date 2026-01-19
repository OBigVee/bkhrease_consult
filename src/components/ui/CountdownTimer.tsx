'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  eventTitle: string;
  className?: string;
  onExpired?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  eventTitle,
  className = '',
  onExpired,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isExpired) {
          setIsExpired(true);
          onExpired?.();
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isExpired, onExpired]);

  if (isExpired) {
    return (
      <div className={`text-center p-4 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-2xl mb-2">⏰</div>
        <h3 className="font-bold text-gray-900 mb-1">{eventTitle}</h3>
        <p className="text-gray-600">This event has started or ended</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div
      className={`text-center p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200 ${className}`}
    >
      <div className="text-2xl mb-3">⏰</div>
      <h3 className="font-bold text-gray-900 mb-4 text-lg">{eventTitle}</h3>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {timeUnits.map(unit => (
          <div key={unit.label} className="text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <div className="text-2xl font-bold text-primary-600">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600">Time remaining until event starts</p>
    </div>
  );
};

export default CountdownTimer;
