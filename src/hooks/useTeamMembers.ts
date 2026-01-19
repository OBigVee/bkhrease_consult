'use client';

import { useState, useEffect } from 'react';
import { TeamMember, StrapiResponse } from '@/types/strapi';
import { strapiService } from '@/lib/strapi';
import { mockTeamMembers } from '@/lib/mockData';

interface UseTeamMembersReturn {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeamMembers = (): UseTeamMembersReturn => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = (await strapiService.getTeamMembers()) as StrapiResponse<
        TeamMember[]
      >;

      // Handle both array and single object responses
      const teamData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      // Sort members by category priority and then by order
      const sortedMembers = teamData.sort((a, b) => {
        // Category priority: founding-core > sub-team > other
        const categoryPriority = {
          'founding-core': 1,
          'sub-team': 2,
          other: 3,
        };

        const aPriority = categoryPriority[a.category] || 4;
        const bPriority = categoryPriority[b.category] || 4;

        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }

        // Within same category, sort by order
        return a.order - b.order;
      });

      setMembers(sortedMembers);
    } catch (err) {
      console.error('Error fetching team members:', err);

      // In development, use mock data as fallback
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using mock data for team members in development');
        setMembers(mockTeamMembers);
        setError(null);
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load team members. Please try again later.'
        );
        setMembers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchTeamMembers();
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return {
    members,
    loading,
    error,
    refetch,
  };
};

export default useTeamMembers;
