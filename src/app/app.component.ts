import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Setting} from './setting';
import {map} from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error= null;
  private errorsub: Subscription;

  constructor(private http: HttpClient, private setting: Setting, private postService: PostsService) {}

  ngOnInit() {

    this.errorsub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  ngOnDestroy(){
    this.errorsub.unsubscribe();
  }

  onCreatePost(postData:Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

  onHandleError(){
    this.error = null;
  }

}
