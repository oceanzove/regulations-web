import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {arrayMove} from "@dnd-kit/sortable";

export interface IRegulation {
    id: string,
    title: string,
    content: string,
}

interface IRegulationState {
    activeRegulation: string | null;
    regulations: IRegulation[];
}

const initialState: IRegulationState = {
    activeRegulation:  "123",
    regulations: [
        // { id: "123", title: "Привет", content: "Text Align" },
        // { id: "124", title: "Добро пожаловать", content: "Содержимое второго элемента" },
        // { id: "125", title: "Инструкция", content: "Описание инструкции" },
        // { id: "126", title: "Правила", content: "Правила использования приложения" },
        // { id: "127", title: "Заключение", content: "Заключительный текст" },
    ]
};

export const regulationSlice = createSlice({
    name: 'regulation',
    initialState,
    reducers: {
        setRegulations(state, action: PayloadAction<IRegulation[]>) {
            state.regulations = action.payload;
        },
        setContent(state, action: PayloadAction<{ id: string; content: string }>) {
            const updatedRegulations = state.regulations.map(reg =>
                reg.id === action.payload.id
                    ? { ...reg, content: action.payload.content }
                    : reg
            );

            return {
                ...state,
                regulations: updatedRegulations,
            };
        },
        setTitle(state, action: PayloadAction<{id: string; title: string}>) {
            console.log(state.regulations);
            console.log(action.payload);
            const updatedRegulations = state.regulations.map(reg =>
                reg.id === action.payload.id
                    ? { ...reg, title: action.payload.title }
                    : reg
            );

            return {
                ...state,
                regulations: updatedRegulations,
            };
        },
        setActiveRegulation(state, action: PayloadAction<string>) {
            state.activeRegulation = action.payload;
        },
        // setPassword(state, action: PayloadAction<string>) {
        //     state.password = action.payload;
        // },
        // clearCredentials(state) {
        //     state.email = '';
        //     state.password = '';
        // },
    },
});

export const {
    actions:regulationActions,
    reducer: regulationReducer,
    selectors: regulationSelectors,
} = regulationSlice;