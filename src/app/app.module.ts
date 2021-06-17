import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponentComponent} from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { ManagmentComponentComponent } from './managment-component/managment-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { UserComponentComponent } from './user-component/user-component.component';

const mgtChildrenRoutes:Routes=[
  {path:'user',component:UserComponentComponent},
  {path:'product',component:ProductComponentComponent},
  {path:'',redirectTo:'user',pathMatch:'full'}
]



const routes:Routes=[
  {path:'home',component:HomeComponentComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponentComponent},
  {path:'managment',component:ManagmentComponentComponent,children:mgtChildrenRoutes}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagmentComponentComponent,
    ProductComponentComponent,
    UserComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
