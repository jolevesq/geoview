import { Extent } from 'ol/extent';
import { TypeJsonObject } from '@/core/types/global-types';
import { EsriImageLayerEntryConfig } from '@/core/utils/config/validation-classes/raster-validation-classes/esri-image-layer-entry-config';
import { codedValueType, rangeDomainType } from '@/geo/utils/layer-set';
import { AbstractGeoViewLayer, CONST_LAYER_TYPES, TypeLegend } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { AbstractGeoViewRaster, TypeBaseRasterLayer } from '@/geo/layer/geoview-layers/raster/abstract-geoview-raster';
import { TypeLayerEntryConfig, TypeGeoviewLayerConfig, TypeListOfLayerEntryConfig } from '@/geo/map/map-schema-types';
export interface TypeEsriImageLayerConfig extends TypeGeoviewLayerConfig {
    geoviewLayerType: typeof CONST_LAYER_TYPES.ESRI_IMAGE;
    listOfLayerEntryConfig: EsriImageLayerEntryConfig[];
}
/** ******************************************************************************************************************************
 * type guard function that redefines a TypeGeoviewLayerConfig as a TypeEsriImageLayerConfig if the geoviewLayerType attribute of
 * the verifyIfLayer parameter is ESRI_IMAGE. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeGeoviewLayerConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const layerConfigIsEsriImage: (verifyIfLayer: TypeGeoviewLayerConfig) => verifyIfLayer is TypeEsriImageLayerConfig;
/** ******************************************************************************************************************************
 * type guard function that redefines an AbstractGeoViewLayer as an EsriImage if the type attribute of the verifyIfGeoViewLayer
 * parameter is ESRI_IMAGE. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {AbstractGeoViewLayer} verifyIfGeoViewLayer Polymorphic object to test in order to determine if the type ascention is
 * valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const geoviewLayerIsEsriImage: (verifyIfGeoViewLayer: AbstractGeoViewLayer) => verifyIfGeoViewLayer is EsriImage;
/** ******************************************************************************************************************************
 * type guard function that redefines a TypeLayerEntryConfig as a EsriImageLayerEntryConfig if the geoviewLayerType attribute
 * of the verifyIfGeoViewEntry.geoviewLayerConfig attribute is ESRI_IMAGE. The type ascention applies only to the true block of
 * the if clause that use this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfGeoViewEntry Polymorphic object to test in order to determine if the type ascention is
 * valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const geoviewEntryIsEsriImage: (verifyIfGeoViewEntry: TypeLayerEntryConfig) => verifyIfGeoViewEntry is EsriImageLayerEntryConfig;
/** ******************************************************************************************************************************
 * A class to add esri image layer.
 *
 * @exports
 * @class EsriImage
 */
export declare class EsriImage extends AbstractGeoViewRaster {
    /** ****************************************************************************************************************************
     * Initialize layer.
     * @param {string} mapId The id of the map.
     * @param {TypeEsriImageLayerConfig} layerConfig The layer configuration.
     */
    constructor(mapId: string, layerConfig: TypeEsriImageLayerConfig);
    /** ***************************************************************************************************************************
     * Return the legend of the layer.This routine return null when the layerPath specified is not found. If the legend can't be
     * read, the legend property of the object returned will be null.
     *
     * @param {string} layerPath The layer path to the layer's configuration.
     *
     * @returns {Promise<TypeLegend | null>} The legend of the layer.
     */
    getLegend(layerPath: string): Promise<TypeLegend | null>;
    /** ***************************************************************************************************************************
     * This method recursively validates the layer configuration entries by filtering and reporting invalid layers. If needed,
     * extra configuration may be done here.
     *
     * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries configuration to validate.
     *
     * @returns {TypeListOfLayerEntryConfig} A new list of layer entries configuration with deleted error layers.
     */
    protected validateListOfLayerEntryConfig(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): void;
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
     * Return the domain of the specified field.
     *
     * @param {string} fieldName field name for which we want to get the domain.
     * @param {TypeLayerEntryConfig} layerConfig layer configuration.
     *
     * @returns {null | codedValueType | rangeDomainType} The domain of the field.
     */
    protected getFieldDomain(fieldName: string, layerConfig: TypeLayerEntryConfig): null | codedValueType | rangeDomainType;
    /** ***************************************************************************************************************************
     * This method will create a Geoview temporal dimension if it exist in the service metadata
     * @param {TypeJsonObject} esriTimeDimension The ESRI time dimension object
     * @param {EsriImageLayerEntryConfig} layerConfig The layer entry to configure
     */
    protected processTemporalDimension(esriTimeDimension: TypeJsonObject, layerConfig: EsriImageLayerEntryConfig): void;
    /** ***************************************************************************************************************************
     * This method verifies if the layer is queryable and sets the outfields and aliasFields of the source feature info.
     *
     * @param {EsriImageLayerEntryConfig} layerConfig The layer entry to configure.
     */
    processFeatureInfoConfig: (layerConfig: EsriImageLayerEntryConfig) => void;
    /** ***************************************************************************************************************************
     * This method set the initial settings based on the service metadata. Priority is given to the layer configuration.
     *
     * @param {EsriImage} this The ESRI layer instance pointer.
     * @param {EsriImageLayerEntryConfig} layerConfig The layer entry to configure.
     */
    processInitialSettings(layerConfig: EsriImageLayerEntryConfig): void;
    /** ***************************************************************************************************************************
     * This method is used to process the layer's metadata. It will fill the empty fields of the layer's configuration (renderer,
     * initial settings, fields and aliases).
     *
     * @param {TypeLayerEntryConfig} layerConfig The layer entry configuration to process.
     *
     * @returns {Promise<TypeLayerEntryConfig>} A promise that the layer configuration has its metadata processed.
     */
    protected processLayerMetadata(layerConfig: TypeLayerEntryConfig): Promise<TypeLayerEntryConfig>;
    /** ****************************************************************************************************************************
     * This method creates a GeoView Esri Image layer using the definition provided in the layerConfig parameter.
     *
     * @param {EsriImageLayerEntryConfig} layerConfig Information needed to create the GeoView layer.
     *
     * @returns {TypeBaseRasterLayer} The GeoView raster layer that has been created.
     */
    protected processOneLayerEntry(layerConfig: EsriImageLayerEntryConfig): Promise<TypeBaseRasterLayer | null>;
    /** ***************************************************************************************************************************
     * Apply a view filter to the layer. When the CombineLegendFilter flag is false, the filter paramater is used alone to display
     * the features. Otherwise, the legend filter and the filter parameter are combined together to define the view filter. The
     * legend filters are derived from the uniqueValue or classBreaks style of the layer. When the layer config is invalid, nothing
     * is done.
     *
     * @param {string} layerPath The layer path to the layer's configuration.
     * @param {string} filter An optional filter to be used in place of the getViewFilter value.
     * @param {boolean} CombineLegendFilter Flag used to combine the legend filter and the filter together (default: true)
     */
    applyViewFilter(layerPath: string, filter: string, CombineLegendFilter?: boolean): void;
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
