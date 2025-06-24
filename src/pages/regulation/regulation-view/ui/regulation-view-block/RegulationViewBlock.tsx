import {useNavigate, useParams} from "react-router-dom";
import styles from './RegulationViewBlock.module.scss';
import React, {useEffect, useState} from "react";
import {IRegulation, ISection} from "../../../../../entities/regulation/api/types.ts";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {convertToRaw, EditorState} from "draft-js";
import {TextViewer} from "../../../../../widgets/text-editor/implements/text-viewer.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import stateToPdfMake from 'draft-js-export-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {CONVERT_HTML_TO_MESSAGE, GET_DECORATOR} from "../../../../../widgets/text-editor/editor-utils.ts";
import {Button} from "../../../../../shared/ui/button";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";
import {v4 as uuid} from "uuid";

pdfMake.vfs = pdfFonts.vfs;

export const RegulationViewBlock = () => {
    const {id} = useParams<{ id: string }>();

    const { data: regulationData } = regulationApi.useGetByIdQuery(id as string);
    const { data: sectionData } = regulationApi.useGetSectionQuery();
    const {data: selectedSectionsData} = regulationApi.useGetSectionsIdByRegulationQuery(id as string);

    const navigate = useNavigate();

    const [ sections, setSections ] = useState<ISection[]>([])

    useEffect(() => {
        if (sectionData) {
            if (sectionData.sections !== null) {
                setSections(sectionData.sections);
            }
        }
    }, [sectionData]);

    const [regulation, setRegulation] = useState<IRegulation>({id: '', title: '', content: ''})
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const [localTitle, setLocalTitle] = useState(regulation.title);
    const [localHtml, setLocalHtml] = useState(regulation.content);
    const [selectedSections, setSelectedSections] = useState<ISection[]>([]);

    useEffect(() => {
        setLocalTitle(regulation.title);
        setLocalHtml(regulation.content);
    }, [regulation.content, regulation.title]);

    const handleGeneratePDF = () => {
        const contentState = CONVERT_HTML_TO_MESSAGE(regulation.content);
        const state = EditorState.createWithContent(contentState, GET_DECORATOR());
        const rawContent = convertToRaw(state.getCurrentContent());
        const pdfState = new stateToPdfMake(rawContent);

        const result = pdfState.generate({download: true, fileName: `${regulation.title}.pdf`});
        pdfMake.createPdf(result).download(`${regulation.title}.pdf`);
    };

    const [ update ] = regulationApi.useUpdateMutation();
    const [ linkSection ] = regulationApi.useLinkRegulationMutation();
    const [ unlinkSection ] = regulationApi.useUnlinkRegulationMutation();
    const onSaveClick = async (closeAfter: boolean = false) => {
        // if (!isFormValid) return;

        try {
            // 1. Обновляем процесс
            update({
                regulation: regulation.id,
                title: localTitle,
                content: localHtml,
            })

            // 2. Связываем секции
            const currentLinkedSectionsIds = selectedSectionsData?.sectionsIds || [];
            const selectedSectionsIds = selectedSections.map(s => s.id);

            console.log(selectedSectionsIds);
            const toAdd = selectedSectionsIds.filter(id => !currentLinkedSectionsIds.includes(id));
            const toRemove = currentLinkedSectionsIds.filter(id => !selectedSectionsIds.includes(id));

            console.log(toAdd, toRemove)
            // Добавляем с id и порядком
            await Promise.all(toAdd.map((sectionId, index) =>
                linkSection({
                    id: uuid(),
                    regulationId: regulation.id,
                    sectionId,
                    order: index,
                }).unwrap()
            ));

            await Promise.all(toRemove.map(sectionId =>
                unlinkSection({
                    regulationId: regulation.id,
                    sectionId,
                }).unwrap()
            ));

            notificationSuccess('Сохранение', 'Процесс успешно создан');
        } catch (error) {
            notificationError('Сохранение', 'Не удалось сохранить обновленный процесс');
            console.error("Error creating regulation:", error);
        }

        if (closeAfter) {
            navigate(-1);
        }
    };

    const [deleteRegulation] = regulationApi.useDeleteProcessByIdMutation();
    const onDeleteClick = () => {
        try {
            deleteRegulation(id || '');
            notificationSuccess("Удаление", "Регламент успешно удален");
            navigate(-1);
        } catch (error) {
            notificationError('Удаление', "Не удалось удалить регламент");
            console.error(error);
        }
    };

    useEffect(() => {
        if (regulationData) {
            setRegulation(regulationData as IRegulation);
        }
    }, [regulationData, setRegulation]);

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
                {!isEditMode ? (
                    <div className={styles.title}>
                        {regulation.title}
                    </div>
                ) : (
                    <div>
                    </div>
                )}

                <TextViewer
                    editMode={isEditMode}
                    classes={{ textEditor: styles.editoarViewer }}
                    sections={sections}
                    regulation={regulation}

                    localTitle={localTitle}
                    setLocalTitle={setLocalTitle}
                    localHtml={localHtml}
                    setLocalHtml={setLocalHtml}
                    setSelectedSections={setSelectedSections}
                />
            </div>
            {
                !isEditMode ?
                    <div className={styles.control}
                         style={{
                             justifyContent: "space-between",
                         }}
                    >
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                        }}>
                            <Button className={styles.saveButton}
                                    onClick={() => setIsEditMode(true)}
                            >
                                Редактировать
                            </Button>
                            <Button className={styles.closeButton}
                                    onClick={() => navigate(-1)}
                            >
                                Закрыть
                            </Button>
                        </div>
                        <Button className={styles.closeButton}
                                onClick={onDeleteClick}
                        >
                            Удалить
                        </Button>
                    </div>
                    :
                    <div className={styles.control}>
                        <Button className={styles.saveButton}
                                onClick={async () => {
                                    await onSaveClick(false)
                                    setIsEditMode(false)
                                }}
                            // disabled={!isFormValid}
                        >
                            Сохранить
                        </Button>
                        <Button className={styles.saveButton}
                                onClick={async () => {
                                    await onSaveClick(true)
                                    setIsEditMode(false)
                                }}
                            // disabled={!isFormValid}
                        >
                            Сохранить и закрыть
                        </Button>
                        <Button className={styles.closeButton}
                                onClick={() => {
                                    setIsEditMode(false);
                                    // setDefault();
                                }}
                        >
                            Отменить
                        </Button>
                    </div>
            }
        </div>
    )
};