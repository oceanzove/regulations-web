import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import css from './ProcessItem.module.scss';
import DragPoint from "../../../../../../shared/assets/images/drag_point.svg";

interface IProcessProps {
    id: string;
    title: string;
    onClick: () => void;
}

export const ProcessItem = (props: IProcessProps) => {
    const { id, title, onClick } = props;

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
        </div>

    );
};