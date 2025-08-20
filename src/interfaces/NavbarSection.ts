import { IconType } from "react-icons";

export interface NavbarSection {
    name: string;
    id: string;
    Icon?: IconType;
    disabled?: boolean;
}