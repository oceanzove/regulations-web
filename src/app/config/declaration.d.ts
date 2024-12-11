declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';
    export const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}