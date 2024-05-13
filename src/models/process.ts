
export class ProcessModel{

    id?:                string;
    plate?:             string;
    observations?:      string;
    responsibleUserId?: string;
    requesterUserId?:   string;
    providerId?:        string;
    antUserId?:         string;
    date?:              string;
    serial?:            string;
    createdAt?:         string;
    updatedAt?:         string;
    responsibleUser?:   ResponsibleUser;
    requesterUser?:     RequesterUserModel;
    provider?:          Provider;
    antUser?:           AntUser;
    antProcesses?:      AntProcesses[];

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.plate = json.plate;
            this.observations = json.observations;
            this.responsibleUserId = json.responsibleUserId;
            this.requesterUserId = json.requesterUserId;
            this.providerId = json.providerId;
            this.antUserId = json.antUserId;
            this.date = json.date;
            this.serial = json.serial;
            this.createdAt = json.createdAt;
            this.updatedAt = json.updatedAt;
            this.responsibleUser = new ResponsibleUser().fromJson(json.responsibleUser);
            this.requesterUser = new RequesterUserModel().fromJson(json.requesterUser);
            this.provider = new Provider().fromJson(json.provider);
            this.antUser = new AntUser().fromJson(json.antUser);
            this.antProcesses = json.antProcesses;
        }
    }

    fromJson(json: any): ProcessModel {
        this.id = json.id;
        this.plate = json.plate;
        this.observations = json.observations;
        this.responsibleUserId = json.responsibleUserId;
        this.requesterUserId = json.requesterUserId;
        this.providerId = json.providerId;
        this.antUserId = json.antUserId;
        this.date = json.date;
        this.serial = json.serial;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
        this.responsibleUser = new ResponsibleUser().fromJson(json.responsibleUser);
        this.requesterUser = json.requesterUser ? new RequesterUserModel().fromJson(json.requesterUser) : undefined;
        this.provider = new Provider().fromJson(json.provider);
        this.antUser = new AntUser().fromJson(json.antUser);
        this.antProcesses = json.antProcesses;
        return this;
    }

}

class AntUser{

    id?:        string;
    username?:  string;
    owner?:     string;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.username = json.username;
            this.owner = json.owner;
            this.deletedAt = json.deletedAt;
            this.createdAt = json.createdAt;
            this.updatedAt = json.updatedAt;
        }
    }

    fromJson(json: any): AntUser {
        this.id = json.id;
        this.username = json.username;
        this.owner = json.owner;
        this.deletedAt = json.deletedAt;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
        return this;
    }

    toJson(): any {
        return {
            id: this.id,
            username: this.username,
            owner: this.owner,
            deletedAt: this.deletedAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

}

class Provider{

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

    fromJson(json: any): Provider {
        this.id = json.id;
        this.name = json.name;
        this.details = json.details;
        this.registeredBy = json.registeredBy;
        this.deletedAt = json.deletedAt;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
        return this;
    }
}

class ResponsibleUser{

    id?:        string;
    name?:      string;
    email?:     string;
    username?:  string;
    role?:      string;
    isActive?:  boolean;
    createdAt?: string;
    updatedAt?: string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.name = json.name;
            this.email = json.email;
            this.username = json.username;
            this.role = json.role;
            this.isActive = json.isActive;
            this.createdAt = json.createdAt;
            this.updatedAt = json.updatedAt;
        }
    }

    fromJson(json: any): ResponsibleUser {
        this.id = json.id;
        this.name = json.name;
        this.email = json.email;
        this.username = json.username;
        this.role = json.role;
        this.isActive = json.isActive;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
        return this;
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            username: this.username,
            role: this.role,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}

class RequesterUserModel{	
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

    fromJson(json: any): RequesterUserModel {
        this.id = json.id;
        this.name = json.name;
        this.registeredBy = json.registeredBy;
        this.deletedAt = json.deletedAt;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
        return this;
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            registeredBy: this.registeredBy,
            deletedAt: this.deletedAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}

export class AntProcesses{

    id?:        string;
    procedureNumber?: string;
    processType?:      string;
    antUsername?:      string;
    status?:           string;
    identification?:  string;
    name?:             string;
    requestDate?:      string;
    finishedDate?:     string;
    plate?:            string;
    especie?:          string;
    adhesivo?:         string;
    isActive?:         boolean;
    createdAt?:        string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.procedureNumber = json.procedureNumber;
            this.processType = json.processType;
            this.antUsername = json.antUsername;
            this.status = json.status;
            this.identification = json.identification;
            this.name = json.name;
            this.requestDate = json.requestDate;
            this.finishedDate = json.finishedDate;
            this.plate = json.plate;
            this.especie = json.especie;
            this.adhesivo = json.adhesivo;
            this.isActive = json.isActive;
            this.createdAt = json.createdAt;
        }
    }

    fromJson(json: any): AntProcesses {
        this.id = json.id;
        this.procedureNumber = json.procedureNumber;
        this.processType = json.processType;
        this.antUsername = json.antUsername;
        this.status = json.status;
        this.identification = json.identification;
        this.name = json.name;
        this.requestDate = json.requestDate;
        this.finishedDate = json.finishedDate;
        this.plate = json.plate;
        this.especie = json.especie;
        this.adhesivo = json.adhesivo;
        this.isActive = json.isActive;
        this.createdAt = json.createdAt;
        return this;
    }
}



