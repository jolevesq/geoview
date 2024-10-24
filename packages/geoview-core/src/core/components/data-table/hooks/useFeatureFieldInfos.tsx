import { TypeLayerData, TypeFieldEntry } from '@/geo/utils/layer-set';
import { MappedLayerDataType } from '@/core/components/data-table/data-panel';

/**
 * Custom hook for caching the mapping of fieldInfos aka columns for data table.
 * @param {TypeLayerData[]} layerData data from the query
 * @returns {MappedLayerDataType[]} layerData with columns.
 */
export function useFeatureFieldInfos(layerData: TypeLayerData[]): MappedLayerDataType[] {
  const mappedLayerData = layerData?.map((layer) => {
    let fieldInfos = {} as Record<string, TypeFieldEntry | undefined>;
    if (layer.features?.length) {
      fieldInfos = layer.features[0].fieldInfo;
    }
    return { ...layer, fieldInfos };
  });

  return mappedLayerData;
}
