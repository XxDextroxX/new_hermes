

export class ProvidersModel {
    id?:           string;
    name?:         string;
    details?:      string;
    registeredBy?: string;
    deletedAt?:    string;
    createdAt?:    string;
    updatedAt?:    string;
    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.name = json.name;
            this.details = json.details;
            this.registeredBy = json.registeredBy;
            this.deletedAt = json.deletedAt;
            this.createdAt = json.createdAt;
            this.updatedAt = json.updatedAt;
        }
    }


    fromJson(json: any): ProvidersModel {
        return new ProvidersModel(json);
    }

    toJson(): any {
        return {
            id:           this.id,
            name:         this.name,
            details:      this.details,
            registeredBy: this.registeredBy,
            deletedAt:    this.deletedAt,
            createdAt:    this.createdAt,
            updatedAt:    this.updatedAt
        };
    }


}
