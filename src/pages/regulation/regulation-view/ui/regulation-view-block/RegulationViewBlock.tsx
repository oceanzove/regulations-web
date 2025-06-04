import {useParams} from "react-router-dom";
import styles from './RegulationViewBlock.module.scss';
import {useEffect, useState} from "react";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {RegulationEditor} from "./editor";
import {Sections} from "./section";
import {Section} from "./section/Sections.tsx";

const initialSections: Section[] = [
    {
        id: "1",
        title: "Общие положения",
        content: `Настоящий документ устанавливает основные положения, принципы и цели, связанные с реализацией и соблюдением регламента. Он предназначен для использования всеми участниками процесса, обеспечивая единый подход и понимание ключевых аспектов деятельности.`,
        checked: true,
    },
    {
        id: "2",
        title: "Область применения",
        content: `Регламент распространяется на все подразделения и сотрудников организации, участвующих в выполнении указанных процессов. Он применяется при разработке, реализации и контроле процедур, связанных с управлением проектами, документооборотом и внутренними коммуникациями.`,
        checked: true,
    },
    {
        id: "3",
        title: "Описание процессов",
        content: `В данном разделе подробно описываются этапы выполнения ключевых процессов, ответственные лица, используемые ресурсы и ожидаемые результаты. Каждый процесс сопровождается блок-схемой и таблицей контрольных точек, необходимых для оценки эффективности и качества выполнения.`,
        checked: true,
    },
];
export const RegulationViewBlock = () => {
    // const {
    //     processState,
    //     updateProcesses,
    // } = useProcess()
    //
    const [regulation, setRegulation] = useState<IRegulation>({id: '', title: '', content: ''})
    // const [ steps, setSteps ] = useState<IStep[]>([])
    // const [ regulations, setRegulations ] = useState<IRegulation[]>([])
    // const {data} = processApi.useGetQuery();
    // const [isDataLoaded, setIsDataLoaded] = useState(false);
    //
    // const [isModalOpen, setIsModalOpen] = useState(false);
    //
    // useEffect(() => {
    //     if (data && !isDataLoaded) {
    //         if (data.processes !== null) {
    //             updateProcesses(data.processes);
    //         }
    //         setIsDataLoaded(true);
    //     }
    // }, [data, isDataLoaded, updateProcesses]);

    const {id} = useParams<{ id: string }>();

    const {data: regulationData} = regulationApi.useGetByIdQuery(id as string);
    // const { data: stepsData } = processApi.useGetStepsQuery(id as string);
    // const { data: regulationsData } = processApi.useGetRegulationsQuery(id as string);

    useEffect(() => {
        if (regulationData) {
            setRegulation(regulationData as IRegulation);
        }
    }, [regulationData, setRegulation]);

    // useEffect(() => {
    //     if (stepsData) {
    //         setSteps(stepsData as IStep[]);
    //     }
    // }, [stepsData, setSteps]);
    //
    // useEffect(() => {
    //     if (regulationsData) {
    //         setRegulations(regulationsData as IRegulation[]);
    //     }
    // }, [regulationsData, setRegulations]);

    const [sections, setSections] = useState<Section[]>(initialSections);

    const handleSectionToggle = (id: string) => {
        setSections(prev =>
            prev.map(sec => sec.id === id ? { ...sec, checked: !sec.checked } : sec)
        );
    };

    // Получить выбранные:
    const selectedSections = sections.filter(sec => sec.checked);

    return (
        <div className={styles.regulationViewBlockWrapper}>
            <Sections
                sections={sections}
                onToggle={handleSectionToggle}
            />
            <RegulationEditor
                regulation={regulation}
                selectedSections={selectedSections}
            />
            {/*<ProcessView*/}
            {/*    process={process}*/}
            {/*    steps={steps}*/}
            {/*    regulations={regulations}*/}
            {/*/>*/}
        </div>
    )
};