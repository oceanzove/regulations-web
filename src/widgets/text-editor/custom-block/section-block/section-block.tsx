import React from 'react';
import styles from './section-block.module.scss';

export const SectionBlock = (props) => {
    const {sectionTitle, sectionContent} = props.blockProps;
    console.log(props)
    return (
        <div>
            <span
                style={{
                    // background: "#e3e8f0",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontWeight: 700,
                    // color: "#22577a",
                    margin: "0 4px",
                    display: "inline-block",
                    userSelect: "none",
                }}
                contentEditable={false} // не редактируемое
            >
            {sectionTitle}
        </span>
            <div>
                 <span
                     style={{
                         borderRadius: 8,
                         padding: "4px 12px",
                         fontWeight: 700,
                         margin: "0 4px",
                         display: "inline-block",
                         userSelect: "none",
                     }}
                     contentEditable={false} // не редактируемое
                 >
             {sectionContent}
         </span>
            </div>
        </div>
    );
};