
export class EspciesModel  {
    
    id?: string;
    serialFrom?: number;
    serialTo?: number;
    createdAt?: string;
    linkedDigitadorId?: string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.serialFrom = json.serialFrom;
            this.serialTo = json.serialTo;
            this.createdAt = json.createdAt;
            this.linkedDigitadorId = json.linkedDigitadorId;
        }
    }

    fromJson(json: any): EspciesModel {
        this.id = json.id;
        this.serialFrom = json.serialFrom;
        this.serialTo = json.serialTo;
        this.createdAt = json.createdAt;
        this.linkedDigitadorId = json.linkedDigitadorId;
        return this;
    }

    toJson(): any {
        return {
            id: this.id,
            serialFrom: this.serialFrom,
            serialTo: this.serialTo,
            createdAt: this.createdAt,
            linkedDigitadorId: this.linkedDigitadorId
        }
    }
}

