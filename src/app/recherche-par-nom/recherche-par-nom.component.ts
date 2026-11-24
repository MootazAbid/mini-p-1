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
  allSports: Sport[] = [];

  nomApi = '';
  resultatsApi: Sport[] = [];

  nomKeyup = '';
  resultatsKeyup: Sport[] = [];
  nomPipe = '';

  constructor(private sportService: SportService) {}

  ngOnInit(): void {
    this.sportService.listeSports().subscribe(sps => {
      this.allSports = sps;
      this.resultatsApi = sps;
      this.resultatsKeyup = sps;
    });
  }

  rechercherParApi(): void {
    this.sportService.rechercherParNom(this.nomApi)
      .subscribe(sps => this.resultatsApi = sps);
  }

  rechercherParKeyup(): void {
    this.sportService.rechercherParNom(this.nomKeyup)
      .subscribe(sps => this.resultatsKeyup = sps);
  }
}
