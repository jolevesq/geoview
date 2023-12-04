import { createElement, ReactElement } from 'react';

import { FeatureInfoLayerSet } from '@/geo/utils/feature-info-layer-set';
import { api } from '@/app';
import { Detailspanel } from './details-panel';

/**
 * API to manage details component
 *
 * @exports
 * @class DetailsAPI
 */
export class DetailsApi {
  mapId!: string;

  featureInfoLayerSet!: FeatureInfoLayerSet;

  /**
   * initialize the details api
   *
   * @param mapId the id of the map this details belongs to
   */
  constructor(mapId: string) {
    this.mapId = mapId;
    this.featureInfoLayerSet = api.getFeatureInfoLayerSet(mapId); //! This triggers the creation of feature info layer set
  }

  /**
   * Create a details as an element
   *
   * @return {ReactElement} the details react element
   */
  createDetails = (): ReactElement => {
    return createElement(Detailspanel);
  };
}