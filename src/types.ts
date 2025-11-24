export type Period = {
    id: number;
    name: string;
}

export type Post = {
    id: number;
    title: string;
    content: string;
    periodId: number;
    created: Date;
}
