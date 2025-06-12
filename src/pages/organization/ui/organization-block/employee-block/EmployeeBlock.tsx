import React, {useEffect, useState} from "react";
import styles from './EmployeeBlock.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../shared/ui/icon";
import {IEmployee} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {RegulationCreateModal} from "../../../../../widgets/modal/regulation/create";
import {EmployeeCreateModal} from "../../../../../widgets/modal/employee/create";


export const EmployeeBlock = () => {


    const [ employees, setEmployees ] = useState<IEmployee[]>([]);

    const {data: employeesData} = organizationApi.useGetEmployeesQuery();

    useEffect(() => {
        if (employeesData && employeesData.employees) {
            setEmployees(employeesData.employees as IEmployee[]);
        }
    }, [employeesData, setEmployees]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    }
    const onCreateEmployeeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toggleModal();
        event.currentTarget.blur();
    };

    return (
        <div className={styles.employeeBlockWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                    onClick={(event) => onCreateEmployeeClick(event)}
                >
                    Создать сотрудника
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
            <div className={styles.employees}>
                <div className={styles.filter}>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Сотрудник </Button>
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
                    > Задачи </Button>
                </div>
                <div>
                    {employees.map((employee, index) => (
                        <div
                            key={index}
                            className={styles.employee}
                            // onClick={() => onNavigateToRegulationClick(regulation.id)}
                        >
                            {employee.fullName}
                        </div>
                    ))}
                </div>
            </div>

            <EmployeeCreateModal
                isOpen={isModalOpen}
                onClose={toggleModal}
            />
        </div>
    )
};