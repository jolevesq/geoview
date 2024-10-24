/* eslint-disable no-param-reassign */
// We have many reassing for layerPath-layerConfig. We keep it global..
// TODO: refactor eslint - we have few files with many reassing should wee if we can build better...
import BaseLayer from 'ol/layer/Base';
import Collection from 'ol/Collection';
import { Coordinate } from 'ol/coordinate';
import { Pixel } from 'ol/pixel';
import { Extent } from 'ol/extent';
import LayerGroup, { Options as LayerGroupOptions } from 'ol/layer/Group';
import Feature from 'ol/Feature';

import { generateId, getXMLHttpRequest, createLocalizedString, getLocalizedValue } from '@/core/utils/utilities';
import { api } from '@/app';
import { LayerApi } from '@/geo/layer/layer';
import { TypeJsonObject, toJsonObject } from '@/core/types/global-types';
import { TimeDimension, TypeDateFragments } from '@/core/utils/date-mgt';
import { logger } from '@/core/utils/logger';
import { EsriDynamicLayerEntryConfig } from '@/core/utils/config/validation-classes/raster-validation-classes/esri-dynamic-layer-entry-config';
import { OgcWmsLayerEntryConfig } from '@/core/utils/config/validation-classes/raster-validation-classes/ogc-wms-layer-entry-config';
import { VectorLayerEntryConfig } from '@/core/utils/config/validation-classes/vector-layer-entry-config';
import { AbstractBaseLayerEntryConfig } from '@/core/utils/config/validation-classes/abstract-base-layer-entry-config';
import { GroupLayerEntryConfig } from '@/core/utils/config/validation-classes/group-layer-entry-config';
import EventHelper, { EventDelegateBase } from '@/api/events/event-helper';
import {
  TypeGeoviewLayerConfig,
  TypeListOfLayerEntryConfig,
  TypeLocalizedString,
  TypeLayerEntryConfig,
  layerEntryIsGroupLayer,
  TypeStyleConfig,
  TypeLayerInitialSettings,
  TypeLayerStatus,
  TypeStyleGeometry,
  CONST_LAYER_ENTRY_TYPES,
} from '@/geo/map/map-schema-types';
import { QueryType, TypeFeatureInfoEntry, TypeLocation, codedValueType, rangeDomainType } from '@/geo/utils/layer-set';
import { AppEventProcessor } from '@/api/event-processors/event-processor-children/app-event-processor';

// Constant used to define the default layer names
const DEFAULT_LAYER_NAMES: Record<TypeGeoviewLayerType, string> = {
  CSV: 'CSV Layer',
  esriDynamic: 'Esri Dynamic Layer',
  esriFeature: 'Esri Feature Layer',
  esriImage: 'Esri Image Layer',
  imageStatic: 'Static Image Layer',
  GeoJSON: 'GeoJson Layer',
  GeoPackage: 'GeoPackage Layer',
  xyzTiles: 'XYZ Tiles',
  vectorTiles: 'Vector Tiles',
  ogcFeature: 'OGC Feature Layer',
  ogcWfs: 'WFS Layer',
  ogcWms: 'WMS Layer',
};

/**
 * The AbstractGeoViewLayer class is the abstraction class of all GeoView Layers classes.
 * It registers the configuration options and defines the methods shared by all its descendant. The class constructor has
 * three parameters: mapId, type and mapLayerConfig. Its role is to save in attributes the mapId, type and elements of the
 * mapLayerConfig that are common to all GeoView layers. The main characteristic of a GeoView layer is the presence of an
 * metadataAccessPath attribute whose value is passed as an attribute of the mapLayerConfig object.
 */
export abstract class AbstractGeoViewLayer {
  /** The unique identifier of the map on which the GeoView layer will be drawn. */
  mapId: string;

  /** The type of GeoView layer that is instantiated. */
  type: TypeGeoviewLayerType;

  /** The unique identifier for the GeoView layer. The value of this attribute is extracted from the mapLayerConfig parameter.
   * If its value is undefined, a unique value is generated.
   */
  geoviewLayerId: string;

  /** The GeoView layer name. The value of this attribute is extracted from the mapLayerConfig parameter. If its value is
   * undefined, a default value is generated.
   */
  geoviewLayerName: TypeLocalizedString = createLocalizedString('');

  /** The GeoView layer metadataAccessPath. The name attribute is optional */
  metadataAccessPath: TypeLocalizedString = createLocalizedString('');

  /**
   * An array of layer settings. In the schema, this attribute is optional. However, we define it as mandatory and if the
   * configuration does not provide a value, we use an empty array instead of an undefined attribute.
   */
  listOfLayerEntryConfig: TypeListOfLayerEntryConfig = [];

  /**
   * Initial settings to apply to the GeoView layer at creation time. This attribute is allowed only if listOfLayerEntryConfig.length > 1.
   */
  initialSettings?: TypeLayerInitialSettings;

  /** layers of listOfLayerEntryConfig that did not load. */
  layerLoadError: { layer: string; loggerMessage: string }[] = [];

  /**
   * The structure of the vector or raster layers to be displayed for this GeoView class. This property points to the root of the layer tree,
   * unlike the olLayer (singular) property stored in the layer configuration entries list, which points to a node or leaf in the tree.
   * The initial value of olLayers is null, indicating that the layer tree has not been created.
   */
  olLayers: BaseLayer | null = null;

  // The service metadata.
  metadata: TypeJsonObject | null = null;

  /** Layer metadata */
  layerMetadata: Record<string, TypeJsonObject> = {};

  /** Layer temporal dimension indexed by layerPath. */
  layerTemporalDimension: Record<string, TimeDimension> = {};

  /** Attribution used in the OpenLayer source. */
  attributions: string[] = [];

  /** Date format object used to translate server to ISO format and ISO to server format */
  serverDateFragmentsOrder?: TypeDateFragments;

  /** Date format object used to translate internal UTC ISO format to the external format, the one used by the user */
  externalFragmentsOrder: TypeDateFragments;

  // Keep all callback delegate references
  #onGeoViewLayerRegistrationHandlers: GeoViewLayerRegistrationDelegate[] = [];

  // Keep all callback delegate references
  #onGeoViewLayerLegendQueryingHandlers: GeoViewLayerLegendQueryingDelegate[] = [];

  // Keep all callback delegate references
  #onGeoViewLayerLegendQueriedHandlers: GeoViewLayerLegendQueriedDelegate[] = [];

  /** ***************************************************************************************************************************
   * The class constructor saves parameters and common configuration parameters in attributes.
   *
   * @param {TypeGeoviewLayerType} type The type of GeoView layer that is instantiated.
   * @param {TypeGeoviewLayer} mapLayerConfig The GeoView layer configuration options.
   * @param {string} mapId The unique identifier of the map on which the GeoView layer will be drawn.
   */
  constructor(type: TypeGeoviewLayerType, mapLayerConfig: TypeGeoviewLayerConfig, mapId: string) {
    this.mapId = mapId;
    this.type = type;
    this.geoviewLayerId = mapLayerConfig.geoviewLayerId || generateId('');
    this.geoviewLayerName.en = mapLayerConfig?.geoviewLayerName?.en ? mapLayerConfig.geoviewLayerName.en : DEFAULT_LAYER_NAMES[type];
    this.geoviewLayerName.fr = mapLayerConfig?.geoviewLayerName?.fr ? mapLayerConfig.geoviewLayerName.fr : DEFAULT_LAYER_NAMES[type];
    if (mapLayerConfig.metadataAccessPath?.en) this.metadataAccessPath.en = mapLayerConfig.metadataAccessPath.en.trim();
    if (mapLayerConfig.metadataAccessPath?.fr) this.metadataAccessPath.fr = mapLayerConfig.metadataAccessPath.fr.trim();
    this.initialSettings = mapLayerConfig.initialSettings;
    this.serverDateFragmentsOrder = mapLayerConfig.serviceDateFormat
      ? api.utilities.date.getDateFragmentsOrder(mapLayerConfig.serviceDateFormat)
      : undefined;
    this.externalFragmentsOrder = api.utilities.date.getDateFragmentsOrder(mapLayerConfig.externalDateFormat);
    this.setListOfLayerEntryConfig(mapLayerConfig, mapLayerConfig.listOfLayerEntryConfig);
  }

