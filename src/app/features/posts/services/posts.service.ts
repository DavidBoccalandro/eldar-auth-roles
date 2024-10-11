import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/shared/models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }
}
