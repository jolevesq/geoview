import BaseLayer from 'ol/layer/Base';
import { Coordinate } from 'ol/coordinate';
import { Pixel } from 'ol/pixel';
import { Extent } from 'ol/extent';
import { TypeGeoviewLayerConfig, TypeListOfLayerEntryConfig, TypeLocalizedString, TypeLayerEntryConfig, TypeBaseLayerEntryConfig, TypeStyleConfig } from '../../map/map-schema-types';
import { TypeFeatureInfoResult, TypeQueryType } from '../../../api/events/payloads/get-feature-info-payload';
import { TypeJsonObject } from '../../../core/types/global-types';
export declare type TypeLegend = {
    layerId: string;
    layerName: TypeLocalizedString;
    legend: TypeStyleConfig;
};
declare type LayerTypesKey = 'ESRI_DYNAMIC' | 'ESRI_FEATURE' | 'GEOJSON' | 'GEOCORE' | 'XYZ_TILES' | 'OGC_FEATURE' | 'WFS' | 'WMS';
/**
 * Type of GeoView layers
 */
export declare type TypeGeoviewLayerType = 'esriDynamic' | 'esriFeature' | 'GeoJSON' | 'geoCore' | 'xyzTiles' | 'ogcFeature' | 'ogcWfs' | 'ogcWms';
/**
 * Definition of the GeoView layer constants
 */
export declare const CONST_LAYER_TYPES: Record<LayerTypesKey, TypeGeoviewLayerType>;
/** ******************************************************************************************************************************
 * The AbstractGeoViewLayer class is normally used for creating subclasses and is not instantiated (using the new operator) in the
 * app. It registers the configuration options and defines the methods shared by all its descendant. The class constructor has
 * three parameters: mapId, type and mapLayerConfig. Its role is to save in attributes the mapId, type and elements of the
 * mapLayerConfig that are common to all GeoView layers. The main characteristic of a GeoView layer is the presence of an
 * metadataAccessPath attribute whose value is passed as an attribute of the mapLayerConfig object.
 */
