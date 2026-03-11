import type { UserProgram, ProgramDetails, FullUserDetails } from '@/interfaces';

/**
 * Checks if a user has access to a program's content.
 * Uses the server-computed hasAccessFlag (covers both purchase and subscription).
 * Falls back to isPurchased for backward compatibility.
 */

export function hasAccess(program: UserProgram | ProgramDetails | undefined | null): boolean {
    if (!program) return false;
    if ('hasAccessFlag' in program && program.hasAccessFlag) return true;
    return !!program.isPurchased;
}

export function hasAnyAccess(user: FullUserDetails | null | undefined): boolean {
    if (!user?.programs) return false;
    return Object.values(user.programs).some(p => hasAccess(p));
}

export function isSubscription(program: UserProgram | ProgramDetails | undefined | null): boolean {
    if (!program) return false;
    return !!program.subscription?.status;
}

export function isActiveSubscription(program: UserProgram | ProgramDetails | undefined | null): boolean {
    if (!program?.subscription) return false;
    return program.subscription.status === 'active';
}
