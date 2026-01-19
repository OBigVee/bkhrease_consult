'use client';

import React, { useState, useMemo } from 'react';
import { TeamMember } from '@/types/strapi';
import TeamMemberCard from './TeamMemberCard';

interface TeamDisplayProps {
  members: TeamMember[];
  showFilters?: boolean;
}

type CategoryFilter = 'all' | 'founding-core' | 'sub-team' | 'other';

const TeamDisplay: React.FC<TeamDisplayProps> = ({
  members,
  showFilters = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'order'>('order');

  // Categorize and sort members
  const categorizedMembers = useMemo(() => {
    // Filter members based on active filter
    const filteredMembers =
      activeFilter === 'all'
        ? members
        : members.filter(member => member.category === activeFilter);

    // Sort members
    const sortedMembers = [...filteredMembers].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'order':
        default:
          return a.order - b.order;
      }
    });

    // Group by category for display
    const grouped = {
      'founding-core': sortedMembers.filter(
        m => m.category === 'founding-core'
      ),
      'sub-team': sortedMembers.filter(m => m.category === 'sub-team'),
      other: sortedMembers.filter(m => m.category === 'other'),
    };

    return grouped;
  }, [members, activeFilter, sortBy]);

  // Get category display names and counts
  const categoryInfo = {
    all: {
      label: 'All Team Members',
      count: members.length,
    },
    'founding-core': {
      label: 'Founding Core Team',
      count: members.filter(m => m.category === 'founding-core').length,
    },
    'sub-team': {
      label: 'Sub-Team',
      count: members.filter(m => m.category === 'sub-team').length,
    },
    other: {
      label: 'Team Members',
      count: members.filter(m => m.category === 'other').length,
    },
  };

  // Find founder (Christopher B. Olowosoke)
  const founder = members.find(
    member =>
      member.name.toLowerCase().includes('christopher') &&
      member.name.toLowerCase().includes('olowosoke')
  );

  const renderMemberGrid = (categoryMembers: TeamMember[]) => {
    if (categoryMembers.length === 0) return null;

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryMembers.map(member => (
          <TeamMemberCard
            key={member.id}
            member={member}
            variant={
              founder && member.id === founder.id ? 'featured' : 'default'
            }
          />
        ))}
      </div>
    );
  };

  const renderCategorySection = (
    category: 'founding-core' | 'sub-team' | 'other',
    title: string,
    description?: string
  ) => {
    const categoryMembers = categorizedMembers[category];

    if (activeFilter !== 'all' && activeFilter !== category) return null;
    if (categoryMembers.length === 0) return null;

    return (
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-lg text-gray-600">{description}</p>
          )}
          <div className="mt-1">
            <span className="text-sm text-gray-500">
              {categoryMembers.length} member
              {categoryMembers.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        {renderMemberGrid(categoryMembers)}
      </section>
    );
  };

  return (
    <div className="space-y-12">
      {/* Filters and Sorting */}
      {showFilters && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryInfo) as CategoryFilter[]).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoryInfo[filter].label} ({categoryInfo[filter].count})
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="sort-select"
              className="text-sm font-medium text-gray-700"
            >
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={e =>
                setSortBy(e.target.value as 'name' | 'role' | 'order')
              }
              className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="order">Default Order</option>
              <option value="name">Name</option>
              <option value="role">Role</option>
            </select>
          </div>
        </div>
      )}

      {/* Team Sections */}
      {activeFilter === 'all' ? (
        <div className="space-y-16">
          {/* Founding Core Team - Always shown first and prominently */}
          {renderCategorySection(
            'founding-core',
            'Founding Core Team',
            'The visionary leaders who established B.Khrease Academic Consult'
          )}

          {/* Sub-Team */}
          {renderCategorySection(
            'sub-team',
            'Sub-Team',
            'Specialized team members driving our core initiatives'
          )}

          {/* Other Team Members */}
          {renderCategorySection(
            'other',
            'Team Members',
            'Dedicated professionals supporting our mission'
          )}
        </div>
      ) : (
        <div>
          {activeFilter === 'founding-core' &&
            renderCategorySection(
              'founding-core',
              'Founding Core Team',
              'The visionary leaders who established B.Khrease Academic Consult'
            )}
          {activeFilter === 'sub-team' &&
            renderCategorySection(
              'sub-team',
              'Sub-Team',
              'Specialized team members driving our core initiatives'
            )}
          {activeFilter === 'other' &&
            renderCategorySection(
              'other',
              'Team Members',
              'Dedicated professionals supporting our mission'
            )}
        </div>
      )}

      {/* Empty State */}
      {members.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No team members
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Team member information will be displayed here once available.
          </p>
        </div>
      )}

      {/* Founder Highlight */}
      {founder && activeFilter === 'all' && (
        <div className="rounded-lg bg-primary-50 p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-primary-900">
              Meet Our Founder
            </h4>
            <p className="mt-2 text-primary-700">
              {founder.name} founded B.Khrease Academic Consult with a vision to
              provide distinction with ease in undergraduate research
              mentorship.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDisplay;
