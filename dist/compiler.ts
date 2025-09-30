import * as terser from 'terser';
import * as rollup from 'rollup';

/** --- 压缩 --- */
export function terserPlugin(es?: terser.ECMA): rollup.InputPluginOption {
    return {
        'name': 'pre-terser',
        generateBundle: async function(options, bundle) {
            for (const [, chunkOrAsset] of Object.entries(bundle)) {
                if (chunkOrAsset.type !== 'chunk') {
                    continue;
                }
                const result = await terser.minify(chunkOrAsset.code, es ? {
                    'module': true,
                    'ecma': es,
                } : undefined);
                chunkOrAsset.code = result.code ?? '';
            }
        }
    };
}
