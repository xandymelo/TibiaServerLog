import { getOutputData } from './tibiaServerLog';

describe('getOutputData', () => {
  it('must generate the hitpointsHealed correctly', () => {
    const text = "18:46 You healed yourself for 282 hitpoints.\n18:46 You healed yourself for 200 hitpoints.\n";
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(482);
    expect(resultado.damageTaken.total).toEqual(0);
    expect(resultado.damageTaken.totalUnknown).toEqual(0);
    expect(resultado.damageTaken.byCreatureKind).toEqual({});
    expect(resultado.experienceGained).toEqual(0);
    expect(resultado.loot).toEqual({});
    expect(resultado.blackKnightHealth).toEqual(0);
  });
  it('must generate the JSON correctly when text is empty', () => {
    const text = '';
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(0);
    expect(resultado.damageTaken.total).toEqual(0);
    expect(resultado.damageTaken.totalUnknown).toEqual(0);
    expect(resultado.damageTaken.byCreatureKind).toEqual({});
    expect(resultado.experienceGained).toEqual(0);
    expect(resultado.loot).toEqual({});
    expect(resultado.blackKnightHealth).toEqual(0);
  });
  it('must generate the loot correctly', () => {
    const text = "18:46 Loot of a bonelord: 16 gold coins, a steel shield.\n18:46 Loot of a cyclops: 11 gold coins.\n";
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(0);
    expect(resultado.damageTaken.total).toEqual(0);
    expect(resultado.damageTaken.totalUnknown).toEqual(0);
    expect(resultado.damageTaken.byCreatureKind).toEqual({});
    expect(resultado.experienceGained).toEqual(0);
    expect(resultado.loot).toEqual({ "gold": 27, "steel shield": 1 });
    expect(resultado.blackKnightHealth).toEqual(0);
  });

  it('must generate the damageTaken correctly', () => {
    const text = "15:43 You lose 31 hitpoints due to an attack by a cyclops.\n15:43 You lose 70 hitpoints due to an attack by a cyclops.\n";
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(0);
    expect(resultado.damageTaken.total).toEqual(101);
    expect(resultado.damageTaken.byCreatureKind).toEqual({cyclops: 101});
    expect(resultado.damageTaken.totalUnknown).toEqual(0);
    expect(resultado.experienceGained).toEqual(0);
    expect(resultado.loot).toEqual({});
    expect(resultado.blackKnightHealth).toEqual(0);
  });

  it('must generate the damageTaken correctly when there is no creatureKind', () => {
    const text = "15:41 You lose 1 hitpoint.\n15:41 You lose 67 hitpoint.\n";
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(0);
    expect(resultado.damageTaken.total).toEqual(68);
    expect(resultado.damageTaken.totalUnknown).toEqual(68);
    expect(resultado.experienceGained).toEqual(0);
    expect(resultado.damageTaken.byCreatureKind).toEqual({});
    expect(resultado.loot).toEqual({});
    expect(resultado.blackKnightHealth).toEqual(0);
  });

  it('must generate the experienceGained correctly', () => {
    const text = "15:43 You gained 150 experience points.\n15:43 You gained 200 experience points.\n";
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(0);
    expect(resultado.damageTaken.total).toEqual(0);
    expect(resultado.damageTaken.totalUnknown).toEqual(0);
    expect(resultado.damageTaken.byCreatureKind).toEqual({});
    expect(resultado.experienceGained).toEqual(350);
    expect(resultado.loot).toEqual({});
    expect(resultado.blackKnightHealth).toEqual(0);
  });

  it('must generate the blackKnightHealth correctly', () => {
    const text ="18:46 A Black Knight loses 328 hitpoints due to your attack.\n18:46 A Black Knight loses 150 hitpoints due to your attack.\n";
    const resultado = getOutputData(text);
    expect(resultado.hitpointsHealed).toEqual(0);
    expect(resultado.damageTaken.total).toEqual(0);
    expect(resultado.damageTaken.totalUnknown).toEqual(0);
    expect(resultado.damageTaken.byCreatureKind).toEqual({});
    expect(resultado.experienceGained).toEqual(0);
    expect(resultado.loot).toEqual({});
    expect(resultado.blackKnightHealth).toEqual(478);
  });


});