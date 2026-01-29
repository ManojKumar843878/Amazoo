import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { OrderSuccess } from './order-success/order-success';
import { Login } from './login/login';
import { Sighnup } from './sighnup/sighnup';


export const routes: Routes = [
    { path: "home", component: Home},
    { path: "product/:id", component: ProductDetail },
    { path: "cart", component: Cart },
    { path: "order/success/:id", component: OrderSuccess },
    { path: 'login', component: Login },
    { path: 'signup', component: Sighnup },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];


