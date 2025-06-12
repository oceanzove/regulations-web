import React, {useEffect, useState} from "react";
import {IDepartment, IPosition} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import styles from './PositionBlock.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../shared/ui/icon";


export const PositionBlock = () => {


    const [ positions, setPositions ] = useState<IPosition[]>([]);

    const {data: positionsData} = organizationApi.useGetPositionsQuery();

    useEffect(() => {
        if (positionsData && positionsData.positions) {
            setPositions(positionsData.positions as IPosition[]);
        }
    }, [positionsData, setPositions]);

    return (
        <div className={styles.positionBlockWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                    onClick={() => {
                    }}
                >
                    Создать должность
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
            <div className={styles.positions}>
                <div className={styles.filter}>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Должность </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Подразделения </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Сотрудник </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Процессы </Button>
                </div>
                <div>
                    {positions.map((position, index) => (
                        <div
                            key={index}
                            className={styles.position}
                            // onClick={() => onNavigateToRegulationClick(regulation.id)}
                        >
                            {position.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};