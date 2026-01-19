'use strict';

/**
 * Cron configuration for scheduled tasks
 */

module.exports = {
  // Run every 5 minutes to check for scheduled content
  '*/5 * * * *': async ({ strapi }) => {
    try {
      const scheduledPublishingService = strapi.service(
        'api::scheduled-publishing.scheduled-publishing'
      );
      const result = await scheduledPublishingService.publishScheduledContent();

      if (result.total > 0) {
        strapi.log.info(
          `Scheduled publishing completed: ${result.total} items published`
        );
      }
    } catch (error) {
      strapi.log.error('Scheduled publishing cron job failed:', error);
    }
  },

  // Run every hour to update event status
  '0 * * * *': async ({ strapi }) => {
    try {
      const scheduledPublishingService = strapi.service(
        'api::scheduled-publishing.scheduled-publishing'
      );
      const updatedEvents =
        await scheduledPublishingService.updateEventStatus();

      if (updatedEvents > 0) {
        strapi.log.info(
          `Event status update completed: ${updatedEvents} events updated`
        );
      }
    } catch (error) {
      strapi.log.error('Event status update cron job failed:', error);
    }
  },

  // Run daily at midnight to clean up old data (optional)
  '0 0 * * *': async ({ strapi }) => {
    try {
      // Clean up old view counts, logs, etc.
      strapi.log.info('Daily cleanup completed');
    } catch (error) {
      strapi.log.error('Daily cleanup cron job failed:', error);
    }
  },
};
