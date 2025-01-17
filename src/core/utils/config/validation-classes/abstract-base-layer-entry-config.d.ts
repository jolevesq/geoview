import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { TypeBaseSourceVectorInitialConfig, TypeLayerAndListenerType, TypeLayerInitialSettings, TypeLocalizedString, TypeSourceImageEsriInitialConfig, TypeSourceImageInitialConfig, TypeSourceImageStaticInitialConfig, TypeSourceImageWmsInitialConfig, TypeSourceTileInitialConfig, TypeVectorSourceInitialConfig, TypeVectorTileSourceInitialConfig } from '@/geo/map/map-schema-types';
import { ConfigBaseClass } from '@/core/utils/config/validation-classes/config-base-class';
import { TypeJsonValue } from '@/core/types/global-types';
/** ******************************************************************************************************************************
 * Base type used to define a GeoView layer to display on the map.
 */
export declare abstract class AbstractBaseLayerEntryConfig extends ConfigBaseClass {
    /** The ending element of the layer configuration path. */
    layerIdExtension?: string | undefined;
    /** The display name of the layer (English/French). */
    layerName?: TypeLocalizedString;
    /**
     * Initial settings to apply to the GeoView layer entry at creation time. Initial settings are inherited from the parent in the
     * configuration tree.
     */
    initialSettings?: TypeLayerInitialSettings;
    /** Source settings to apply to the GeoView vector layer source at creation time. */
    source?: TypeBaseSourceVectorInitialConfig | TypeSourceTileInitialConfig | TypeVectorSourceInitialConfig | TypeVectorTileSourceInitialConfig | TypeSourceImageInitialConfig | TypeSourceImageWmsInitialConfig | TypeSourceImageEsriInitialConfig | TypeSourceImageStaticInitialConfig;
    /** The listOfLayerEntryConfig attribute is not used by child of AbstractBaseLayerEntryConfig. */
    listOfLayerEntryConfig: never;
    /**
     * The class constructor.
     * @param {AbstractBaseLayerEntryConfig} layerConfig The layer configuration we want to instanciate.
     */
    constructor(layerConfig: AbstractBaseLayerEntryConfig);
    /**
     * The olLayerAndLoadEndListeners setter method for the ConfigBaseClass class and its descendant classes.
     * @param {TypeLayerAndListenerType} layerAndListenerType The layer configuration we want to instanciate
     *                                                        and its listener type.
     */
    set olLayerAndLoadEndListeners(layerAndListenerType: TypeLayerAndListenerType);
    /**
     * The olLayer getter method for the ConfigBaseClass class and its descendant classes.
     * All layerConfig has an olLayer property, but the olLayer setter can only be use on group layers.
     */
    get olLayer(): BaseLayer | LayerGroup | null;
    /**
     * The olLayer setter method for the ConfigBaseClass class and its descendant classes.
     * All layerConfig has an olLayer property, but the olLayer setter can only be use on group layers.
     * If you want to set the olLayer property for a descendant of AbstractBaseLayerEntryConfig, you must
     * use its olLayerAndLoadEndListeners because it enforce the creation of the load end listeners.
     * @param {LayerGroup} olLayerValue The new olLayerd value.
     */
    set olLayer(olLayerValue: BaseLayer | LayerGroup | null);
    /**
     * Method to execute when the layer is loaded.
     */
    loadedFunction(): void;
    /**
     * Serializes the TypeBaseLayerEntryConfig class
     * @returns {TypeJsonValue} The serialized TypeBaseLayerEntryConfig
     */
    serialize(): TypeJsonValue;
    /**
     * Overrides the serialization of the mother class
     * @returns {TypeJsonValue} The serialized TypeBaseLayerEntryConfig
     */
    onSerialize(): TypeJsonValue;
}
