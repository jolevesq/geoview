import { TypeSetStore, TypeGetStore } from '@/core/stores/geoview-store';
import { TypeLayerData, TypeFeatureInfoEntry } from '@/geo/utils/layer-set';
export interface IFeatureInfoState {
    checkedFeatures: Array<TypeFeatureInfoEntry>;
    layerDataArray: TypeLayerData[];
    layerDataArrayBatch: TypeLayerData[];
    layerDataArrayBatchLayerPathBypass: string;
    selectedLayerPath: string;
    actions: {
        addCheckedFeature: (feature: TypeFeatureInfoEntry) => void;
        removeCheckedFeature: (feature: TypeFeatureInfoEntry | 'all') => void;
        setLayerDataArray: (layerDataArray: TypeLayerData[]) => void;
        setLayerDataArrayBatch: (layerDataArray: TypeLayerData[]) => void;
        setLayerDataArrayBatchLayerPathBypass: (layerPath: string) => void;
        setSelectedLayerPath: (selectedLayerPath: string) => void;
    };
}
export declare function initFeatureInfoState(set: TypeSetStore, get: TypeGetStore): IFeatureInfoState;
export declare const useDetailsCheckedFeatures: () => TypeFeatureInfoEntry[];
export declare const useDetailsLayerDataArray: () => TypeLayerData[];
export declare const useDetailsLayerDataArrayBatch: () => TypeLayerData[];
export declare const useDetailsSelectedLayerPath: () => string;
export declare const useDetailsStoreActions: () => {
    addCheckedFeature: (feature: TypeFeatureInfoEntry) => void;
    removeCheckedFeature: (feature: TypeFeatureInfoEntry | 'all') => void;
    setLayerDataArray: (layerDataArray: TypeLayerData[]) => void;
    setLayerDataArrayBatch: (layerDataArray: TypeLayerData[]) => void;
    setLayerDataArrayBatchLayerPathBypass: (layerPath: string) => void;
    setSelectedLayerPath: (selectedLayerPath: string) => void;
};
