'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceType: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    serviceType: '',
    message: '',
  });

  // Pre-fill serviceType from URL query param (e.g., /contact?service=research-mentorship)
  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setFormData(prev => ({ ...prev, serviceType: service }));
    }
  }, [searchParams]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const serviceTypes = [
    { value: '', label: 'Select a service...' },
    {
      value: 'research-mentorship',
      label: 'Undergraduate Research Mentorship',
    },
    {
      value: 'laboratory-assistance',
      label: 'Laboratory Assistance (Wet/Dry Lab)',
    },
    { value: 'thesis-consultancy', label: 'Thesis Consultancy' },
    { value: 'project-development', label: 'Project Development & Execution' },
    { value: 'skills-training', label: 'Skills-in-Demand Training' },
    { value: 'general-inquiry', label: 'General Inquiry' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, should be valid)
    if (
      formData.phone.trim() &&
      !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Service type validation
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message:
            data.message ||
            "Thank you for your message! We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          serviceType: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message:
            data.error ||
            'Something went wrong. Please try again or contact us directly.',
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="elevated" className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Send Us a Message
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone and Service Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="Enter your phone number (optional)"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Service Type *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${errors.serviceType
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
                }`}
            >
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            placeholder="Brief description of your inquiry"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-vertical ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            placeholder="Please provide details about your inquiry, including your academic level, specific needs, and any deadlines..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus && (
          <div
            className={`p-4 rounded-lg ${submitStatus.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
              }`}
          >
            <div className="flex items-center">
              {submitStatus.type === 'success' ? (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <p>{submitStatus.message}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Message...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <div className="text-sm text-gray-600 text-center">
          <p>
            By submitting this form, you agree to our privacy policy. We&apos;ll
            only use your information to respond to your inquiry.
          </p>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
