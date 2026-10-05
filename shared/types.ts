export type User = {
    id: string,
    name: string,
    passwordHash:string,
}

export type Stop = {
    id: number,
    name: string,
    lines: string, // "A;B"
    is_transfer: boolean,
    transfer_lines: string | null, // "A;B"
    x: number,
    y: number,
    wheelchair_accessible: boolean, // step-free
    has_shelter: boolean,
    has_bench: boolean,
    has_ticket_machine: boolean,
    has_display: boolean,
    image_url: string | null,
}

