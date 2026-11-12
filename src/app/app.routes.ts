import { Routes } from '@angular/router';
import { SportsComponent } from './sports/sports.component';
import { AddSportComponent } from './add-sport/add-sport.component';
import { UpdateSportComponent } from './update-sport/update-sport.component';
import { RechercheParGroupeComponent } from './recherche-par-groupe/recherche-par-groupe.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { sportGuard } from './services/sport.guard';

export const routes: Routes = [
    {path: "sports", component : SportsComponent},
    {path: "add-sport", component : AddSportComponent, canActivate:[sportGuard]},
    {path: "updateSport/:id",  component: UpdateSportComponent},
    {path: "rechercheParGroupe", component : RechercheParGroupeComponent},
    {path: "rechercheParNom", component : RechercheParNomComponent},
    {path: 'login', component: LoginComponent},
    {path: 'app-forbidden', component: ForbiddenComponent},
    {path: "", redirectTo: "sports", pathMatch: "full"}
];
