export default class Profile {
    constructor(
        public profileId: number,
        public name: string,
        public alias: string,
        public personalStatgroupId: number,
        public xp: number,
        public level: number,
        public leaderboardregionId: number,
        public country: string
    ) {}
}