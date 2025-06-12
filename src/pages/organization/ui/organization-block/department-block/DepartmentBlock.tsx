import styles from './DepartmentBlok.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../shared/ui/icon";
import React, {useEffect, useState} from "react";
import {IDepartment} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";

export const DepartmentBlock = () => {


    const [ departments, setDepartments ] = useState<IDepartment[]>([]);

    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();

    useEffect(() => {
        if (departmentsData && departmentsData.departments) {
            setDepartments(departmentsData.departments as IDepartment[]);
        }
    }, [departmentsData, setDepartments]);

    return (
        <div className={styles.departmentBlockWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                    onClick={() => {
                    }}
                >
                    Создать подразделение
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
            <div className={styles.departments}>
                <div className={styles.filter}>
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
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Задачи </Button>
                </div>
                <div>
                    {departments.map((department, index) => (
                        <div
                            key={index}
                            className={styles.department}
                            // onClick={() => onNavigateToRegulationClick(regulation.id)}
                        >
                            {department.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};