export type DialogItemType = {
    id: number;
    name: string;
};


export type MessageType = {
    id: number;
    message: string;
};


export type FriendType = {
    src: string;
    alt: string;
};


export type DialogPageType = {
    dialogItems: DialogItemType[];
    messages: MessageType[];
    friends: FriendType[];
};

export type DialogsReducerType = {
    dialogPage: DialogPageType;
};


let initialState: DialogsReducerType = {
    dialogPage: {
        dialogItems: [
            { id: 1, name: "Dimich" },
            { id: 2, name: "Sasha" },
            { id: 3, name: "Sveta" },
            { id: 4, name: "Viktor" },
            { id: 5, name: "Valery" },
        ]as DialogItemType[],
        messages: [
            { id: 1, message: "Hi" },
            { id: 2, message: "How are you" },
            { id: 3, message: "Yo" },
            { id: 4, message: "Yo" },
            { id: 5, message: "Yo" },
        ]as MessageType[],
        friends: [
            { src: "https://html.crumina.net/html-olympus/img/avatar38-sm.webp", alt: "Friend 1" },
            { src: "https://html.crumina.net/html-olympus/img/avatar24-sm.webp", alt: "Friend 2" },
            { src: "https://html.crumina.net/html-olympus/img/avatar36-sm.webp", alt: "Friend 3" },
            { src: "https://html.crumina.net/html-olympus/img/avatar35-sm.webp", alt: "Friend 4" },
            { src: "https://html.crumina.net/html-olympus/img/avatar34-sm.webp", alt: "Friend 5" },
            { src: "https://html.crumina.net/html-olympus/img/avatar33-sm.webp", alt: "Friend 6" },
            { src: "https://html.crumina.net/html-olympus/img/avatar28-sm.webp", alt: "Friend 7" },
            { src: "https://html.crumina.net/html-olympus/img/avatar25-sm.webp", alt: "Friend 8" },
            { src: "https://html.crumina.net/html-olympus/img/avatar45-sm.webp", alt: "Friend 9" },
        ] as FriendType[]
    },
};

// Тип экшенов
type AddDialogActionType = ReturnType<typeof addNameAC>;
type AddDialogMessageActionType = ReturnType<typeof addDialogMessageAC>;

type DialogReducerACType = AddDialogActionType | AddDialogMessageActionType;

export const DialogsReducer = (
    state: DialogsReducerType = initialState,
    action: DialogReducerACType
): DialogsReducerType => {
    switch (action.type) {
        case 'ADD_DIALOG':
            const newName = {
                id: 6,
                name: action.postName,
            };
            return {
                ...state,
                dialogPage: {
                    ...state.dialogPage,
                    dialogItems: [...state.dialogPage.dialogItems, newName],
                },
            };
        case 'ADD_MESSAGE':
     const newMessage = {
         id: 6,
         message:action.postMessage
     }
     return {

         ...state,dialogPage:{...state.dialogPage,
         messages:[...state.dialogPage.messages,newMessage],
         }
     }

        default:
            return state;
    }
};


export const addNameAC = (postName: string) => ({
    type: 'ADD_DIALOG' as const,
    postName: postName,
});
export const addDialogMessageAC = (postMessage: string) => ({
    type: 'ADD_MESSAGE' as const,
    postMessage: postMessage,
});
