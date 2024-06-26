import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import type {SafeHtml} from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';
import {TuiItemDirective, tuiPure} from '@taiga-ui/cdk';
import {TuiSvgComponent} from '@taiga-ui/core';
import {TUI_EDITOR_EXTENSIONS, TuiEditor, TuiEditorTool} from '@tbank/tui-editor';

import {ExampleTuiYoutubeTool} from './youtube-tool/youtube-tool.component';

@Component({
    standalone: true,
    imports: [
        TuiSvgComponent,
        ExampleTuiYoutubeTool,
        ReactiveFormsModule,
        TuiItemDirective,
        TuiEditor,
    ],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_EDITOR_EXTENSIONS,
            useValue: [
                import('@tbank/tui-editor').then(({TuiStarterKit}) => TuiStarterKit),
                import('@tbank/tui-editor').then(({TuiYoutube}) => TuiYoutube),
            ],
        },
    ],
})
export default class Example {
    private readonly sanitizer = inject(DomSanitizer);

    protected readonly builtInTools = [TuiEditorTool.Undo];
    protected readonly control = new FormControl(
        `
        <p>Editor now supports YouTube embeds!</p>
        <div data-youtube-video>
            <iframe width="100%" src="https://www.youtube.com/watch?v=KdO8CFCXQu0"></iframe>
        </div>
        <p>Try adding your own video to this editor!</p>
    `,
        Validators.required,
    );

    /**
     * TUI_SANITIZER doesn't support iframe inside content
     */
    @tuiPure
    protected safe(content: string | null): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content ?? '');
    }
}
