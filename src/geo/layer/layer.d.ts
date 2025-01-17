import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { GeometryApi } from '@/geo/layer/geometry/geometry';
import { FeatureHighlight } from '@/geo/utils/feature-highlight';
import { AbstractGeoViewLayer } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { MapConfigLayerEntry, TypeGeoviewLayerConfig, TypeLayerEntryConfig, TypeListOfLocalizedLanguages } from '@/geo/map/map-schema-types';
import { HoverFeatureInfoLayerSet } from '@/geo/utils/hover-feature-info-layer-set';
import { AllFeatureInfoLayerSet } from '@/geo/utils/all-feature-info-layer-set';
import { LegendsLayerSet } from '@/geo/utils/legends-layer-set';
import { FeatureInfoLayerSet } from '@/geo/utils/feature-info-layer-set';
import { EventDelegateBase } from '@/api/events/event-helper';
import { TypeOrderedLayerInfo } from '@/core/stores/store-interface-and-intial-values/map-state';
import { MapViewer } from '@/geo/map/map-viewer';
export type TypeRegisteredLayers = {
    [layerPath: string]: TypeLayerEntryConfig;
};
export type GeoViewLayerAddedResult = {
    layer: AbstractGeoViewLayer;
    promiseLayer: Promise<void>;
};
/**
 * A class to get the layer from layer type. Layer type can be esriFeature, esriDynamic and ogcWMS
 *
 * @exports
 * @class LayerApi
 */
