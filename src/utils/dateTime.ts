// src/utils/dateTime.ts
import { logger } from './logger';

type DateTimeFormatOptions = {
  includeYear?: boolean;
  includeTime?: boolean;
  shortMonth?: boolean;
};

/**
 * Format a time string (HH:mm) into 12-hour format with AM/PM
 */
export const formatTime = (timeStr: string | undefined): string => {
  if (!timeStr) return '';
  
  try {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      throw new Error('Invalid hour');
    }
    
    const mins = parseInt(minutes);
    if (isNaN(mins) || mins < 0 || mins > 59) {
      throw new Error('Invalid minutes');
    }
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
  } catch (error) {
    logger.error('Error formatting time:', error);
    return timeStr || '';
  }
};

/**
 * Format a date string into a readable format
 */
export const formatDate = (date: string | undefined, options: DateTimeFormatOptions = {}): string => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: options.shortMonth ? 'short' : 'long',
      day: 'numeric',
      year: options.includeYear ? 'numeric' : undefined,
    };
    
    return dateObj.toLocaleDateString('en-US', formatOptions);
  } catch (error) {
    logger.error('Error formatting date:', error);
    return date;
  }
};

/**
 * Format a date range, intelligently handling same-day events
 */
export const formatDateRange = (startDate: string, endDate?: string, includeTime = false): string => {
  try {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      throw new Error('Invalid start date');
    }

    // For same day or single day events
    if (!endDate || startDate === endDate) {
      const dateStr = formatDate(startDate, { includeYear: true });
      return dateStr;
    }

    // For multi-day events
    const end = new Date(endDate);
    if (isNaN(end.getTime())) {
      throw new Error('Invalid end date');
    }

    const startStr = formatDate(startDate, { includeYear: true });
    const endStr = formatDate(endDate, { includeYear: true });
    
    return `${startStr} - ${endStr}`;
  } catch (error) {
    logger.error('Error formatting date range:', error);
    return startDate;
  }
};

/**
 * Get full date and time display for an event
 */
export const getEventDateTime = (startDate: string, startTime: string, endDate?: string, endTime?: string): string => {
  try {
    // Format date strings with short months for more compact display
    const startDateStr = formatDate(startDate, { includeYear: true, shortMonth: true });
    const endDateStr = endDate ? formatDate(endDate, { includeYear: true, shortMonth: true }) : '';

    // Format time strings
    const startTimeStr = formatTime(startTime);
    const endTimeStr = endTime ? formatTime(endTime) : '';

    // Single day event
    if (!endDate || startDate === endDate) {
      return endTimeStr
        ? `${startDateStr} ${startTimeStr} - ${endTimeStr}` // Same day with end time
        : `${startDateStr} at ${startTimeStr}`; // Single time
    }

    // Multi-day event
    return endTimeStr
      ? `${startDateStr} ${startTimeStr} - ${endDateStr} ${endTimeStr}` // Different days with times
      : `${startDateStr} - ${endDateStr}`; // Just show date range
  } catch (error) {
    logger.error('Error getting event date/time:', error);
    return startDate;
  }
};
