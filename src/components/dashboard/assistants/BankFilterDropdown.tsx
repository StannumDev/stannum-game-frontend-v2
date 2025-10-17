'use client';

import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import { ArrowDownIcon } from '@/icons';

interface FilterOption {
    value: string;
    label: string;
    icon?: IconType;
    disabled?: boolean;
}

interface Props {
    label: string;
    placeholder: string;
    options: FilterOption[];
    value: string;
    onChange: (newValue: string) => void;
    multi?: boolean;
}

export const BankFilterDropdown = ({ label, placeholder, options, value, onChange, multi = false }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selected = useMemo(() => {
        if (!multi) return value ? [value] : [];
        return value ? value.split(',').filter(Boolean) : [];
    }, [multi, value]);

    const selectedCount = selected.length;

    const toggleOption = (val: string) => {
        if (!multi) {
            onChange(value === val ? '' : val);
            setOpen(false);
            return;
        }

        const set = new Set(selected);
        if (set.has(val)) set.delete(val);
        else set.add(val);
        onChange(Array.from(set).join(','));
    };

    const clearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                type="button"
                className={`w-full px-3 h-10 rounded-md border text-sm font-medium transition-200 flex items-center gap-2 hover:opacity-75 ${ selectedCount > 0 ? 'bg-stannum/20 border-stannum text-stannum' : 'bg-card border-card-light hover:border-card-lighter'}`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {!multi && selectedCount === 1 ? <>
                    {options.find(o => o.value === selected[0])?.icon && 
                        createElement(options.find(o => o.value === selected[0])!.icon!, { className: "text-sm" })
                    }
                    {options.find(o => o.value === selected[0])?.label}
                    <div className="grow" />
                </> : <>
                    {label}
                    <div className="grow" />
                    {selectedCount > 0 && (
                        <span className="shrink-0 size-4 bg-stannum text-card rounded-full text-xs font-bold flex justify-center items-center">
                            {selectedCount}
                        </span>
                    )}
                </>}
                <ArrowDownIcon className={`text-xs transition-transform ${open && 'rotate-180'}`} />
            </button>
            <AnimatePresence>
                {open &&
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        className="absolute top-full left-0 mt-2 bg-card border border-card-light rounded-lg shadow-lg p-2 z-20 min-w-[220px]"
                        role="listbox"
                    >
                        <div className="flex items-center justify-between px-2 pb-1">
                            <span className="text-[11px] text-card-lighter font-semibold">{placeholder}</span>
                            {selectedCount > 0 &&
                                <button 
                                    type="button"
                                    onClick={clearAll} 
                                    className="text-[11px] underline text-card-lighter hover:text-invalid transition-colors"
                                >
                                    Limpiar
                                </button>
                            }
                        </div>
                        <ul className="w-full space-y-1">
                            {options.map((opt) => {
                                const isActive = selected.includes(opt.value);
                                const Icon = opt.icon;
                                const isDisabled = opt.disabled || false;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        disabled={isDisabled}
                                        onClick={() => !isDisabled && toggleOption(opt.value)}
                                        className={`w-full px-3 py-2 rounded-md text-xs font-medium transition-all text-left flex items-center gap-2 justify-between disabled:opacity-50 disabled:cursor-not-allowed ${ isActive ? 'bg-stannum/20 text-stannum' : isDisabled ? 'text-card-lighter' : 'hover:bg-card-light'}`}
                                        role="option"
                                        aria-selected={isActive}
                                        aria-disabled={isDisabled}
                                    >
                                        <div className="flex items-center gap-2">
                                            {Icon && <Icon className="text-sm shrink-0" />}
                                            <span>{opt.label}</span>
                                        </div>
                                        {isDisabled && <span className="text-[9px] text-card-lighter font-bold">PRÓX</span>}
                                    </button>
                                );
                            })}
                        </ul>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};