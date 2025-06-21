import styles from './DepartmentBlok.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../shared/ui/icon";
import React, {useEffect, useState} from "react";
import {IDepartment} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {DepartmentModal} from "../../../../../widgets/modal/department/DepartmentModal.tsx";

export const DepartmentBlock = () => {


    const [ departments, setDepartments ] = useState<IDepartment[]>([]);

    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);
    const [ isCreateMode, setIsCreateMode] = useState(true);
    const [ selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);

    const toggleCreateModal = () => {
        setIsCreateModalOpen((prev) => !prev);
    }

    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();

    useEffect(() => {
        if (departmentsData && departmentsData.departments) {
            setDepartments(departmentsData.departments as IDepartment[]);
        }
    }, [departmentsData, setDepartments]);

    const {data: employeesData} = organizationApi.useGetEmployeesQuery();
    const {data: employeeDepartmentData} = organizationApi.useGetEmployeeDepartmentQuery();

    const getEmployeeByDepartment = (departmentId: string): string => {
        const employeesId = employeeDepartmentData?.employeeDepartment
            .filter(item => item.departmentId === departmentId)
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

    return (
        <div className={styles.departmentBlockWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                    onClick={() => {
                        setIsCreateMode(true);
                        setSelectedDepartment(null);
                        toggleCreateModal();
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
            <div className={styles.departmentsBlock}>
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
                <div className={styles.departments}>
                    {departments.map((department, index) => (
                        <div
                            key={index}
                            className={styles.department}
                            onClick={() => {
                                toggleCreateModal();
                                setIsCreateMode(false);
                                setSelectedDepartment(department)
                            }}                        >
                            <div className={styles.departmentName}>
                                <div className={styles.icon}>
                                    <Icon type={IconEnum.ITEM_OPTION}/>
                                </div>
                                {department.name}
                            </div>
                            <div className={styles.departmentEmployee}>
                                {getEmployeeByDepartment(department.id)}
                            </div>
                            {/*<div className={styles.employeeDepartment}>*/}
                            {/*    /!*{departmentMap.get(employeeDepartmentMap.get(employee.id) || '') || ''}*!/*/}
                            {/*</div>*/}
                            {/*<div className={styles.employeeTask}>*/}

                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            </div>

            <DepartmentModal
                isOpen={isCreateModalOpen}
                createMode={isCreateMode}
                department={selectedDepartment}
                onClose={toggleCreateModal}
            />
        </div>
    )
};