import React, {FC, useCallback, useEffect, useState} from "react";
import {
    Section,
    Sections
} from "../../../../pages/regulation/regulation-view/ui/regulation-view-block/section/Sections.tsx";
import {RegulationEditor} from "../../../../pages/regulation/regulation-view/ui/regulation-view-block/editor";
import {IRegulation, ISection} from "../../../../entities/regulation/api/types.ts";
import styles from './RegulationCreateModal.module.scss';
import {IconButton} from "../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../shared/ui/icon/IconType.tsx";
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";
import {Button} from "../../../../shared/ui/button";
import {SaveAsModal} from "./save-as";
import {v4 as uuid} from "uuid";

type TRegulationCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    sections: ISection[];
    onRegulationCreate: (regulation: IRegulation) => void;
    onSectionCreate: (section: ISection) => void;
}

export const RegulationCreateModal: FC<TRegulationCreateModalProps> = (props) => {
    const {
        isOpen, onClose, onRegulationCreate, onSectionCreate
    } = props;
    const [template, setTemplate] = useState<IRegulation | ISection>({id: '', title: '', content: ''})

    const [sections, setSections] = useState<Section[]>([]);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    useEffect(() => {
        const convertedSections = props.sections.map(section => ({
            ...section,
            checked: false,
        }));
        setSections(convertedSections);
    }, [props.sections]);

    const handleRegulationCreate = useCallback(() => {
        const regulationID = uuid();

        onRegulationCreate({...template, id: regulationID});
    }, [onRegulationCreate, template]);

    const handleSectionCreate = useCallback(() => {
        const sectionID = uuid();

        onSectionCreate({...template, id: sectionID});
    }, [onSectionCreate, template]);

    const handleSectionToggle = (id: string) => {
        setSections(prev =>
            prev.map(sec => sec.id === id ? {...sec, checked: !sec.checked} : sec)
        );
    };

    const selectedSections = sections.filter(sec => sec.checked);



    const onRegulationChange = (field: keyof IRegulation, value: string) => {
        setTemplate(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveAs = (type: 'section' | 'regulation') => {
        if (type === 'section') {
            handleSectionCreate();
        } else if (type === 'regulation') {
            handleRegulationCreate();
        }
        onClose();
        setIsSaveModalOpen(false);
        setTemplate({id: '', title: '', content: ''})
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

    if (!isOpen) return null;

    return (
        <div className={styles.regulationModalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Создать регламент
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onClose}
                        />
                    </div>
                </div>
                <Label label={'Название регламента'}>
                    <Input
                        value={template.title}
                        onChange={(e) =>
                            onRegulationChange('title', e.target.value)}
                        placeholder={'Например, регламент увольнения'}
                    />
                </Label>
                <div className={styles.editor}>
                    <Sections
                        sections={sections}
                        onToggle={handleSectionToggle}
                    />
                    <RegulationEditor
                        regulation={template}
                        selectedSections={selectedSections}
                        onEditorChange={(htmlText) =>
                            onRegulationChange('content', htmlText)}
                    />
                </div>
                <div className={styles.footer}>
                    <div className={styles.sectionFooter}>

                    </div>
                    <div className={styles.editorFooter}>
                        <Button className={styles.saveButton}
                                onClick={(event) => {
                                    setIsSaveModalOpen((prev) => !prev);
                                    event.currentTarget.blur();
                                }}
                        >
                            Сохранить как
                        </Button>
                    </div>
                </div>
            </div>

            <SaveAsModal
                isOpen={isSaveModalOpen}
                onSave={handleSaveAs}
                onClose={() => {
                    setIsSaveModalOpen((prev) => !prev)
                }}
            />
        </div>
    )
};