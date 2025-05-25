import { markRaw } from "vue";

import Logo2024Component from "./logo2024.svg?component";
import DiamondIconComponent from "./diamond.svg?component";
import TrophyIconComponent from "./trophy.svg?component";
import MoneyIconComponent from "./dollar-sign.svg?component"; // Assuming this is the correct filename

export const Logo2024 = markRaw(Logo2024Component);
export const DiamondIcon = markRaw(DiamondIconComponent);
export const TrophyIcon = markRaw(TrophyIconComponent);
export const MoneyIcon = markRaw(MoneyIconComponent);
