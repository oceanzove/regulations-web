import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import css from './StepItem.module.scss';
import DragPoint from "../../../../../../../shared/assets/images/drag_point.svg";

interface IStepItemProps {
    id: string;
    title: string;
    description: string;
    onClick: () => void;
}

export const StepItem = (props: IStepItemProps) => {
    const { id, title, description, onClick } = props;

    const {
        attributes, listeners, setNodeRef, transform, transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className={css.wrapper}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
        >
            <img src={DragPoint} alt="Drag Point"/>
            <div className={css.title}>
                {title}
            </div>
            <div className={css.description}>
                {description}
            </div>
        </div>

    );
};