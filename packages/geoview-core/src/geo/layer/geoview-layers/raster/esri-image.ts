import { ImageArcGISRest } from 'ol/source';
import { Options as SourceOptions } from 'ol/source/ImageArcGISRest';
import { Options as ImageOptions } from 'ol/layer/BaseImage';
import { Image as ImageLayer } from 'ol/layer';
import { Extent } from 'ol/extent';

import { getLocalizedValue } from '@/core/utils/utilities';
import { getMinOrMaxExtents } from '@/geo/utils/utilities';
import { api } from '@/app';
import { MapEventProcessor } from '@/api/event-processors/event-processor-children/map-event-processor';
import { TypeJsonObject } from '@/core/types/global-types';
import { logger } from '@/core/utils/logger';
import { EsriImageLayerEntryConfig } from '@/core/utils/config/validation-classes/raster-validation-classes/esri-image-layer-entry-config';
import { AbstractBaseLayerEntryConfig } from '@/core/utils/config/validation-classes/abstract-base-layer-entry-config';
import { codedValueType, rangeDomainType } from '@/geo/utils/layer-set';
import { AbstractGeoViewLayer, CONST_LAYER_TYPES, TypeLegend } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
import { AbstractGeoViewRaster, TypeBaseRasterLayer } from '@/geo/layer/geoview-layers/raster/abstract-geoview-raster';
import {
  TypeLayerEntryConfig,
  TypeGeoviewLayerConfig,
  TypeUniqueValueStyleConfig,
  TypeListOfLayerEntryConfig,
  layerEntryIsGroupLayer,
  TypeUniqueValueStyleInfo,
  TypeStyleConfig,
} from '@/geo/map/map-schema-types';

import {
  commonGetFieldDomain,
  commonGetFieldType,
  commonProcessFeatureInfoConfig,
  commonProcessInitialSettings,
  commonProcessLayerMetadata,
  commonProcessTemporalDimension,
} from '@/geo/layer/geoview-layers/esri-layer-common';
import { AppEventProcessor } from '@/api/event-processors/event-processor-children/app-event-processor';

export interface TypeEsriImageLayerConfig extends TypeGeoviewLayerConfig {
  geoviewLayerType: typeof CONST_LAYER_TYPES.ESRI_IMAGE;
  listOfLayerEntryConfig: EsriImageLayerEntryConfig[];
}

interface TypeEsriImageLayerLegend {
  layers: {
    layerId: number | string;
    layerName: string;
    layerType: string;
    minScale: number;
    maxScale: number;
    legendType: string;
    legend: {
      label: string;
      url: string;
      imageData: string;
      contentType: string;
      height: number;
      width: number;
      values: string[];
    }[];
  }[];
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
export const layerConfigIsEsriImage = (verifyIfLayer: TypeGeoviewLayerConfig): verifyIfLayer is TypeEsriImageLayerConfig => {
  return verifyIfLayer?.geoviewLayerType === CONST_LAYER_TYPES.ESRI_IMAGE;
};

/** ******************************************************************************************************************************
 * type guard function that redefines an AbstractGeoViewLayer as an EsriImage if the type attribute of the verifyIfGeoViewLayer
 * parameter is ESRI_IMAGE. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {AbstractGeoViewLayer} verifyIfGeoViewLayer Polymorphic object to test in order to determine if the type ascention is
 * valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const geoviewLayerIsEsriImage = (verifyIfGeoViewLayer: AbstractGeoViewLayer): verifyIfGeoViewLayer is EsriImage => {
  return verifyIfGeoViewLayer?.type === CONST_LAYER_TYPES.ESRI_IMAGE;
};

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
export const geoviewEntryIsEsriImage = (verifyIfGeoViewEntry: TypeLayerEntryConfig): verifyIfGeoViewEntry is EsriImageLayerEntryConfig => {
  return verifyIfGeoViewEntry?.geoviewLayerConfig?.geoviewLayerType === CONST_LAYER_TYPES.ESRI_IMAGE;
};

// ******************************************************************************************************************************
// ******************************************************************************************************************************
/** ******************************************************************************************************************************
 * A class to add esri image layer.
 *
 * @exports
 * @class EsriImage
 */
// ******************************************************************************************************************************
export class EsriImage extends AbstractGeoViewRaster {
  /** ****************************************************************************************************************************
   * Initialize layer.
   * @param {string} mapId The id of the map.
   * @param {TypeEsriImageLayerConfig} layerConfig The layer configuration.
   */
  constructor(mapId: string, layerConfig: TypeEsriImageLayerConfig) {
    // eslint-disable-next-line no-param-reassign
    if (!layerConfig.serviceDateFormat) layerConfig.serviceDateFormat = 'DD/MM/YYYY HH:MM:SSZ';
    super(CONST_LAYER_TYPES.ESRI_IMAGE, layerConfig, mapId);
  }

