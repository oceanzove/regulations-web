import React, {FC, useCallback, useEffect, useState} from "react";
import styles from './RegulationViewModal.module.scss';
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {TextViewer} from "../../../../text-editor/implements/text-viewer.tsx";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {IProcess} from "../../../../../entities/process/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {IDepartment} from "../../../../../entities/employee/api/types.ts";

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
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onClose}
                        />
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