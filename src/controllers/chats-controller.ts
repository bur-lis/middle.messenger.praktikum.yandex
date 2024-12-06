import chats_api from "../api/chats-api"
import { Router } from "../core/my_router";
import { Response } from "../core/type";
import messages_controller from "./messages-controller";
import store from "../core/store/store";
import { Chat, SelectedChat, User, HttpStatus } from "../core/type";

const router = new Router('#app');

export class ChatsController {

    public async get_chats() {
        try {
            chats_api.get_all_chats({ offset: 0 }).then((response: Response) => {
                if (response.status === HttpStatus.OK) {
                    const chats = response.response;
                    store.set('chats', JSON.parse(chats))
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            throw new Error(error);
        }
    }

    public async create(title: string) {
        try {
            await chats_api.create_chat({ title: title }).then((response: Response) => {
                if (response.status === HttpStatus.OK) {
                    this.get_chats();
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            throw new Error(error);
        }
    }

    public async delete_chat() {
        try {
            messages_controller.close();
            const chat_id = (store.getState().selected_chat as SelectedChat).id;
            const request_data = { chatId: chat_id };
            chats_api.delete_chat(request_data).then((response: Response) => {
                if (response.status === HttpStatus.OK) {
                    store.set('selected_chat', null)
                    this.get_chats();
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            throw new Error(error);
        }
    }
    public async delete_user() {
        try {
            const selected_chat = store.getState().selected_chat as SelectedChat;
            const chat_id = selected_chat.id;
            let users:number[] = [];
            selected_chat.users.forEach((user) => {if (user.id !== (store.getState().user as User).id) users.push(user.id) });
            const request_data = { chatId: chat_id, users: users };
            chats_api.delete_user(request_data).then((response: Response) => {
                if (response.status === HttpStatus.OK) {
                    this.get_selected_chat(chat_id, true)
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            throw new Error(error);
        }
    }

    public async add_user_in_chat(users: number[]) {
        try {
            const selected_chat = store.getState().selected_chat as SelectedChat;
            const chat_id = selected_chat.id;
            const request_data = { users: users, chatId: chat_id };

            chats_api.add_user(request_data).then((response: Response) => {
                if (response.status === HttpStatus.OK) {
                    this.get_selected_chat(chat_id, true);
                }
            })

        } catch (error) {
            throw new Error(error);
        }
    }

    public async get_selected_chat(chat_id: number, new_user = false) {
        const selected_chat_id = (store.getState().selected_chat as SelectedChat) ?
            (store.getState().selected_chat as SelectedChat).id
            : null;
        if (!new_user && selected_chat_id === chat_id) return;
        try {
            await chats_api.get_token_chat(chat_id).then((response: Response) => {
                if (response.status === HttpStatus.OK) {

                    const chats = store.getState().chats as Chat[];
                    const chat = chats.find((chat) => chat.id === chat_id);

                    const token = JSON.parse(response.response).token;

                    chats_api.get_user(chat_id).then((response: Response) => {
                        if (response.status === HttpStatus.OK) {
                            const users = JSON.parse(response.response);
                            store.set('selected_chat', {
                                users: users,
                                companion: users.length > 1,
                                id: chat?.id,
                                title: chat?.title,
                                token: token,
                            });
                            if (users.length > 1) messages_controller.connect();
                        }
                    })
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            throw new Error(error);
        }

    }

}

export default new ChatsController();