  /** ***************************************************************************************************************************
   * Return the legend of the layer.This routine return null when the layerPath specified is not found. If the legend can't be
   * read, the legend property of the object returned will be null.
   *
   * @param {string} layerPath The layer path to the layer's configuration.
   *
   * @returns {Promise<TypeLegend | null>} The legend of the layer.
   */
  async getLegend(layerPath: string): Promise<TypeLegend | null> {
    try {
      const layerConfig = this.getLayerConfig(layerPath) as EsriImageLayerEntryConfig | undefined | null;
      if (!layerConfig) return null;
      const legendUrl = `${getLocalizedValue(
        layerConfig.geoviewLayerConfig.metadataAccessPath,
        AppEventProcessor.getDisplayLanguage(this.mapId)
      )}/legend?f=pjson`;
      const response = await fetch(legendUrl);
      const legendJson: TypeEsriImageLayerLegend = await response.json();
      let legendInfo;
      if (legendJson.layers && legendJson.layers.length === 1) {
        legendInfo = legendJson.layers[0].legend;
      } else if (legendJson.layers.length) {
        const layerInfo = legendJson.layers.find((layer) => layer.layerId === layerConfig.layerId);
        if (layerInfo) legendInfo = layerInfo.legend;
      }
      if (!legendInfo) {
        const legend: TypeLegend = {
          type: this.type,
          layerPath,
          layerName: layerConfig.layerName!,
          styleConfig: layerConfig.style,
          legend: null,
        };
        return legend;
      }
      const uniqueValueStyleInfo: TypeUniqueValueStyleInfo[] = [];
      legendInfo.forEach((info) => {
        const styleInfo: TypeUniqueValueStyleInfo = {
          label: info.label,
          values: info.label.split(','),
          settings: {
            type: 'iconSymbol',
            mimeType: info.contentType,
            src: info.imageData,
            width: info.width,
            height: info.height,
          },
        };
        uniqueValueStyleInfo.push(styleInfo);
      });
      const styleSettings: TypeUniqueValueStyleConfig = {
        styleType: 'uniqueValue',
        fields: ['default'],
        uniqueValueStyleInfo,
      };
      const styleConfig: TypeStyleConfig = {
        Point: styleSettings,
      };
      layerConfig.style = styleConfig;
      const legend: TypeLegend = {
        type: this.type,
        layerPath,
        layerName: layerConfig?.layerName,
        styleConfig,
        legend: await api.maps[this.mapId].geoviewRenderer.getLegendStyles(
          layerConfig as AbstractBaseLayerEntryConfig & {
            style: TypeStyleConfig;
          }
        ),
      };
      return legend;
    } catch (error) {
      logger.logError(`Get Legend for ${layerPath} error`, error);
      return null;
    }
  }

  /** ***************************************************************************************************************************
   * This method recursively validates the layer configuration entries by filtering and reporting invalid layers. If needed,
   * extra configuration may be done here.
   *
   * @param {TypeListOfLayerEntryConfig} listOfLayerEntryConfig The list of layer entries configuration to validate.
   *
   * @returns {TypeListOfLayerEntryConfig} A new list of layer entries configuration with deleted error layers.
   */
  protected validateListOfLayerEntryConfig(listOfLayerEntryConfig: TypeListOfLayerEntryConfig) {
    listOfLayerEntryConfig.forEach((layerConfig: TypeLayerEntryConfig) => {
      const { layerPath } = layerConfig;
      if (layerEntryIsGroupLayer(layerConfig)) {
        this.validateListOfLayerEntryConfig(layerConfig.listOfLayerEntryConfig!);
        if (!layerConfig.listOfLayerEntryConfig.length) {
          this.layerLoadError.push({
            layer: layerPath,
            loggerMessage: `Empty layer group (mapId:  ${this.mapId}, layerPath: ${layerPath})`,
          });
          // eslint-disable-next-line no-param-reassign
          layerConfig.layerStatus = 'error';
        }
      }
    });
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
    return commonGetFieldType.call(this, fieldName, layerConfig);
  }

  /** ***************************************************************************************************************************
   * Return the domain of the specified field.
   *
   * @param {string} fieldName field name for which we want to get the domain.
   * @param {TypeLayerEntryConfig} layerConfig layer configuration.
   *
   * @returns {null | codedValueType | rangeDomainType} The domain of the field.
   */
  protected getFieldDomain(fieldName: string, layerConfig: TypeLayerEntryConfig): null | codedValueType | rangeDomainType {
    return commonGetFieldDomain.call(this, fieldName, layerConfig);
  }

