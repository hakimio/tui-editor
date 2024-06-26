import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import type {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLinkDirective} from '@taiga-ui/core';
import {TUI_EDITOR_DEFAULT_EXTENSIONS, TUI_EDITOR_EXTENSIONS} from '@tbank/tui-editor';

@Component({
    standalone: true,
    imports: [TuiAddonDoc, RouterLink, TuiLinkDirective],
    templateUrl: './index.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_EDITOR_EXTENSIONS,
            useValue: TUI_EDITOR_DEFAULT_EXTENSIONS,
        },
    ],
})
export default class Example {
    protected readonly component1 = import('./examples/1');
    protected readonly example1: TuiDocExample = {
        HTML: import('./examples/1/index.html?raw'),
        TypeScript: import('./examples/1/index.ts?raw'),
        LESS: import('./examples/1/index.less?raw'),
        'youtube-tool/youtube-tool.component.ts': import(
            './examples/1/youtube-tool/youtube-tool.component.ts?raw'
        ),
        'youtube-tool/youtube-tool.template.html': import(
            './examples/1/youtube-tool/youtube-tool.template.html?raw'
        ),
        'youtube-tool/youtube-tool.styles.less': import(
            './examples/1/youtube-tool/youtube-tool.styles.less?raw'
        ),
    };
}
