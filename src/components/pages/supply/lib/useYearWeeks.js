import {useEffect, useState} from 'react';
import {eachMonthOfInterval, eachWeekOfInterval, endOfYear, format, startOfYear} from 'date-fns';

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @todo refactoring
 * @param year
 * @returns {*[]}
 */
function useYearWeeks(year) {
    const [yearsByWeek, setYearsByWeek] = useState({});

    const computeWeeksByMonth = (year) => {
        const startDateOfYear = startOfYear(new Date(year, 0, 1));
        const endDateOfYear = endOfYear(new Date(year, 0, 1));
        const weeksOfYear = eachWeekOfInterval({start: startDateOfYear, end: endDateOfYear});
        const monthsOfYear = eachMonthOfInterval({start: startDateOfYear, end: endDateOfYear});

        return monthsOfYear.map(month => ({
            month: format(month, 'yyyy-MM'),
            weeks: weeksOfYear
                .filter(week => month.getMonth() === week.getMonth())
                .map(week => format(week, 'yyyy-w')),
        }));
    };

    useEffect(() => {
        if (Object.values(yearsByWeek || {}).length === 0) {
            setYearsByWeek({
                past: computeWeeksByMonth(year - 1),
                now: computeWeeksByMonth(year),
                next: computeWeeksByMonth(year + 1)
            });
        }

    }, [year, yearsByWeek]);

    return yearsByWeek;
}

export default useYearWeeks;
