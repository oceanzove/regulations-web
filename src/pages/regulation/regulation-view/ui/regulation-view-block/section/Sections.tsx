import styles from './Sections.module.scss';
import React from "react";
import {MainButton} from "../../../../../../shared/ui/main-button/main-button.tsx";
import {SearchIcon} from "../../../../../../shared/assets/icons";
import css from "../../../../../../shared/ui/text-area/textArea.module.scss";
import {ISection} from "../../../../../../entities/regulation/api/types.ts";

export interface Section extends ISection {
    checked: boolean;
}

type SectionsProps = {
    sections: Section[];
    onToggle: (id: string) => void;
};

export const Sections = (props: SectionsProps) => {
    const {sections, onToggle } = props;

    return (
        <div className={styles.regulationSectionWrapper}>
            <div className={styles.header}>
                <div>Подберите шаблоны, разделы и модули</div>
            </div>
            <div className={styles.search}>
                <SearchIcon
                    width={17.4}
                    height={17.4}
                />
                <div className={css.inputContainer}>
                <textarea
                    style={{height: 24}}
                    className={styles.searchArea}
                    placeholder={'Поиск'}
                    // value={value}
                    // onChange={handleChange}
                />
                </div>
            </div>
            <div className={styles.sections}>
                {sections.map(section => (
                    <div className={styles.sectionItem} key={section.id}>
                        <input
                            type="checkbox"
                            checked={section.checked}
                            onChange={() => onToggle(section.id)}
                        />
                        <span className={styles.label}>{section.title}</span>
                    </div>
                ))}
            </div>
            <MainButton
                text={'Создать'}
                onClick={() => {}}
            />
        </div>
    )
};