import { Extent } from 'ol/extent';
import { AbstractGeoViewLayer, CONST_LAYER_TYPES } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { AbstractGeoViewRaster, TypeBaseRasterLayer } from '@/geo/layer/geoview-layers/raster/abstract-geoview-raster';
import { TypeLayerEntryConfig, TypeSourceTileInitialConfig, TypeGeoviewLayerConfig, TypeListOfLayerEntryConfig } from '@/geo/map/map-schema-types';
import { XYZTilesLayerEntryConfig } from '@/core/utils/config/validation-classes/raster-validation-classes/xyz-layer-entry-config';
export type TypeSourceImageXYZTilesInitialConfig = TypeSourceTileInitialConfig;
export interface TypeXYZTilesConfig extends Omit<TypeGeoviewLayerConfig, 'listOfLayerEntryConfig'> {
    geoviewLayerType: typeof CONST_LAYER_TYPES.XYZ_TILES;
    listOfLayerEntryConfig: XYZTilesLayerEntryConfig[];
}
/** *****************************************************************************************************************************
 * type guard function that redefines a TypeGeoviewLayerConfig as a TypeXYZTilesConfig if the geoviewLayerType attribute of the
 * verifyIfLayer parameter is XYZ_TILES. The type ascention applies only to the true block of the if clause that use this
 * function.
 *
 * @param {TypeGeoviewLayerConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const layerConfigIsXYZTiles: (verifyIfLayer: TypeGeoviewLayerConfig) => verifyIfLayer is TypeXYZTilesConfig;
/** *****************************************************************************************************************************
 * type guard function that redefines an AbstractGeoViewLayer as an XYZTiles if the type attribute of the verifyIfGeoViewLayer
 * parameter is XYZ_TILES. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {AbstractGeoViewLayer} verifyIfGeoViewLayer Polymorphic object to test in order to determine if the type ascention
 * is valid
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const geoviewLayerIsXYZTiles: (verifyIfGeoViewLayer: AbstractGeoViewLayer) => verifyIfGeoViewLayer is XYZTiles;
/** *****************************************************************************************************************************
 * type guard function that redefines a TypeLayerEntryConfig as a XYZTilesLayerEntryConfig if the geoviewLayerType attribute
 * of the verifyIfGeoViewEntry.geoviewLayerConfig attribute is XYZ_TILES. The type ascention applies only to the true block of
 * the if clause that use this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfGeoViewEntry Polymorphic object to test in order to determine if the type ascention is
 * valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const geoviewEntryIsXYZTiles: (verifyIfGeoViewEntry: TypeLayerEntryConfig) => verifyIfGeoViewEntry is XYZTilesLayerEntryConfig;
/** *****************************************************************************************************************************
 * a class to add xyz-tiles layer
 *
 * @exports
 * @class XYZTiles
 */
export declare class XYZTiles extends AbstractGeoViewRaster {
    /** ***************************************************************************************************************************
     * Initialize layer
     *
     * @param {string} mapId the id of the map
     * @param {TypeXYZTilesConfig} layerConfig the layer configuration
     */
    constructor(mapId: string, layerConfig: TypeXYZTilesConfig);
    /** ***************************************************************************************************************************
     * Extract the type of the specified field from the metadata. If the type can not be found, return 'string'.
     *
     * @param {string} fieldName field name for which we want to get the type.
     * @param {TypeLayerEntryConfig} layerConfig layer configuration.
     *
     * @returns {'string' | 'date' | 'number'} The type of the field.
     */
    protected getFieldType(fieldName: string, layerConfig: TypeLayerEntryConfig): 'string' | 'date' | 'number';
    /** ***************************************************************************************************************************
     * This method recursively validates the layer configuration entries by filtering and reporting invalid layers. If needed,
     * extra configuration may be done here.
     *
     * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries configuration to validate.
     */
    protected validateListOfLayerEntryConfig(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): void;
    /** ****************************************************************************************************************************
     * This method creates a GeoView XYZTiles layer using the definition provided in the layerConfig parameter.
     *
     * @param {XYZTilesLayerEntryConfig} layerConfig Information needed to create the GeoView layer.
     *
     * @returns {TypeBaseRasterLayer} The GeoView raster layer that has been created.
     */
    protected processOneLayerEntry(layerConfig: XYZTilesLayerEntryConfig): Promise<TypeBaseRasterLayer | null>;
    /** ***************************************************************************************************************************
     * This method is used to process the layer's metadata. It will fill the empty fields of the layer's configuration (renderer,
     * initial settings, fields and aliases).
     *
     * @param {TypeLayerEntryConfig} layerConfig The layer entry configuration to process.
     *
     * @returns {Promise<TypeLayerEntryConfig>} A promise that the vector layer configuration has its metadata processed.
     */
    protected processLayerMetadata(layerConfig: TypeLayerEntryConfig): Promise<TypeLayerEntryConfig>;
    /** ***************************************************************************************************************************
     * Get the bounds of the layer represented in the layerConfig pointed to by the layerPath, returns updated bounds
     *
     * @param {string} layerPath The Layer path to the layer's configuration.
     * @param {Extent | undefined} bounds The current bounding box to be adjusted.
     *
     * @returns {Extent | undefined} The new layer bounding box.
     */
    protected getBounds(layerPath: string, bounds?: Extent): Extent | undefined;
}
