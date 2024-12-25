import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../../app/reducers.ts";
import {processActions} from "../slices/processSlice.ts";
import {IProcess} from "../../api/types.ts";

export const useProcess = () => {
    const dispatch = useDispatch();
    const processState = useSelector((state: RootState) => state.process);

    const updateProcesses = (processes: IProcess[]) => {
        dispatch(processActions.setProcesses(processes))
    };

    const updateActiveProcess = (id: string) => {
        dispatch(processActions.setActiveProcess(id));
    };

    const createProcess = (process: IProcess) => {
        dispatch(processActions.addProcess(process));
    };
    const updateDescription = (id: string, description: string) => {
        dispatch(processActions.setDescription({id, description}));
    };

    const updateTitle = (id: string, title: string) => {
        dispatch(processActions.setTitle({id, title}));
    };



    return {
        updateTitle,
        processState,
        createProcess,
        updateProcesses,
        updateDescription,
        updateActiveProcess,
    };
};