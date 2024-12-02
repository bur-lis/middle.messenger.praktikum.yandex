import chats_api from "../api/chats-api"
import { Router } from "../core/my_router";
import { Response } from "../core/type";
import store from "../core/store";
import { Block } from "../core/block";
import { ValidateForm, GetJsonDataFromForm } from "../core/utils";

const router = new Router('#app');

export class ChatsController {

    public async get_chats() {
        try {
            chats_api.request({ offset: 0 }).then((response: Response) => {
                if (response.status === 200) {
                    const chats = response.response;
                    store.set('chats', JSON.parse(chats))
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            // Логика обработки ошибок
        }
    }

    public async create(title: string) {
        try {
            await chats_api.create({ title: title }).then((response: Response) => {
                if (response.status === 200) {
                    this.get_chats();
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            // Логика обработки ошибок
        }
    }

    // public async get_chats(login_block: Block) {
    //     try {
    //         // Запускаем крутилку  

    //         if (ValidateForm(login_block)) {
    //             const request_data = GetJsonDataFromForm('register_form');
    //             chats_api.create(request_data).then((response: Response) => {
    //                 if (response.status === 200) {
    //                     router.go('/chats');
    //                 }
    //                 else router.rederectToError(response.status)
    //             })
    //         }
    //         else throw new Error('Форма регистрации не корректно заполнена');
    //         // Останавливаем крутилку

    //     } catch (error) {
    //         // Логика обработки ошибок
    //     }
    // }


    public async get_selected_chat(chat_id: string | typeof NaN) {
        if (!chat_id && store.getState().selected_chat?.id === chat_id) return;
        try {
            await chats_api.get_token_chat({ id: chat_id }).then((response: Response) => {
                if (response.status === 200) {
                    // const allchat = ;
                    const chat = store.getState().chats.find((chat) => chat.id == chat_id);
                    console.log(chat )
                    const token = JSON.parse(response.response).token;
                    const users = '';
                    store.set('selected_chat',{
                        chat :chat,
                        users:users,
                        token: token,
                    } );
                    console.log(store.getState())
                }
                else router.rederectToError(response.status)
            })

        } catch (error) {
            // Логика обработки ошибок
        }


        // const requests = [ChatsAPI.getToken(chat_id), ChatsAPI.getChatUsers(chat_id)];

        // const foundChats = store.getState('foundChats')?.chats  [];
        // const chats = store.getState('chats')  [];
        // const allChats = chats.concat(foundChats);
        // const selected_chat = allChats.find(chat => chat.id === chat_id);

        // const [token, users] = (await Promise.all(requests)) as [{ token: string }, users: IUser[]];

        // if (!selected_chat  !token || !users) return;

        // avatarReplacement(users, './static/user.svg');

        // const data: Iselected_chat = {
        //     ...selected_chat,
        //     users,
        //     token: token.token,
        // };
        //   store.set('currentChat', data);
    }

}


export default new ChatsController();