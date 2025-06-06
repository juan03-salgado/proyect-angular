import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AgricultoresListComponent } from './app/components/agricultores-list/agricultores-list.component';
import { AgricultorAddComponent } from './app/components/agricultor-add/agricultor-add.component';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AgricultorPutComponent } from './app/components/agricultor-put/agricultor-put.component';
import { LoginComponent } from './app/login/login.component';
import { HomeComponent } from './app/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { MercadoListComponent } from './app/components/mercado-list/mercado-list.component';
import { MercadoAddComponent } from './app/components/mercado-add/mercado-add.component';
import { MercadoPutComponent } from './app/components/mercado-put/mercado-put.component';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ProductAddComponent } from './app/components/product-add/product-add.component';
import { ProductPutComponent } from './app/components/product-put/product-put.component';
import { InsumoListComponent } from './app/components/insumo-list/insumo-list.component';
import { InsumoAddComponent } from './app/components/insumo-add/insumo-add.component';
import { InsumoPutComponent } from './app/components/insumo-put/insumo-put.component';
import { ProveedoresListComponent } from './app/components/proveedores-list/proveedores-list.component';
import { ProveedorAddComponent } from './app/components/proveedor-add/proveedor-add.component';
import { ProveedorPutComponent } from './app/components/proveedor-put/proveedor-put.component';
import { authGuard } from './app/guards/auth.guard';
  
const routes : Routes = [                                                                       //nos sirve para definir las rutas de la aplicacion
  {path: 'login', component: LoginComponent},                                                   //http://localhost:4200/login  ruta para el login
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},                           //http://localhost:4200/home  ruta para el home
  {path: 'agricultores', component: AgricultoresListComponent, canActivate: [authGuard]},       //http://localhost:4200/  ruta para la lista de agricultores
  {path: 'agricultor/add', component: AgricultorAddComponent, canActivate: [authGuard]},        //http://localhost:4200/agricultores/add  ruta para agregar un agricultor 
  {path: 'agricultor/edit/:id', component: AgricultorPutComponent, canActivate: [authGuard]},   //http://localhost:4200/agricultores/edit/:id  ruta para editar un agricultor
  {path: 'product', component: ProductListComponent, canActivate: [authGuard]},                 //http://localhost:4200/productos  ruta para la lista de productos
  {path: 'product/add', component: ProductAddComponent, canActivate: [authGuard]},              //http://localhost:4200/productos/add  ruta para agregar un producto
  {path: 'product/edit/:id', component: ProductPutComponent, canActivate: [authGuard]},         //http://localhost:4200/productos/edit/:id  ruta para editar un producto
  {path: 'mercado', component: MercadoListComponent, canActivate: [authGuard]},                 //http://localhost:4200/mercados  ruta para la lista de mercados
  {path: 'mercado/add', component: MercadoAddComponent, canActivate: [authGuard]},              //http://localhost:4200/mercados/add  ruta para agregar un mercado
  {path: 'mercado/edit/:id', component: MercadoPutComponent, canActivate: [authGuard]},         //http://localhost:4200/mercados/edit/:id  ruta para editar un mercado
  {path: 'insumos', component: InsumoListComponent, canActivate: [authGuard]},                  //http://localhost:4200/insumos  ruta para la lista de insumos
  {path: 'insumos/add', component: InsumoAddComponent, canActivate: [authGuard]},               //http://localhost:4200/insumos/add  ruta para agregar un insumo
  {path: 'insumos/edit/:id', component: InsumoPutComponent, canActivate: [authGuard]},          //http://localhost:4200/insumos/edit/:id  ruta para editar un insumo
  {path: 'proveedores', component: ProveedoresListComponent, canActivate: [authGuard]},         //http://localhost:4200/proveedores  ruta para la lista de proveedores
  {path: 'proveedores/add', component: ProveedorAddComponent, canActivate: [authGuard]},        //http://localhost:4200/proveedores/add  ruta para agregar un proveedor
  {path: 'proveedores/edit/:id', component: ProveedorPutComponent, canActivate: [authGuard]},   //http://localhost:4200/proveedores/edit/:id  ruta para editar un proveedor
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), appConfig.providers,                       //proporcionamos las rutas y la configuracion de la aplicacion                                               
  ]
}).catch((err) => console.error(err)); 

    
 


