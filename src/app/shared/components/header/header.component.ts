import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginActions } from '@app/features/auth/store/actions/login.actions';
import {
  selectIsAuthenticated,
  selectUserName,
} from '@app/features/auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated$!: Observable<boolean>;
  user$: Observable<string | undefined>;
  userMenuItems: MenuItem[] = [];

  constructor(private store: Store, private router: Router) {
    this.isUserAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.user$ = this.store.select(selectUserName);
  }

  ngOnInit() {
    this.initUserMenu();
  }

  private initUserMenu() {
    this.userMenuItems = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        badge: 'Próximamente',
        disabled: true,
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        badge: 'Próximamente',
        disabled: true,
      },
      {
        separator: true,
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.store.dispatch(LoginActions.logout());
  }
}
