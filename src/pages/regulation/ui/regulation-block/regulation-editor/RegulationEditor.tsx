import React, { useState, useEffect } from 'react';
import styles from './RegulationEditor.module.scss';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IRegulation } from '../../../../../entities/regulation/api/types.ts';
import { regulationApi } from '../../../../../entities/regulation/api/api.ts';
import { notificationError, notificationSuccess } from '../../../../../widgets/notifications/callNotification.tsx';

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    updateTitle: (id: string, title: string) => void,
    updateContent: (id: string, content: string) => void,
}

export const RegulationEditor: React.FC<IRegulationEditorProps> = ({ activeRegulation, updateTitle, updateContent }) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        if (activeRegulation.content) {
            try {
                const parsedContent = JSON.parse(activeRegulation.content);

                if (parsedContent.blocks && parsedContent.entityMap) {
                    const contentState = convertFromRaw(parsedContent);
                    setEditorState(EditorState.createWithContent(contentState));
                } else {
                    console.warn('Неверный формат JSON, инициализация пустым редактором.');
                }

            } catch (error) {
                console.error('Ошибка загрузки контента', error);
                setEditorState(EditorState.createEmpty());
            }
        }
    }, [activeRegulation]);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    const handleSave = async () => {
        try {
            const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            updateContent(activeRegulation.id, content);
            notificationSuccess('Сохранение', 'Регламент успешно сохранен');
        } catch {
            notificationError('Сохранение', 'Не удалось сохранить регламент');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Editor
                    editorState={editorState}
                    toolbarClassName={styles.toolbar}
                    wrapperClassName={styles.wrapper}
                    editorClassName={styles.editor}
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                />
                <button className={styles.saveButton} onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};
