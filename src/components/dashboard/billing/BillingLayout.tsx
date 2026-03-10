'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { m } from 'framer-motion';
import { useUserStore } from '@/stores/userStore';
import { isSubscription } from '@/utilities';
import { StoreIcon, RotateRightIcon } from '@/icons';
import { PurchaseList } from '../purchases/PurchaseList';
import { SubscriptionsLayout } from '../subscriptions/SubscriptionsLayout';

type BillingTab = 'purchases' | 'subscriptions';

const tabs = [
    { id: 'purchases' as const, label: 'Compras', Icon: StoreIcon },
    { id: 'subscriptions' as const, label: 'Suscripciones', Icon: RotateRightIcon },
];

export const BillingLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const user = useUserStore(s => s.user);

    const hasSubscriptions = user?.programs && Object.values(user.programs).some(p => isSubscription(p));

    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState<BillingTab>('purchases');

    useEffect(() => {
        if (tabParam === 'subscriptions' && hasSubscriptions) {
            setActiveTab('subscriptions');
        } else {
            setActiveTab('purchases');
        }
    }, [tabParam, hasSubscriptions]);

    const handleTabChange = useCallback((tab: BillingTab) => {
        setActiveTab(tab);
        const params = new URLSearchParams(searchParams.toString());
        if (tab === 'purchases') {
            params.delete('tab');
        } else {
            params.set('tab', tab);
        }
        const query = params.toString();
        router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    }, [router, pathname, searchParams]);

    const visibleTabs = hasSubscriptions ? tabs : tabs.filter(t => t.id === 'purchases');

    return (
        <div className="flex flex-col gap-6">
            {visibleTabs.length > 1 && (
                <div className="flex gap-1 p-1 rounded-xl bg-card w-fit">
                    {visibleTabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleTabChange(tab.id)}
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-200 ${
                                    isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                                }`}
                            >
                                {isActive && (
                                    <m.div
                                        layoutId="billing-tab-indicator"
                                        className="absolute inset-0 rounded-lg bg-card-light"
                                        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                                    />
                                )}
                                <span className="relative flex items-center gap-2">
                                    <tab.Icon className="size-4" />
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {activeTab === 'purchases' && <PurchaseList />}
            {activeTab === 'subscriptions' && hasSubscriptions && <SubscriptionsLayout />}
        </div>
    );
};
