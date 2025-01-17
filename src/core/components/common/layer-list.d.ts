import { ReactNode } from 'react';
import { TypeFeatureInfoEntry, TypeQueryStatus } from '@/geo/utils/layer-set';
import { TypeLayerStatus } from '@/geo/map/map-schema-types';
export interface LayerListEntry {
    layerName: string;
    layerPath: string;
    layerStatus: TypeLayerStatus;
    queryStatus: TypeQueryStatus;
    layerFeatures?: ReactNode;
    mapFilteredIcon?: ReactNode;
    tooltip?: ReactNode;
    numOffeatures?: number;
    features?: TypeFeatureInfoEntry[] | undefined | null;
}
interface LayerListProps {
    isEnlarged: boolean;
    layerList: LayerListEntry[];
    selectedLayerPath: string | undefined;
    onListItemClick: (layer: LayerListEntry) => void;
}
/**
 * Create a list of layers
 * @param {LayerListEntry} layerList  Array of layer list entries.
 * @param {boolean} isEnlarged Boolean value if right panel is enlarged or not.
 * @param {number} selectedLayerIndex  Current index of list item selected.
 * @param {string} selectedLayerPath  Selected path of the layer.
 * @param {Function} onListItemClick  Callback function excecuted when list item is clicked.
 * @returns
 */
export declare function LayerList({ layerList, isEnlarged, selectedLayerPath, onListItemClick }: LayerListProps): import("react").JSX.Element;
export {};
