import * as terser from 'terser';
import * as rollup from 'rollup';
/** --- 压缩 --- */
export function terserPlugin(es) {
    return {
        'name': 'pre-terser',
        generateBundle: async function (options, bundle) {
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
/**
 * --- 编译网页上的运行 boot ---
 * @param path 要编译的 js 入口文件，不以 .js 结尾
 * @param purease purease 的加载路径，相对路径或网址，完整路径（比如要包含 .js）
 * @param save 保存编译后的 js 文件路径，不要带扩展名的文件路径 或 以 / 结尾的存储路径
 */
export async function boot(path, purease, save) {
    if (path.endsWith('.js')) {
        path = path.slice(0, -3);
    }
    const lio = path.lastIndexOf('/');
    /** --- 保存的文件名 --- */
    const name = lio === -1 ? path : path.slice(lio + 1);
    // --- 保存位置 ---
    if (save) {
        if (save.endsWith('/')) {
            save += name + '.pack';
        }
    }
    else {
        const lio = path.lastIndexOf('/');
        if (lio === -1) {
            save = name + '.pack';
        }
        else {
            save = path.slice(0, lio + 1) + name + '.pack';
        }
    }
    // --- 打包 js ---
    try {
        const bundle = await rollup.rollup({
            'input': `${path}.js`,
            'external': ['purease'],
            'plugins': [
                terserPlugin(2020),
            ],
        });
        await bundle.write({
            'file': `${save}.js`,
            'format': 'es',
            'paths': {
                'purease': purease,
            },
        });
        await bundle.close();
        return true;
    }
    catch (e) {
        console.error('[BOOT]', e);
        return false;
    }
}