  /** ***************************************************************************************************************************
   * This method will create a Geoview temporal dimension if it exist in the service metadata
   * @param {TypeJsonObject} esriTimeDimension The ESRI time dimension object
   * @param {EsriImageLayerEntryConfig} layerConfig The layer entry to configure
   */
  protected processTemporalDimension(esriTimeDimension: TypeJsonObject, layerConfig: EsriImageLayerEntryConfig) {
    commonProcessTemporalDimension(this, esriTimeDimension, layerConfig, true);
  }

  /** ***************************************************************************************************************************
   * This method verifies if the layer is queryable and sets the outfields and aliasFields of the source feature info.
   *
   * @param {EsriImageLayerEntryConfig} layerConfig The layer entry to configure.
   */
  processFeatureInfoConfig = (layerConfig: EsriImageLayerEntryConfig) => {
    commonProcessFeatureInfoConfig.call(this, layerConfig);
  };

  /** ***************************************************************************************************************************
   * This method set the initial settings based on the service metadata. Priority is given to the layer configuration.
   *
   * @param {EsriImage} this The ESRI layer instance pointer.
   * @param {EsriImageLayerEntryConfig} layerConfig The layer entry to configure.
   */
  processInitialSettings(layerConfig: EsriImageLayerEntryConfig) {
    commonProcessInitialSettings.call(this, layerConfig);
  }

  /** ***************************************************************************************************************************
   * This method is used to process the layer's metadata. It will fill the empty fields of the layer's configuration (renderer,
   * initial settings, fields and aliases).
   *
   * @param {TypeLayerEntryConfig} layerConfig The layer entry configuration to process.
   *
   * @returns {Promise<TypeLayerEntryConfig>} A promise that the layer configuration has its metadata processed.
   */
  protected processLayerMetadata(layerConfig: TypeLayerEntryConfig): Promise<TypeLayerEntryConfig> {
    return commonProcessLayerMetadata.call(this, layerConfig);
  }

