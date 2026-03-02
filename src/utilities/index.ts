export { calculateProgramProgress, calculateProgramTotals } from './progress';
export { buildContinueEntryForProgram } from './continue';
export { isLessonAvailable, isInstructionAvailable, isModuleComplete } from './lessons';
export { hasAccess, hasAnyAccess, isSubscription, isActiveSubscription } from './access';

export const formatCoins = (n: number): string =>
    n >= 10000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

export const formatARS = (amount: number): string =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);