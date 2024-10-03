import { IconType } from "react-icons";

export interface ProfileSection {
    label: string;
    value: 'achievements'|'tmd'|'proem';
    Icon?: IconType
}