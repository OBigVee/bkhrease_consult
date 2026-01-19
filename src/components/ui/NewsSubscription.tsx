'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';

interface NewsSubscriptionProps {
  className?: string;
}

const NewsSubscription: React.FC<NewsSubscriptionProps> = ({
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [subscriptionTypes, setSubscriptionTypes] = useState({
    events: true,
    publications: true,
    achievements: true,
    announcements: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubscriptionChange = (type: keyof typeof subscriptionTypes) => {
    setSubscriptionTypes(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    const selectedTypes = Object.entries(subscriptionTypes)
      .filter(([, selected]) => selected)
      .map(([type]) => type);

    if (selectedTypes.length === 0) {
      setMessage({
        type: 'error',
        text: 'Please select at least one notification type.',
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the subscription process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store subscription in localStorage for demo purposes
      const subscription = {
        email,
        types: selectedTypes,
        subscribedAt: new Date().toISOString(),
      };

      const existingSubscriptions = JSON.parse(
        localStorage.getItem('newsSubscriptions') || '[]'
      );

      // Check if email already exists
      const existingIndex = existingSubscriptions.findIndex(
        (sub: any) => sub.email === email
      );

      if (existingIndex >= 0) {
        existingSubscriptions[existingIndex] = subscription;
        setMessage({
          type: 'success',
          text: 'Your subscription preferences have been updated!',
        });
      } else {
        existingSubscriptions.push(subscription);
        setMessage({
          type: 'success',
          text: 'Successfully subscribed to news updates!',
        });
      }

      localStorage.setItem(
        'newsSubscriptions',
        JSON.stringify(existingSubscriptions)
      );

      // Reset form
      setEmail('');
      setSubscriptionTypes({
        events: true,
        publications: true,
        achievements: true,
        announcements: false,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to subscribe. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subscriptionOptions = [
    {
      key: 'events',
      label: 'Upcoming Events',
      description: 'Get notified about workshops, seminars, and conferences',
    },
    {
      key: 'publications',
      label: 'New Publications',
      description: 'Updates on research papers and academic publications',
    },
    {
      key: 'achievements',
      label: 'Achievements',
      description: 'Celebrate our milestones and student successes',
    },
    {
      key: 'announcements',
      label: 'General Announcements',
      description: 'Important updates and news from B.Khrease',
    },
  ];

  return (
    <Card variant="elevated" className={`max-w-md ${className}`}>
      <div className="text-center mb-6">
        <div className="text-3xl mb-3">📧</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600 text-sm">
          Subscribe to receive notifications about news and events
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="your.email@example.com"
            required
          />
        </div>

        {/* Subscription Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Notification Preferences
          </label>
          <div className="space-y-3">
            {subscriptionOptions.map(option => (
              <label
                key={option.key}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={
                    subscriptionTypes[
                      option.key as keyof typeof subscriptionTypes
                    ]
                  }
                  onChange={() =>
                    handleSubscriptionChange(
                      option.key as keyof typeof subscriptionTypes
                    )
                  }
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Subscribing...
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </div>
    </Card>
  );
};

export default NewsSubscription;
