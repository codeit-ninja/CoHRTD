import type { LeaderboardStats } from 'App/Core/Relic';

/**
 * ### Statgroup `leaderboard_id`
 * 
 * #### Basic match
 * 0    = us  
 * 1    = heer  
 * 2    = brit  
 * 3    = panzer    
 * 
 * #### Ranked 1 VS. 1
 * 4    = us    
 * 5    = heer  
 * 6    = brit  
 * 7    = panzer    
 * 
 * #### Ranked 2 VS. 2
 * 8    = us    
 * 9    = heer  
 * 10   = brit  
 * 11   = panzer    
 * 
 * #### Ranked 3 VS. 3
 * 12   = us    
 * 13   = heer  
 * 14   = brit  
 * 15   = panzer    
 * 
 * #### Ranked 4 VS. 4
 * 16   = us    
 * 17   = heer  
 * 18   = brit  
 * 19   = panzer    
 * 
 * #### Skirmish
 * 42   = us    
 * 43   = heer  
 * 44   = brit  
 * 45   = panzer    
 * 
 * #### Operation: Assault
 * 46   = us    
 * 47   = heer  
 * 
 * #### Operation: Panzerkrieg
 * 50   = us    
 * 51   = heer  
 * 
 * #### Operation: Stonewall
 * 54   = us    
 * 55   = heer  
 */
export default class Statgroup {
    public leaderboardIds = {
        us: [0, 4, 8, 12, 16, 42, 46, 50, 54],
        heer: [1, 5, 9, 13, 17, 43, 47, 51, 55],
        brit: [2, 6, 10, 14, 18, 44],
        panzer: [3, 7, 11, 15, 19, 45]
    }
    
    constructor(readonly statgroup: LeaderboardStats) {}

    public get faction() {
        return this.getFaction();
    }

    public get ranklevel() {
        return this.statgroup.ranklevel === -1 ? '' : 'Lv. ' + this.statgroup.ranklevel;
    }

    public get rankLevelIcon() {
        return this.getFaction() + '_' + String(this.statgroup.ranklevel === -1 ? 1 : this.statgroup.ranklevel).padStart(2, '0') + '.png';
    }

    public get mode() {
        return this.getMode();
    }

    public getFaction() {
        if( this.leaderboardIds.us.includes(this.statgroup.leaderboardId) ) {
            return 'us';
        }

        if( this.leaderboardIds.heer.includes(this.statgroup.leaderboardId) ) {
            return 'heer';
        }

        if( this.leaderboardIds.brit.includes(this.statgroup.leaderboardId) ) {
            return 'brit';
        }

        if( this.leaderboardIds.panzer.includes(this.statgroup.leaderboardId) ) {
            return 'panzer';
        }

        return 'us';
    }

    public getMode() {
        if( [0, 1, 2, 3].includes(this.statgroup.leaderboardId) ) {
            return 'Basic Match';
        }

        if( [4, 5, 6, 7].includes(this.statgroup.leaderboardId) ) {
            return '1vs1';
        }

        if( [8, 9, 10, 11].includes(this.statgroup.leaderboardId) ) {
            return '2vs2';
        }

        if( [12, 13, 14, 15].includes(this.statgroup.leaderboardId) ) {
            return '3vs3';
        }

        if( [16, 17, 18, 19].includes(this.statgroup.leaderboardId) ) {
            return '4vs4';
        }

        if( [42, 43, 44, 45].includes(this.statgroup.leaderboardId) ) {
            return 'Skirmish';
        }

        if( [46, 47].includes(this.statgroup.leaderboardId) ) {
            return 'Operation: Assault';
        }

        if( [50, 51].includes(this.statgroup.leaderboardId) ) {
            return 'Operation: Panzerkrieg';
        }

        if( [54, 55].includes(this.statgroup.leaderboardId) ) {
            return 'Operation: Stonewall';
        }
    }
}