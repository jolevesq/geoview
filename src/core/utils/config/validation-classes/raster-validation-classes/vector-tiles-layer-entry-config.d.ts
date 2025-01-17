import { TypeSourceVectorTilesInitialConfig } from '@/geo/layer/geoview-layers/raster/vector-tiles';
import { TypeStyleConfig, TypeTileGrid } from '@/geo/map/map-schema-types';
import { TileLayerEntryConfig } from '@/core/utils/config/validation-classes/tile-layer-entry-config';
export declare class VectorTilesLayerEntryConfig extends TileLayerEntryConfig {
    source: TypeSourceVectorTilesInitialConfig;
    /** Style to apply to the vector layer. */
    style?: TypeStyleConfig;
    tileGrid: TypeTileGrid;
    /**
     * The class constructor.
     * @param {VectorTilesLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: VectorTilesLayerEntryConfig);
}
