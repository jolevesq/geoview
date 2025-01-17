import { TypeLayerData } from '@/geo/utils/layer-set';
import { MappedLayerDataType } from '@/core/components/data-table/data-panel';
/**
 * Custom hook for caching the mapping of fieldInfos aka columns for data table.
 * @param {TypeLayerData[]} layerData data from the query
 * @returns {MappedLayerDataType[]} layerData with columns.
 */
export declare function useFeatureFieldInfos(layerData: TypeLayerData[]): MappedLayerDataType[];
