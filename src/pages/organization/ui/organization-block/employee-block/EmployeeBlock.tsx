import React, {useEffect, useMemo, useState} from "react";
import styles from './EmployeeBlock.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../shared/ui/icon";
import {IEmployee} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {RegulationCreateModal} from "../../../../../widgets/modal/regulation/create";
import {EmployeeCreateModal} from "../../../../../widgets/modal/employee/create";
import {EmployeeViewEditModal} from "../../../../../widgets/modal/employee/view-edit/ui/EmployeeViewEditModal.tsx";


export const EmployeeBlock = () => {


    const [employees, setEmployees] = useState<IEmployee[]>([]);

    const {data: employeesData} = organizationApi.useGetEmployeesQuery();
    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();
    const {data: positionsData} = organizationApi.useGetPositionsQuery();

    const departmentMap = useMemo(() => {
        const map = new Map<string, string>();
        departmentsData?.departments.forEach((d) => map.set(d.id, d.name));
        return map;
    }, [departmentsData]);

    const positionMap = useMemo(() => {
        const map = new Map<string, string>();
        positionsData?.positions.forEach((p) => map.set(p.id, p.name));
        return map;
    }, [positionsData]);

    const {data: employeeDepartmentsData} = organizationApi.useGetEmployeeDepartmentQuery();
    const {data: employeePositionsData} = organizationApi.useGetEmployeePositionQuery();

    const employeeDepartmentMap = useMemo(() => {
        const map = new Map<string, string>();
        employeeDepartmentsData?.employeeDepartment.forEach(ed => {
            map.set(ed.employeeId, ed.departmentId);
        });
        return map;
    }, [employeeDepartmentsData]);

    const employeePositionMap = useMemo(() => {
        const map = new Map<string, string>();
        employeePositionsData?.employeePosition.forEach(ep => {
            map.set(ep.employeeId, ep.positionId);
        });
        return map;
    }, [employeePositionsData]);

    useEffect(() => {
        if (employeesData && employeesData.employees) {
            setEmployees(employeesData.employees as IEmployee[]);
        }
    }, [employeesData, setEmployees]);


    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const toggleCreateModal = () => {
        setIsCreateModalOpen((prev) => !prev);
    }

    const onCreateEmployeeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toggleCreateModal();
        event.currentTarget.blur();
    };

    const [viewModalState, setViewModalState] = useState<{ isOpen: boolean, employeeId: string | null }>({
        isOpen: false,
        employeeId: null
    });

    const openViewModal = (id: string) => setViewModalState({isOpen: true, employeeId: id});
    const closeViewModal = () => setViewModalState({isOpen: false, employeeId: null});

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
                    {employees.map((employee) => (
                        <div
                            key={employee.id}
                            className={styles.employee}
                            onClick={() => openViewModal(employee.id)}
                        >
                            <div><b>{employee.fullName}</b></div>
                            <div>{positionMap.get(employeePositionMap.get(employee.id) || '') || 'Неизвестная должность'}</div>
                            <div>{departmentMap.get(employeeDepartmentMap.get(employee.id) || '') || 'Неизвестный отдел'}</div>
                        </div>
                    ))}
                </div>
            </div>

            <EmployeeCreateModal
                isOpen={isCreateModalOpen}
                onClose={toggleCreateModal}
            />

            <EmployeeViewEditModal
                isOpen={viewModalState.isOpen}
                onClose={closeViewModal}
                employeeId={viewModalState.employeeId}
            />
        </div>
    )
};