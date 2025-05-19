import styles from './RegulationList.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import React, {FC, useEffect, useState} from "react";
import {Icon} from "../../../../../shared/ui/icon";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";

type TRegulationListProps = {
    regulations: IRegulation[]
    onSelectRegulation: (id: string) => void;};

export const RegulationList: FC<TRegulationListProps> = (props) => {
    const { regulations, onSelectRegulation } = props;

    return (
        <div className={styles.regulationListWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                >
                    Создать регламент
                </Button>
                <div className={styles.search}>
                    <Icon
                        className={styles.iconContainer}
                        type={IconEnum.SEARCH}
                    />
                    <textarea
                        className={styles.searchArea}
                        placeholder={'Поиск'}
                        // value={value}
                        // onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.regulations}>
                <div className={styles.filter}>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Название </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Ответственный </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Исполнитель </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Сотрудники </Button>
                </div>
                <div className={styles.regulationItems}>
                    { regulations.map(regulation => (
                        <div
                            className={styles.regulation}
                            onClick={() => onSelectRegulation(regulation.id)}
                        >
                            {regulation.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};