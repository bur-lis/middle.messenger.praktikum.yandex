import { Block } from "./block";

export type Children = Record<string, Block>;
export type Props = Record<string, PropsValue>;
export type PropsValue = Primitives | Callback | Block | Record<string, Primitives | Callback | PropsObject | PropsObject[]>

export type Listeners = Record<string, Array<Callback>>;
export type Callback = (args: Event | Props | undefined) => void;

export type PropsObject = Record<string, Primitives>;
type Primitives = string | boolean | number;

export type HTTPMethod = (url: string, options?: Options | { timeout?: number }) => Promise<unknown>
export interface Options { method?: string, data?: RequestData, timeout?: number }
export type RequestData = Record<string, string | number | number[]> | FormData | XMLHttpRequestBodyInit;
export interface Response {
    status: number,
    response: string,
    responseURL: string
};


export type Indexed<T = unknown> = {
    [key: string]: Indexed<T> | T;
};

export interface User {
    id: number,
    login: string,
    avatar: string
};

export interface Message {
    time: string;
    message: string;
    output: boolean
};

export interface Chat {
    id: number,
    title: string,
    avatar: string
};

export interface SelectedChat {
    id: number,
    title: string,
    token:string,
    companion:boolean,
    users:User[]
};

