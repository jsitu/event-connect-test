import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventsResolver } from './resolvers/events.resolver';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/events',
        pathMatch: 'full'
    },
    {
        path: 'events',
        component: EventListComponent,
        resolve: { events: EventsResolver }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouteModule {}
