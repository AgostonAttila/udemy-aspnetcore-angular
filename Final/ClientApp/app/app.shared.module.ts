import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { AdminComponent } from './components/admin/admin.component';

import { AppErrorHandler } from './app.error-handler';

import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { ProgressService } from './services/progress.service';
import { Auth } from './services/auth.service';


import { BrowserXhrWithProgress } from './services/progress.service';


import { ToastyModule } from 'ng2-toasty';
import * as Raven from 'raven-js';


import { AuthGuard } from './services/auth-gaurd.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';





//Raven.config('https://d37bba0c459b46e0857e6e2b3aeff09b@sentry.io/155312').install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        ViewVehicleComponent,
        PaginationComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ChartModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }

        ])
    ],
    providers: [
        //{ provide: BrowserXhr, useClass: BrowserXhrWithProgress },     
        //ProgressService,     
        { provide: ErrorHandler, useClass: AppErrorHandler },
        Auth,
        AuthGuard,
        AUTH_PROVIDERS,
        AdminAuthGuard,
        VehicleService,
        PhotoService

    ]
})
export class AppModuleShared {
}
