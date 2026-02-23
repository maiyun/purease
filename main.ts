import * as cmd from 'commander';
import * as fs from 'fs';

/** --- 使用的语言包列表 --- */
const appLocaleList: string[] = [];

/**
 * --- 递归获取使用的语言 ---
 * @param path 文件夹路径，不以 / 结尾
 */
export async function readDir(path: string): Promise<void> {
    try {
        const dlist = await fs.promises.readdir(path, {
            'encoding': 'utf8',
            'withFileTypes': true,
        });
        for (const item of dlist) {
            if (item.name === '.' || item.name === '..') {
                continue;
            }
            if (item.isDirectory()) {
                await readDir(path + '/' + item.name);
                continue;
            }
            if (
                !item.name.endsWith('.ejs') &&
                !item.name.endsWith('.html') &&
                !item.name.endsWith('.ts')
            ) {
                continue;
            }

            // --- ts 文件可能是后端的代码，所以要排除掉后端的 ts 文件 ---
            let content = await fs.promises.readFile(path + '/' + item.name, 'utf8');
            if (item.name.endsWith('.ts') && !content.includes('AbstractPage')) {
                continue;
            }

            // --- 预处理：移除注释以提高准确性 ---
            // 1. 移除 EJS 部分（EJS 是后端，应该在 Kebab 框架中检查） ---
            content = content.replace(/<%[\s\S]*?%>/g, '');
            // 2. 移除 HTML 注释
            content = content.replace(/<!--[\s\S]*?-->/g, '');
            // 3. 移除 TS 多行注释
            content = content.replace(/\/\*[\s\S]*?\*\//g, '');
            // 4. 移除 TS 单行注释
            content = content.replace(/(^|[^\:])\/\/.*/g, '$1');

            const reg = /(?:\b|_)l\s*\(\s*(['"])(.+?)\1/g;
            let match: RegExpExecArray | null;
            while (match = reg.exec(content)) {
                const key = match[2];
                if (appLocaleList.includes(key)) {
                    continue;
                }
                appLocaleList.push(key);
            }
        }
    }
    catch {}
}

const program = new cmd.Command();
program
    .name('purease')
    .description('Lightweight and user-friendly front-end library.')
    .version('4.1.1', '-v, --version');

program
    // --- locale ---
    .option('-l, --locale <path>', 'locale path')
    .option('-d, --dir <path>', 'dir path')
    .action(async function(): Promise<void> {
        try {
            const opts = program.opts();
            if (opts.locale) {
                // --- locale ---
                // --- 检查一个 locale 语言与实际使用中进行比对，看看哪些没用上，哪些没有却用了 ---
                // --- node ./main -l ./dist/test/locale/sc -d ./dist/test ---
                const locale = await fs.promises.readFile(opts.locale + '.json', 'utf8');
                const localeList: string[] = Object.keys(JSON.parse(locale));
                appLocaleList.length = 0;
                await readDir(opts.dir);

                const set1 = new Set(localeList);
                const set2 = new Set(appLocaleList);

                /** --- 只在第一个数组中存在的元素 --- */
                const onlyInFirst = localeList.filter(item => !set2.has(item));
                /** --- 只在第二个数组中存在的元素 --- */
                const onlyInSecond = appLocaleList.filter(item => !set1.has(item));

                console.log('More', onlyInFirst);
                console.log('Less', onlyInSecond);
            }
        }
        catch {
            console.log(`Error`);
        }
    });

program.parse();
