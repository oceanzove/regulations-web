import React, {FC, useCallback, useEffect, useState} from "react";
import styles from './RegulationViewModal.module.scss';
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {TextViewer} from "../../../../text-editor/implements/text-viewer.tsx";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {IProcess} from "../../../../../entities/process/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {IDepartment} from "../../../../../entities/employee/api/types.ts";
import {convertToRaw, EditorState} from "draft-js";
import stateToPdfMake from 'draft-js-export-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {CONVERT_HTML_TO_MESSAGE, GET_DECORATOR} from "../../../../../widgets/text-editor/editor-utils.ts";

pdfMake.vfs = pdfFonts.vfs;

type TRegulationCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    process: IProcess;
    regulation: IRegulation;
}

type DynamicValues = {
    [key: string]: string;
};

export const replaceDynamicFieldsHTML = (
    html: string,
    values: DynamicValues
): string => html.replace(/<span[^>]*data-field-label="([^"]+)"[^>]*>.*?<\/span>/g, (_, key) => {
    const replacement = values[key];
    return `<span style="background-color: #F91F71; color: white; padding: 2px 6px; border-radius: 6px;">${replacement ?? ''}</span>`;
});

export const RegulationViewModal: FC<TRegulationCreateModalProps> = (props) => {
    const {
        isOpen, onClose, regulation, process
    } = props;


    const [ department, setDepartment ] = useState<IDepartment>();
    const {data: departmentData} = organizationApi.useGetDepartmentByIdQuery(process.responsible);

    useEffect(() => {
        if (departmentData) {
            setDepartment(departmentData);
        }
    }, [departmentData]);

    const replacedContent = regulation?.content
        ? replaceDynamicFieldsHTML(regulation.content, {
            'Подразделение': department?.name ?? '',
            'Процесс': process.title,
        })
        : '';

    const handleGeneratePDF = () => {
        const contentState = CONVERT_HTML_TO_MESSAGE(replacedContent);
        const state  = EditorState.createWithContent(contentState, GET_DECORATOR());
        const rawContent = convertToRaw(state.getCurrentContent());
        const pdfState = new stateToPdfMake(rawContent);

        const result = pdfState.generate({ download: true, fileName: `${regulation.title}.pdf` });
        pdfMake.createPdf(result).download(`${regulation.title}.pdf`);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                // setIsSaveModalOpen((prev) => !prev)
            } else if (e.key === 'Escape') {
                // clearStates();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !regulation || !process) return null;

    return (
        <div className={styles.regulationModalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Просмотр регламент
                    <div className={styles.control}>
                        <div className={styles.iconButtonContainer}>
                            <IconButton
                                typeIcon={IconEnum.EXPORT_PDF}
                                onClick={handleGeneratePDF}
                            />

                        </div>
                        <div className={styles.iconButtonContainer}>
                            <IconButton
                                typeIcon={IconEnum.CROSS}
                                onClick={onClose}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.regulation}>
                    <div className={styles.title}>
                        {regulation.title}
                    </div>
                    <TextViewer
                        classes={{textEditor: styles.editoarViewer}}
                        htmlText={replacedContent}
                    />
                </div>
            </div>
        </div>
    )
};