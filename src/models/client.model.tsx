export enum ClientType {
    IP = 'IP',
    UL = 'UL',
    IPFormated = 'Индивидуальный предприниматель',
    ULFormated = 'Юридическое лицо',
}

export interface Client {
    key?: number;
    id: number;
    tin: string;
    type: ClientType | ClientType[];
    name: string;
    createDate: string;
    updateDate: string;
    founders: any[];
}

export type ClientState = {
    clients: Client[];
    visible: boolean;
    currentClient: Client | null | undefined;
}