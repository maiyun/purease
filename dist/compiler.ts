import * as fs from 'fs';

// --- git config core.ignorecase false ---

/**
 * --- 去除 html 的空白符、换行 ---
 * @param text 要纯净的字符串
 */
function purify(text: string): string {
    text = '>' + text + '<';
    text = text.replace(/<!--([\s\S]*?)-->/g, '').replace(/>([\s\S]*?)</g, function(t: string, t1: string) {
        return '>' + t1.replace(/\t|\r\n| {2}/g, '').replace(/\n|\r/g, '') + '<';
    });
    return text.slice(1, -1);
}

async function run(): Promise<void> {
    // --- control to cgc ---
    let list = await fs.promises.readdir('dist/control/', {
        'withFileTypes': true
    });
    let code = '';
    let style = '';
    for (const item of list) {
        if (item.name.startsWith('.')) {
            continue;
        }
        // --- 布局 ---
        const flayout = purify((await fs.promises.readFile('dist/control/' + item.name + '/layout.html')).toString()).replace(/`/g, '\\`');
        // --- 代码 ---
        const fcode = (await fs.promises.readFile('dist/control/' + item.name + '/code.ts')).toString().replace(/'template': ''/, `'template': \`${flayout}\``);
        code += `list['pe-${item.name}'] = ` + fcode.slice(fcode.indexOf('export const code = ') + 20) + '\n';
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
}
run().catch(function(e) {
    console.log(e);
});
