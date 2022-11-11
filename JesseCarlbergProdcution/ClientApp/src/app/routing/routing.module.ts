import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'portfolio',
        loadChildren: () => import('../portfolio/portfolio.module').then(m => m.PortfolioModule)
    },
    {
        path: 'coding',
        loadChildren: () => import('../coding/coding.module').then(m => m.CodingModule)
    },
    {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'resume',
        loadChildren: () => import('../resume/resume.module').then(m => m.ResumeModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: 'photography',
        loadChildren: () => import('../photography/photography.module').then(m => m.PhotographyModule)
    },
    {
        path: 'privacy',
        loadChildren: () => import('../privacy/privacy.module').then(m => m.PrivacyModule)
    },
    {
        path: 'consulting',
        loadChildren: () => import('../consulting/consulting.module').then(m => m.ConsultingModule)
    },
    {
        path: 'projects',
        loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule)
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutingModule { }
