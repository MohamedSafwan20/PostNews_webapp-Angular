import { ProfileComponent } from './views/profile/profile.component';
import { SignupComponent } from './views/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PostDetailComponent } from './views/post-detail/post-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyPostsComponent } from './views/my-posts/my-posts.component';
import { EditPostComponent } from './views/edit-post/edit-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post-detail/:id', component: PostDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-posts', component: MyPostsComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
