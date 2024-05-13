

export class RequesterModel {

    id?:           string;
    name?:         string;
    registeredBy?: string;
    deletedAt?:    string;
    createdAt?:    string;
    updatedAt?:    string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.name = json.name;
            this.registeredBy = json.registeredBy;
            this.deletedAt = json.deletedAt;
            this.createdAt = json.createdAt;
            this.updatedAt = json.updatedAt;
        }
    }

    fromJson(json: any): RequesterModel {
        return new RequesterModel(json);
    }

    toJson(): any {
        return {
            id:           this.id,
            name:         this.name,
            registeredBy: this.registeredBy,
            deletedAt:    this.deletedAt,
            createdAt:    this.createdAt,
            updatedAt:    this.updatedAt
        };
    }

}
