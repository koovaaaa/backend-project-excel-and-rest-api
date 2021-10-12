import { Injectable } from '@nestjs/common';
import api from './api/api';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../entity/post/post.entity';
import { PostRepository } from '../../repository/post/post.repository';
import * as xlsx from 'xlsx';
import { PathUploadEnum } from '../../enum/path-upload.enum';

@Injectable()
export class RestApiService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: PostRepository,
  ) {}
  async writeToDbFromExternalApi() {
    const posts: any[] = await api(
      'https://jsonplaceholder.typicode.com/posts',
      'get',
    );

    for (const post of posts) {
      await this.postRepository.save(post);
    }

    return posts;
  }

  async writePostsToExcel() {
    const posts = await this.postRepository.find();

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(posts);
    xlsx.utils.book_append_sheet(wb, ws, 'Posts');
    xlsx.writeFile(wb, `${PathUploadEnum.EXCEL_FILE}PostsFromDb.xlsx`);

    return posts;
  }
}
