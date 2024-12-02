import { WSEvents, WSService } from '../core/my_socket';
import  store  from '../core/store';
import  ChatsControllers  from './chats-controller';

export interface IMessageRes {
    id: number;
    user_id: number;
    type: string;
    time: string;
    content: string;
    chat_id?: number;
    is_read?: boolean;
    file?: string | null;
}

function messageProcessing(message: IMessageRes, currentUserId: number) {
    return {
        role: currentUserId === message.user_id ? 'outgoing' : 'incoming',
        message: message.content,
    };
}

export class MessageController {
    static __instance: unknown;
    public ws?: WSService;

    constructor() {
        if (MessageController.__instance) {
            return MessageController.__instance as MessageController;
        }
        MessageController.__instance = this;
    }

    private subscribeMessages() {
        if (!this.ws) {
            throw new Error('Socket is not connected');
        }
        const currentUser = store.getState().user;

        this.ws.on(WSEvents.Message, data => {
            let messagesStore = store.getState().message || [];

            if (Array.isArray(data)) {
                const messages = data?.map(item => {
                    return messageProcessing(item, currentUser!.id);
                });
                messagesStore = messagesStore.concat(messages);
            } else {
                messagesStore.unshift(messageProcessing(data, currentUser!.id));
                ChatsControllers.get_chats().then();
            }
            store.set('messages', messagesStore);
        });
    }

    async connect() {
        if (this.ws) {
            this.ws.close();
            store.set('messages', []);
        }
        const user = store.getState().user;
        const selected_chat = store.getState().selected_chat;
        // if (!user || !selected_chat) {
        //     throw new Error('Socket is not connected');
        // }
///${user.id}/

        const url = `wss://ya-praktikum.tech/ws/chats/ ${selected_chat.id}/${selected_chat.token}`;
        console.log(url)
        this.ws = new WSService(url);

        await this.ws.connect();
        this.subscribeMessages();
        this.ws?.send({
            content: '0',
            type: 'get old',
        });
    }

    send(message: string) {
        if (!this.ws) {
            throw new Error('Socket is not connected');
        }
        this.ws!.send({
            content: message,
            type: 'message',
        });
    }
}

export default new MessageController();