import { Block } from "./block";

export type Children = Record<string, Block>;
export type Props = Record<string, PropsValue>;
export type PropsValue = Primitives | Callback | Block | Record<string, Primitives | Callback | PropsObject | PropsObject[]>

export type Listeners = Record<string, Array<Callback>>;
export type Callback = (args: Event | Props | undefined) => void;

type PropsObject = Record<string, Primitives>;
type Primitives = string | boolean | number;

export type HTTPMethod = (url: string, options: Options) => Promise<unknown>
export interface Options { method: string, data?: RequestData, timeout?: number }
type RequestData =  Record<string, string> | FormData | XMLHttpRequestBodyInit;

