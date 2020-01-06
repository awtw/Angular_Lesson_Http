import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import {Setting} from './setting';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private setting: Setting) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<{ name: string }>(
        this.setting.connectingString,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts(){
    return this.http
      .get<{ [key: string]: Post }>(this.setting.connectingString)
      .pipe(map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }));
  }

  deletePosts(){
    return this.http.delete(this.setting.connectingString);
  }
}
