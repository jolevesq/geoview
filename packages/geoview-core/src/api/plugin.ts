import React from 'react';

import i18next from 'i18next';
import * as translate from 'react-i18next';

import makeStyles from '@mui/styles/makeStyles';

import { MapViewer } from '../geo/map/map';

import { api } from '../app';
import {
  Cast,
  AbstractPluginClass,
  TypeWindow,
  toJsonObject,
  TypeJsonObject,
  TypeJsonValue,
  TypePluginStructure,
  TypeRecordOfPlugin,
} from '../core/types/cgpv-types';

/**
 * Class to manage plugins
 *
 * @exports
 * @class
 */
export class Plugin {
  plugins: TypeRecordOfPlugin = {};

  /**
   * Load a package script on runtime
   *
   * @param {string} id the package id to load
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadScript = async (id: string): Promise<any> => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById(id);
      if (!existingScript) {
        // get all loaded js scripts on the page
        const scripts = document.getElementsByTagName('script');
        let scriptPath: string | null = null;

        if (scripts && scripts.length) {
          // go through all loaded scripts on the page
          for (let scriptIndex = 0; scriptIndex < scripts.length; scriptIndex++) {
            // search for the core script
            if (scripts[scriptIndex].src.includes('cgpv-main')) {
              // get the src of the core script
              const { src } = scripts[scriptIndex];

              // extract the host from the loaded core script
              scriptPath = src.substring(0, src.lastIndexOf('/'));

              break;
            }
          }
        }

        // create a script element
        const script = document.createElement('script');
        script.src = `${scriptPath}/corePackages/geoview-${id}.js`;
        script.id = id;
        document.body.appendChild(script);
        script.onload = () => {
          resolve(window.plugins[id]);
        };

        script.onerror = () => {
          resolve(null);
        };
      }
      if (existingScript && window.plugins && window.plugins[id]) {
        resolve(window.plugins[id]);
      }
    });
  };

  /**
   * Add new plugin
   *
   * @param {string} pluginId the plugin id
   * @param {string} mapId id of map to add this plugin to
   * @param {Class} constructor the plugin class (React Component)
   * @param {Object} props the plugin properties
   */
  addPlugin = async (
    pluginId: string,
    mapId: string,
    constructor?: AbstractPluginClass | ((pluginId: string, props: TypeJsonObject) => TypeJsonValue),
    props?: TypeJsonObject
  ): Promise<void> => {
    if ((this.plugins[mapId] && !this.plugins[mapId][pluginId]) || !(mapId in this.plugins)) {
      let plugin: TypePluginStructure | null = null;

      if (constructor) {
        // create new instance of the plugin. Here we must type the constructor variable to any
        // in order to cancel the "'new' expression, whose target lacks a construct signature" error message
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugin = new (constructor as any)(pluginId, props);
      } else {
        const InstanceConstructor = await this.loadScript(pluginId);

        // const InstanceConstructor = (await import(`${'../plugins'}/${id}/index.tsx`)).default;

        if (InstanceConstructor) plugin = new InstanceConstructor(pluginId, props);
      }

      if (plugin) {
        // add translations if provided
        if (typeof plugin.translations === 'object') {
          const { translations } = plugin;

          Object.keys(translations).forEach((languageKey: string) => {
            const translation = translations[languageKey];

            i18next.addResourceBundle(languageKey, 'translation', translation, true, false);
          });
        }

        // assign the plugin default values to be accessible from the plugin
        Object.defineProperties(plugin, {
          id: { value: pluginId },
          api: { value: api },
          createElement: { value: React.createElement },
          react: { value: React },
          props: { value: props !== undefined && props !== null ? props : {} },
          translate: { value: translate },
          makeStyles: { value: makeStyles },
        });

        if (!this.plugins[mapId]) {
          this.plugins[mapId] = {
            [pluginId]: plugin,
          };
        } else {
          this.plugins[mapId][pluginId] = plugin;
        }

        // call plugin added method if available
        if (typeof plugin.added === 'function') {
          plugin.added();
        }
      }
    }
  };

  /**
   * Delete a plugin
   *
   * @param {string} pluginId the id of the plugin to delete
   * @param {string} mapId the map id to remove the plugin from (if not provided then plugin will be removed from all maps)
   */
  removePlugin = (pluginId: string, mapId?: string): void => {
    if (mapId) {
      if (this.plugins[mapId] && this.plugins[mapId][pluginId]) {
        const plugin = this.plugins[mapId][pluginId];

        // call the removed function on the plugin
        if (typeof plugin.removed === 'function') plugin.removed();
      }

      delete this.plugins[mapId][pluginId];
    } else {
      // remove the plugin from all maps
      for (let i = 0; i < Object.keys(this.plugins).length; i += 1) {
        const aMapId = Object.keys(this.plugins)[i];
        const recordOfPlugins = this.plugins[aMapId];

        const plugin = recordOfPlugins[pluginId];

        // call the removed function on the plugin
        if (typeof plugin.removed === 'function') plugin.removed();

        delete this.plugins[aMapId][pluginId];
      }
    }
  };

  /**
   * Delete all plugins loaded in a map
   *
   * @param {string} mapId the map id to remove the plugin from (if not provided then plugin will be removed from all maps)
   */
  removePlugins = (mapId: string): void => {
    if (mapId) {
      const recordOfPlugins = this.plugins[mapId];

      if (recordOfPlugins) {
        // remove all plugins by map
        for (let i = 0; i < Object.keys(recordOfPlugins).length; i += 1) {
          const pluginId = Object.keys(recordOfPlugins)[i];

          this.removePlugin(pluginId, mapId);
        }
      }
    }
  };

  /**
   * Load plugins provided by map config
   */
  loadPlugins = (): void => {
    // loop through each map and check if the config contains any plugins to load
    Object.keys(api.maps).forEach((mapId: string) => {
      const map = api.maps[mapId] as MapViewer;

      // load plugins if provided in the config
      if (map.mapProps.corePackages && map.mapProps.corePackages.length > 0) {
        map.mapProps.corePackages.forEach((pluginId) => {
          const { plugins } = Cast<TypeWindow>(window);
          if (plugins && plugins[pluginId]) {
            this.addPlugin(
              pluginId,
              mapId,
              plugins[pluginId],
              toJsonObject({
                mapId,
              })
            );
          } else {
            this.addPlugin(
              pluginId,
              mapId,
              undefined,
              toJsonObject({
                mapId,
              })
            );
          }
        });
      }
    });
  };
}
