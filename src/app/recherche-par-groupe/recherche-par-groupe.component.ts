import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sport } from '../model/sport.model';
import { Groupe } from '../model/groupe.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-recherche-par-groupe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-groupe.component.html'
})
export class RechercheParGroupeComponent implements OnInit {
  sports: Sport[] = [];
  groupes: Groupe[] = [];
  idGroupe: number = 0;

  constructor(private sportService: SportService) {}

  ngOnInit(): void {
    this.sportService.listeGroupes().subscribe(grps => this.groupes = grps._embedded.groupes);
    this.sportService.listeSports().subscribe(sps => this.sports = sps);
  }

  onChange(): void {
    const obs = this.idGroupe
      ? this.sportService.rechercherParGroupe(this.idGroupe)
      : this.sportService.listeSports();
    obs.subscribe(sps => this.sports = sps);
  }
}
