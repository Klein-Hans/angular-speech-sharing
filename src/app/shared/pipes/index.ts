import { NgModule } from '@angular/core';

import { FilterPipe } from './filter.pipe';

export const PIPES = [FilterPipe,];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}