  /** ***************************************************************************************************************************
   * Set the list of layer entry configuration and initialize the registered layer object and register all layers to layer sets.
   *
   * @param {TypeGeoviewLayer} mapLayerConfig The GeoView layer configuration options.
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer's configuration
   */
  private setListOfLayerEntryConfig(mapLayerConfig: TypeGeoviewLayerConfig, listOfLayerEntryConfig: TypeListOfLayerEntryConfig) {
    if (listOfLayerEntryConfig.length === 0) return;
    if (listOfLayerEntryConfig.length === 1) this.listOfLayerEntryConfig = listOfLayerEntryConfig;
    else {
      const layerGroup = new GroupLayerEntryConfig({
        geoviewLayerConfig: listOfLayerEntryConfig[0].geoviewLayerConfig,
        layerId: this.geoviewLayerId,
        layerName: this.geoviewLayerName,
        isMetadataLayerGroup: false,
        initialSettings: mapLayerConfig.initialSettings,
        listOfLayerEntryConfig,
      } as GroupLayerEntryConfig);
      this.listOfLayerEntryConfig = [layerGroup];
      layerGroup.listOfLayerEntryConfig.forEach((layerConfig, i) => {
        (layerGroup.listOfLayerEntryConfig[i] as AbstractBaseLayerEntryConfig).parentLayerConfig = layerGroup;
      });
    }
    this.listOfLayerEntryConfig[0].geoviewLayerConfig.listOfLayerEntryConfig = listOfLayerEntryConfig;
  }

  /**
   * Emits an event to all handlers.
   * @param {GeoViewLayerRegistrationEvent} event The event to emit
   * @private
   */
  #emitGeoViewLayerRegistration(event: GeoViewLayerRegistrationEvent): void {
    // Emit the event for all handlers
    EventHelper.emitEvent(this, this.#onGeoViewLayerRegistrationHandlers, event);
  }

