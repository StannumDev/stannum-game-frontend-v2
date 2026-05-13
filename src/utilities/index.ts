export { calculateProgramProgress, calculateProgramTotals } from './progress';
export { buildContinueEntryForProgram } from './continue';
export { isLessonAvailable, isInstructionAvailable, isModuleComplete, hasModuleAccess } from './lessons';
export { getLessonFreshness, getInstructionFreshness, type FreshnessStatus } from './freshness';
export { hasAccess, hasAnyAccess, isSubscription, isActiveSubscription } from './access';

export const formatCoins = (n: number): string =>
    n >= 10000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

export const formatARS = (amount: number): string =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);

export const isEmptyDescription = (d?: string | null): boolean => {
    if (d == null) return true;
    const stripped = d.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (stripped === '') return true;
    return /^sin descripci[oó]n\.?$/i.test(stripped);
};