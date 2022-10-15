import { app } from 'core';
import { TypedRegEx } from 'typed-regex';

const events = {
    CAMPAIGN_STARTED: TypedRegEx('APP -- Game Start Campaign Mission'),
    LOBBY_CREATED: TypedRegEx('GameSetupForm - Starting game'),
    LOBBY_MAP: TypedRegEx('\\*\\*\\* Beginning mission (?<map>.+(?=\\s\\())'),
    LOBBY_TYPE: TypedRegEx('GameSetupForm - UpdateMatchType: Setting match type to \\d+: (?<type>\\w+)'),
    // You have to multiply this by two, as this is the team size
    LOBBY_PLAYER_COUNT: TypedRegEx('PopulateGameInfoInternal - Team #0 Player Count: (?<playerCount>\\d+)'),
    LOBBY_GAME_STARTED: TypedRegEx('GAME -- Starting mission'),
    LOBBY_GAME_ENDED: TypedRegEx('GAME -- Ending mission'),
    LOBBY_PLAYER_POPULATED: TypedRegEx('Player #(?<index>\\d+) - \\[Id (?<id>\\d+|-1)?, Type (?<type>\\d+), Team (?<team>\\d+), Race (?<race>\\d+)]'),
    LOBBY_PLAYER_STEAM_INFO: TypedRegEx('\\/steam\\/(?<steamId>\\d+)], slot =\\s+(?<slot>\\d+),\\s+ranking\\s+=\\s+\\s+(?<rank>\\d+|-\\d+)'),
    PROCESS_STARTED: TypedRegEx('RELICCOH started'),
    PROCESS_ENDED: TypedRegEx('Application closed'),
}

export default class Line {
    constructor(protected line: string) {
        const LOBBY_CREATED = events.LOBBY_CREATED.isMatch(line);
        const LOBBY_PLAYER_POPULATED = events.LOBBY_PLAYER_POPULATED.captures(line);

        if( LOBBY_PLAYER_POPULATED ) console.log(LOBBY_PLAYER_POPULATED);
    }
}