  /**
   * Registers a geoview layer registration event handler.
   * @param {GeoViewLayerRegistrationDelegate} callback The callback to be executed whenever the event is emitted
   */
  onGeoViewLayerRegistration(callback: GeoViewLayerRegistrationDelegate): void {
    // Register the event handler
    EventHelper.onEvent(this.#onGeoViewLayerRegistrationHandlers, callback);
  }

  /**
   * Unregisters a geoview layer registration event handler.
   * @param {GeoViewLayerRegistrationDelegate} callback The callback to stop being called whenever the event is emitted
   */
  offGeoViewLayerRegistration(callback: GeoViewLayerRegistrationDelegate): void {
    // Unregister the event handler
    EventHelper.offEvent(this.#onGeoViewLayerRegistrationHandlers, callback);
  }

  /**
   * Emits an event to all handlers.
   * @param {GeoViewLayerLegendQueryingEvent} event The event to emit
   * @private
   */
  #emitLegendQuerying(event: GeoViewLayerLegendQueryingEvent): void {
    // Emit the event for all handlers
    EventHelper.emitEvent(this, this.#onGeoViewLayerLegendQueryingHandlers, event);
  }

  /**
   * Registers a legend querying event handler.
   * @param {GeoViewLayerLegendQueryingDelegate} callback The callback to be executed whenever the event is emitted
   */
  onLegendQuerying(callback: GeoViewLayerLegendQueryingDelegate): void {
    // Register the event handler
    EventHelper.onEvent(this.#onGeoViewLayerLegendQueryingHandlers, callback);
  }

  /**
   * Unregisters a legend querying event handler.
   * @param {GeoViewLayerLegendQueryingDelegate} callback The callback to stop being called whenever the event is emitted
   */
  offLegendQuerying(callback: GeoViewLayerLegendQueryingDelegate): void {
    // Unregister the event handler
    EventHelper.offEvent(this.#onGeoViewLayerLegendQueryingHandlers, callback);
  }

  /**
   * Emits an event to all handlers.
   * @param {GeoViewLayerLegendQueriedEvent} event The event to emit
   * @private
   */
  #emitLegendQueried(event: GeoViewLayerLegendQueriedEvent): void {
    // Emit the event for all handlers
    EventHelper.emitEvent(this, this.#onGeoViewLayerLegendQueriedHandlers, event);
  }

  /**
   * Registers a legend queried event handler.
   * @param {GeoViewLayerLegendQueriedDelegate} callback The callback to be executed whenever the event is emitted
   */
  onLegendQueried(callback: GeoViewLayerLegendQueriedDelegate): void {
    // Register the event handler
    EventHelper.onEvent(this.#onGeoViewLayerLegendQueriedHandlers, callback);
  }

  /**
   * Unregisters a legend queried event handler.
   * @param {GeoViewLayerLegendQueriedDelegate} callback The callback to stop being called whenever the event is emitted
   */
  offLegendQueried(callback: GeoViewLayerLegendQueriedDelegate): void {
    // Unregister the event handler
    EventHelper.offEvent(this.#onGeoViewLayerLegendQueriedHandlers, callback);
  }

  /** ***************************************************************************************************************************
   * Process recursively the list of layer entries to see if all of them are processed.
   *
   * @param {TypeLayerStatus} layerStatus The layer status to compare with the internal value of the config.
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer's configuration
   *                                                            (default: this.listOfLayerEntryConfig).
   *
   * @returns {boolean} true when all layers are greater than or equal to the layerStatus parameter.
   */
  allLayerStatusAreGreaterThanOrEqualTo(
    layerStatus: TypeLayerStatus,
    listOfLayerEntryConfig: TypeListOfLayerEntryConfig = this.listOfLayerEntryConfig
  ): boolean {
    // Try to find a layer that is not greater than or equal to the layerStatus parameter. If you can, return false
    return !listOfLayerEntryConfig.find((layerConfig: TypeLayerEntryConfig) => {
      if (layerEntryIsGroupLayer(layerConfig))
        return !this.allLayerStatusAreGreaterThanOrEqualTo(layerStatus, layerConfig.listOfLayerEntryConfig);
      return !layerConfig.IsGreaterThanOrEqualTo(layerStatus || 'newInstance');
    });
  }

  /** ***************************************************************************************************************************
   * Recursively process the list of layer entries to count all layers in error.
   *
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer's configuration
   *                                                            (default: this.listOfLayerEntryConfig).
   *
   * @returns {number} The number of layers in error.
   */
  countErrorStatus(listOfLayerEntryConfig: TypeListOfLayerEntryConfig = this.listOfLayerEntryConfig): number {
    return listOfLayerEntryConfig.reduce((counter: number, layerConfig: TypeLayerEntryConfig) => {
      if (layerEntryIsGroupLayer(layerConfig)) return counter + this.countErrorStatus(layerConfig.listOfLayerEntryConfig);
      if ((layerConfig as AbstractBaseLayerEntryConfig).layerStatus === 'error') return counter + 1;
      return counter;
    }, 0);
  }

  /** ***************************************************************************************************************************
   * Process recursively the list of layer entries to initialize the registeredLayers object.
   *
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries to process.
   */
  initRegisteredLayers(layerApi: LayerApi, listOfLayerEntryConfig: TypeListOfLayerEntryConfig = this.listOfLayerEntryConfig) {
    listOfLayerEntryConfig.forEach((layerConfig: TypeLayerEntryConfig, i) => {
      if (layerApi.isRegistered(layerConfig)) {
        this.layerLoadError.push({
          layer: layerConfig.layerPath,
          loggerMessage: `Duplicate layerPath (mapId:  ${this.mapId}, layerPath: ${layerConfig.layerPath})`,
        });
        // Duplicat layer can't be kept because it has the same layer path than the first encontered layer.
        delete listOfLayerEntryConfig[i];
      } else {
        layerConfig.geoviewLayerInstance = this;
        layerConfig.registerLayerConfig();
      }
      if (layerEntryIsGroupLayer(layerConfig)) this.initRegisteredLayers(layerApi, layerConfig.listOfLayerEntryConfig);
    });
  }

  /** ***************************************************************************************************************************
   * This method is used to create the layers specified in the listOfLayerEntryConfig attribute inherited from its parent.
   * Normally, it is the second method called in the life cycle of a GeoView layer, the first one being the constructor.
   * Its code is the same for all child classes. It must first validate that the olLayers attribute is null indicating
   * that the method has never been called before for this layer. If this is not the case, an error message must be sent.
   * Then, it calls the abstract method getAdditionalServiceDefinition. For example, when the child is a WFS service, this
   * method executes the GetCapabilities request and saves the result in the metadata attribute of the class. It also process
   * the layer's metadata for each layer in the listOfLayerEntryConfig tree in order to define the missing pieces of the layer's
   * configuration. Layer's configuration can come from the configuration of the GeoView layer or from the information saved by
   * the method processListOfLayerEntryMetadata, priority being given to the first of the two. When the GeoView layer does not
   * have a service definition, the getAdditionalServiceDefinition method does nothing.
   *
   * Finally, the processListOfLayerEntryConfig is called to instantiate each layer identified by the listOfLayerEntryConfig
   * attribute. This method will also register the layers to all layer sets that offer this possibility. For example, if a layer
   * is queryable, it will subscribe to the details-panel and every time the user clicks on the map, the panel will ask the layer
   * to return the descriptive information of all the features in a tolerance radius. This information will be used to populate
   * the details-panel.
   */
  async createGeoViewLayers(): Promise<void> {
    if (this.olLayers === null) {
      try {
        // Log
        logger.logTraceCore('ABSTRACT-GEOVIEW-LAYERS - createGeoViewLayers', this.listOfLayerEntryConfig);

        // Try to get a key for logging timings
        let logTimingsKey;
        if (this.listOfLayerEntryConfig.length > 0) logTimingsKey = `${this.mapId} | ${this.listOfLayerEntryConfig[0].layerPath}`;

        // Log
        if (logTimingsKey) logger.logMarkerStart(logTimingsKey);

        // Get additional service and await
        await this.getAdditionalServiceDefinition();

        // Log the time it took thus far
        if (logTimingsKey) logger.logMarkerCheck(logTimingsKey, 'to get additional service definition');

        // Process list of layers and await
        this.olLayers = await this.processListOfLayerEntryConfig(this.listOfLayerEntryConfig);

        // Log the time it took thus far
        if (logTimingsKey) logger.logMarkerCheck(logTimingsKey, 'to process list of layer entry config');
      } catch (error) {
        // Log error
        logger.logError(error);
      }
    } else {
      // TODO: find a more centralized way to trap error and display message
      api.maps[this.mapId].notifications.showError('validation.layer.createtwice', [this.mapId]);
      // Log
      logger.logError(`Can not execute twice the createGeoViewLayers method for the map ${this.mapId}`);
    }
  }

  /** ***************************************************************************************************************************
   * This method reads from the metadataAccessPath additional information to complete the GeoView layer configuration.
   */
  protected async getAdditionalServiceDefinition(): Promise<void> {
    try {
      await this.fetchServiceMetadata();
      if (this.listOfLayerEntryConfig.length) await this.validateAndExtractLayerMetadata();
    } catch (error) {
      // Log
      logger.logError(error);
    }
  }

  /** ***************************************************************************************************************************
   * This method Validate the list of layer configs and extract them in the geoview instance.
   */
  async validateAndExtractLayerMetadata(): Promise<void> {
    try {
      // Recursively process the configuration tree of layer entries by removing layers in error and processing valid layers.
      this.validateListOfLayerEntryConfig(this.listOfLayerEntryConfig);
      await this.processListOfLayerEntryMetadata(this.listOfLayerEntryConfig);
    } catch (error) {
      // Log
      logger.logError(error);
    }
  }

  /** ***************************************************************************************************************************
   * This method reads the service metadata from the metadataAccessPath.
   *
   * @returns {Promise<void>} A promise that the execution is completed.
   */
  protected async fetchServiceMetadata(): Promise<void> {
    const metadataUrl = getLocalizedValue(this.metadataAccessPath, AppEventProcessor.getDisplayLanguage(this.mapId));
    if (metadataUrl) {
      try {
        const metadataString = await getXMLHttpRequest(`${metadataUrl}?f=json`);
        if (metadataString === '{}') this.metadata = null;
        else {
          this.metadata = toJsonObject(JSON.parse(metadataString));
          const { copyrightText } = this.metadata;
          if (copyrightText) this.attributions.push(copyrightText as string);
        }
      } catch (error) {
        // Log
        logger.logError(error);
        this.setAllLayerStatusTo('error', this.listOfLayerEntryConfig, 'Unable to read metadata');
      }
    }
  }

  /** ***************************************************************************************************************************
   * This method recursively validates the configuration of the layer entries to ensure that each layer is correctly defined. If
   * necessary, additional code can be executed in the child method to complete the layer configuration.
   *
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries configuration to validate.
   */
  protected abstract validateListOfLayerEntryConfig(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): void;

  /** ***************************************************************************************************************************
   * This method processes recursively the metadata of each layer in the "layer list" configuration.
   *
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layers to process.
   *
   * @returns {Promise<void>} A promise that the execution is completed.
   */
  protected async processListOfLayerEntryMetadata(listOfLayerEntryConfig: TypeListOfLayerEntryConfig): Promise<void> {
    try {
      const promisedAllLayerDone: Promise<TypeLayerEntryConfig>[] = [];
      for (let i = 0; i < listOfLayerEntryConfig.length; i++) {
        const layerConfig: TypeLayerEntryConfig = listOfLayerEntryConfig[i];
        if (layerEntryIsGroupLayer(layerConfig))
          if (layerConfig.isMetadataLayerGroup) promisedAllLayerDone.push(this.processMetadataGroupLayer(layerConfig));
          // eslint-disable-next-line no-await-in-loop
          else await this.processListOfLayerEntryMetadata(layerConfig.listOfLayerEntryConfig);
        else promisedAllLayerDone.push(this.processLayerMetadata(layerConfig));
      }
      const arrayOfLayerConfigs = await Promise.all(promisedAllLayerDone);
      arrayOfLayerConfigs.forEach((layerConfig) => {
        if (layerConfig.layerStatus === 'error') {
          const message = `Error while loading layer path "${layerConfig.layerPath})" on map "${this.mapId}"`;
          this.layerLoadError.push({ layer: layerConfig.layerPath, loggerMessage: message });
          throw new Error(message);
        } else {
          // When we get here, we know that the metadata (if the service provide some) are processed.
          // We need to signal to the layer sets that the 'processed' phase is done.
          // GV TODO: For the moment, be aware that the layerStatus setter is doing a lot of things behind the scene.
          // GV       The layerStatus setter contains a lot of code and we will change it in favor of a method.
          layerConfig.layerStatus = 'processed';
        }
      });
    } catch (error) {
      // Log
      logger.logError(error);
    }
  }

  /** ***************************************************************************************************************************
   * This method is used to process metadata group layer entries. These layers behave as a GeoView group layer and also as a data
   * layer (i.e. they have extent, visibility and query flag definition). Metadata group layers can be identified by
   * the presence of an isMetadataLayerGroup attribute set to true.
   *
   * @param {GroupLayerEntryConfig} layerConfig The layer entry configuration to process.
   *
   * @returns {Promise<GroupLayerEntryConfig>} A promise that the vector layer configuration has its metadata and group layers processed.
   */
  private async processMetadataGroupLayer(layerConfig: GroupLayerEntryConfig): Promise<GroupLayerEntryConfig> {
    try {
      await this.processLayerMetadata(layerConfig);
      await this.processListOfLayerEntryMetadata(layerConfig.listOfLayerEntryConfig!);
      layerConfig.layerStatus = 'processed';
      return layerConfig;
    } catch (error) {
      // Log
      logger.logError(error);
    }
    return layerConfig;
  }

  /** ***************************************************************************************************************************
   * This method is used to process the layer's metadata. It will fill the empty outfields and aliasFields properties of the
   * layer's configuration when applicable.
   *
   * @param {TypeLayerEntryConfig} layerConfig The layer entry configuration to process.
   *
   * @returns {Promise<TypeLayerEntryConfig>} A promise that the vector layer configuration has its metadata processed.
   */
  protected processLayerMetadata(layerConfig: TypeLayerEntryConfig): Promise<TypeLayerEntryConfig> {
    if (!layerConfig.source) layerConfig.source = {};
    if (!layerConfig.source.featureInfo) layerConfig.source.featureInfo = { queryable: false };

    return Promise.resolve(layerConfig);
  }

  /** ***************************************************************************************************************************
   * Process recursively the list of layer Entries to create the layers and the layer groups.
   *
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries to process.
   * @param {LayerGroup} layerGroup Optional layer group to use when we have many layers. The very first call to
   *  processListOfLayerEntryConfig must not provide a value for this parameter. It is defined for internal use.
   *
   * @returns {Promise<BaseLayer | null>} The promise that the layers were processed.
   */
  async processListOfLayerEntryConfig(
    listOfLayerEntryConfig: TypeListOfLayerEntryConfig,
    layerGroup?: LayerGroup
  ): Promise<BaseLayer | null> {
    // Log
    logger.logTraceCore('ABSTRACT-GEOVIEW-LAYERS - processListOfLayerEntryConfig', listOfLayerEntryConfig);

    try {
      if (listOfLayerEntryConfig.length === 0) return null;
      if (listOfLayerEntryConfig.length === 1) {
        if (layerEntryIsGroupLayer(listOfLayerEntryConfig[0])) {
          const newLayerGroup = this.createLayerGroup(listOfLayerEntryConfig[0], listOfLayerEntryConfig[0].initialSettings!);
          const groupReturned = await this.processListOfLayerEntryConfig(listOfLayerEntryConfig[0].listOfLayerEntryConfig!, newLayerGroup);
          if (groupReturned) {
            if (layerGroup) layerGroup.getLayers().push(groupReturned);
            return groupReturned;
          }
          this.layerLoadError.push({
            layer: listOfLayerEntryConfig[0].layerPath,
            loggerMessage: `Unable to create group layer ${listOfLayerEntryConfig[0].layerPath} on map ${this.mapId}`,
          });
          return null;
        }

        if ((listOfLayerEntryConfig[0] as AbstractBaseLayerEntryConfig).layerStatus === 'error') return null;
        const { layerPath } = listOfLayerEntryConfig[0];
        const baseLayer = await this.processOneLayerEntry(listOfLayerEntryConfig[0] as AbstractBaseLayerEntryConfig);
        if (baseLayer) {
          this.registerToLayerSets(listOfLayerEntryConfig[0] as AbstractBaseLayerEntryConfig);
          if (layerGroup) layerGroup!.getLayers().push(baseLayer!);
          return layerGroup || baseLayer;
        }
        this.layerLoadError.push({
          layer: listOfLayerEntryConfig[0].layerPath,
          loggerMessage: `Unable to create layer ${listOfLayerEntryConfig[0].layerPath} on map ${this.mapId}`,
        });
        this.getLayerConfig(layerPath)!.layerStatus = 'error';
        return null;
      }

      if (!layerGroup) {
        // All children of this level in the tree have the same parent, so we use the first element of the array to retrieve the parent node.
        layerGroup = this.createLayerGroup(
          (listOfLayerEntryConfig[0] as AbstractBaseLayerEntryConfig).parentLayerConfig as TypeLayerEntryConfig,
          listOfLayerEntryConfig[0].initialSettings!
        );
      }
      const promiseOfLayerCreated: Promise<BaseLayer | LayerGroup | null>[] = [];
      listOfLayerEntryConfig.forEach((layerConfig, i) => {
        if (layerEntryIsGroupLayer(layerConfig)) {
          const newLayerGroup = this.createLayerGroup(listOfLayerEntryConfig[i], listOfLayerEntryConfig[i].initialSettings!);
          promiseOfLayerCreated.push(this.processListOfLayerEntryConfig(layerConfig.listOfLayerEntryConfig!, newLayerGroup));
        } else if ((listOfLayerEntryConfig[i] as AbstractBaseLayerEntryConfig).layerStatus === 'error')
          promiseOfLayerCreated.push(Promise.resolve(null));
        else {
          promiseOfLayerCreated.push(this.processOneLayerEntry(layerConfig as AbstractBaseLayerEntryConfig));
        }
      });
      const listOfLayerCreated = await Promise.all(promiseOfLayerCreated);
      listOfLayerCreated.forEach((baseLayer, i) => {
        const { layerPath } = listOfLayerEntryConfig[i];
        if (baseLayer) {
          const layerConfig = baseLayer?.get('layerConfig') as AbstractBaseLayerEntryConfig;
          if (layerConfig) {
            if (!layerEntryIsGroupLayer(listOfLayerEntryConfig[i])) {
              this.registerToLayerSets(baseLayer.get('layerConfig') as AbstractBaseLayerEntryConfig);
            }
            layerGroup!.getLayers().push(baseLayer);
          }
        } else {
          this.layerLoadError.push({
            layer: listOfLayerEntryConfig[i].layerPath,
            loggerMessage: `Unable to create ${
              layerEntryIsGroupLayer(listOfLayerEntryConfig[i]) ? CONST_LAYER_ENTRY_TYPES.GROUP : ''
            } layer ${listOfLayerEntryConfig[i].layerPath} on map ${this.mapId}`,
          });
          this.getLayerConfig(layerPath)!.layerStatus = 'error';
        }
      });

      return layerGroup!;
    } catch (error) {
      // Log
      logger.logError(error);
      return null;
    }
  }

  /** ***************************************************************************************************************************
   * This method creates a GeoView layer using the definition provided in the layerConfig parameter.
   *
   * @param {AbstractBaseLayerEntryConfig} layerConfig Information needed to create the GeoView layer.
   *
   * @returns {Promise<BaseLayer | null>} The GeoView layer that has been created.
   */
  protected processOneLayerEntry(layerConfig: AbstractBaseLayerEntryConfig): Promise<BaseLayer | null> {
    // GV IMPORTANT: The processOneLayerEntry method of all the children must call this method to ensure that the flow of
    // GV            layerStatus values is correctly sequenced.
    layerConfig.layerStatus = 'loading';
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * Return feature information for the layer specified.
   *
   * @param {QueryType} queryType  The type of query to perform.
   * @param {string} layerPath The layer path to the layer's configuration.
   * @param {TypeLocation} location An optionsl pixel, coordinate or polygon that will be used by the query.
   *
   * @returns {Promise<TypeFeatureInfoResult>} The feature info table.
   */
  // GV Things important to know about the get feature info family of methods
  /*
   * There's no doubt that the layerConfig is correctly defined when we call these methods. The layerConfig object is created in
   * the GeoView layer constructor and has all the necessary flags to inform programmers and users whether the layer referenced by
   * a layerConfig or its layerPath is viable or not. If the layer is not visible on the map, it has probably not yet been loaded
   * or an error has occurred. If clicked on, these layers will return an empty array, as they have no features on the map. So
   * users can't expect anything to be returned after a click. They have to wait until they see something on the map to know where
   * the features are so they can click on them.
   */
  async getFeatureInfo(
    queryType: QueryType,
    layerPath: string,
    location: TypeLocation = null
  ): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    try {
      // TODO: Refactor - Rework this function to not need a layer path in the param, nor a need to get a layer config here..
      // TO.DOCONT: For example, this call seems to have logic redundancy: `layerConfig.geoviewLayerInstance.getFeatureInfo(queryType, layerPath, location)`
      // Get the layer config
      const layerConfig = this.getLayerConfig(layerPath);

      if (!layerConfig || !layerConfig?.source?.featureInfo?.queryable) {
        logger.logError('Invalid usage of getFeatureInfo\nlayerConfig = ', layerConfig);
        const queryableOrNot = layerConfig?.source?.featureInfo?.queryable ? '' : 'not';
        logger.logError(`Layer is ${queryableOrNot} queryable`);
        return null;
      }

      // Log
      logger.logTraceCore('ABSTRACT-GEOVIEW-LAYERS - getFeatureInfo', queryType, layerPath);
      const logMarkerKey = `${queryType} | ${layerPath}`;
      logger.logMarkerStart(logMarkerKey);

      let promiseGetFeature: Promise<TypeFeatureInfoEntry[] | undefined | null>;
      switch (queryType) {
        case 'all':
          promiseGetFeature = this.getAllFeatureInfo(layerPath);
          break;
        case 'at_pixel':
          promiseGetFeature = this.getFeatureInfoAtPixel(location as Pixel, layerPath);
          break;
        case 'at_coordinate':
          promiseGetFeature = this.getFeatureInfoAtCoordinate(location as Coordinate, layerPath);
          break;
        case 'at_long_lat':
          promiseGetFeature = this.getFeatureInfoAtLongLat(location as Coordinate, layerPath);
          break;
        case 'using_a_bounding_box':
          promiseGetFeature = this.getFeatureInfoUsingBBox(location as Coordinate[], layerPath);
          break;
        case 'using_a_polygon':
          promiseGetFeature = this.getFeatureInfoUsingPolygon(location as Coordinate[], layerPath);
          break;
        default:
          // Default is empty array
          promiseGetFeature = Promise.resolve([]);

          // Log
          logger.logWarning(`Queries using ${queryType} are invalid.`);
          break;
      }

      // Wait for results
      const arrayOfFeatureInfoEntries = await promiseGetFeature;

      // Log
      logger.logMarkerCheck(logMarkerKey, 'to getFeatureInfo', arrayOfFeatureInfoEntries);

      // Return the result
      return arrayOfFeatureInfoEntries;
    } catch (error) {
      // Log
      logger.logError(error);
      return null;
    }
  }

  /** ***************************************************************************************************************************
   * Return feature information for all the features on a layer. Returns an empty array [] when the layer is
   * not queryable.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The feature info table.
   */
  protected getAllFeatureInfo(layerPath: string): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    // Log
    logger.logError(`getAllFeatureInfo is not implemented! for ${layerPath}`);
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * Return feature information for all the features around the provided Pixel. Returns an empty array [] when the layer is
   * not queryable.
   *
   * @param {Coordinate} location The pixel coordinate that will be used by the query.
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The feature info table.
   */
  protected getFeatureInfoAtPixel(location: Pixel, layerPath: string): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    // Log
    logger.logError(`getFeatureInfoAtPixel is not implemented! for ${layerPath} - ${location}`);
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * Return feature information for all the features around the provided coordinate. Returns an empty array [] when the layer is
   * not queryable.
   *
   * @param {Coordinate} location The coordinate that will be used by the query.
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The feature info table.
   */
  protected getFeatureInfoAtCoordinate(location: Coordinate, layerPath: string): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    // Log
    logger.logError(`getFeatureInfoAtCoordinate is not implemented! for ${layerPath} - ${location}`);
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * Return feature information for all the features around the provided longitude latitude. Returns an empty array [] when the
   * layer is not queryable.
   *
   * @param {Coordinate} location The coordinate that will be used by the query.
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The feature info table.
   */
  protected getFeatureInfoAtLongLat(location: Coordinate, layerPath: string): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    // Log
    logger.logError(`getFeatureInfoAtLongLat is not implemented for ${layerPath} - ${location}!`);
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * Return feature information for all the features in the provided bounding box. Returns an empty array [] when the layer is
   * not queryable.
   *
   * @param {Coordinate} location The coordinate that will be used by the query.
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The feature info table.
   */
  protected getFeatureInfoUsingBBox(location: Coordinate[], layerPath: string): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    // Log
    logger.logError(`getFeatureInfoUsingBBox is not implemented! for ${layerPath} - ${location}`);
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * Return feature information for all the features in the provided polygon. Returns an empty array [] when the layer is
   * not queryable.
   *
   * @param {Coordinate} location The coordinate that will be used by the query.
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The feature info table.
   */
  protected getFeatureInfoUsingPolygon(location: Coordinate[], layerPath: string): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    // Log
    logger.logError(`getFeatureInfoUsingPolygon is not implemented! for ${layerPath} - ${location}`);
    return Promise.resolve(null);
  }

  /** ***************************************************************************************************************************
   * This method register the layer entry to layer sets. Nothing is done if the registration is already done.
   *
   * @param {AbstractBaseLayerEntryConfig} layerConfig The layer config to register.
   */
  registerToLayerSets(layerConfig: AbstractBaseLayerEntryConfig): void {
    // TODO: Refactor - This function should be deleted eventually. It's up to the layer orchestrator to manage the layers.
    // TO.DOCONT: The layer itself shouldn't know about it nor should have an explicit function mentioning the layer sets.

    // Register to layer sets that are already created.
    // Emit the layer registration
    this.#emitGeoViewLayerRegistration({ layerPath: layerConfig.layerPath, layerConfig, action: 'add' });
  }

  /** ***************************************************************************************************************************
   * This method unregisters the layer from the layer sets.
   *
   * @param {AbstractBaseLayerEntryConfig} layerConfig The layer entry to register.
   */
  unregisterFromLayerSets(layerConfig: AbstractBaseLayerEntryConfig): void {
    // TODO: Refactor - This function should be deleted eventually. It's up to the layer orchestrator to manage the layers.
    // TO.DOCONT: The layer itself shouldn't know about it nor should have an explicit function mentioning the layer sets.
    const { layerPath } = layerConfig;

    // Emit the layer unregistration
    this.#emitGeoViewLayerRegistration({ layerPath, layerConfig, action: 'remove' });
  }

  /**
   * Queries the legend.
   * This function raises legend querying and queried events.
   */
  queryLegend(layerPath: string) {
    // Emit that the legend has been queried
    this.#emitLegendQuerying({ layerPath });

    // Get the legend
    const promiseLegend = this.getLegend(layerPath);

    // Whenever the promise resolves
    promiseLegend.then((legend) => {
      // If legend was received
      if (legend) {
        // Emit legend information once retrieved
        this.#emitLegendQueried({ layerPath, legend });
      }
    });

    // Return the promise
    return promiseLegend;
  }

  /** ***************************************************************************************************************************
   * This method create a layer group.
   * @param {TypeLayerEntryConfig} layerConfig The layer configuration.
   * @param {TypeLayerInitialSettings } initialSettings Initial settings to apply to the layer.
   * @returns {LayerGroup} A new layer group.
   */
  protected createLayerGroup(layerConfig: TypeLayerEntryConfig, initialSettings: TypeLayerInitialSettings): LayerGroup {
    const layerGroupOptions: LayerGroupOptions = {
      layers: new Collection(),
      properties: { layerConfig },
    };
    if (initialSettings?.extent !== undefined) layerGroupOptions.extent = initialSettings.extent;
    if (initialSettings?.maxZoom !== undefined) layerGroupOptions.maxZoom = initialSettings.maxZoom;
    if (initialSettings?.minZoom !== undefined) layerGroupOptions.minZoom = initialSettings.minZoom;
    if (initialSettings?.states?.opacity !== undefined) layerGroupOptions.opacity = initialSettings.states.opacity;
    if (initialSettings?.states?.visible !== undefined) layerGroupOptions.visible = initialSettings.states.visible;
    // You dont have to provide the loadEndListenerType when you set the olLayer of an entryType to CONST_LAYER_ENTRY_TYPES.GROUP.
    layerConfig.olLayer = new LayerGroup(layerGroupOptions);
    return layerConfig.olLayer as LayerGroup;
  }

  /** ***************************************************************************************************************************
   * Get the layer configuration of the specified layer path.
   *
   * @param {string} layerPath The layer path.
   *
   * @returns {TypeLayerEntryConfig | undefined} The layer configuration or undefined if not found.
   */
  getLayerConfig(layerPath: string): TypeLayerEntryConfig | undefined {
    return api.maps?.[this.mapId]?.layer?.registeredLayers?.[layerPath] as TypeLayerEntryConfig;
  }

  /** ***************************************************************************************************************************
   * Returns the layer bounds or undefined if not defined in the layer configuration or the metadata. If projectionCode is
   * defined, returns the bounds in the specified projection otherwise use the map projection. The bounds are different from the
   * extent. They are mainly used for display purposes to show the bounding box in which the data resides and to zoom in on the
   * entire layer data. It is not used by openlayer to limit the display of data on the map.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   * @param {string | number | undefined} projectionCode Optional projection code to use for the returned bounds.
   *
   * @returns {Extent} The layer bounding box.
   */
  getMetadataBounds(layerPath: string, projectionCode: string | number | undefined = undefined): Extent | undefined {
    let bounds: Extent | undefined;
    const processGroupLayerBounds = (listOfLayerEntryConfig: TypeListOfLayerEntryConfig) => {
      listOfLayerEntryConfig.forEach((layerConfig) => {
        if (layerEntryIsGroupLayer(layerConfig)) processGroupLayerBounds(layerConfig.listOfLayerEntryConfig);
        else if (layerConfig.initialSettings?.bounds) {
          if (!bounds)
            bounds = [
              layerConfig.initialSettings.bounds[0],
              layerConfig.initialSettings.bounds[1],
              layerConfig.initialSettings.bounds[2],
              layerConfig.initialSettings.bounds[3],
            ];
          else
            bounds = [
              Math.min(layerConfig.initialSettings.bounds[0], bounds[0]),
              Math.min(layerConfig.initialSettings.bounds[1], bounds[1]),
              Math.max(layerConfig.initialSettings.bounds[2], bounds[2]),
              Math.max(layerConfig.initialSettings.bounds[3], bounds[3]),
            ];
        }
      });
    };
    // GV The following code will need to be modified when the topmost layer of a GeoView
    // GV layer creates dynamicaly a group out of a list of layers.
    const layerConfig: TypeLayerEntryConfig | TypeListOfLayerEntryConfig | undefined = layerPath.includes('/')
      ? this.getLayerConfig(layerPath)
      : this.listOfLayerEntryConfig;
    if (layerConfig) {
      if (Array.isArray(layerConfig)) processGroupLayerBounds(layerConfig);
      else processGroupLayerBounds([layerConfig]);
      if (projectionCode && bounds) return api.utilities.projection.transformExtent(bounds, `EPSG:4326`, `EPSG:${projectionCode}`);
    }
    return bounds;
  }

  /** ***************************************************************************************************************************
   * Returns the domaine of the specified field or null if the field has no domain.
   *
   * @param {string} fieldName field name for which we want to get the domaine.
   * @param {TypeLayerEntryConfig} layerConfig layer configuration.
   *
   * @returns {null | codedValueType | rangeDomainType} The domain of the field.
   */

  protected getFieldDomain(fieldName: string, layerConfig: TypeLayerEntryConfig): null | codedValueType | rangeDomainType {
    // Log
    logger.logWarning(`getFieldDomain is not implemented for ${fieldName} - ${layerConfig}`);
    return null;
  }

  /** ***************************************************************************************************************************
   * Extract the type of the specified field from the metadata. If the type can not be found, return 'string'.
   *
   * @param {string} fieldName field name for which we want to get the type.
   * @param {TypeLayerEntryConfig} layerConfig layer configuration.
   *
   * @returns {'string' | 'date' | 'number'} The type of the field.
   */

  protected getFieldType(fieldName: string, layerConfig: TypeLayerEntryConfig): 'string' | 'date' | 'number' {
    // Log
    logger.logWarning(`getFieldType is not implemented for ${fieldName} - ${layerConfig}`);
    return 'string';
  }

  /** ***************************************************************************************************************************
   * Return the extent of the layer or undefined if it will be visible regardless of extent. The layer extent is an array of
   * numbers representing an extent: [minx, miny, maxx, maxy]. This routine return undefined when the layer path can't be found.
   * The extent is used to clip the data displayed on the map.
   *
   * @param {string} layerPath Layer path to the layer's configuration.
   *
   * @returns {Extent | undefined} The layer extent.
   */
  getExtent(layerPath: string): Extent | undefined {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    return olLayer?.getExtent();
  }

  /** ***************************************************************************************************************************
   * set the extent of the layer. Use undefined if it will be visible regardless of extent. The layer extent is an array of
   * numbers representing an extent: [minx, miny, maxx, maxy]. This routine does nothing when the layerPath specified is not
   * found.
   *
   * @param {Extent} layerExtent The extent to assign to the layer.
   * @param {string} layerPath The layer path to the layer's configuration.
   */
  setExtent(layerExtent: Extent, layerPath: string) {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    if (olLayer) olLayer.setExtent(layerExtent);
  }

  /** ***************************************************************************************************************************
   * Return the opacity of the layer (between 0 and 1). This routine return undefined when the layerPath specified is not found.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {number | undefined} The opacity of the layer.
   */
  getOpacity(layerPath: string): number | undefined {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    return olLayer?.getOpacity();
  }

  /** ***************************************************************************************************************************
   * Set the opacity of the layer (between 0 and 1). This routine does nothing when the layerPath specified is not found.
   *
   * @param {number} layerOpacity The opacity of the layer.
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   */
  setOpacity(layerOpacity: number, layerPath: string) {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    if (olLayer) olLayer.setOpacity(layerOpacity);
  }

  /** ***************************************************************************************************************************
   * Return the visibility of the layer (true or false). This routine return undefined when the layerPath specified is not found.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {boolean | undefined} The visibility of the layer.
   */
  getVisible(layerPath: string): boolean | undefined {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    return olLayer?.getVisible();
  }

  /** ***************************************************************************************************************************
   * Set the visibility of the layer (true or false). This routine does nothing when the layerPath specified is not found.
   *
   * @param {boolean} layerVisibility The visibility of the layer.
   * @param {string} layerPath The layer path to the layer's configuration.
   */
  setVisible(layerVisibility: boolean, layerPath: string) {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    if (olLayer) {
      olLayer.setVisible(layerVisibility);
      olLayer.changed();
    }
  }

  /** ***************************************************************************************************************************
   * Return the min zoom of the layer. This routine return undefined when the layerPath specified is not found.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {number | undefined} The min zoom of the layer.
   */
  getMinZoom(layerPath: string): number | undefined {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    return olLayer?.getMinZoom();
  }

  /** ***************************************************************************************************************************
   * Set the min zoom of the layer. This routine does nothing when the layerPath specified is not found.
   *
   * @param {boolean} layerVisibility The min zoom of the layer.
   * @param {string} layerPath The layer path to the layer's configuration.
   */
  setMinZoom(minZoom: number, layerPath: string) {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    if (olLayer) olLayer.setMinZoom(minZoom);
  }

  /** ***************************************************************************************************************************
   * Return the max zoom of the layer. This routine return undefined when the layerPath specified is not found.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {number | undefined} The max zoom of the layer.
   */
  getMaxZoom(layerPath: string): number | undefined {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    return olLayer?.getMaxZoom();
  }

  /** ***************************************************************************************************************************
   * Set the max zoom of the layer. This routine does nothing when the layerPath specified is not found.
   *
   * @param {boolean} layerVisibility The max zoom of the layer.
   * @param {string} layerPath The layer path to the layer's configuration.
   */
  setMaxZoom(maxZoom: number, layerPath: string) {
    const olLayer = this.getLayerConfig(layerPath)?.olLayer;
    if (olLayer) olLayer.setMaxZoom(maxZoom);
  }

  /** ***************************************************************************************************************************
   * Return the legend of the layer. This routine returns null when the layerPath specified is not found. If the style property
   * of the layerConfig object is undefined, the legend property of the object returned will be null.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeLegend | null>} The legend of the layer.
   */
  async getLegend(layerPath: string): Promise<TypeLegend | null> {
    try {
      const layerConfig = this.getLayerConfig(layerPath) as
        | (AbstractBaseLayerEntryConfig & {
            style: TypeStyleConfig;
          })
        | undefined;

      if (!layerConfig) {
        const legend: TypeLegend = {
          type: this.type,
          layerPath: `error - layerPath = ${layerPath}`,
          layerName: { en: 'config not found', fr: 'config inexistante' } as TypeLocalizedString,
          styleConfig: null,
          legend: null,
        };
        return legend;
      }

      if (!layerConfig.style) {
        const legend: TypeLegend = {
          type: this.type,
          layerPath,
          layerName: layerConfig.layerName!,
          styleConfig: layerConfig.style,
          legend: null,
        };
        return legend;
      }

      const legend: TypeLegend = {
        type: this.type,
        layerPath,
        layerName: layerConfig?.layerName,
        styleConfig: layerConfig?.style,
        legend: await api.maps[this.mapId].geoviewRenderer.getLegendStyles(layerConfig),
      };
      return legend;
    } catch (error) {
      // Log
      logger.logError(error);
      return null;
    }
  }

  /** ***************************************************************************************************************************
   * Get and format the value of the field with the name passed in parameter. Vector GeoView layers convert dates to milliseconds
   * since the base date. Vector feature dates must be in ISO format.
   *
   * @param {Feature} features The features that hold the field values.
   * @param {string} fieldName The field name.
   * @param {'number' | 'string' | 'date'} fieldType The field type.
   *
   * @returns {string | number | Date} The formatted value of the field.
   */
  protected getFieldValue(feature: Feature, fieldName: string, fieldType: 'number' | 'string' | 'date'): string | number | Date {
    const fieldValue = feature.get(fieldName);
    let returnValue: string | number | Date;
    if (fieldType === 'date') {
      if (typeof fieldValue === 'string') {
        if (!this.serverDateFragmentsOrder)
          this.serverDateFragmentsOrder = api.utilities.date.getDateFragmentsOrder(api.utilities.date.deduceDateFormat(fieldValue));
        returnValue = api.utilities.date.applyInputDateFormat(fieldValue, this.serverDateFragmentsOrder);
      } else {
        // All vector dates are kept internally in UTC.
        returnValue = api.utilities.date.convertToUTC(`${api.utilities.date.convertMilisecondsToDate(fieldValue)}Z`);
      }
      const reverseTimeZone = true;
      if (this.externalFragmentsOrder)
        returnValue = api.utilities.date.applyOutputDateFormat(returnValue, this.externalFragmentsOrder, reverseTimeZone);
      return returnValue;
    }
    return fieldValue;
  }

  /** ***************************************************************************************************************************
   * Convert the feature information to an array of TypeFeatureInfoEntry[] | undefined | null.
   *
   * @param {Feature[]} features The array of features to convert.
   * @param {ImageLayerEntryConfig | VectorLayerEntryConfig} layerConfig The layer configuration.
   *
   * @returns {Promise<TypeFeatureInfoEntry[] | undefined | null>} The Array of feature information.
   */
  protected async formatFeatureInfoResult(
    features: Feature[],
    layerConfig: OgcWmsLayerEntryConfig | EsriDynamicLayerEntryConfig | VectorLayerEntryConfig
  ): Promise<TypeFeatureInfoEntry[] | undefined | null> {
    try {
      if (!features.length) return [];

      const featureInfo = layerConfig?.source?.featureInfo;
      const fieldTypes = featureInfo?.fieldTypes?.split(',') as ('string' | 'number' | 'date')[];
      const outfields = getLocalizedValue(
        featureInfo?.outfields as TypeLocalizedString,
        AppEventProcessor.getDisplayLanguage(this.mapId)
      )?.split(',');
      const aliasFields = getLocalizedValue(
        featureInfo?.aliasFields as TypeLocalizedString,
        AppEventProcessor.getDisplayLanguage(this.mapId)
      )?.split(',');
      const queryResult: TypeFeatureInfoEntry[] = [];
      let featureKeyCounter = 0;
      let fieldKeyCounter = 0;
      const promisedAllCanvasFound: Promise<{ feature: Feature; canvas: HTMLCanvasElement | undefined }>[] = [];
      features.forEach((featureNeedingItsCanvas) => {
        promisedAllCanvasFound.push(
          new Promise<{ feature: Feature; canvas: HTMLCanvasElement | undefined }>((resolveCanvas) => {
            api.maps[this.mapId].geoviewRenderer
              .getFeatureCanvas(featureNeedingItsCanvas, layerConfig as VectorLayerEntryConfig)
              .then((canvas) => {
                resolveCanvas({ feature: featureNeedingItsCanvas, canvas });
              });
          })
        );
      });
      const arrayOfFeatureInfo = await Promise.all(promisedAllCanvasFound);
      arrayOfFeatureInfo.forEach(({ canvas, feature }) => {
        if (canvas) {
          const extent = feature.getGeometry()!.getExtent();

          const featureInfoEntry: TypeFeatureInfoEntry = {
            // feature key for building the data-grid
            featureKey: featureKeyCounter++,
            geoviewLayerType: this.type,
            extent,
            geometry: feature,
            featureIcon: canvas,
            fieldInfo: {},
            nameField:
              getLocalizedValue(
                layerConfig?.source?.featureInfo?.nameField as TypeLocalizedString,
                AppEventProcessor.getDisplayLanguage(this.mapId)
              ) || null,
          };

          const featureFields = (feature as Feature).getKeys();
          featureFields.forEach((fieldName) => {
            if (fieldName !== 'geometry') {
              if (outfields?.includes(fieldName)) {
                const fieldIndex = outfields.indexOf(fieldName);
                featureInfoEntry.fieldInfo[fieldName] = {
                  fieldKey: fieldKeyCounter++,
                  value: this.getFieldValue(feature, fieldName, fieldTypes![fieldIndex]),
                  dataType: fieldTypes![fieldIndex] as 'string' | 'date' | 'number',
                  alias: aliasFields![fieldIndex],
                  domain: this.getFieldDomain(fieldName, layerConfig),
                };
              } else if (!outfields) {
                featureInfoEntry.fieldInfo[fieldName] = {
                  fieldKey: fieldKeyCounter++,
                  value: this.getFieldValue(feature, fieldName, this.getFieldType(fieldName, layerConfig)),
                  dataType: this.getFieldType(fieldName, layerConfig),
                  alias: fieldName,
                  domain: this.getFieldDomain(fieldName, layerConfig),
                };
              }
            }
          });
          queryResult.push(featureInfoEntry);
        }
      });
      return queryResult;
    } catch (error) {
      // Log
      logger.logError(error);
      return [];
    }
  }

  /** ***************************************************************************************************************************
   * Get the layerFilter that is associated to the layer. Returns undefined when the layer config can't be found using the layer
   * path.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {string | undefined} The filter associated to the layer or undefined.
   */
  getLayerFilter(layerPath: string): string | undefined {
    const layerConfig = this.getLayerConfig(layerPath);
    return layerConfig?.olLayer?.get('layerFilter');
  }

  /** ***************************************************************************************************************************
   * Get the layerFilter that is associated to the layer. Returns undefined when the layer config can't be found using the layer
   * path.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {TimeDimension} The temporal dimension associated to the layer or undefined.
   */
  getTemporalDimension(layerPath: string): TimeDimension {
    return this.layerTemporalDimension[layerPath];
  }

  /** ***************************************************************************************************************************
   * Set the layerTemporalDimension for the layer identified by specified layerPath.
   *
   * @param {string} layerPath The layer path to the layer's configuration affected by the change.
   * @param {TimeDimension} temporalDimension The value to assign to the layer temporal dimension property.
   */
  setTemporalDimension(layerPath: string, temporalDimension: TimeDimension): void {
    this.layerTemporalDimension[layerPath] = temporalDimension;
  }

  /** ***************************************************************************************************************************
   * Get the bounds of the layer represented in the layerConfig pointed to by the layerPath, returns updated bounds
   *
   * @param {string} layerPath The Layer path to the layer's configuration.
   * @param {Extent | undefined} bounds The current bounding box to be adjusted.
   *
   * @returns {Extent} The new layer bounding box.
   */
  protected abstract getBounds(layerPath: string, bounds?: Extent): Extent | undefined;

  /** ***************************************************************************************************************************
   * Compute the layer bounds or undefined if the result can not be obtained from the feature extents that compose the layer. If
   * projectionCode is defined, returns the bounds in the specified projection otherwise use the map projection. The bounds are
   * different from the extent. They are mainly used for display purposes to show the bounding box in which the data resides and
   * to zoom in on the entire layer data. It is not used by openlayer to limit the display of data on the map.
   *
   * @param {string} layerPath The Layer path to the layer's configuration.
   * @param {string | number | undefined} projectionCode Optional projection code to use for the returned bounds. Default to
   * current projection.
   *
   * @returns {Extent | undefined} The layer bounding box.
   */
  calculateBounds(layerPath: string): Extent | undefined {
    try {
      let bounds: Extent | undefined;
      const processGroupLayerBounds = (listOfLayerEntryConfig: TypeListOfLayerEntryConfig) => {
        listOfLayerEntryConfig.forEach((layerConfig) => {
          if (layerEntryIsGroupLayer(layerConfig)) processGroupLayerBounds(layerConfig.listOfLayerEntryConfig);
          else {
            bounds = this.getBounds(layerConfig.layerPath, bounds);
          }
        });
      };

      const initialLayerConfig = this.getLayerConfig(layerPath);
      if (initialLayerConfig) {
        if (Array.isArray(initialLayerConfig)) processGroupLayerBounds(initialLayerConfig);
        else processGroupLayerBounds([initialLayerConfig]);
      }

      return bounds;
    } catch (error) {
      // Log
      logger.logError(`Couldn't calculate bounds on layer ${layerPath}`, error);
      return undefined;
    }
  }

  /** ***************************************************************************************************************************
   * Set the layerStatus code of all layers in the listOfLayerEntryConfig.
   *
   * @param {TypeLayerStatus} newStatus The new status to assign to the layers.
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer's configuration.
   * @param {string} errorMessage The error message.
   */
  setAllLayerStatusTo(newStatus: TypeLayerStatus, listOfLayerEntryConfig: TypeListOfLayerEntryConfig, errorMessage?: string) {
    listOfLayerEntryConfig.forEach((layerConfig: TypeLayerEntryConfig) => {
      if (layerEntryIsGroupLayer(layerConfig)) this.setAllLayerStatusTo(newStatus, layerConfig.listOfLayerEntryConfig, errorMessage);
      else {
        if (layerConfig.layerStatus === 'error') return;
        layerConfig.layerStatus = newStatus;
        if (newStatus === 'error') {
          const { layerPath } = layerConfig;
          this.layerLoadError.push({
            layer: layerPath,
            loggerMessage: `${errorMessage} for layer ${layerPath} of map ${this.mapId}`,
          });
        }
      }
    });
  }

  /** ***************************************************************************************************************************
   * remove a layer configuration.
   *
   * @param {string} layerPath The layerpath to the node we want to delete.
   */
  removeConfig(layerPath: string) {
    const layerConfigToRemove = this.getLayerConfig(layerPath) as AbstractBaseLayerEntryConfig;
    if (layerConfigToRemove.entryType !== CONST_LAYER_ENTRY_TYPES.GROUP) this.unregisterFromLayerSets(layerConfigToRemove);
    delete api.maps[this.mapId].layer.registeredLayers[layerPath];
  }
}

/**
 * Define a delegate for the event handler function signature
 */
type GeoViewLayerRegistrationDelegate = EventDelegateBase<AbstractGeoViewLayer, GeoViewLayerRegistrationEvent>;

/**
 * Define an event for the delegate
 */
export type GeoViewLayerRegistrationEvent = {
  layerPath: string;
  layerConfig: AbstractBaseLayerEntryConfig;
  action: 'add' | 'remove';
};

/**
 * Define a delegate for the event handler function signature
 */
type GeoViewLayerLegendQueryingDelegate = EventDelegateBase<AbstractGeoViewLayer, GeoViewLayerLegendQueryingEvent>;

/**
 * Define an event for the delegate
 */
export type GeoViewLayerLegendQueryingEvent = {
  layerPath: string;
};

/**
 * Define a delegate for the event handler function signature
 */
type GeoViewLayerLegendQueriedDelegate = EventDelegateBase<AbstractGeoViewLayer, GeoViewLayerLegendQueriedEvent>;

/**
 * Define an event for the delegate
 */
export type GeoViewLayerLegendQueriedEvent = {
  layerPath: string;
  legend: TypeLegend;
};

export type TypeLegend = {
  layerPath: string;
  layerName?: TypeLocalizedString;
  type: TypeGeoviewLayerType;
  styleConfig?: TypeStyleConfig | null;
  // Layers other than vector layers use the HTMLCanvasElement type for their legend.
  legend: TypeVectorLayerStyles | HTMLCanvasElement | null;
};

export interface TypeWmsLegendStyle {
  name: string;
  legend: HTMLCanvasElement | null;
}

export interface TypeWmsLegend extends Omit<TypeLegend, 'styleConfig'> {
  legend: HTMLCanvasElement | null;
  styles?: TypeWmsLegendStyle[];
}

export interface TypeImageStaticLegend extends Omit<TypeLegend, 'styleConfig'> {
  legend: HTMLCanvasElement | null;
}

export interface TypeVectorLegend extends TypeLegend {
  legend: TypeVectorLayerStyles;
}

export type TypeStyleRepresentation = {
  /** The defaultCanvas property is used by Simple styles and default styles when defined in unique value and class
   * break styles.
   */
  defaultCanvas?: HTMLCanvasElement | null;
  /** The arrayOfCanvas property is used by unique value and class break styles. */
  arrayOfCanvas?: (HTMLCanvasElement | null)[];
};
export type TypeVectorLayerStyles = Partial<Record<TypeStyleGeometry, TypeStyleRepresentation>>;

/** ******************************************************************************************************************************
 * GeoViewAbstractLayers types
 */

// Definition of the keys used to create the constants of the GeoView layer
// TODO: Refactor - Move this and related types/const below lower in the architecture? Say, to MapSchemaTypes? Otherwise, things circle..
type LayerTypesKey =
  | 'CSV'
  | 'ESRI_DYNAMIC'
  | 'ESRI_FEATURE'
  | 'ESRI_IMAGE'
  | 'IMAGE_STATIC'
  | 'GEOJSON'
  | 'GEOPACKAGE'
  | 'XYZ_TILES'
  | 'VECTOR_TILES'
  | 'OGC_FEATURE'
  | 'WFS'
  | 'WMS';

/**
 * Type of GeoView layers
 */
export type TypeGeoviewLayerType =
  | 'CSV'
  | 'esriDynamic'
  | 'esriFeature'
  | 'esriImage'
  | 'imageStatic'
  | 'GeoJSON'
  | 'GeoPackage'
  | 'xyzTiles'
  | 'vectorTiles'
  | 'ogcFeature'
  | 'ogcWfs'
  | 'ogcWms';

/**
 * This type is created to only be used when validating the configuration schema types.
 * Indeed, GeoCore is not an official Abstract Geoview Layer, but it can be used in schema types.
 */
export type TypeGeoviewLayerTypeWithGeoCore = TypeGeoviewLayerType | typeof CONST_LAYER_ENTRY_TYPES.GEOCORE;

/**
 * Definition of the GeoView layer constants
 */
export const CONST_LAYER_TYPES: Record<LayerTypesKey, TypeGeoviewLayerType> = {
  CSV: 'CSV',
  ESRI_DYNAMIC: 'esriDynamic',
  ESRI_FEATURE: 'esriFeature',
  ESRI_IMAGE: 'esriImage',
  IMAGE_STATIC: 'imageStatic',
  GEOJSON: 'GeoJSON',
  GEOPACKAGE: 'GeoPackage',
  XYZ_TILES: 'xyzTiles',
  VECTOR_TILES: 'vectorTiles',
  OGC_FEATURE: 'ogcFeature',
  WFS: 'ogcWfs',
  WMS: 'ogcWms',
};

/**
 * Definition of the sub schema to use for each type of Geoview layer
 */
export const CONST_GEOVIEW_SCHEMA_BY_TYPE: Record<TypeGeoviewLayerType, string> = {
  CSV: 'TypeVectorLayerEntryConfig',
  imageStatic: 'TypeImageStaticLayerEntryConfig',
  esriDynamic: 'TypeEsriDynamicLayerEntryConfig',
  esriFeature: 'TypeVectorLayerEntryConfig',
  esriImage: 'TypeEsriImageLayerEntryConfig',
  GeoJSON: 'TypeVectorLayerEntryConfig',
  GeoPackage: 'TypeVectorLayerEntryConfig',
  xyzTiles: 'TypeTileLayerEntryConfig',
  vectorTiles: 'TypeTileLayerEntryConfig',
  ogcFeature: 'TypeVectorLayerEntryConfig',
  ogcWfs: 'TypeVectorLayerEntryConfig',
  ogcWms: 'TypeOgcWmsLayerEntryConfig',
};

const validVectorLayerLegendTypes: TypeGeoviewLayerType[] = [
  CONST_LAYER_TYPES.CSV,
  CONST_LAYER_TYPES.GEOJSON,
  CONST_LAYER_TYPES.ESRI_DYNAMIC,
  CONST_LAYER_TYPES.ESRI_FEATURE,
  CONST_LAYER_TYPES.ESRI_IMAGE,
  CONST_LAYER_TYPES.OGC_FEATURE,
  CONST_LAYER_TYPES.WFS,
  CONST_LAYER_TYPES.GEOPACKAGE,
];

/**
 * type guard function that redefines a TypeLegend as a TypeVectorLegend
 * if the type attribute of the verifyIfLegend parameter is valid. The type ascention
 * applies only to the true block of the if clause.
 *
 * @param {TypeLegend} verifyIfLegend object to test in order to determine if the type ascention is valid
 * @returns {boolean} returns true if the payload is valid
 */
export const isVectorLegend = (verifyIfLegend: TypeLegend): verifyIfLegend is TypeVectorLegend => {
  return validVectorLayerLegendTypes.includes(verifyIfLegend?.type);
};

/**
 * type guard function that redefines a TypeLegend as a TypeWmsLegend
 * if the event attribute of the verifyIfPayload parameter is valid. The type ascention
 * applies only to the true block of the if clause.
 *
 * @param {TypeLegend} verifyIfLegend object to test in order to determine if the type ascention is valid
 * @returns {boolean} returns true if the payload is valid
 */
export const isWmsLegend = (verifyIfLegend: TypeLegend): verifyIfLegend is TypeWmsLegend => {
  return verifyIfLegend?.type === CONST_LAYER_TYPES.WMS;
};

/**
 * type guard function that redefines a TypeLegend as a TypeImageStaticLegend
 * if the type attribute of the verifyIfLegend parameter is valid. The type ascention
 * applies only to the true block of the if clause.
 *
 * @param {TypeLegend} verifyIfLegend object to test in order to determine if the type ascention is valid
 * @returns {boolean} returns true if the payload is valid
 */
export const isImageStaticLegend = (verifyIfLegend: TypeLegend): verifyIfLegend is TypeImageStaticLegend => {
  return verifyIfLegend?.type === CONST_LAYER_TYPES.IMAGE_STATIC;
};
