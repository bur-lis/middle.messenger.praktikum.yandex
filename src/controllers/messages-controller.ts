import { WSEvents, WSService } from '../core/my_socket';
import store from '../core/store/store';
import chats_controller from './chats-controller';

import { User, Message, SelectedChat } from '../core/type';

export class MessageController {
    static __instance: unknown;
    public ws?: WSService;

    constructor() {
        if (MessageController.__instance) {
            return MessageController.__instance as MessageController;
        }
        MessageController.__instance = this;
    }

    private listen_messages() {
        if (!this.ws) {
            throw new Error('Socket is not connected');
        }
        const user_id = (store.getState().user as User).id;

        this.ws.on(WSEvents.Message, data => {
            const all_messages = store.getState().message ? store.getState().message as Record<string, Message[]> : {};
            let data_array;
            if (Array.isArray(data)) data_array = data;
            else {
                data_array = [data];
                chats_controller.get_chats();
            }
            for (let i = data_array.length - 1; i > -1; i--) {
                const message = data_array[i];
                const output: boolean = message.user_id === user_id;
                const datatime_array = message.time.split('T');
                if (!all_messages[datatime_array[0]]) all_messages[datatime_array[0]] = []
                all_messages[datatime_array[0]].push({
                    output: output,
                    time: datatime_array[1].split('+')[0].slice(0, 5),
                    message: message.content

                })
            }
            store.set('message', all_messages);
        });
    }

    async connect() {

        const user = store.getState().user as User;
        const selected_chat = store.getState().selected_chat as SelectedChat;
        const url = 'wss://ya-praktikum.tech/ws/chats/' +
            user.id + '/' + selected_chat.id + '/' + selected_chat.token;

        this.close();

        if (!user || !selected_chat) {
            throw new Error('Socket is not connected');
        }

        this.ws = new WSService(url);

        await this.ws.connect();
        this.listen_messages();
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

    close() {
        if (this.ws) {
            store.set('message', null);
            this.ws.close();
        }
    }
}

export default new MessageController();