export declare abstract class AbstractGeoViewLayer {
    /** The unique identifier of the map on which the GeoView layer will be drawn. */
    mapId: string;
    /** The type of GeoView layer that is instantiated. */
    type: TypeGeoviewLayerType;
    /** The unique identifier for the GeoView layer. The value of this attribute is extracted from the mapLayerConfig parameter.
     * If its value is undefined, a unique value is generated.
     */
    layerId: string;
    /** The GeoView layer name. The value of this attribute is extracted from the mapLayerConfig parameter. If its value is
     * undefined, a default value is generated.
     */
    layerName: TypeLocalizedString;
    /** The GeoView layer metadataAccessPath. The name attribute is optional */
    metadataAccessPath: TypeLocalizedString;
    /**
     * An array of layer settings. In the schema, this attribute is optional. However, we define it as mandatory and if the
     * configuration does not provide a value, we use an empty array instead of an undefined attribute.
     */
    listOfLayerEntryConfig: TypeListOfLayerEntryConfig;
    /** Name of listOfLayerEntryConfig that did not load. */
    layerLoadError: {
        layer: string;
        consoleMessage: string;
    }[];
    /**
     * The vector or raster layer structure to be displayed for this GeoView class. Initial value is null indicating that the layers
     * have not been created.
     */
    gvLayers: BaseLayer | null;
    /** The layer Identifier that is used to get and set layer's settings. */
    activeLayer: BaseLayer | null;
    metadata: TypeJsonObject | null;
    /** Attribution used in the OpenLayer source. */
    attributions: string[];
    /** Layers with valid configuration for this map. */
    layersOfTheMap: Record<string, TypeLayerEntryConfig>;
    /** ***************************************************************************************************************************
     * The class constructor saves parameters and common configuration parameters in attributes.
     *
     * @param {TypeGeoviewLayerType} type The type of GeoView layer that is instantiated.
     * @param {TypeGeoviewLayer} mapLayerConfig The GeoView layer configuration options.
     * @param {string} mapId The unique identifier of the map on which the GeoView layer will be drawn.
     */
    constructor(type: TypeGeoviewLayerType, mapLayerConfig: TypeGeoviewLayerConfig, mapId: string);
    /** ***************************************************************************************************************************
     * This method is used to create the layers specified in the listOfLayerEntryConfig attribute inherited from its parent.
     * Normally, it is the second method called in the life cycle of a GeoView layer, the first one being the constructor.
     * Its code is the same for all child classes. It must first validate that the gvLayers attribute is null indicating
     * that the method has never been called before for this layer. If this is not the case, an error message must be sent.
     * Then, it calls the abstract method getAdditionalServiceDefinition. For example, when the child is a WFS service, this
     * method executes the GetCapabilities request and saves the result in the metadata attribute of the class. It also process
     * the layer's metadata for each layer in the listOfLayerEntryConfig tree in order to define the missing pieces of the layer's
     * configuration. Layer's configuration can come from the configuration of the GeoView layer or from the information saved by
     * the method processListOfLayerEntryMetadata, priority being given to the first of the two. When the GeoView layer does not
     * have a service definition, the getAdditionalServiceDefinition method does nothing.
     *
     * Finally, the processListOfLayerEntryConfig is called to instantiate each layer identified by the listOfLayerEntryConfig
     * attribute. This method will also register the layers to all panels that offer this possibility. For example, if a layer is
     * queryable, it will subscribe to the details-panel and every time the user clicks on the map, the panel will ask the layer
     * to return the descriptive information of all the features in a tolerance radius. This information will be used to populate
     * the details-panel.
     */
    createGeoViewLayers(): Promise<void>;
    /** ***************************************************************************************************************************
     * This method reads from the metadataAccessPath additional information to complete the GeoView layer configuration.
     * If the GeoView layer does not have a service definition, this method does nothing.
     */
    protected getAdditionalServiceDefinition(): Promise<void>;
    /** ***************************************************************************************************************************
     * This method reads the service metadata from the metadataAccessPath.
     *
     * @returns {Promise<void>} A promise that the execution is done.
     */
    protected abstract getServiceMetadata(): Promise<void>;
    /** ***************************************************************************************************************************
     * This method recursively validates the configuration of the layer entries to ensure that each layer is correctly defined. If
     * necessary, additional code can be executed in the child method to complete the layer configuration.
     *
     * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries configuration to validate.
     *
     * @returns {TypeListOfLayerEntryConfig} A new layer configuration list with layers in error removed.
     */
    protected abstract validateListOfLayerEntryConfig(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): TypeListOfLayerEntryConfig;
    /** ***************************************************************************************************************************
     * This method processes recursively the metadata of each layer in the list of layer configuration.
     *
     *  @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layers to process.
     *
     * @returns {Promise<void>} A promise that the execution is completed.
     */
    protected abstract processListOfLayerEntryMetadata(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): Promise<void>;
    /** ***************************************************************************************************************************
     * Process recursively the list of layer Entries to create the layers and the layer groups.
     *
     * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries to process.
     *
     * @returns {Promise<BaseLayer | null>} The promise that the layers were processed.
     */
    protected processListOfLayerEntryConfig(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): Promise<BaseLayer | null>;
    /** ***************************************************************************************************************************
     * This method creates a GeoView layer using the definition provided in the layerEntryConfig parameter.
     *
     * @param {TypeLayerEntryConfig} layerEntryConfig Information needed to create the GeoView layer.
     *
     * @returns {Promise<BaseLayer | null>} The GeoView layer that has been created.
     */
    protected abstract processOneLayerEntry(layerEntryConfig: TypeBaseLayerEntryConfig): Promise<BaseLayer | null>;
    /** ***************************************************************************************************************************
     * Return feature information for the layer specified. If layerId is undefined, this.activeLayer is used.
     *
     * @param {Pixel | Coordinate | Coordinate[]} location A pixel, a coordinate or a polygon that will be used by the query.
     * @param {string} layerId Optional layer identifier. If undefined, this.activeLayer is used.
     * @param {TypeQueryType} queryType Optional query type, default value is 'at pixel'.
     *
     * @returns {Promise<TypeFeatureInfoResult>} The feature info table.
     */
    abstract getFeatureInfo(location: Pixel | Coordinate | Coordinate[], layerId?: string, queryType?: TypeQueryType): Promise<TypeFeatureInfoResult>;
    /** ***************************************************************************************************************************
     * This method register the GeoView layer to panels that offer this possibility.
     *
     * @param {TypeBaseLayerEntryConfig} layerEntryConfig The layer entry to register.
     */
    protected registerToPanels(layerEntryConfig: TypeBaseLayerEntryConfig): void;
    /** ***************************************************************************************************************************
     * This method create a layer group. it uses the layer initial settings of the GeoView layer configuration.
     *
     * @returns {LayerGroup} A new layer group.
     */
    private createLayerGroup;
    /** ***************************************************************************************************************************
     * Set the active layer. It is the layer that will be used in some functions when the optional layerId is undefined.
     * When specified and the layerId is not found, the active layer is set to null.
     *
     * @param {string} layerId The layer identifier.
     */
    setActiveLayer(layerId: string): void;
    /** ***************************************************************************************************************************
     * Get the layer instance identified by the layerId.
     *
     * @param {string} layerId The layer identifier.
     */
    getBaseLayer(layerId?: string, listOfLayerEntryConfig?: TypeListOfLayerEntryConfig): BaseLayer | null;
    /** ***************************************************************************************************************************
     * Return the extent of the layer or undefined if it will be visible regardless of extent. The layer extent is an array of
     * numbers representing an extent: [minx, miny, maxx, maxy]. If no layer identifier is specified, the activeLayer of the class
     * will be used. This routine return undefined when the layerId specified is not found or when the layerId is undefined and
     * the active layer is null.
     *
     * @param {string} layerId Optional layer identifier.
     *
     * @returns {Extent} The layer extent.
     */
    getBounds(layerId?: string): Extent | undefined;
    /** ***************************************************************************************************************************
     * set the extent of the layer. Use undefined if it will be visible regardless of extent. The layer extent is an array of
     * numbers representing an extent: [minx, miny, maxx, maxy]. If no layer identifier is specified, the activeLayer of the class
     * will be used. This routine does nothing when the layerId specified is not found or when the layerId is undefined and the
     * active layer is null.
     *
     * @param {Extent} layerExtent The extent to assign to the layer.
     * @param {string} layerId Optional layer identifier.
     */
    setBounds(layerExtent: Extent, layerId?: string): void;
    /** ***************************************************************************************************************************
     * Return the opacity of the layer (between 0 and 1). When no layer identifier is specified, the activeLayer of the class is
     * used. This routine return undefined when the layerId specified is not found or when the layerId is undefined and the active
     * layer is null.
     *
     * @param {string} layerId Optional layer identifier.
     *
     * @returns {number} The opacity of the layer.
     */
    getOpacity(layerId?: string): number | undefined;
    /** ***************************************************************************************************************************
     * Set the opacity of the layer (between 0 and 1). When no layer identifier is specified, the activeLayer of the class is used.
     * This routine does nothing when the layerId specified is not found or when the layerId is undefined and the ctive layer is
     * null.
     *
     * @param {number} layerOpacity The opacity of the layer.
     * @param {string} layerId Optional layer identifier.
     *
     */
    setOpacity(layerOpacity: number, layerId?: string): void;
    /** ***************************************************************************************************************************
     * Return the visibility of the layer (true or false). When no layer identifier is specified, the activeLayer of the class is
     * used. This routine return undefined when the layerId specified is not found or when the layerId is undefined and the active
     * layer is null.
     *
     * @param {string} layerId Optional layer identifier.
     *
     * @returns {boolean} The visibility of the layer.
     */
    getVisible(layerId?: string): boolean | undefined;
    /** ***************************************************************************************************************************
     * Set the visibility of the layer (true or false). When no layer identifier is specified, the activeLayer of the class is
     * used. This routine does nothing when the layerId specified is not found or when the layerId is undefined and the active
     * layer is null.
     *
     * @param {boolean} layerVisibility The visibility of the layer.
     * @param {string} layerId Optional layer identifier.
     */
    setVisible(layerVisibility: boolean, layerId?: string): void;
    /** ***************************************************************************************************************************
     * Return the min zoom of the layer. When no layer identifier is specified, the activeLayer of the class is used. This routine
     * return undefined when the layerId specified is not found or when the layerId is undefined and the active layer is null.
     *
     * @param {string} layerId Optional layer identifier.
     *
     * @returns {boolean} The visibility of the layer.
     */
    getMinZoom(layerId?: string): number | undefined;
    /** ***************************************************************************************************************************
     * Set the min zoom of the layer. When no layer identifier is specified, the activeLayer of the class is used. This routine
     * does nothing when the layerId specified is not found or when the layerId is undefined and the active layer is null.
     *
     * @param {boolean} layerVisibility The visibility of the layer.
     * @param {string} layerId Optional layer identifier.
     */
    setMinZoom(minZoom: number, layerId?: string): void;
    /** ***************************************************************************************************************************
     * Return the max zoom of the layer. When no layer identifier is specified, the activeLayer of the class is used. This routine
     * return undefined when the layerId specified is not found or when the layerId is undefined and the active layer is null.
     *
     * @param {string} layerId Optional layer identifier.
     *
     * @returns {boolean} The visibility of the layer.
     */
    getMaxZoom(layerId?: string): number | undefined;
    /** ***************************************************************************************************************************
     * Set the max zoom of the layer. When no layer identifier is specified, the activeLayer of the class is used. This routine
     * does nothing when the layerId specified is not found or when the layerId is undefined and the active layer is null.
     *
     * @param {boolean} layerVisibility The visibility of the layer.
     * @param {string} layerId Optional layer identifier.
     */
    setMaxZoom(maxZoom: number, layerId?: string): void;
    /** ***************************************************************************************************************************
     * Return the legend of the layer. If no layer identifier is specified, the activeLayer of the class will be used. This routine
     * returns null when the layerId specified is not found or when the layerId is undefined and the active layer is null or the
     * configuration's style is undefined.
     *
     * @param {string} layerId Optional layer identifier.
     *
     * @returns {TypeLegend | null} The legend of the layer.
     */
    getLegend(layerId?: string): TypeLegend | null;
    /** ***************************************************************************************************************************
     * Utility method use to add an entry to the outfields or aliasFields attribute of the layerEntryConfig.source.featureInfo.
     *
     * @param {TypeLayerEntryConfig} layerEntryConfig The layer entry configuration that contains the source.featureInfo.
     * @param {outfields' | 'aliasFields} fieldName The field name to update.
     * @param {string} fieldValue The value to append to the field name.
     * @param {number} prefixEntryWithComa flag (0 = false) indicating that we must prefix the entry with a ','
     */
    protected addFieldEntryToSourceFeatureInfo: (layerEntryConfig: TypeLayerEntryConfig, fieldName: 'outfields' | 'aliasFields', fieldValue: string, prefixEntryWithComa: number) => void;
}
export {};
