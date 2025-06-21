import React, {useEffect, useMemo, useState} from "react";
import { IPosition } from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import styles from './PositionBlock.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../shared/ui/icon";
import {PositionModal} from "../../../../../widgets/modal/position/PositionModal.tsx";


export const PositionBlock = () => {


    const [ positions, setPositions ] = useState<IPosition[]>([]);

    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);
    const [ isCreateMode, setIsCreateMode] = useState(true);
    const [ selectedPosition, setSelectedPosition] = useState<IPosition | null>(null);
    const [ selectedPositionDepartment, setSelectedPositionDepartment] = useState<string | null>('');

    const toggleCreateModal = () => {
        setIsCreateModalOpen((prev) => !prev);
    }

    const {data: positionsData} = organizationApi.useGetPositionsQuery();
    const {data: employeesData} = organizationApi.useGetEmployeesQuery();
    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();
    const {data: positionDepartmentData} = organizationApi.useGetPositionDepartmentQuery();

    const getDepartmentIdByPosition = (positionId: string) => {
        const departmentsId = positionDepartmentData?.departmentPosition
            .filter(item => item.positionId === positionId)
            .map(item => item.departmentId);

        if (departmentsId === undefined) {
            return ''
        }

        return departmentsId[0];
    };

    const getDepartmentByPosition = (positionId: string): string => {
        const departmentsId = positionDepartmentData?.departmentPosition
            .filter(item => item.positionId === positionId)
            .map(item => item.departmentId);

        if (departmentsId === undefined) {
            return ''
        }

        if (departmentsId.length > 1) {
            return `${departmentsId.length} подразделения`
        }

        const map = new Map<string, string>();
        departmentsData?.departments.forEach((d) => map.set(d.id, d.name));

        return map.get(departmentsId[0])!;
    };

    const {data: employeePositionData} = organizationApi.useGetEmployeePositionQuery();

    const getEmployeeByPosition = (positionId: string): string => {
        const employeesId = employeePositionData?.employeePosition
            .filter(item => item.positionId === positionId)
            .map(item => item.employeeId);

        if (!employeesId || employeesId.length === 0) {
            return 'Нет сотрудников';
        }

        const employeesMap = new Map<string, string>();
        employeesData?.employees.forEach((d) => employeesMap.set(d.id, d.fullName));

        if (employeesId.length === 1) {
            return employeesMap.get(employeesId[0]) ?? '';
        }

        // Функция для правильного склонения слова "сотрудник"
        const getEmployeeWord = (count: number) => {
            const lastDigit = count % 10;
            const lastTwoDigits = count % 100;

            if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
                return 'сотрудников';
            }

            if (lastDigit === 1) {
                return 'сотрудник';
            }

            if (lastDigit >= 2 && lastDigit <= 4) {
                return 'сотрудника';
            }

            return 'сотрудников';
        };

        return `${employeesId.length} ${getEmployeeWord(employeesId.length)}`;
    };
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
                        setIsCreateMode(true);
                        setSelectedPosition(null);
                        setSelectedPositionDepartment(null);
                        toggleCreateModal();
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
            <div className={styles.positionsBlock}>
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
                <div className={styles.positions}>
                    {positions.map((position, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.position}
                                onClick={() => {
                                    toggleCreateModal();
                                    setIsCreateMode(false);
                                    setSelectedPosition(position)
                                    setSelectedPositionDepartment(getDepartmentIdByPosition(position.id))
                                }}
                            >
                                <div className={styles.positionName}>
                                    <div className={styles.icon}>
                                        <Icon type={IconEnum.ITEM_OPTION}/>
                                    </div>
                                    {position.name}
                                </div>
                                <div className={styles.positionDepartment}>
                                    {getDepartmentByPosition(position.id)}
                                </div>
                                <div className={styles.positionEmployee}>
                                    {getEmployeeByPosition(position.id)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <PositionModal
                isOpen={isCreateModalOpen}
                createMode={isCreateMode}
                positionId={selectedPosition}
                departmentId={selectedPositionDepartment}
                onClose={toggleCreateModal}
            />
        </div>
    )
};