export enum Factions {
    Us = 'USA',
    Wehr = 'Wehrmacht',
    Pe = 'Panzer Elite',
    Brit = 'British'
}

export enum MatchTypes {
    '1v1' = '1vs1',
    '2v2' = '2vs2',
    '3v3' = '3vs3',
    '4v4' = '4vs4',
    Skirmish = 'Skirmish',
    Basic = 'Basic Match',
    OA = 'Operation: Assault',
    OPK = 'Operation: Panzerkrieg',
    OSW = 'Operation: Stonewall',
}

export const factions = [
    {
        ids: [0, 4, 8, 12, 16, 42, 46, 50, 54],
        faction: Factions.Us
    },
    {
        ids: [1, 5, 9, 13, 17, 43, 47, 51, 55],
        faction: Factions.Wehr
    },
    {
        ids: [2, 6, 10, 14, 18, 44],
        faction: Factions.Brit
    },
    {
        ids: [3, 7, 11, 15, 19, 45],
        faction: Factions.Pe
    }
]

export const matchTypes = [
    {
        ids: [4, 5, 6, 7],
        type: MatchTypes['1v1']
    },
    {
        ids: [8, 9, 10, 11],
        type: MatchTypes['2v2']
    },
    {
        ids: [12, 13, 14, 15],
        type: MatchTypes['3v3']
    },
    {
        ids: [16, 17, 18, 19],
        type: MatchTypes['4v4']
    },
    {
        ids: [0, 1, 2, 3],
        type: MatchTypes.Basic
    },
    {
        ids: [42, 43, 44, 45],
        type: MatchTypes.Skirmish
    },
    {
        ids: [46, 47],
        type: MatchTypes.OA
    },
    {
        ids: [50, 51],
        type: MatchTypes.OPK
    },
    {
        ids: [54, 55],
        type: MatchTypes.OSW
    },
]