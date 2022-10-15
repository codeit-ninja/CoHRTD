export default class Stats {
    constructor(
        public statgroupId: number,
        public leaderboardId: number,
        public wins: number,
        public losses: number,
        public streak: number,
        public disputes: number,
        public drops: number,
        public rank: number,
        public ranktotal: number,
        public ranklevel: number,
        public regionrank: number,
        public regionranktotal: number,
        public lastmatchdate: number,
    ) {}
}
