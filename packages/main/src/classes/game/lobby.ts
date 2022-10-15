import type { CoHPlayerWithStats, CoHPlayerPopulated, CoHPlayerSteamInfo, CoHGameState } from 'App/Core/Game';
import { app } from 'core';
import { filter, groupBy } from 'lodash';

export default class Lobby {
    /**
     * Current state of the game
     * 
     * @property
     * @public
     */
    public state: 'OFFLINE'|'ONLINE'|'IN_GAME' = 'OFFLINE';
    /**
     * Has game started?
     * 
     * @property
     * @public
     */
    public started = false;
    /**
     * Current map
     * 
     * @property
     * @public
     */
    public map?: string;
    /**
     * Array with players in the lobby
     * 
     * @property
     * @public
     */
    public players: Partial<CoHPlayerWithStats>[] = [];
    /**
     * Promises to resolve
     * 
     * @property
     * @protected
     */
    protected promises: Promise<any>[] = [];
    /**
     * Temp arrays to hold raw player data
     * 
     * @property
     * @protected
     */
    protected temp = {
        playersPopulated: [] as CoHPlayerPopulated[],
        playersSteamInfo: [] as CoHPlayerSteamInfo[]
    }
    /**
     * Track current index when we set the CPU
     * difficulty type (easy, normal, hard, expert)
     * 
     * @property
     * @protected
     */
    protected cpuPlayerCurrentIndex = 0;

    /**
     * Change the current state of the game
     * 
     * @param state 
     */
    public setState(state: 'ONLINE'|'OFFLINE'|'IN_GAME') {
        this.state = state;
    }

    /**
     * Set map
     * 
     * @param map 
     */
     public setMap(map: string) {
        this.map = map;
    }

    /**
     * @todo maybe in the future implement this
     */
    // public async setCpuDifficultyLevel(difficulty: string) {
    //     try {
    //         await Promise.all(this.promises);
    //     } catch(e) {
    //         console.log('Failed to resolve all promises');
    //     }

    //     const cpuPlayers = this.players.filter(player => player.cpu);

    //     if( cpuPlayers ) {
    //         cpuPlayers[this.cpuPlayerCurrentIndex].difficulty = difficulty;

    //         this.cpuPlayerCurrentIndex++;
    //     }
    // }

    /**
     * Add populated player into a temp array
     * to evaluate later.
     * 
     * @param player
     * @returns {void} 
     */
    public addTempPopulatedPlayer( player: CoHPlayerPopulated ) {        
        // Somehow already exists, skipping
        if( this.temp.playersPopulated.find(p => p.playerIndex === player.playerIndex) ) {
            return;
        }

        this.temp.playersPopulated.push({...player, cpu: player.playerId === -1});
    }

    /**
     * Add players steam info into a temp array
     * to evaluate later.
     * 
     * @param player 
     * @returns {void}
     */
    public addTempPlayerSteamInfo( player: CoHPlayerSteamInfo ) {
        // Somehow already exists, skipping
        if( this.temp.playersSteamInfo.find(p => p.steamId === player.steamId) ) {
            return;
        }

        this.temp.playersSteamInfo.push(player);
    }

    /**
     * Is fired on `game-started` event.
     * 
     * Creates a new lobby and fetches players.
     */
    public async evaluateLobby() {
        this.promises = this.temp.playersSteamInfo.map(async p => {
            try {
                const [profile, stats] = await this.fetchPlayerData(p.steamId);
                const player = this.temp.playersPopulated.find(p => p.playerId === profile.profileId)
                
                if( ! player || ! profile ) {
                    return;
                }

                this.players.push({ ...profile, ...p, ...player, stats });
            } catch(e) {
                console.log(e);
            }
        })
        
        try {
            // Wait for player info
            await Promise.all(this.promises);
        } catch(e) {
            console.log('Something went wrong resolving all promises.');
        }

        // Don't forget to add Ai into the players array
        this.players.push(...this.temp.playersPopulated.filter(player => player.playerId === -1));
        this.started = true;
    }

    /**
     * Reset state of game to initial state
     */
    public async gameHasEnded() {
        this.started = false;
        this.players = [];
        this.promises = [];
        this.map = '';
        this.temp.playersPopulated = [];
        this.temp.playersSteamInfo = [];
        this.cpuPlayerCurrentIndex = 0;
    }

    /**
     * Fetch player data from relic api
     * 
     * @param steamId 
     * @returns {Promise<[memberProfile, LeaderboardStats]>}
     */
    public async fetchPlayerData(steamId: string) {
        return await Promise.all([app.api.getProfile(steamId), app.api.getStats(steamId)]);
    }

    /**
     * Returns current state of the game
     * 
     * @returns {CoHGameState}
     */
     public getGameInfo(): CoHGameState {
        return {
            state: this.state,
            started: this.started,
            players: this.players,
            map: this.map,
            get teams() {
                return groupBy(this.players.filter(player => player.type !== 6), 'team')
            }
        }
    }
}