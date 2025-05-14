import styles from './RegulationList.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {SearchIcon} from "../../../../../shared/assets/icons";
import React from "react";
import {Icon} from "../../../../../shared/ui/icon";

export const RegulationList = () => {


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
                    выа
            </div>
        </div>
    )
};