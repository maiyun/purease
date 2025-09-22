import * as cmd from 'commander';
import * as compiler from './dist/compiler.js';
const program = new cmd.Command();
program
    .name('purease')
    .description('Lightweight and user-friendly front-end library.')
    .version('1.0.0', '-v, --version');
program
    // --- boot ---
    .option('-b, --boot <path>', 'compile boot')
    .option('-p, --purease <path>', 'purease path')
    // --- save ---
    .option('-s, --save <path>', 'save path')
    .action(function () {
    const opts = program.opts();
    if (opts.boot) {
        // --- boot ---
        compiler.boot(opts.boot, opts.purease, opts.save).then((r) => {
            console.log(`Boot result: ${r}.`);
        }).catch(() => { });
    }
});
program.parse();
