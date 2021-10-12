import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../../entity/post/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
