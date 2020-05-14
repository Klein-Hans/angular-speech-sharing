import { NgModule } from '@angular/core';

import { FilterPipe } from './filter.pipe';
import { DocPipe } from './doc.pipe';

export const PIPES = [FilterPipe, DocPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
