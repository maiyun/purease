import * as fs from 'fs';
import * as rollup from 'rollup';
import * as lTool from './tool.js';
import * as lCompiler from './compiler.js';
// --- git config core.ignorecase false ---
async function run() {
    // --- control to control.ts ---
    let list = await fs.promises.readdir('dist/control/', {
        'withFileTypes': true,
    });
    let code = '';
    let style = '';
    for (const item of list) {
        if (item.name.startsWith('.')) {
            continue;
        }
        // --- 布局 ---
        const flayout = lTool.purify((await fs.promises.readFile('dist/control/' + item.name + '/layout.html')).toString()).replace(/`/g, '\\`');
        // --- 代码 ---
        try {
            const fcode = (await fs.promises.readFile('dist/control/' + item.name + '/code.ts')).toString().replace(/'template': ''/, `'template': \`${flayout.replace(/`/g, '\`').replace(/\${/g, '\\${')}\``);
            code += `list['pe-${item.name}'] = ` + fcode.slice(fcode.indexOf('export const code = ') + 20).replace(/lControl./g, '') + '\n';
        }
        catch {
            code += `list['pe-${item.name}'] = { 'template': \`${flayout}\` };\n\n`;
        }
        // --- 样式 ---
        style += (await fs.promises.readFile('dist/control/' + item.name + '/style.scss')).toString() + '\n\n';
    }
    code = code.slice(0, -1);
    style = style.slice(0, -2);
    // --- 写入标准文件 ---
    const scode = /^[\s\S]+?\/\/ --- AUTO CODE ---/.exec((await fs.promises.readFile('dist/control.ts')).toString());
    if (scode) {
        await fs.promises.writeFile('dist/control.ts', scode[0] + '\n\n' + code);
    }
    const sstyle = /^[\s\S]+?\/\/ --- AUTO CODE ---/.exec((await fs.promises.readFile('dist/index.scss')).toString());
    if (sstyle) {
        await fs.promises.writeFile('dist/index.scss', sstyle[0] + '\n\n' + style);
    }
    console.log('CONTROL');
    // --- 打包 ---
    setTimeout(() => {
        (async () => {
            // --- 打包核心 ---
            const pureaseBundle = await rollup.rollup({
                'input': './dist/purease.js',
                'plugins': [
                    lCompiler.terserPlugin(),
                ],
                'onwarn': (warning, warn) => {
                    if (warning.code === 'CIRCULAR_DEPENDENCY') {
                        return;
                    }
                    warn(warning);
                },
            });
            await pureaseBundle.write({
                'file': './dist/index.js',
                'format': 'es',
            });
            await pureaseBundle.close();
            console.log('PUREASE');
            // --- 打包测试 ---
            const testBoot = await lCompiler.boot('dist/test/index', '../index.js');
            console.log('BOOT', `[test]`, testBoot);
        })().catch(() => { });
    }, 2_000);
}
run().catch(function (e) {
    console.log(e);
});
