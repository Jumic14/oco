import { Component, OnInit, OnDestroy } from '@angular/core';
import { KnowcountService } from '../services/knowncount.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knowncount',
  templateUrl: './knowncount.component.html',
  styleUrl: './knowncount.component.scss'
})
export class KnowncountComponent implements OnInit, OnDestroy {
  knowcount: any;
  totalKnownCount: number = 0;
  private subscription: Subscription = new Subscription();
  categoryMapping: { [key: string]: string } = {
    planet: 'Planet',
    dwarfPlanet: 'Dwarf Planet',
    asteroid: 'Asteroid',
    comet: 'Comet',
    moonsPlanet: 'Moons of Planets',
    moonsDwarfPlanet: 'Moons of Dwarf Planets',
    moonsAsteroid: 'Moons of Asteroids'
    // Ajoute d'autres correspondances si nécessaire
  };

  constructor(private knowcountService: KnowcountService, private router: Router) {}

  ngOnInit(): void {
    this.fetchKnowcount();
  }

  fetchKnowcount(): void {
    this.subscription.add(
      this.knowcountService.getKnowcount().subscribe({
        next: (data: any) => {
          if (data.knowncount && Array.isArray(data.knowncount)) {
            this.knowcount = data.knowncount.map((entry: any) => {
              return {
                id: entry.id,
                knownCount: entry.knownCount,
                name: this.knowcountService.getCategoryNameFromId(entry.id)
              };
            });
            this.calculateTotalKnownCount();
          } else {
            console.error('Invalid data format:', data);
          }
        },
        error: (error: any) => {
          console.error('Error fetching knowcount:', error);
        }
      })
    );
  }

  calculateTotalKnownCount(): void {
    // Utilisation de la méthode reduce pour additionner tous les knownCount
    this.totalKnownCount = this.knowcount.reduce((total: number, entry: any) => {
      return total + entry.knownCount;
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Nettoyage de l'abonnement
  }

}