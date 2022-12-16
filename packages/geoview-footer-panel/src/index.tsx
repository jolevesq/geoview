import {
  Cast,
  AbstractPlugin,
  TypePluginOptions,
  TypeButtonPanel,
  TypeWindow,
  toJsonObject,
  TypeJsonObject,
  AnySchemaObject,
} from 'geoview-core';

import schema from '../schema.json';
import defaultConfig from '../default-config-footer-panel.json';
import { DetailsItem } from './details-item';

const w = window as TypeWindow;

type CustomTabs = {
  title: string;
  contentHTML: string;
};

/**
 * Create a class for the plugin instance
 */
class FooterPanelPlugin extends AbstractPlugin {
  // store the created button panel object
  buttonPanel: TypeButtonPanel | null;

  constructor(pluginId: string, props: TypePluginOptions) {
    super(pluginId, props);
    this.buttonPanel = null;
  }

  /**
   * Return the package schema
   *
   * @returns {AnySchemaObject} the package schema
   */
  schema = (): AnySchemaObject => schema;

  /**
   * Return the default config for this package
   *
   * @returns {TypeJsonObject} the default config
   */
  defaultConfig = (): TypeJsonObject => toJsonObject(defaultConfig);

  /**
   * translations object to inject to the viewer translations
   */
  translations = toJsonObject({
    en: {
      legend: 'Legend',
      details: 'Details',
      dataGrid: 'Data',
    },
    fr: {
      legend: 'Légende',
      details: 'Détails',
      dataGrid: 'Données',
    },
  });

  /**
   * Added function called after the plugin has been initialized
   */
  added = (): void => {
    const { configObj, pluginProps } = this;

    const { mapId } = pluginProps;

    // access the cgpv object from the window object
    const { cgpv } = w;

    if (cgpv) {
      // access the api calls
      const { api } = cgpv;
      const { displayLanguage } = api.map(mapId);
      const { footerTabs } = api.map(mapId);

      const defaultTabs = configObj?.tabs.defaultTabs as Array<string>;
      let tabsCounter = 0;

      if (defaultTabs.includes('legend')) {
        // create new tab and add the LegendComponent to the footer tab
        footerTabs.createFooterTab({
          value: tabsCounter,
          label: this.translations[displayLanguage].legend as string,
          content: () => api.map(mapId).legend.createLegend({ layerIds: ['esriFeatureLYR4'] }),
        });
        tabsCounter++;
      }

      // create the listener to return the details
      // TODO: layer path are not define when layer is created, no result are assigned
      // const myLayerSet = api.createFeatureInfoLayerSet(mapId, `${mapId}resultSetId`);
      if (defaultTabs.includes('details')) {
        // the call to create details element return the element and the footer content is waiting for a function.
        footerTabs.createFooterTab({
          value: tabsCounter,
          label: this.translations[displayLanguage].details as string,
          content: () => <DetailsItem mapId={mapId} />,
        });
        tabsCounter++;
      }

      if (defaultTabs.includes('data-grid')) {
        // the call to create data grid element return the element and the footer content is waiting for a function.
        footerTabs.createFooterTab({
          value: tabsCounter,
          label: this.translations[displayLanguage].dataGrid as string,
          content: () => api.map(mapId).dataGrid.createDataGrid({ layerId: 'esriFeatureLYR4' }),
        });
        tabsCounter++;
      }

      // TODO add custom detail reusable component when done

      const customTabs = configObj?.tabs.customTabs as Array<string>;
      for (let i = 0; i < customTabs.length; i++) {
        const tab = customTabs[i] as unknown as CustomTabs;

        footerTabs.createFooterTab({
          value: tabsCounter,
          label: tab.title,
          content: tab.contentHTML,
        });
        tabsCounter++;
      }
    }
  };

  /**
   * Function called when the plugin is removed, used for clean up
   */
  removed(): void {
    // const { mapId } = this.pluginProps;

    // access the cgpv object from the window object
    const { cgpv } = w;

    if (cgpv) {
      // access the api calls
      // const { api } = cgpv;
      // TODO: Enable the footer tabs removal
    }
  }
}

export default FooterPanelPlugin;

w.plugins = w.plugins || {};
w.plugins['footer-panel'] = Cast<AbstractPlugin>(FooterPanelPlugin);
