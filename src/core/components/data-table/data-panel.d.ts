/// <reference types="react" />
import { TypeFieldEntry, TypeLayerData } from '@/geo/utils/layer-set';
export interface MappedLayerDataType extends TypeLayerData {
    fieldInfos: Record<string, TypeFieldEntry | undefined>;
}
interface DataPanelType {
    fullWidth?: boolean;
}
/**
 * Build Data panel from map.
 * @return {ReactElement} Data table as react element.
 */
export declare function Datapanel({ fullWidth }: DataPanelType): import("react").JSX.Element;
export declare namespace Datapanel {
    var defaultProps: {
        fullWidth: boolean;
    };
}
export {};
