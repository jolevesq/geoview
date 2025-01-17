import { Dispatch, SetStateAction } from 'react';
import { TypeLegendLayer } from '@/core/components/layers/types';
interface SingleLayerProps {
    layer: TypeLegendLayer;
    depth: number;
    isDragging: boolean;
    setIsLayersListPanelVisible: Dispatch<SetStateAction<boolean>>;
    index: number;
}
export declare function SingleLayer({ isDragging, depth, layer, setIsLayersListPanelVisible, index }: SingleLayerProps): JSX.Element;
export {};
