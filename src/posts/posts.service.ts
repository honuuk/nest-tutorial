import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Post from './entities/post.entity';

@Injectable()
export class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  constructor(@InjectRepository(Post) private postsRepository: Repository<Post>) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    const newPost: Post = await this.postsRepository.create(createPostDto);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(id, updatePostDto);
    const updatedPost = await this.postsRepository.findOne(id);
    if (!updatedPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return updatePostDto;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
}
