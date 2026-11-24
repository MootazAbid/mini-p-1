import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent implements OnInit {
  sports: Sport[] = [];

  constructor(private sportService: SportService,
              public authService: AuthService) {}

  ngOnInit() {
    this.chargerSports();
  }

  chargerSports() {
    this.sportService.listeSports().subscribe(sps => {
      this.sports = sps;
    });
  }

  supprimerSport(s: Sport) {
    let conf = confirm("Voulez-vous vraiment supprimer ce sport ?");
    if (conf)
      this.sportService.supprimerSport(s.idSport!).subscribe(() => {
        this.chargerSports();
      });
  }
}
