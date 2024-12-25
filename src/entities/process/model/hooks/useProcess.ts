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

    // const updateContent = (id: string, content: string) => {
    //     dispatch(regulationActions.setContent({id, content}));
    // };
    //
    // const updateTitle = (id: string, title: string) => {
    //     dispatch(regulationActions.setTitle({id, title}));
    // };
    //

    //
    // const createRegulation = (regulation: IRegulation) => {
    //     dispatch(regulationActions.addRegulation(regulation));
    // };

    return {
        processState,
        updateProcesses,
        updateActiveProcess,
    };
};