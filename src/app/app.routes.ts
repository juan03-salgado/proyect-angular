import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home-admin/home.component';
import { authGuard } from './guards/auth.guard';
import { FincasListComponent } from './components/fincas/fincas-list/fincas-list.component';
import { FincasAddComponent } from './components/fincas/fincas-add/fincas-add.component';
import { FincasPutComponent } from './components/fincas/fincas-put/fincas-put.component';
import { ProductListComponent } from './components/productos/product-list/product-list.component';
import { ProductAddComponent } from './components/productos/product-add/product-add.component';
import { ProductPutComponent } from './components/productos/product-put/product-put.component';
import { InsumoListComponent } from './components/insumo/insumo-list/insumo-list.component';
import { InsumoAddComponent } from './components/insumo/insumo-add/insumo-add.component';
import { InsumoPutComponent } from './components/insumo/insumo-put/insumo-put.component';
import { ProveedoresListComponent } from './components/proveedor/proveedores-list/proveedores-list.component';
import { ProveedorAddComponent } from './components/proveedor/proveedor-add/proveedor-add.component';
import { ProveedorPutComponent } from './components/proveedor/proveedor-put/proveedor-put.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { HomeClienteComponent } from './home/home-cliente/home-cliente.component'; 
import { CarritoProductosListComponent } from './components/carrito-productos-list/carrito-productos-list.component';
import { ComprasListComponent } from './components/compras-list/compras-list.component';
import { FacturaComponent } from './components/factura/factura.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { PerfilClienteComponent } from './auth/perfil-cliente/perfil-cliente.component';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},  
    {path: 'registro', component: RegistroComponent},
    {path: 'perfil', component: PerfilClienteComponent},
    {path: 'home/home-cliente', component: HomeClienteComponent, canActivate: [authGuard]},                           
    {path: 'home/home-admin', component: HomeComponent, canActivate: [authGuard]},                           
    {path: 'fincas', component: FincasListComponent, canActivate: [authGuard]},                   
    {path: 'fincas/add', component: FincasAddComponent, canActivate: [authGuard]},                
    {path: 'fincas/edit/:id', component: FincasPutComponent, canActivate: [authGuard]},           
    {path: 'product', component: ProductListComponent, canActivate: [authGuard]},                 
    {path: 'product/add', component: ProductAddComponent, canActivate: [authGuard]},             
    {path: 'product/edit/:id', component: ProductPutComponent, canActivate: [authGuard]},         
    {path: 'insumos', component: InsumoListComponent, canActivate: [authGuard]},                  
    {path: 'insumos/add', component: InsumoAddComponent, canActivate: [authGuard]},             
    {path: 'insumos/edit/:id', component: InsumoPutComponent, canActivate: [authGuard]},         
    {path: 'proveedores', component: ProveedoresListComponent, canActivate: [authGuard]},         
    {path: 'proveedores/add', component: ProveedorAddComponent, canActivate: [authGuard]},      
    {path: 'proveedores/edit/:id', component: ProveedorPutComponent, canActivate: [authGuard]},
    {path: 'clientes', component: ClientesListComponent, canActivate: [authGuard]},
    {path: 'compras', component: ComprasListComponent, canActivate: [authGuard]},
    {path: 'carritoProductos', component: CarritoProductosListComponent, canActivate: [authGuard]},
    {path: 'factura', component: FacturaComponent, canActivate: [authGuard]},
    {path: 'historial', component: HistorialClienteComponent, canActivate: [authGuard]}                  
];
