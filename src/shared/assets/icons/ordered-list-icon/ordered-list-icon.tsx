import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const Component: FC<TIconProps> = ({ height = 24, width = 24, ...props }) => (
    <>
        <svg
            width={width}
            height={height}
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M1.30891 0H2.00391V3.575H1.14391V0.895L0.253906 1.43V0.59L1.30891 0Z" fill="#020914"/>
            <path d="M1.30891 0H2.00391V3.575H1.14391V0.895L0.253906 1.43V0.59L1.30891 0Z" fill="black"
                  fill-opacity="0.2"/>
            <path d="M1.30891 0H2.00391V3.575H1.14391V0.895L0.253906 1.43V0.59L1.30891 0Z" fill="black"
                  fill-opacity="0.2"/>
            <path
                d="M5.27714 3H15.0183C15.6183 3 16.0183 2.6 16.0183 2C16.0183 1.4 15.6183 1 15.0183 1H5.27714C4.67714 1 4.27714 1.4 4.27714 2C4.27714 2.6 4.67714 3 5.27714 3Z"
                fill="#020914"/>
            <path
                d="M5.27714 3H15.0183C15.6183 3 16.0183 2.6 16.0183 2C16.0183 1.4 15.6183 1 15.0183 1H5.27714C4.67714 1 4.27714 1.4 4.27714 2C4.27714 2.6 4.67714 3 5.27714 3Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M5.27714 3H15.0183C15.6183 3 16.0183 2.6 16.0183 2C16.0183 1.4 15.6183 1 15.0183 1H5.27714C4.67714 1 4.27714 1.4 4.27714 2C4.27714 2.6 4.67714 3 5.27714 3Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M2.71392 8.66965H0.103921V7.98965L1.51892 6.77465C1.63892 6.66798 1.72559 6.56965 1.77892 6.47965C1.83559 6.38631 1.86392 6.28965 1.86392 6.18965C1.86392 6.09965 1.84059 6.01965 1.79392 5.94965C1.75059 5.87965 1.69059 5.82465 1.61392 5.78465C1.53725 5.74465 1.45225 5.72465 1.35892 5.72465C1.22225 5.72465 1.08559 5.76465 0.948921 5.84465C0.815588 5.92131 0.687254 6.04965 0.563921 6.22965L0.0189209 5.68465C0.188921 5.47132 0.387254 5.30631 0.613921 5.18965C0.843921 5.07298 1.10559 5.01465 1.39892 5.01465C1.66225 5.01465 1.89059 5.06465 2.08392 5.16465C2.27725 5.26131 2.42725 5.39631 2.53392 5.56965C2.64059 5.74298 2.69392 5.94298 2.69392 6.16965C2.69392 6.31965 2.66392 6.46798 2.60392 6.61465C2.54392 6.75798 2.45059 6.90298 2.32392 7.04965C2.20059 7.19631 2.04059 7.34965 1.84392 7.50965C1.79725 7.54965 1.73392 7.60131 1.65392 7.66465C1.57725 7.72465 1.49892 7.78465 1.41892 7.84465C1.34225 7.90465 1.27725 7.95298 1.22392 7.98965H2.71392V8.66965Z"
                fill="#020914"/>
            <path
                d="M2.71392 8.66965H0.103921V7.98965L1.51892 6.77465C1.63892 6.66798 1.72559 6.56965 1.77892 6.47965C1.83559 6.38631 1.86392 6.28965 1.86392 6.18965C1.86392 6.09965 1.84059 6.01965 1.79392 5.94965C1.75059 5.87965 1.69059 5.82465 1.61392 5.78465C1.53725 5.74465 1.45225 5.72465 1.35892 5.72465C1.22225 5.72465 1.08559 5.76465 0.948921 5.84465C0.815588 5.92131 0.687254 6.04965 0.563921 6.22965L0.0189209 5.68465C0.188921 5.47132 0.387254 5.30631 0.613921 5.18965C0.843921 5.07298 1.10559 5.01465 1.39892 5.01465C1.66225 5.01465 1.89059 5.06465 2.08392 5.16465C2.27725 5.26131 2.42725 5.39631 2.53392 5.56965C2.64059 5.74298 2.69392 5.94298 2.69392 6.16965C2.69392 6.31965 2.66392 6.46798 2.60392 6.61465C2.54392 6.75798 2.45059 6.90298 2.32392 7.04965C2.20059 7.19631 2.04059 7.34965 1.84392 7.50965C1.79725 7.54965 1.73392 7.60131 1.65392 7.66465C1.57725 7.72465 1.49892 7.78465 1.41892 7.84465C1.34225 7.90465 1.27725 7.95298 1.22392 7.98965H2.71392V8.66965Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M2.71392 8.66965H0.103921V7.98965L1.51892 6.77465C1.63892 6.66798 1.72559 6.56965 1.77892 6.47965C1.83559 6.38631 1.86392 6.28965 1.86392 6.18965C1.86392 6.09965 1.84059 6.01965 1.79392 5.94965C1.75059 5.87965 1.69059 5.82465 1.61392 5.78465C1.53725 5.74465 1.45225 5.72465 1.35892 5.72465C1.22225 5.72465 1.08559 5.76465 0.948921 5.84465C0.815588 5.92131 0.687254 6.04965 0.563921 6.22965L0.0189209 5.68465C0.188921 5.47132 0.387254 5.30631 0.613921 5.18965C0.843921 5.07298 1.10559 5.01465 1.39892 5.01465C1.66225 5.01465 1.89059 5.06465 2.08392 5.16465C2.27725 5.26131 2.42725 5.39631 2.53392 5.56965C2.64059 5.74298 2.69392 5.94298 2.69392 6.16965C2.69392 6.31965 2.66392 6.46798 2.60392 6.61465C2.54392 6.75798 2.45059 6.90298 2.32392 7.04965C2.20059 7.19631 2.04059 7.34965 1.84392 7.50965C1.79725 7.54965 1.73392 7.60131 1.65392 7.66465C1.57725 7.72465 1.49892 7.78465 1.41892 7.84465C1.34225 7.90465 1.27725 7.95298 1.22392 7.98965H2.71392V8.66965Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M15.0183 6H5.27714C4.67714 6 4.27714 6.4 4.27714 7C4.27714 7.6 4.67714 8 5.27714 8H15.0183C15.6183 8 16.0183 7.6 16.0183 7C16.0183 6.4 15.6183 6 15.0183 6Z"
                fill="#020914"/>
            <path
                d="M15.0183 6H5.27714C4.67714 6 4.27714 6.4 4.27714 7C4.27714 7.6 4.67714 8 5.27714 8H15.0183C15.6183 8 16.0183 7.6 16.0183 7C16.0183 6.4 15.6183 6 15.0183 6Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M15.0183 6H5.27714C4.67714 6 4.27714 6.4 4.27714 7C4.27714 7.6 4.67714 8 5.27714 8H15.0183C15.6183 8 16.0183 7.6 16.0183 7C16.0183 6.4 15.6183 6 15.0183 6Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M0.00390625 13.2336L0.548906 12.6886C0.655573 12.8219 0.778906 12.9236 0.918906 12.9936C1.05891 13.0603 1.21224 13.0936 1.37891 13.0936C1.56224 13.0936 1.71391 13.0553 1.83391 12.9786C1.95391 12.9019 2.01391 12.7903 2.01391 12.6436C2.01391 12.5569 1.98724 12.4836 1.93391 12.4236C1.88391 12.3603 1.81391 12.3136 1.72391 12.2836C1.63391 12.2503 1.52724 12.2336 1.40391 12.2336H1.08891V11.5386H1.40391C1.50724 11.5386 1.59557 11.5236 1.66891 11.4936C1.74557 11.4603 1.80557 11.4169 1.84891 11.3636C1.89224 11.3069 1.91391 11.2453 1.91391 11.1786C1.91391 11.0486 1.86724 10.9503 1.77391 10.8836C1.68057 10.8136 1.56224 10.7786 1.41891 10.7786C1.26224 10.7786 1.11891 10.8136 0.988906 10.8836C0.86224 10.9503 0.748906 11.0503 0.648906 11.1836L0.103906 10.6386C0.27724 10.4519 0.478906 10.3103 0.708906 10.2136C0.94224 10.1169 1.19057 10.0686 1.45391 10.0686C1.72057 10.0686 1.95391 10.1153 2.15391 10.2086C2.35391 10.2986 2.50891 10.4203 2.61891 10.5736C2.72891 10.7236 2.78391 10.8919 2.78391 11.0786C2.78391 11.2486 2.73391 11.3969 2.63391 11.5236C2.53391 11.6503 2.39391 11.7486 2.21391 11.8186C2.03724 11.8886 1.83057 11.9236 1.59391 11.9236L1.74391 11.7386C1.97057 11.7386 2.16891 11.7786 2.33891 11.8586C2.50891 11.9386 2.64224 12.0503 2.73891 12.1936C2.83557 12.3369 2.88391 12.5036 2.88391 12.6936C2.88391 12.9036 2.82224 13.0919 2.69891 13.2586C2.57557 13.4253 2.40391 13.5586 2.18391 13.6586C1.96391 13.7553 1.70724 13.8036 1.41391 13.8036C1.14057 13.8036 0.88224 13.7553 0.638906 13.6586C0.395573 13.5619 0.183906 13.4203 0.00390625 13.2336Z"
                fill="#020914"/>
            <path
                d="M0.00390625 13.2336L0.548906 12.6886C0.655573 12.8219 0.778906 12.9236 0.918906 12.9936C1.05891 13.0603 1.21224 13.0936 1.37891 13.0936C1.56224 13.0936 1.71391 13.0553 1.83391 12.9786C1.95391 12.9019 2.01391 12.7903 2.01391 12.6436C2.01391 12.5569 1.98724 12.4836 1.93391 12.4236C1.88391 12.3603 1.81391 12.3136 1.72391 12.2836C1.63391 12.2503 1.52724 12.2336 1.40391 12.2336H1.08891V11.5386H1.40391C1.50724 11.5386 1.59557 11.5236 1.66891 11.4936C1.74557 11.4603 1.80557 11.4169 1.84891 11.3636C1.89224 11.3069 1.91391 11.2453 1.91391 11.1786C1.91391 11.0486 1.86724 10.9503 1.77391 10.8836C1.68057 10.8136 1.56224 10.7786 1.41891 10.7786C1.26224 10.7786 1.11891 10.8136 0.988906 10.8836C0.86224 10.9503 0.748906 11.0503 0.648906 11.1836L0.103906 10.6386C0.27724 10.4519 0.478906 10.3103 0.708906 10.2136C0.94224 10.1169 1.19057 10.0686 1.45391 10.0686C1.72057 10.0686 1.95391 10.1153 2.15391 10.2086C2.35391 10.2986 2.50891 10.4203 2.61891 10.5736C2.72891 10.7236 2.78391 10.8919 2.78391 11.0786C2.78391 11.2486 2.73391 11.3969 2.63391 11.5236C2.53391 11.6503 2.39391 11.7486 2.21391 11.8186C2.03724 11.8886 1.83057 11.9236 1.59391 11.9236L1.74391 11.7386C1.97057 11.7386 2.16891 11.7786 2.33891 11.8586C2.50891 11.9386 2.64224 12.0503 2.73891 12.1936C2.83557 12.3369 2.88391 12.5036 2.88391 12.6936C2.88391 12.9036 2.82224 13.0919 2.69891 13.2586C2.57557 13.4253 2.40391 13.5586 2.18391 13.6586C1.96391 13.7553 1.70724 13.8036 1.41391 13.8036C1.14057 13.8036 0.88224 13.7553 0.638906 13.6586C0.395573 13.5619 0.183906 13.4203 0.00390625 13.2336Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M0.00390625 13.2336L0.548906 12.6886C0.655573 12.8219 0.778906 12.9236 0.918906 12.9936C1.05891 13.0603 1.21224 13.0936 1.37891 13.0936C1.56224 13.0936 1.71391 13.0553 1.83391 12.9786C1.95391 12.9019 2.01391 12.7903 2.01391 12.6436C2.01391 12.5569 1.98724 12.4836 1.93391 12.4236C1.88391 12.3603 1.81391 12.3136 1.72391 12.2836C1.63391 12.2503 1.52724 12.2336 1.40391 12.2336H1.08891V11.5386H1.40391C1.50724 11.5386 1.59557 11.5236 1.66891 11.4936C1.74557 11.4603 1.80557 11.4169 1.84891 11.3636C1.89224 11.3069 1.91391 11.2453 1.91391 11.1786C1.91391 11.0486 1.86724 10.9503 1.77391 10.8836C1.68057 10.8136 1.56224 10.7786 1.41891 10.7786C1.26224 10.7786 1.11891 10.8136 0.988906 10.8836C0.86224 10.9503 0.748906 11.0503 0.648906 11.1836L0.103906 10.6386C0.27724 10.4519 0.478906 10.3103 0.708906 10.2136C0.94224 10.1169 1.19057 10.0686 1.45391 10.0686C1.72057 10.0686 1.95391 10.1153 2.15391 10.2086C2.35391 10.2986 2.50891 10.4203 2.61891 10.5736C2.72891 10.7236 2.78391 10.8919 2.78391 11.0786C2.78391 11.2486 2.73391 11.3969 2.63391 11.5236C2.53391 11.6503 2.39391 11.7486 2.21391 11.8186C2.03724 11.8886 1.83057 11.9236 1.59391 11.9236L1.74391 11.7386C1.97057 11.7386 2.16891 11.7786 2.33891 11.8586C2.50891 11.9386 2.64224 12.0503 2.73891 12.1936C2.83557 12.3369 2.88391 12.5036 2.88391 12.6936C2.88391 12.9036 2.82224 13.0919 2.69891 13.2586C2.57557 13.4253 2.40391 13.5586 2.18391 13.6586C1.96391 13.7553 1.70724 13.8036 1.41391 13.8036C1.14057 13.8036 0.88224 13.7553 0.638906 13.6586C0.395573 13.5619 0.183906 13.4203 0.00390625 13.2336Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M15.0183 10.8693H5.27714C4.67714 10.8693 4.27714 11.2693 4.27714 11.8693C4.27714 12.4693 4.67714 12.8693 5.27714 12.8693H15.0183C15.6183 12.8693 16.0183 12.4693 16.0183 11.8693C16.0183 11.2693 15.6183 10.8693 15.0183 10.8693Z"
                fill="#020914"/>
            <path
                d="M15.0183 10.8693H5.27714C4.67714 10.8693 4.27714 11.2693 4.27714 11.8693C4.27714 12.4693 4.67714 12.8693 5.27714 12.8693H15.0183C15.6183 12.8693 16.0183 12.4693 16.0183 11.8693C16.0183 11.2693 15.6183 10.8693 15.0183 10.8693Z"
                fill="black" fill-opacity="0.2"/>
            <path
                d="M15.0183 10.8693H5.27714C4.67714 10.8693 4.27714 11.2693 4.27714 11.8693C4.27714 12.4693 4.67714 12.8693 5.27714 12.8693H15.0183C15.6183 12.8693 16.0183 12.4693 16.0183 11.8693C16.0183 11.2693 15.6183 10.8693 15.0183 10.8693Z"
                fill="black" fill-opacity="0.2"/>
        </svg>
    </>

);

export const OrderedListIcon = memo(Component);
