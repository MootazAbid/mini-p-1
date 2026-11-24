import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';
import { Router } from '@angular/router';
import { Groupe } from '../model/groupe.model';

@Component({
  selector: 'app-add-sport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-sport.component.html',
  styleUrl: './add-sport.component.css'
})
export class AddSportComponent implements OnInit {

  newSport = new Sport();
  groupes!: Groupe[];
  newIdgrp!: number;
  message!: string;

  constructor(private sportService: SportService,
              private router: Router) {}

  ngOnInit() {
    this.sportService.listeGroupes().subscribe(grps => {
      this.groupes = grps._embedded.groupes;
    });
  }

  addSport() {
    this.newSport.groupeSport = this.groupes.find(g => g.idgrp == this.newIdgrp);
    this.sportService.ajouterSport(this.newSport).subscribe(() => {
      this.router.navigate(['sports']);
    });
  }
}
