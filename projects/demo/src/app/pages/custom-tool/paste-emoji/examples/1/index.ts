import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiItemDirective} from '@taiga-ui/cdk';
import {TuiSvgComponent} from '@taiga-ui/core';
import {TUI_EDITOR_EXTENSIONS, TuiEditor, TuiEditorTool} from '@tbank/tui-editor';

import {ExampleTuiSmilesTool} from './smiles-tool/smiles-tool.component';

@Component({
    standalone: true,
    imports: [
        TuiSvgComponent,
        ExampleTuiSmilesTool,
        TuiItemDirective,
        ReactiveFormsModule,
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
                import('./smiles-tool/emoji.extension').then(
                    ({EmojiExtension}) => EmojiExtension,
                ),
            ],
        },
    ],
})
export default class Example {
    protected readonly builtInTools = [TuiEditorTool.Undo];
    protected readonly control = new FormControl('');
}
