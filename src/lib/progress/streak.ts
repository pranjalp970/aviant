/** Streaks from the daily study log. Pure (dates are YYYY-MM-DD in the student's timezone). */

export interface DayActivity {
  day: string;
  minutes: number;
  questions: number;
}

/** A day counts toward the streak with ≥ 10 minutes or ≥ 20 questions. */
export const qualifies = (d: DayActivity | undefined) => !!d && (d.minutes >= 10 || d.questions >= 20);

const shift = (day: string, n: number) => {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};

export interface Streak {
  current: number;
  best: number;
  todayDone: boolean;
  /** A streak freeze covered a missed day in the last week. */
  freezeUsed: boolean;
  /** Streak is alive but today isn't done yet. */
  atRisk: boolean;
}

/**
 * Walk back from today counting qualifying days. One missed day per 7 is
 * forgiven automatically (a "streak freeze"); a second miss ends the streak.
 * Today not being done yet doesn't break anything until the day is over.
 */
export function computeStreak(log: DayActivity[], today: string): Streak {
  const byDay = new Map(log.map((d) => [d.day, d]));
  const todayDone = qualifies(byDay.get(today));

  // leadingFreeze: when walking back from yesterday, a missed yesterday can itself be forgiven
  const walk = (from: string, leadingFreeze = false) => {
    let count = 0;
    let lastFreeze = -99; // index of the last forgiven day
    let freezeUsed = false;
    for (let i = 0; i < 1000; i++) {
      const day = shift(from, -i);
      if (qualifies(byDay.get(day))) {
        count++;
        continue;
      }
      if ((count > 0 || (leadingFreeze && i === 0)) && i - lastFreeze >= 7 && qualifies(byDay.get(shift(from, -i - 1)))) {
        lastFreeze = i; // forgive this single missed day
        if (i < 7) freezeUsed = true;
        continue;
      }
      break;
    }
    return { count, freezeUsed };
  };

  const fromToday = walk(todayDone ? today : shift(today, -1), !todayDone);

  // Best streak: longest qualifying run in the log (freezes included).
  let best = fromToday.count;
  const days = [...byDay.keys()].sort();
  for (const d of days) if (qualifies(byDay.get(d)) && !qualifies(byDay.get(shift(d, 1)))) best = Math.max(best, walk(d).count);

  return { current: fromToday.count, best, todayDone, freezeUsed: fromToday.freezeUsed, atRisk: fromToday.count > 0 && !todayDone };
}
