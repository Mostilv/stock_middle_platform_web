import dayjs, { type ConfigType } from 'dayjs';

export const buildRecentDateLabels = (
  days: number,
  endDate?: ConfigType,
  format = 'YYYY-MM-DD',
): string[] => {
  if (days <= 0) return [];
  const end = endDate ? dayjs(endDate) : dayjs();
  return Array.from({ length: days }, (_, idx) =>
    end
      .startOf('day')
      .subtract(days - idx - 1, 'day')
      .format(format),
  );
};

export const formatShortDateLabel = (
  value?: ConfigType | null,
  format = 'YY-MM-DD',
): string => {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  const date = dayjs(value);
  if (!date.isValid()) {
    return typeof value === 'string' ? value : '';
  }
  return date.format(format);
};