export declare class LayerApi {
    #private;
    /** Layers with valid configuration for this map. */
    registeredLayers: TypeRegisteredLayers;
    geoviewLayers: {
        [geoviewLayerId: string]: AbstractGeoViewLayer;
    };
    geometry: GeometryApi;
    initialLayerOrder: Array<TypeOrderedLayerInfo>;
    /** used to reference the map viewer */
    mapViewer: MapViewer;
    get mapId(): string;
    /** used to keep a reference of highlighted layer */
    private highlightedLayer;
    featureHighlight: FeatureHighlight;
    legendsLayerSet: LegendsLayerSet;
    hoverFeatureInfoLayerSet: HoverFeatureInfoLayerSet;
    allFeatureInfoLayerSet: AllFeatureInfoLayerSet;
    featureInfoLayerSet: FeatureInfoLayerSet;
    /**
     * Initializes layer types and listen to add/remove layer events from outside
     * @param {MapViewer} mapViewer a reference to the map viewer
     */
    constructor(mapViewer: MapViewer);
    /**
     * Generate an array of layer info for the orderedLayerList.
     * @param {TypeGeoviewLayerConfig} geoviewLayerConfig The config to get the info from.
     * @returns {TypeOrderedLayerInfo[]} The array of ordered layer info.
     */
    generateArrayOfLayerOrderInfo(geoviewLayerConfig: TypeGeoviewLayerConfig | TypeLayerEntryConfig): TypeOrderedLayerInfo[];
    /**
     * Load layers that was passed in with the map config
     * @param {MapConfigLayerEntry[]} mapConfigLayerEntries an optional array containing layers passed within the map config
     */
    loadListOfGeoviewLayer(mapConfigLayerEntries?: MapConfigLayerEntry[]): void;
    /**
     * Returns the GeoView instance associated to the layer path. The first element of the layerPath
     * is the geoviewLayerId.
     * @param {string} layerPath The layer path to the layer's configuration.
     *
     * @returns {AbstractGeoViewLayer} Returns the geoview instance associated to the layer path.
     */
    geoviewLayer(layerPath: string): AbstractGeoViewLayer;
    /**
     * Verifies if a layer is registered. Returns true if registered.
     * @param {TypeLayerEntryConfig} layerConfig The layer configuration to test.
     * @returns {boolean} Returns true if the layer configuration is registered.
     */
    isRegistered(layerConfig: TypeLayerEntryConfig): boolean;
    /**
     * Adds a Geoview Layer by GeoCore UUID.
     * @param mapId The map id to add to
     * @param uuid The GeoCore UUID
     */
    addGeoviewLayerByGeoCoreUUID(uuid: string): Promise<void>;
    /**
     * Adds a layer to the map. This is the main method to add a GeoView Layer on the map.
     * It handles all the processing, including the validations, and makes sure to inform the layer sets about the layer.
     * @param {TypeGeoviewLayerConfig} geoviewLayerConfig The geoview layer configuration to add
     * @param {TypeListOfLocalizedLanguages} optionalSuportedLanguages An optional list of supported language
     * @returns {GeoViewLayerAddedResult | undefined} The result of the addition of the geoview layer.
     * The result contains the instanciated GeoViewLayer along with a promise that will resolve when the layer will be officially on the map.
     */
    addGeoviewLayer(geoviewLayerConfig: TypeGeoviewLayerConfig, optionalSuportedLanguages?: TypeListOfLocalizedLanguages): GeoViewLayerAddedResult | undefined;
    /**
     * Registers a layer added event handler.
     * @param {LayerAddedDelegate} callback The callback to be executed whenever the event is emitted
     */
    onLayerAdded(callback: LayerAddedDelegate): void;
    /**
     * Unregisters a layer added event handler.
     * @param {LayerAddedDelegate} callback The callback to stop being called whenever the event is emitted
     */
    offLayerAdded(callback: LayerAddedDelegate): void;
    /**
     * Removes all geoview layers from the map
     */
    removeAllGeoviewLayers(): void;
    /**
     * Removes a geoview layer from the map
     *
     * @param {TypeGeoviewLayerConfig} geoviewLayer the layer configuration to remove
     */
    removeGeoviewLayer(geoviewLayerId: string): void;
    /**
     * Removes a layer from the map using its layer path. The path may point to the root geoview layer
     * or a sub layer.
     *
     * @param {string} partialLayerPath the path of the layer to be removed
     */
    removeLayersUsingPath(partialLayerPath: string): void;
    /**
     * Asynchronously gets a layer using its id and return the layer data.
     * If the layer we're searching for has to be processed, set mustBeProcessed to true when awaiting on this method.
     * This function waits the timeout period before abandonning (or uses the default timeout when not provided).
     * Note this function uses the 'Async' suffix to differentiate it from 'geoviewLayer()'.
     *
     * @param {string} layerID the layer id to look for
     * @param {string} mustBeProcessed indicate if the layer we're searching for must be found only once processed
     * @param {string} timeout optionally indicate the timeout after which time to abandon the promise
     * @param {string} checkFrequency optionally indicate the frequency at which to check for the condition on the layer
     * @returns a promise with the AbstractGeoViewLayer
     * @throws an exception when the layer for the layer id couldn't be found, or waiting time expired
     */
    getGeoviewLayerByIdAsync(geoviewLayerId: string, mustBeProcessed: boolean, timeout?: number, checkFrequency?: number): Promise<AbstractGeoViewLayer>;
    /**
     * Returns the OpenLayer layer associated to a specific layer path.
     * @param {string} layerPath The layer path to the layer's configuration.
     *
     * @returns {BaseLayer | LayerGroup} Returns the OpenLayer layer associated to the layer path.
     */
    getOLLayerByLayerPath(layerPath: string): BaseLayer | LayerGroup;
    /**
     * Asynchronously returns the OpenLayer layer associated to a specific layer path.
     * This function waits the timeout period before abandonning (or uses the default timeout when not provided).
     * Note this function uses the 'Async' suffix to differentiate it from 'getOLLayerByLayerPath'.
     * @param {string} layerPath The layer path to the layer's configuration.
     *
     * @returns {BaseLayer | LayerGroup} Returns the OpenLayer layer associated to the layer path.
     */
    getOLLayerByLayerPathAsync(layerPath: string, timeout?: number, checkFrequency?: number): Promise<BaseLayer | LayerGroup>;
    /**
     * Returns a Promise that will be resolved once the given layer is in a processed phase.
     * This function waits the timeout period before abandonning (or uses the default timeout when not provided).
     *
     * @param {string} layer the layer object
     * @param {string} timeout optionally indicate the timeout after which time to abandon the promise
     * @param {string} checkFrequency optionally indicate the frequency at which to check for the condition on the layer
     * @throws an exception when the layer failed to become in processed phase before the timeout expired
     */
    waitForAllLayerStatusAreGreaterThanOrEqualTo(geoviewLayerConfig: AbstractGeoViewLayer, timeout?: number, checkFrequency?: number): Promise<void>;
    /**
     * Highlights layer or sublayer on map
     *
     * @param {string} layerPath ID of layer to highlight
     */
    highlightLayer(layerPath: string): void;
    /**
     * Removes layer or sublayer highlight
     */
    removeHighlightLayer(): void;
}
/**
 * Define a delegate for the event handler function signature
 */
type LayerAddedDelegate = EventDelegateBase<LayerApi, LayerAddedEvent>;
/**
 * Define an event for the delegate
 */
export type LayerAddedEvent = {
    layer: AbstractGeoViewLayer;
};
export {};
