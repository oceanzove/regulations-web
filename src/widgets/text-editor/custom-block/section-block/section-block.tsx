import React from 'react';
import styles from './section-block.module.scss';

export const SectionBlock = (props) => {
    const {contentState, entityKey, children} = props;
    const {title, content} = contentState.getEntity(entityKey).getData();

    console.log(children);
    return (
        <div>
            <span
                style={{
                    background: "#e3e8f0",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontWeight: 700,
                    color: "#22577a",
                    margin: "0 4px",
                    display: "inline-block",
                    userSelect: "none",
                }}
                contentEditable={false} // не редактируемое
            >
            📑 {title}
                {children}
        </span>
         <span
             style={{
                 background: "#2c57a3",
                 borderRadius: 8,
                 padding: "4px 12px",
                 fontWeight: 700,
                 color: "#ff0000",
                 margin: "0 4px",
                 display: "inline-block",
                 userSelect: "none",
             }}
             >
             {content}
         </span>
        </div>
    );
};