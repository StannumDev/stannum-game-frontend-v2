import { renderToStaticMarkup } from 'react-dom/server';
import {
    PlayIcon, FireIcon, RankingStarIcon, CompassIcon, KeyIcon,
    CheckIcon, LockIcon, CrownIcon, RouteIcon, ToolsIcon,
    UserCircleIcon, EditIcon, MedalIcon, ChestIcon,
} from '@/icons';
import { IoGameController, IoRocket } from 'react-icons/io5';
import tinsCoin from '@/assets/tins_coin.svg';

const toHtml = (Icon: React.ComponentType<{ size?: number; color?: string }>) =>
    `<span class="tutorial-icon">${renderToStaticMarkup(<Icon size={20} color="#00FFCC" />)}</span>`;

const coinIconHtml = `<span class="tutorial-icon"><img src="${tinsCoin.src}" width="20" height="20" alt="Tins" /></span>`;

export const TUTORIAL_ICONS = {
    play: toHtml(PlayIcon),
    fire: toHtml(FireIcon),
    ranking: toHtml(RankingStarIcon),
    compass: toHtml(CompassIcon),
    key: toHtml(KeyIcon),
    check: toHtml(CheckIcon),
    lock: toHtml(LockIcon),
    crown: toHtml(CrownIcon),
    route: toHtml(RouteIcon),
    tools: toHtml(ToolsIcon),
    user: toHtml(UserCircleIcon),
    edit: toHtml(EditIcon),
    medal: toHtml(MedalIcon),
    gamepad: toHtml(IoGameController),
    rocket: toHtml(IoRocket),
    coin: coinIconHtml,
    chest: toHtml(ChestIcon),
} as const;
