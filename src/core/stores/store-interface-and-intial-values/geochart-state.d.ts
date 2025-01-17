import { GeoChartConfig } from '@/core/utils/config/reader/uuid-config-reader';
import { TypeLayerData } from '@/geo/utils/layer-set';
import { TypeGetStore, TypeSetStore } from '@/core/stores/geoview-store';
export type GeoChartStoreByLayerPath = {
    [layerPath: string]: GeoChartConfig;
};
export interface IGeochartState {
    geochartChartsConfig: GeoChartStoreByLayerPath;
    layerDataArray: TypeLayerData[];
    layerDataArrayBatch: TypeLayerData[];
    layerDataArrayBatchLayerPathBypass: string;
    selectedLayerPath: string;
    actions: {
        setGeochartCharts: (charts: GeoChartStoreByLayerPath) => void;
        setLayerDataArray: (layerDataArray: TypeLayerData[]) => void;
        setLayerDataArrayBatch: (layerDataArray: TypeLayerData[]) => void;
        setLayerDataArrayBatchLayerPathBypass: (layerPath: string) => void;
        setSelectedLayerPath: (selectedLayerPath: string) => void;
    };
}
/**
 * Initializes a Geochart state object.
 * @param {TypeSetStore} set The store set callback function
 * @param {TypeSetStore} get The store get callback function
 * @returns {IGeochartState} The Geochart state object
 */
export declare function initializeGeochartState(set: TypeSetStore, get: TypeGetStore): IGeochartState;
export declare const useGeochartConfigs: () => GeoChartStoreByLayerPath;
export declare const useGeochartLayerDataArray: () => TypeLayerData[];
export declare const useGeochartLayerDataArrayBatch: () => TypeLayerData[];
export declare const useGeochartSelectedLayerPath: () => string;
export declare const useGeochartStoreActions: () => {
    setGeochartCharts: (charts: GeoChartStoreByLayerPath) => void;
    setLayerDataArray: (layerDataArray: TypeLayerData[]) => void;
    setLayerDataArrayBatch: (layerDataArray: TypeLayerData[]) => void;
    setLayerDataArrayBatchLayerPathBypass: (layerPath: string) => void;
    setSelectedLayerPath: (selectedLayerPath: string) => void;
};
