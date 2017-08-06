import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-list/event-detail/event-detail.component';
import { EventsResolver } from './resolvers/events.resolver';

export const appRoutes: Routes = [
    {
        path: '', redirectTo: '/events', pathMatch: 'full'
    },
    {
        path: 'events', component: EventListComponent, resolve: { events: EventsResolver }
    },
    {
        path: 'events/:id', component: EventDetailComponent
    },
    {
        path: '**', component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouteModule {}
