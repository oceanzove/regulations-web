import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProcess} from "../../api/types.ts";

interface IProcessState {
    activeProcess: string | null;
    processes: IProcess[];
}

const initialState: IProcessState = {
    activeProcess:  "",
    processes: [],
};

export const processSlice = createSlice({
    name: 'regulation',
    initialState,
    reducers: {
        addProcess(state, action: PayloadAction<IProcess>) {
            state.processes.push(action.payload);
        },
        setProcesses(state, action: PayloadAction<IProcess[]>) {
            state.processes = action.payload;
        },
        setDescription(state, action: PayloadAction<{ id: string; description: string }>) {
            const updatedProcesses = state.processes.map(process =>
                process.id === action.payload.id
                    ? { ...process, description: action.payload.description }
                    : process
            );

            return {
                ...state,
                process: updatedProcesses,
            };
        },
        setTitle(state, action: PayloadAction<{id: string; title: string}>) {
            const updatedProcesses = state.processes.map(process =>
                process.id === action.payload.id
                    ? { ...process, title: action.payload.title }
                    : process
            );

            return {
                ...state,
                process: updatedProcesses,
            };
        },
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
