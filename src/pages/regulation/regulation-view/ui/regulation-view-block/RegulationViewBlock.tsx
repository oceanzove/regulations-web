import {useNavigate, useParams} from "react-router-dom";
import styles from './RegulationViewBlock.module.scss';
import React, {useEffect, useState} from "react";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {ContentBlock, convertToRaw, EditorState} from "draft-js";
import {TextViewer} from "../../../../../widgets/text-editor/implements/text-viewer.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import stateToPdfMake from 'draft-js-export-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {CONVERT_HTML_TO_MESSAGE, GET_DECORATOR} from "../../../../../widgets/text-editor/editor-utils.ts";

pdfMake.vfs = pdfFonts.vfs;

export const RegulationViewBlock = () => {
    // const {
    //     processState,
    //     updateProcesses,
    // } = useProcess()
    //
    const [regulation, setRegulation] = useState<IRegulation>({id: '', title: '', content: ''})

    const navigate = useNavigate();
    // const [ steps, setSteps ] = useState<IStep[]>([])
    // const [ regulations, setRegulations ] = useState<IRegulation[]>([])
    // const {data} = processApi.useGetQuery();
    // const [isDataLoaded, setIsDataLoaded] = useState(false);
    //
    // const [isModalOpen, setIsModalOpen] = useState(false);
    //
    // useEffect(() => {
    //     if (data && !isDataLoaded) {
    //         if (data.processes !== null) {
    //             updateProcesses(data.processes);
    //         }
    //         setIsDataLoaded(true);
    //     }
    // }, [data, isDataLoaded, updateProcesses]);

    const {id} = useParams<{ id: string }>();

    const {data: regulationData} = regulationApi.useGetByIdQuery(id as string);
    // const { data: stepsData } = processApi.useGetStepsQuery(id as string);
    // const { data: regulationsData } = processApi.useGetRegulationsQuery(id as string);

    const handleGeneratePDF = () => {
        const contentState = CONVERT_HTML_TO_MESSAGE(regulation.content);
        const state  = EditorState.createWithContent(contentState, GET_DECORATOR());
        const rawContent = convertToRaw(state.getCurrentContent());
        const pdfState = new stateToPdfMake(rawContent);

        const result = pdfState.generate({ download: true, fileName: `${regulation.title}.pdf` });
        pdfMake.createPdf(result).download(`${regulation.title}.pdf`);
    };

    useEffect(() => {
        if (regulationData) {
            setRegulation(regulationData as IRegulation);
        }
    }, [regulationData, setRegulation]);

    console.log(regulation.content);
    return (
        <div className={styles.regulationViewBlockWrapper}>
            <div className={styles.controls}>
                <IconButton typeIcon={IconEnum.ARROW_LEFT}
                            className={styles.button}
                            onClick={() => navigate(-1)}
                />

                <IconButton typeIcon={IconEnum.EXPORT_PDF}
                            className={styles.button}
                            onClick={handleGeneratePDF}
                />
            </div>
            <div className={styles.regulation}>
                <div className={styles.title}>
                    {regulation.title}
                </div>
                <TextViewer
                    classes={{textEditor: styles.editoarViewer}}
                    htmlText={regulation.content}
                />
            </div>
        </div>
    )
};