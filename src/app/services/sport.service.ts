import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../model/sport.model';
import { GroupeWrapper } from '../model/groupeWrapper.model';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  apiURL: string = 'http://localhost:8080/sports/api';
  apiURLGrp: string = 'http://localhost:8080/sports/grp';

  constructor(private http: HttpClient) {}

  listeSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiURL);
  }

  ajouterSport(sp: Sport): Observable<Sport> {
    return this.http.post<Sport>(this.apiURL, sp);
  }

  supprimerSport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  consulterSport(id: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.apiURL}/${id}`);
  }

  updateSport(sp: Sport): Observable<Sport> {
    return this.http.put<Sport>(this.apiURL, sp);
  }

  // Spring Data REST : retourne { _embedded: { groupes: [...] } }
  listeGroupes(): Observable<GroupeWrapper> {
    return this.http.get<GroupeWrapper>(this.apiURLGrp);
  }

  rechercherParGroupe(idgrp: number): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${this.apiURL}/sportsgrp/${idgrp}`);
  }

  rechercherParNom(nom: string): Observable<Sport[]> {
    const term = (nom ?? '').trim();
    if (!term) return this.listeSports();
    return this.http.get<Sport[]>(`${this.apiURL}/sportsnom/${encodeURIComponent(term)}`);
  }
}
