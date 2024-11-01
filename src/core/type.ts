import { Block } from "./block";

export type Children = Record<string, Block>;
export type Props = Record<string, PropsValue>;
export type PropsValue = Primitives | Callback | Block | Record<string, Primitives | Callback | PropsObject | PropsObject[]>

export type Listeners = Record<string, Array<Callback>>;
export type Callback = (args: Event | Props | undefined) => void;

type PropsObject = Record<string, Primitives>;
type Primitives = string | boolean | number;
