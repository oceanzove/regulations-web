import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../../app/reducers.ts";
import {processActions} from "../slices/processSlice.ts";
import {IProcess} from "../../api/types.ts";

export const useProcess = () => {
    const dispatch = useDispatch();
    const processState = useSelector((state: RootState) => state.process);

    const updateActiveProcess = (id: string) => {
        dispatch(processActions.setActiveProcess(id));
    };

    const updateProcesses = (processes: IProcess[]) => {
        dispatch(processActions.setProcesses(processes))
    };

    const addProcess = (process: IProcess) => {
        dispatch(processActions.addProcess(process));
    };

    return {
        addProcess,
        processState,
        updateProcesses,
        updateActiveProcess,
    };
};