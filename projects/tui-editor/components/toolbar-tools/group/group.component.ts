import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiButtonModule, TuiHintModule} from '@taiga-ui/core';
import {TuiLanguageEditor} from '@taiga-ui/i18n';
import {AbstractTuiEditor} from '@tinkoff/tui-editor/abstract';
import {TuiTiptapEditorService} from '@tinkoff/tui-editor/directives';
import {
    TUI_EDITOR_OPTIONS,
    TUI_EDITOR_TOOLBAR_TEXTS,
    TuiEditorOptions,
} from '@tinkoff/tui-editor/tokens';
import {distinctUntilChanged, map, Observable} from 'rxjs';

@Component({
    standalone: true,
    selector: 'tui-editor-group-tool',
    imports: [TuiHintModule, TuiButtonModule, AsyncPipe],
    templateUrl: './group.component.html',
    styleUrls: ['../tools-common.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiEditorGroupToolComponent {
    readonly insertGroupText$ = this.texts$.pipe(map(texts => texts.insertGroup));
    readonly removeGroupText$ = this.texts$.pipe(map(texts => texts.removeGroup));

    readonly disabled$ = this.editor.stateChange$.pipe(
        map(() => !this.editor.isActive('group')),
        distinctUntilChanged(),
    );

    constructor(
        @Inject(TuiTiptapEditorService) readonly editor: AbstractTuiEditor,
        @Inject(TUI_EDITOR_TOOLBAR_TEXTS)
        readonly texts$: Observable<TuiLanguageEditor['toolbarTools']>,
        @Inject(TUI_EDITOR_OPTIONS) readonly options: TuiEditorOptions,
    ) {}

    addGroup(): void {
        this.editor.setGroup();
    }

    removeGroup(): void {
        this.editor.removeGroup();
    }
}
