import { TypeSourceCSVInitialConfig } from '@/geo/layer/geoview-layers/vector/csv';
import { VectorLayerEntryConfig } from '@/core/utils/config/validation-classes/vector-layer-entry-config';
export declare class CsvLayerEntryConfig extends VectorLayerEntryConfig {
    source: TypeSourceCSVInitialConfig;
    valueSeparator?: string | undefined;
    /**
     * The class constructor.
     * @param {CsvLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: CsvLayerEntryConfig);
}
