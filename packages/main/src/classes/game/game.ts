import type Lobby from '/@/classes/game/lobby';
import child_process from 'child_process';
import LogParser from '/@/classes/log/parser';

export default class Game {
    #isRunning = false;

    /**
     * Game constructor
     *
     * @param logPath
     * @param logParser
     * @param lobby
     */
    public constructor(public logPath: string, public logParser?: LogParser, public lobby?: Lobby) {
        this.isRunning = true;
        // setInterval( async () => this.isRunning = await this.isGameRunning('RelicCOH'), 1000);
    }

    protected async isGameRunning(processName: string): Promise<boolean> {
        const cmd = (() => {
            switch (process.platform) {
                case 'win32':
                    return 'tasklist';
                case 'darwin':
                    return 'ps -ax | grep ${processName}';
                case 'linux':
                    return 'ps -A';
                default:
                    return false;
            }
        })();

        if (!cmd) {
            return false;
        }

        return new Promise((resolve, reject) => {
            child_process.exec(cmd, (err: Error | null, stdout: string) => {
                if (err) reject(err);

                resolve(stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1);
            });
        });
    }

    /**
     * Setter `isRunning`
     *
     * Will load the `logParser` when property is set to `true`
     *
     * @param running
     */
    public set isRunning(running: boolean) {
        if (running && !this.logParser) {
            this.logParser = LogParser.load(this.logPath);
        }

        if (!running && this.logParser) {
            this.logParser.clear();

            delete this.logParser;
        }

        this.#isRunning = running;
    }

    /**
     * Getter `isRunning`
     */
    public get isRunning() {
        return this.#isRunning;
    }
}
