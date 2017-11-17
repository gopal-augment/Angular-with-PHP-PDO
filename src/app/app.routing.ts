import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';
import { FeheaderComponent } from './feheader/feheader.component';
import { FefooterComponent } from './fefooter/fefooter.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { SellyourseedComponent } from './sellyourseed/sellyourseed.component';
import { WhatwedoComponent } from './whatwedo/whatwedo.component';
import { WhoweareComponent } from './whoweare/whoweare.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BeheaderComponent } from './beheader/beheader.component';
import { BefooterComponent } from './befooter/befooter.component';
import { MyfarmComponent } from './myfarm/myfarm.component';
import { UsersComponent } from './users/users.component';
import { UserroleComponent } from './userrole/userrole.component';
import { SeedsearchComponent } from './seedsearch/seedsearch.component';
import { MybioregionComponent } from './mybioregion/mybioregion.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const AppRoutes: any = [
    { path: '', children: [
        { path: '', component: HomepageComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'login', children: [
        { path: 'login', component: LoginComponent },
        { path: 'login' , component: FeheaderComponent, outlet: 'feheader' },
        { path: 'login' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: LoginComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'joinus', children: [
        { path: 'joinus', component: RegisterComponent },
        { path: 'joinus' , component: FeheaderComponent, outlet: 'feheader' },
        { path: 'joinus' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: RegisterComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'collaboration', children: [
        { path: 'collaboration', component: CollaborationComponent },
        { path: 'collaboration' , component: FeheaderComponent, outlet: 'feheader' },
        { path: 'collaboration' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: CollaborationComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'sellyourseed', children: [
        { path: 'sellyourseed', component: SellyourseedComponent },
        { path: 'sellyourseed' , component: FeheaderComponent, outlet: 'feheader' },
        { path: 'sellyourseed' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: SellyourseedComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'whatwedo', children: [
        { path: 'whatwedo', component: WhatwedoComponent },
        { path: 'whatwedo' , component: FeheaderComponent, outlet: 'feheader' },
        { path: 'whatwedo' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: WhatwedoComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'whoweare', children: [
        { path: 'whoweare', component: WhoweareComponent },
        { path: 'whoweare' , component: FeheaderComponent, outlet: 'feheader' },
        { path: 'whoweare' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: WhoweareComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'dashboard', children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'dashboard' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'dashboard' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: DashboardComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'myfarm', children: [
        { path: 'myfarm', component: MyfarmComponent },
        { path: 'myfarm' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'myfarm' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: MyfarmComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'users', children: [
        { path: 'users', component: UsersComponent },
        { path: 'users' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'users' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: UsersComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'user-role', children: [
        { path: 'user-role', component: UserroleComponent },
        { path: 'user-role' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'user-role' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: UserroleComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'seed-search', children: [
        { path: 'seed-search', component: SeedsearchComponent },
        { path: 'seed-search' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'seed-search' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: SeedsearchComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'my-bio-region', children: [
        { path: 'my-bio-region', component: MybioregionComponent },
        { path: 'my-bio-region' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'my-bio-region' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: MybioregionComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: 'unauthorized', children: [
        { path: 'unauthorized', component: UnauthorizedComponent },
        { path: 'unauthorized' , component: BeheaderComponent, outlet: 'feheader' },
        { path: 'unauthorized' , component: BefooterComponent, outlet: 'fefooter' },
        { path: '', component: UnauthorizedComponent },
        { path: '' , component: BeheaderComponent, outlet: 'feheader' },
        { path: '' , component: BefooterComponent, outlet: 'fefooter' }
    ]},
    { path: '**', children: [
        { path: '**', component: PagenotfoundComponent },
        { path: '**' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '**' , component: FefooterComponent, outlet: 'fefooter' },
        { path: '', component: PagenotfoundComponent },
        { path: '' , component: FeheaderComponent, outlet: 'feheader' },
        { path: '' , component: FefooterComponent, outlet: 'fefooter' }
    ]}

];

export const AppRouting = RouterModule.forRoot(AppRoutes, {
});