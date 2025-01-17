import { TypeLayersViewDisplayState, TypeLegendLayer } from '@/core/components/layers/types';
import { TypeGetStore, TypeSetStore } from '@/core/stores/geoview-store';
import { TypeStyleGeometry } from '@/geo/map/map-schema-types';
export interface ILayerState {
    highlightedLayer: string;
    selectedLayer: TypeLegendLayer;
    selectedLayerPath: string | undefined | null;
    legendLayers: TypeLegendLayer[];
    displayState: TypeLayersViewDisplayState;
    layerDeleteInProgress: boolean;
    actions: {
        setLegendLayers: (legendLayers: TypeLegendLayer[]) => void;
        getLayer: (layerPath: string) => TypeLegendLayer | undefined;
        getLayerBounds: (layerPath: string) => number[] | undefined;
        setDisplayState: (newDisplayState: TypeLayersViewDisplayState) => void;
        setHighlightLayer: (layerPath: string) => void;
        setLayerOpacity: (layerPath: string, opacity: number) => void;
        setSelectedLayerPath: (layerPath: string) => void;
        toggleItemVisibility: (layerPath: string, geometryType: TypeStyleGeometry, itemName: string) => void;
        setAllItemsVisibility: (layerPath: string, visibility: boolean) => void;
        setLayerDeleteInProgress: (newVal: boolean) => void;
        getLayerDeleteInProgress: () => boolean;
        deleteLayer: (layerPath: string) => void;
        zoomToLayerExtent: (layerPath: string) => void;
    };
}
export declare function initializeLayerState(set: TypeSetStore, get: TypeGetStore): ILayerState;
export declare const useLayerHighlightedLayer: () => string;
export declare const useLayerLegendLayers: () => TypeLegendLayer[];
export declare const useLayerSelectedLayer: () => TypeLegendLayer;
export declare const useLayerSelectedLayerPath: () => string | null | undefined;
export declare const useLayerDisplayState: () => TypeLayersViewDisplayState;
export declare const useLayerStoreActions: () => {
    setLegendLayers: (legendLayers: TypeLegendLayer[]) => void;
    getLayer: (layerPath: string) => TypeLegendLayer | undefined;
    getLayerBounds: (layerPath: string) => number[] | undefined;
    setDisplayState: (newDisplayState: TypeLayersViewDisplayState) => void;
    setHighlightLayer: (layerPath: string) => void;
    setLayerOpacity: (layerPath: string, opacity: number) => void;
    setSelectedLayerPath: (layerPath: string) => void;
    toggleItemVisibility: (layerPath: string, geometryType: TypeStyleGeometry, itemName: string) => void;
    setAllItemsVisibility: (layerPath: string, visibility: boolean) => void;
    setLayerDeleteInProgress: (newVal: boolean) => void;
    getLayerDeleteInProgress: () => boolean;
    deleteLayer: (layerPath: string) => void;
    zoomToLayerExtent: (layerPath: string) => void;
};
export declare const useSelectedLayer: () => TypeLegendLayer | undefined;
export declare const useIconLayerSet: (layerPath: string) => string[];
