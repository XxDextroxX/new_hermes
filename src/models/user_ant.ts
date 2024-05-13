
export class UserAnt{
    id?: string;
    username?: string;
    owner?: string;
    createdAt?: string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.username = json.username;
            this.owner = json.owner;
            this.createdAt = json.createdAt;
        }
      
    }

    fromJson (json: any): UserAnt {
        this.id = json.id;
        this.username = json.username;
        this.owner = json.owner;
        this.createdAt = json.createdAt;
        return this;
    }

    toJson (): any {
        return {
            id: this.id,
            username: this.username,
            owner: this.owner,
            createdAt: this.createdAt,
    
        }
    }
}