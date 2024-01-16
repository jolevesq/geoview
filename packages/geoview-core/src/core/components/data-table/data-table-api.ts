import { createElement, ReactElement } from 'react';
import { api, TypeListOfLayerEntryConfig, TypeArrayOfFeatureInfoEntries, TypeFieldEntry, TypeLocalizedString } from '@/app';
import { DataTableData } from './data-table';
import { Datapanel } from './data-panel';
import { AppEventProcessor } from '@/api/event-processors/event-processor-children/app-event-processor';

export interface GroupLayers {
  layerId: string;
  layerName?: TypeLocalizedString;
  layerKey: string;
}

export class DataTableApi {
  mapId!: string;

  /**
   * initialize the data table api
   *
   * @param mapId the id of the map this data table belongs to
   */
  constructor(mapId: string) {
    this.mapId = mapId;
  }

  /**
   * Create group layer keys based on layer rendered on map
   *
   * @param {TyepListOfLayerEntryConfig} listOfLayerEntryConfig list of layers configured to be rendered on map.
   * @param {string} parentLayerId layer id
   * @param {string[]} grouplayerKeys list of keys already exists.
   * @returns {string[]} array of layer keys
   */
  getGroupKeys = (listOfLayerEntryConfig: TypeListOfLayerEntryConfig, parentLayerId: string, groupLayers: GroupLayers[]): GroupLayers[] => {
    listOfLayerEntryConfig.forEach((LayerEntryConfig) => {
      if (
        LayerEntryConfig.entryType === 'group' &&
        LayerEntryConfig.listOfLayerEntryConfig !== undefined &&
        LayerEntryConfig.listOfLayerEntryConfig.length > 1
      ) {
        this.getGroupKeys(LayerEntryConfig.listOfLayerEntryConfig, parentLayerId, groupLayers);
      } else if (LayerEntryConfig.entryType !== 'group') {
        groupLayers.push({
          layerId: parentLayerId,
          layerName: LayerEntryConfig.layerName,
          layerKey: `${parentLayerId}/${LayerEntryConfig.layerId}`,
        });
      }
    });

    return groupLayers;
  };

  /**
   * Create a data table rows
   *
   * @param {TypeArrayOfFeatureInfoEntries} arrayOfFeatureInfoEntries the properties of the data table to be created
   * @return {TypeJsonArray} the data table rows
   */
  buildFeatureRows = (arrayOfFeatureInfoEntries: TypeArrayOfFeatureInfoEntries) => {
    const features = arrayOfFeatureInfoEntries!.map((feature) => {
      return {
        ...feature,
        rows: Object.keys(feature.fieldInfo).reduce((acc, curr) => {
          if (curr) {
            acc[curr] = feature.fieldInfo[curr]?.value as string;
          }
          return acc;
        }, {} as Record<string, string>),
      };
    });

    const columns = arrayOfFeatureInfoEntries!.reduce((acc, curr) => {
      const keys = Object.keys(curr.fieldInfo);

      keys.forEach((key) => {
        if (!acc[key]) {
          acc[key] = curr.fieldInfo[key] as TypeFieldEntry;
        }
      });
      return acc;
    }, {} as Record<string, TypeFieldEntry>);

    return {
      features,
      fieldAliases: columns,
    };
  };

  /**
   * Create data panel for various layers.
   *
   * @returns {Promise<ReactElement | undefined>} Promise of ReactElement.
   */
  createDataPanel = async (): Promise<ReactElement | undefined> => {
    let groupLayers: GroupLayers[] = [];
    // TODO: use Store event processor
    const language = AppEventProcessor.getDisplayLanguage(this.mapId);
    const geoLayers = Object.keys(api.maps[this.mapId].layer.geoviewLayers);

    geoLayers.forEach((layerId: string) => {
      const geoviewLayerInstance = api.maps[this.mapId].layer.geoviewLayers[layerId];
      if (geoviewLayerInstance.listOfLayerEntryConfig.length > 0) {
        const layers = this.getGroupKeys(geoviewLayerInstance.listOfLayerEntryConfig, layerId, []);
        groupLayers = [...groupLayers, ...layers];
      }
    });

    const requests = groupLayers.map((layer) => {
      const geoviewLayerInstance = api.maps[this.mapId].layer.geoviewLayers[layer.layerId];
      return geoviewLayerInstance.getFeatureInfo('all', layer.layerKey);
    });

    const response = await Promise.allSettled(requests);

    const data = response
      .filter((req) => req.status === 'fulfilled')
      .map((result) => {
        /* @ts-expect-error value prop is part of promise, filter function already filter fullfilled promise, still thrown type error. */
        return this.buildFeatureRows(result.value);
      });

    const filteredData: (DataTableData & GroupLayers)[] = [];

    // filter data based on features.
    data.forEach((res, index) => {
      if (res.features.length) {
        const concatedData = { ...res, ...groupLayers[index] };
        filteredData.push(concatedData);
      }
    });

    return createElement(Datapanel, { layerData: filteredData, mapId: this.mapId, language }, undefined);
  };
}