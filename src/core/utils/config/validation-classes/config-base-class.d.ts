import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { EventDelegateBase } from '@/api/events/event-helper';
import { AbstractGeoViewLayer, TypeGeoviewLayerType } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { TypeGeoviewLayerConfig, TypeLayerEntryType, TypeLayerStatus } from '@/geo/map/map-schema-types';
import { GroupLayerEntryConfig } from './group-layer-entry-config';
import { TypeJsonValue } from '@/core/types/global-types';
/** ******************************************************************************************************************************
 * Base type used to define a GeoView layer to display on the map. Unless specified,its properties are not part of the schema.
 */
export declare class ConfigBaseClass {
    #private;
    /** The identifier of the layer to display on the map. This element is part of the schema. */
    private _layerId;
    /** The ending extension (element) of the layer identifier. This element is part of the schema. */
    layerIdExtension?: string;
    /** Tag used to link the entry to a specific schema. This element is part of the schema. */
    schemaTag?: TypeGeoviewLayerType;
    /** Layer entry data type. This element is part of the schema. */
    entryType?: TypeLayerEntryType;
    /** The geoview layer instance that contains this layer configuration. */
    geoviewLayerInstance?: AbstractGeoViewLayer;
    /** It is used to link the layer entry config to the GeoView layer config. */
    geoviewLayerConfig: TypeGeoviewLayerConfig;
    /** It is used internally to distinguish layer groups derived from the
     * metadata. */
    isMetadataLayerGroup?: boolean;
    /** It is used to link the layer entry config to the parent's layer config. */
    parentLayerConfig?: TypeGeoviewLayerConfig | GroupLayerEntryConfig;
    /** The layer path to this instance. */
    protected _layerPath: string;
    /** This property is used to link the displayed layer to its layer entry config. it is not part of the schema. */
    protected _olLayer: BaseLayer | LayerGroup | null;
    /** It is used to identified unprocessed layers and shows the final layer state */
    protected _layerStatus: TypeLayerStatus;
    protected layerStatusWeight: {
        newInstance: number;
        registered: number;
        processing: number;
        processed: number;
        loading: number;
        loaded: number;
        error: number;
    };
    /** Flag indicating that the loaded signal arrived before the processed one */
    protected waitForProcessedBeforeSendingLoaded: boolean;
    /**
     * The class constructor.
     * @param {ConfigBaseClass} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: ConfigBaseClass);
    /**
     * The layerPath getter method for the ConfigBaseClass class and its descendant classes.
     */
    get layerPath(): string;
    /**
     * Getter for the layer Path of the layer configuration parameter.
     * @param {ConfigBaseClass} layerConfig The layer configuration for which we want to get the layer path.
     * @param {string} layerPath Internal parameter used to build the layer path (should not be used by the user).
     *
     * @returns {string} Returns the layer path.
     */
    static evaluateLayerPath(layerConfig: ConfigBaseClass, layerPath?: string): string;
    /**
     * The layerId getter method for the ConfigBaseClass class and its descendant classes.
     */
    get layerId(): string;
    /**
     * The layerId setter method for the ConfigBaseClass class and its descendant classes.
     * @param {string} newLayerId The new layerId value.
     */
    set layerId(newLayerId: string);
    /**
     * The layerId getter method for the ConfigBaseClass class and its descendant classes.
     */
    get layerStatus(): TypeLayerStatus;
    /**
     * The layerStatus setter method for the ConfigBaseClass class and its descendant classes.
     * @param {string} newLayerStatus The new layerId value.
     */
    set layerStatus(newLayerStatus: TypeLayerStatus);
    /**
     * Registers a layer status changed event handler.
     * @param {LayerStatusChangedDelegate} callback The callback to be executed whenever the event is emitted
     */
    onLayerStatusChanged(callback: LayerStatusChangedDelegate): void;
    /**
     * Unregisters a layer status changed event handler.
     * @param {LayerStatusChangedDelegate} callback The callback to stop being called whenever the event is emitted
     */
    offLayerStatusChanged(callback: LayerStatusChangedDelegate): void;
    /**
     * Register the layer identifier. Duplicate identifier are not allowed.
     *
     * @returns {boolean} Returns false if the layer configuration can't be registered.
     */
    registerLayerConfig(): boolean;
    /**
     * This method compares the internal layer status of the config with the layer status passed as a parameter and it
     * returns true if the internal value is greater or equal to the value of the parameter.
     *
     * @param {TypeLayerStatus} layerStatus The layer status to compare with the internal value of the config.
     *
     * @returns {boolean} Returns true if the internal value is greater or equal than the value of the parameter.
     */
    IsGreaterThanOrEqualTo(layerStatus: TypeLayerStatus): boolean;
    /**
     * Serializes the ConfigBaseClass class
     * @returns {TypeJsonValue} The serialized ConfigBaseClass
     */
    serialize(): TypeJsonValue;
    /**
     * Overridable function to serialize a ConfigBaseClass
     * @returns {TypeJsonValue} The serialized ConfigBaseClass
     */
    onSerialize(): TypeJsonValue;
}
/**
 * Define a delegate for the event handler function signature
 */
type LayerStatusChangedDelegate = EventDelegateBase<ConfigBaseClass, LayerStatusChangedEvent>;
/**
 * Define an event for the delegate
 */
export type LayerStatusChangedEvent = {
    layerPath: string;
    layerStatus: TypeLayerStatus;
};
export {};
