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
            let content = await fs.promises.readFile(path + '/' + item.name, 'utf8');
            content = content.replace(/<%.+?%>/g, '');
            const reg = /l\(["']((?:\.|[^"'])+?)['"]/g;
            if (!reg) {
                continue;
            }
            let match: RegExpExecArray | null;
            while (match = reg.exec(content)) {
                if (appLocaleList.includes(match[1])) {
                    continue;
                }
                appLocaleList.push(match[1]);
            }
        }
    }
    catch {}
}

const program = new cmd.Command();
program
    .name('purease')
    .description('Lightweight and user-friendly front-end library.')
    .version('3.4.0', '-v, --version');

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
