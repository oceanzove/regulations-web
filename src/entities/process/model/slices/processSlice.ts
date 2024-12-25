import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProcess} from "../../api/types.ts";

interface IProcessState {
    activeProcess: string | null;
    processes: IProcess[];
}

const initialState: IProcessState = {
    activeProcess:  "",
    processes: []
};

export const processSlice = createSlice({
    name: 'regulation',
    initialState,
    reducers: {
        // addRegulation(state, action: PayloadAction<IRegulation>) {
        //     state.regulations.push(action.payload);
        // },
        setProcesses(state, action: PayloadAction<IProcess[]>) {
            state.processes = action.payload;
        },
        // setContent(state, action: PayloadAction<{ id: string; content: string }>) {
        //     const updatedRegulations = state.regulations.map(reg =>
        //         reg.id === action.payload.id
        //             ? { ...reg, content: action.payload.content }
        //             : reg
        //     );
        //
        //     return {
        //         ...state,
        //         regulations: updatedRegulations,
        //     };
        // },
        // setTitle(state, action: PayloadAction<{id: string; title: string}>) {
        //     console.log(state.regulations);
        //     console.log(action.payload);
        //     const updatedRegulations = state.regulations.map(reg =>
        //         reg.id === action.payload.id
        //             ? { ...reg, title: action.payload.title }
        //             : reg
        //     );
        //
        //     return {
        //         ...state,
        //         regulations: updatedRegulations,
        //     };
        // },
        setActiveProcess(state, action: PayloadAction<string>) {
            state.activeProcess = action.payload;
        },
    },
});

export const {
    actions: processActions,
    reducer: processReducer,
    selectors: processSelectors,
} = processSlice;