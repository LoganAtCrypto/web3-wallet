import { applyMiddleWares } from './applyMiddlewares';
import { CoreHooksPlugin } from './plugins/core-hooks';
import { ENSPlugin } from './plugins/ens';
import { Web3ProviderPlugin } from './plugins/web3-provider';
import type {
  Plugin,
  PluginApi,
  PluginApiCache,
  PluginName,
  Wallet,
} from './types';

/**
 * The dependencies of the builtin plugins are not checked, don't mix up orders.
 */
export const builtinPlugins = [
  CoreHooksPlugin.createPlugin(),
  Web3ProviderPlugin.createPlugin(),
  ENSPlugin.createPlugin(),
];

/**
 * Apply plugins and update the cache of the applied plugins
 *
 * @param plugins - the plugins to apply
 * @param wallet - the wallet on which the plugins will be applied
 * @param cache - the cache of the applied plugins for the wallet
 * @returns a new wallet with the plugins applied to it
 */
export const applyPlugins = (
  plugins: Plugin[],
  wallet: Wallet,
  cache: PluginApiCache,
): Wallet => {
  return plugins.reduce((prevWallet, plugin) => {
    /**
     * check for plugin duplication
     */
    if (cache.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' duplicated`);
    }

    /**
     * check and retrieve the plugin dependencies
     */
    const dependencies: PluginApi[] = (plugin.dependencies ?? []).map(
      (dep: PluginName) => {
        if (!cache.has(dep)) {
          throw new Error(
            `Plugin dependency ${dep} don't exists: ${plugin.name} depends on ${dep} `,
          );
        }
        return cache.get(dep) as PluginApi;
      },
    );

    const pluginApi = plugin.createApi({ wallet, dependencies });

    /**
     * Apply plugin middlewares
     */
    const nextWallet = applyMiddleWares(pluginApi.middlewares, prevWallet);

    cache.set(plugin.name, pluginApi);

    return nextWallet;
  }, wallet);
};
