import React from 'react';
export declare type DepthSectionProps = {
    children: React.ReactNode | null;
    inView?: boolean;
    debug?: boolean;
};
/** A Three JS canvas with a custom GLTF background. */
export declare const DepthSection: (props: DepthSectionProps) => JSX.Element;
