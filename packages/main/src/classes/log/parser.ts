import {readFileSync} from 'fs';
import {difference} from 'lodash';
import Line from './line';

export default class LogParser {
    /**
     * Array containing lines already processed previously
     *
     * @protected
     */
    protected processed: string[] = [];
    /**
     * Array containing new unprocessed lines
     *
     * @protected
     */
    protected unprocessed: string[] = [];
    /**
     * Array containing all lines currently in the log file
     *
     * @protected
     */
    protected lines: string[] = [];

    /**
     * The setInterval handle
     *
     * @protected
     */
    protected intervalHandle: NodeJS.Timer;

    protected constructor(readonly path: string) {
        const handle = (this.intervalHandle = setInterval(() => {
            try {
                this.lines = readFileSync(path, {encoding: 'utf8'}).split('\r\n');
                this.unprocessed = difference(this.lines, this.processed);

                // process the lines here
                this.unprocessed.forEach(line => {
                    new Line(line);

                    this.processed.push(line);
                });
            } catch (e) {
                console.log(e);
                clearInterval(handle);
            }
        }, 1000));
    }

    public static load(path: string) {
        return new LogParser(path);
    }

    public clear() {
        clearInterval(this.intervalHandle);
    }
}
