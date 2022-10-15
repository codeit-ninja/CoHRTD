import type Emittery from 'emittery';
import type {CoHGameEvents} from 'App/Core/Game';
import Lobby from './game/lobby';

export default class Game {
    protected lobby?: Lobby;

    constructor(readonly events: Emittery<CoHGameEvents>) {
        events.on('populating', () => this.createLobby());

        events.on('gameStarted', () => this.lobby?.evaluateLobby());
        events.on('playerPopulated', player => this.lobby?.addTempPopulatedPlayer(player));
        events.on('playerSteamInfo', player => this.lobby?.addTempPlayerSteamInfo(player));
        events.on('gameMap', map => this.lobby?.setMap(map));
        events.on('gameState', state => this.lobby?.setState(state));

        /**
         * @TODO for the future
         */
        //events.on('cpuPlayerType', (difficulty) => this.lobby?.setCpuDifficultyLevel(difficulty));

        // Delete lobby instance when game has ended
        events.on('gameEnded', () => this.destroy());
    }

    public createLobby() {
        this.lobby = new Lobby();
    }

    public destroy() {
        delete this.lobby;
    }

    public getLobby() {
        return this.lobby;
    }
}
