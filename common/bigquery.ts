export type Dataset = {
    id: string;
};

export type Table = {
    id: string;
    type: 'TABLE' | 'VIEW' | 'EXTERNAL';
};
