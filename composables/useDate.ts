import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

export const useDate = () => {
  const getToday = (): string => {
    return format(Date.now(), "yyyy-MM-dd");
  };

  const getCurrentWeekDay = (): string => {
    return format(Date.now(), "iii");
  };

  const getRangeWeekDates = (): string[] => {
    const start = startOfWeek(getToday(), { weekStartsOn: 1 });
    const end = endOfWeek(getToday(), { weekStartsOn: 1 });
    const weekDates = eachDayOfInterval({ start, end });
    return weekDates.map((date) => format(date, "yyyy-MM-dd"));
  };

  const getMissingDates = (existingDates: string[]): string[] => {
    const lastDate = existingDates[existingDates.length - 1];
    let missingDates = eachDayOfInterval({
      start: lastDate,
      end: getToday(),
    });

    return missingDates.slice(1).map((date) => format(date, "yyyy-MM-dd"));
  };

  return {
    getToday,
    getCurrentWeekDay,
    getRangeWeekDates,
    getMissingDates,
  };
};
