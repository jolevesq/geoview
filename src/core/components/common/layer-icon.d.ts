/// <reference types="react" />
import { TypeLegendLayer } from '@/core/components/layers/types';
import { LayerListEntry } from '.';
interface LayerIconProps {
    layer: TypeLegendLayer | LayerListEntry;
}
export declare function LayerIcon({ layer }: LayerIconProps): JSX.Element;
export {};
