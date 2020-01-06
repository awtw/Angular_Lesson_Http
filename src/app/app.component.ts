import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Setting} from './setting';
import {map} from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient, private setting: Setting) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{name: string}>(
        this.setting.connectingString,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http
      .get<{[key: string]: Post}>(this.setting.connectingString)
      .pipe(map(responseData => {
        const postArray: Post[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key});
          }
        }
        return postArray;
      }))
      .subscribe(posts => {
        // console.log(posts);
        this.loadedPosts = posts;
      });
  }
}
