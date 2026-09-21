export class EmitUserCreateDTO {
    'userId': string
    'userName': string
}

export class EmitUserUpdateDTO {
    'userId': string
    'userName'?: string
    'status'?: string
}

export class EmitUserDeleteDTO {
    'userId': string
}