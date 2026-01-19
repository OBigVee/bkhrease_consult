'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types/strapi';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: 'default' | 'featured';
  showFullBio?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  variant = 'default',
  showFullBio = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (!showFullBio && member.bio && member.bio.length > 150) {
      setIsModalOpen(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const truncatedBio =
    member.bio && member.bio.length > 150
      ? `${member.bio.substring(0, 150)}...`
      : member.bio;

  const displayBio = showFullBio ? member.bio : truncatedBio;
  const hasLongBio = member.bio && member.bio.length > 150;

  return (
    <>
      <Card
        variant="elevated"
        padding="none"
        className={`group cursor-pointer overflow-hidden ${
          variant === 'featured'
            ? 'ring-2 ring-primary-500 ring-opacity-50'
            : ''
        }`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={hasLongBio && !showFullBio ? 0 : -1}
        role={hasLongBio && !showFullBio ? 'button' : undefined}
        aria-label={
          hasLongBio && !showFullBio
            ? `View full bio for ${member.name}`
            : undefined
        }
      >
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          {member.image?.url ? (
            <Image
              src={member.image.url}
              alt={member.image.alternativeText || `Photo of ${member.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <svg
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          )}

          {/* Category Badge */}
          {member.category === 'founding-core' && (
            <div className="absolute left-2 top-2">
              <span className="rounded-full bg-primary-600 px-2 py-1 text-xs font-medium text-white">
                Founder
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {member.name}
          </h3>

          <p className="text-sm font-medium text-primary-600 mb-2">
            {member.role}
          </p>

          {displayBio && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {displayBio}
            </p>
          )}

          {/* Social Links */}
          {member.socialLinks && (
            <div className="mt-3 flex space-x-2">
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={`${member.name}'s LinkedIn profile`}
                  onClick={e => e.stopPropagation()}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}

              {member.socialLinks.email && (
                <a
                  href={`mailto:${member.socialLinks.email}`}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={`Email ${member.name}`}
                  onClick={e => e.stopPropagation()}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </a>
              )}

              {member.socialLinks.twitter && (
                <a
                  href={member.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label={`${member.name}'s Twitter profile`}
                  onClick={e => e.stopPropagation()}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* Read More Indicator */}
          {hasLongBio && !showFullBio && (
            <div className="mt-3">
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Modal for Full Bio */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={member.name}
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            {member.image?.url && (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={member.image.url}
                  alt={
                    member.image.alternativeText || `Photo of ${member.name}`
                  }
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            )}
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h4>
              <p className="text-primary-600 font-medium">{member.role}</p>
              {member.category === 'founding-core' && (
                <span className="inline-block mt-1 rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
                  Founding Core Team
                </span>
              )}
            </div>
          </div>

          {member.bio && (
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">
                Biography
              </h5>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {member.bio}
              </p>
            </div>
          )}

          {/* Social Links in Modal */}
          {member.socialLinks && (
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">
                Connect
              </h5>
              <div className="flex space-x-3">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}

                {member.socialLinks.email && (
                  <a
                    href={`mailto:${member.socialLinks.email}`}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <span className="text-sm">Email</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TeamMemberCard;
