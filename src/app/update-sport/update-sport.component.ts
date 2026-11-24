import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport.model';
import { Groupe } from '../model/groupe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SportService } from '../services/sport.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-sport',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-sport.component.html',
  styles: ``
})
export class UpdateSportComponent implements OnInit {
  currentSport = new Sport();
  groupes: Groupe[] = [];
  updatedIdgrp!: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sportService: SportService) {}

  ngOnInit() {
    this.sportService.listeGroupes().subscribe(grps => {
      this.groupes = grps._embedded.groupes;
    });
    this.sportService.consulterSport(this.activatedRoute.snapshot.params['id'])
      .subscribe(sp => {
        this.currentSport = sp;
        this.updatedIdgrp = sp.groupeSport?.idgrp!;
      });
  }

  updateSport() {
    this.currentSport.groupeSport = this.groupes.find(g => g.idgrp == this.updatedIdgrp);
    this.sportService.updateSport(this.currentSport).subscribe(() => {
      this.router.navigate(['sports']);
    });
  }
}
