import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationService } from './menu-translator/translation.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    ],
    providers: [
        TranslationService
    ],
    exports: [
        CommonModule
    ]
})
export class SharedModule {}