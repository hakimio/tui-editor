import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiActiveZoneModule, TuiLetModule} from '@taiga-ui/cdk';
import {
    TuiButtonModule,
    TuiDropdownModule,
    TuiHintModule,
    TuiHostedDropdownModule,
} from '@taiga-ui/core';
import {TuiPaletteModule} from '@tinkoff/tui-editor/components/color-selector';

import {TuiTableCellColorComponent} from './table-cell-color.component';

@NgModule({
    imports: [
        CommonModule,
        TuiHostedDropdownModule,
        TuiPaletteModule,
        TuiButtonModule,
        TuiHintModule,
        TuiActiveZoneModule,
        TuiDropdownModule,
        TuiLetModule,
    ],
    declarations: [TuiTableCellColorComponent],
    exports: [TuiTableCellColorComponent],
})
export class TuiTableCellColorModule {}
