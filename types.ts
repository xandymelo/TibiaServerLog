export interface IDamageTakenByCreatureKind {
    [creatureKind: string]: number;
}

export interface ILoot {
    [item: string]: number;
}
export interface IOutputData {
    hitpointsHealed: number;
    damageTaken: {
      total: number;
      totalUnknown: number;
      byCreatureKind: IDamageTakenByCreatureKind;
    };
    experienceGained: number;
    loot: ILoot;
    blackKnightHealth: number;
}
