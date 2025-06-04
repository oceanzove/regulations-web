import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../../app/reducers.ts";
import {regulationActions} from "../slices/regulationSlice.ts";
import {IRegulation} from "../../api/types.ts";

export const useRegulation = () => {
    const dispatch = useDispatch();
    const regulationState = useSelector((state: RootState) => state.regulation);

    const updateRegulations = (regulations: IRegulation[]) => {
        dispatch(regulationActions.setRegulations(regulations))
    };

    const updateContent = (id: string, content: string) => {
        dispatch(regulationActions.setContent({id, content}));
    };

    const updateTitle = (id: string, title: string) => {
        dispatch(regulationActions.setTitle({id, title}));
    };

    const updateActiveRegulation = (id: string | null) => {
        dispatch(regulationActions.setActiveRegulation(id));
    };

    const createRegulation = (regulation: IRegulation) => {
      dispatch(regulationActions.addRegulation(regulation));
    };

    return {
        updateTitle,
        updateContent,
        regulationState,
        createRegulation,
        updateRegulations,
        updateActiveRegulation,
    };
};