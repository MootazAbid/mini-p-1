import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  allSports!: Sport[];

  nomApi = '';
  resultatsApi: Sport[] = [];

  nomKeyup = '';
  resultatsKeyup: Sport[] = [];
  nomPipe = '';

  constructor(private sportService: SportService) {}

  ngOnInit(): void {
    this.allSports = this.sportService.listeSports();
    this.resultatsApi = this.allSports;
    this.resultatsKeyup = this.allSports;
  }
  rechercherParApi(): void {
    this.resultatsApi = this.sportService.rechercherParNom(this.nomApi);
  }
  rechercherParKeyup(): void {
    this.resultatsKeyup = this.sportService.rechercherParNom(this.nomKeyup);
  }
}
