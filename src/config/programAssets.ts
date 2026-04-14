import { StaticImageData } from 'next/image';
import tia_logo from '@/assets/programs/trenno_ia_logo.webp';
import tia_summer_logo from '@/assets/programs/trenno_ia_summer_logo.webp';
import tmd_logo from '@/assets/programs/trenno_mark_digital_logo.webp';
import tia_pool_logo from '@/assets/programs/trenno_ia_pool_logo.webp';
import background_tia from '@/assets/background/stannum_game_trophy.webp';
import background_tmd from '@/assets/background/stannum_game_trophy.webp';
import background_tia_summer from '@/assets/background/background_tia_summer.webp';
import background_tia_pool from '@/assets/background/stannum_game_trophy.webp';

export const programAssets: Record<string, { logo: StaticImageData; background: StaticImageData }> = {
    tia: { logo: tia_logo, background: background_tia },
    tia_summer: { logo: tia_summer_logo, background: background_tia_summer },
    tmd: { logo: tmd_logo, background: background_tmd },
    tia_pool: { logo: tia_pool_logo, background: background_tia_pool },
};
