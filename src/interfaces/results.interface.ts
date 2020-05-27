export interface statusResponse {
    done: boolean,
    message: string,
    code: number
}

export interface dataResponse<T> {
    done: boolean,
    message: string,
    code: number,
    data: T
}