  /** ****************************************************************************************************************************
   * This method creates a GeoView Esri Image layer using the definition provided in the layerConfig parameter.
   *
   * @param {EsriImageLayerEntryConfig} layerConfig Information needed to create the GeoView layer.
   *
   * @returns {TypeBaseRasterLayer} The GeoView raster layer that has been created.
   */
  protected processOneLayerEntry(layerConfig: EsriImageLayerEntryConfig): Promise<TypeBaseRasterLayer | null> {
    // GV IMPORTANT: The processOneLayerEntry method must call the corresponding method of its parent to ensure that the flow of
    // GV            layerStatus values is correctly sequenced.
    super.processOneLayerEntry(layerConfig);
    const sourceOptions: SourceOptions = {};
    sourceOptions.attributions = [(this.metadata!.copyrightText ? this.metadata!.copyrightText : '') as string];
    sourceOptions.url = getLocalizedValue(layerConfig.source.dataAccessPath!, AppEventProcessor.getDisplayLanguage(this.mapId));
    sourceOptions.params = { LAYERS: `show:${layerConfig.layerId}` };
    if (layerConfig.source.transparent) Object.defineProperty(sourceOptions.params, 'transparent', layerConfig.source.transparent!);
    if (layerConfig.source.format) Object.defineProperty(sourceOptions.params, 'format', layerConfig.source.format!);
    if (layerConfig.source.crossOrigin) {
      sourceOptions.crossOrigin = layerConfig.source.crossOrigin;
    } else {
      sourceOptions.crossOrigin = 'Anonymous';
    }
    if (layerConfig.source.projection) sourceOptions.projection = `EPSG:${layerConfig.source.projection}`;

    const imageLayerOptions: ImageOptions<ImageArcGISRest> = {
      source: new ImageArcGISRest(sourceOptions),
      properties: { layerConfig },
    };
    // layerConfig.initialSettings cannot be undefined because config-validation set it to {} if it is undefined.
    if (layerConfig.initialSettings?.className !== undefined) imageLayerOptions.className = layerConfig.initialSettings.className;
    if (layerConfig.initialSettings?.extent !== undefined) imageLayerOptions.extent = layerConfig.initialSettings.extent;
    if (layerConfig.initialSettings?.maxZoom !== undefined) imageLayerOptions.maxZoom = layerConfig.initialSettings.maxZoom;
    if (layerConfig.initialSettings?.minZoom !== undefined) imageLayerOptions.minZoom = layerConfig.initialSettings.minZoom;
    if (layerConfig.initialSettings?.states?.opacity !== undefined) imageLayerOptions.opacity = layerConfig.initialSettings.states.opacity;
    // If a layer on the map has an initialSettings.visible set to false, its status will never reach the status 'loaded' because
    // nothing is drawn on the map. We must wait until the 'loaded' status is reached to set the visibility to false. The call
    // will be done in the layerConfig.loadedFunction() which is called right after the 'loaded' signal.

    // eslint-disable-next-line no-param-reassign
    layerConfig.olLayerAndLoadEndListeners = {
      olLayer: new ImageLayer(imageLayerOptions),
      loadEndListenerType: 'image',
    };
    // eslint-disable-next-line no-param-reassign
    layerConfig.geoviewLayerInstance = this;

    return Promise.resolve(layerConfig.olLayer);
  }

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
  applyViewFilter(layerPath: string, filter: string, CombineLegendFilter?: boolean) {
    const layerConfig = this.getLayerConfig(layerPath) as EsriImageLayerEntryConfig;
    // Log
    logger.logTraceCore('ESRIImage - applyViewFilter', layerPath);

    // Get source
    const source = (layerConfig.olLayer as ImageLayer<ImageArcGISRest>).getSource();
    if (source) {
      let filterValueToUse = filter;
      layerConfig.olLayer!.set('legendFilterIsOff', !CombineLegendFilter);
      if (CombineLegendFilter) layerConfig.olLayer?.set('layerFilter', filter);

      if (filterValueToUse) {
        filterValueToUse = filterValueToUse.replaceAll(/\s{2,}/g, ' ').trim();
        const queryElements = filterValueToUse.split(/(?<=\b)\s*=/);
        const dimension = queryElements[0].trim();
        filterValueToUse = queryElements[1].trim();

        // Convert date constants using the externalFragmentsOrder derived from the externalDateFormat
        const searchDateEntry = [
          ...`${filterValueToUse} `.matchAll(/(?<=^date\b\s')[\d/\-T\s:+Z]{4,25}(?=')|(?<=[(\s]date\b\s')[\d/\-T\s:+Z]{4,25}(?=')/gi),
        ];
        searchDateEntry.reverse();
        searchDateEntry.forEach((dateFound) => {
          // If the date has a time zone, keep it as is, otherwise reverse its time zone by changing its sign
          const reverseTimeZone = ![20, 25].includes(dateFound[0].length);
          const reformattedDate = api.utilities.date.applyInputDateFormat(dateFound[0], this.externalFragmentsOrder, reverseTimeZone);
          filterValueToUse = `${filterValueToUse!.slice(0, dateFound.index! - 6)}${reformattedDate}${filterValueToUse!.slice(
            dateFound.index! + dateFound[0].length + 2
          )}`;
        });
        source.updateParams({ [dimension]: filterValueToUse.replace(/\s*/g, '') });
        layerConfig.olLayer!.changed();
      }
    }
  }

  /** ***************************************************************************************************************************
   * Get the bounds of the layer represented in the layerConfig pointed to by the layerPath, returns updated bounds
   *
   * @param {string} layerPath The Layer path to the layer's configuration.
   * @param {Extent | undefined} bounds The current bounding box to be adjusted.
   *
   * @returns {Extent | undefined} The new layer bounding box.
   */
  protected getBounds(layerPath: string, bounds?: Extent): Extent | undefined {
    const layerConfig = this.getLayerConfig(layerPath);
    const layerBounds = layerConfig?.initialSettings?.bounds || [];
    const projection = this.metadata?.fullExtent?.spatialReference?.wkid || MapEventProcessor.getMapState(this.mapId).currentProjection;

    if (this.metadata?.fullExtent) {
      layerBounds[0] = this.metadata?.fullExtent.xmin as number;
      layerBounds[1] = this.metadata?.fullExtent.ymin as number;
      layerBounds[2] = this.metadata?.fullExtent.xmax as number;
      layerBounds[3] = this.metadata?.fullExtent.ymax as number;
    }

    if (layerBounds) {
      let transformedBounds = layerBounds;
      if (this.metadata?.fullExtent?.spatialReference?.wkid !== MapEventProcessor.getMapState(this.mapId).currentProjection) {
        transformedBounds = api.utilities.projection.transformExtent(
          layerBounds,
          `EPSG:${projection}`,
          `EPSG:${MapEventProcessor.getMapState(this.mapId).currentProjection}`
        );
      }

      // eslint-disable-next-line no-param-reassign
      if (!bounds) bounds = [transformedBounds[0], transformedBounds[1], transformedBounds[2], transformedBounds[3]];
      // eslint-disable-next-line no-param-reassign
      else bounds = getMinOrMaxExtents(bounds, transformedBounds);
    }

    return bounds;
  }
}
