import styles from './RegulationEditor.module.scss';
import MDEditor from "@uiw/react-md-editor";
import React, {useEffect, useState} from "react";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../../shared/ui/button/button.tsx";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";
import RegulationIcon from "../../../../../shared/assets/images/regulation_icon.svg";

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    updateTitle: (id: string, title: string) => void,
    updateContent: (id: string ,content: string) => void,
}
export const RegulationEditor = (props: IRegulationEditorProps) => {
    const { activeRegulation, updateContent, updateTitle } = props;

    const [localTitle, setLocalTitle] = useState(activeRegulation.title);
    const [localContent, setLocalContent] = useState(activeRegulation.content);

    const isChanged = localTitle !== activeRegulation.title || localContent !== activeRegulation.content;

    useEffect(() => {
        setLocalTitle(activeRegulation.title);
        setLocalContent(activeRegulation.content);
    }, [activeRegulation]);

    const [update, { isLoading }] = regulationApi.useUpdateMutation();

    const onSaveClick = () => {
        if (!isChanged) return;

        if (localTitle !== activeRegulation.title) {
            updateTitle(activeRegulation.id, localTitle);
        }
        if (localContent !== activeRegulation.content) {
            updateContent(activeRegulation.id, localContent);
        }
        if (localTitle !== activeRegulation.title || localContent !== activeRegulation.content) {
            try {
                update({ regulation: activeRegulation.id, title: localTitle, content: localContent});
                notificationSuccess('Сохранение', 'Регламент успешно сохранен');
            } catch {
                notificationError('Сохранение', 'Не удалось сохранить регламент');
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={RegulationIcon} alt="Regulation icon"/>
                <div>{localTitle}</div>
            </div>
            <div className={styles.imageBlock}>
                <div className={styles.images}>
                    <img src='https://i.pinimg.com/736x/fa/68/26/fa68266e4bcac979a85327dfe621938c.jpg'/>
                    <img src='https://i.pinimg.com/736x/fa/68/26/fa68266e4bcac979a85327dfe621938c.jpg'/>
                    <img src='https://i.pinimg.com/736x/fa/68/26/fa68266e4bcac979a85327dfe621938c.jpg'/>
                </div>
                <div>
                    Загрузите изображение
                    <MainButton text={'Загрузить фото'} onClick={() => {}}/>
                </div>
            </div>
            <div className={styles.container}>
                <Label label={'Название'}>
                    <Input
                        value={localTitle}
                        onChange={(e) => setLocalTitle(e.target.value || '')}
                    />
                </Label>
                <Label label={'Категория'}>
                    <Input
                        value={"Регламент"}
                        onChange={(e) => setLocalTitle(e.target.value || '')}
                    />
                </Label>
                <Label label={'Набор файлов'}>
                    <div>
                        doc 2024-12-17.pdf
                    </div>
                    <div>
                        Приложение 1.doc
                    </div>
                </Label>
                <Label label={'Содержание документа'}>
                    <MainButton text={'Создать'}/>
                </Label>
                <Label label={'Описание'}>
                    <MDEditor
                        data-color-mode="light"
                        value={localContent}
                        onChange={(content) => setLocalContent(content || '')}
                    />
                </Label>
                <MainButton
                    text={'Сохранить'}
                    onClick={onSaveClick}
                    disabled={!isChanged || isLoading}
                />
            </div>
        </div>
    );
};
