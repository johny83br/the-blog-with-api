import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { formatHour } from '@/utils/format-datetime';
import { asyncDelay } from '@/utils/async-delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor(
      formatHour(Date.now()),
      'findAllPublic: Executando consulta de posts públicos',
    );

    return await drizzleDb.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.published, true),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor(
      formatHour(Date.now()),
      'findBySlugPublic: Executando consulta de posts públicos por slug',
    );

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado para o slug: ' + slug);

    return post;
  }
  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor(
      formatHour(Date.now()),
      'findAll: Executando consulta de todos os posts',
    );
    return await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
  }
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor(
      formatHour(Date.now()),
      'findById: Executando consulta de post por ID',
    );
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado para o ID: ' + id);

    return post;
  }
  async delete(id: string): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!postExists) {
      throw new Error('Post não existe');
    }

    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor(formatHour(Date.now()), 'delete: Deletando post por ID');

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return postExists;
  }
  async create(post: PostModel): Promise<PostModel> {
    const postExists = drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!postExists) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    logColor(formatHour(Date.now()), `create: Criado o post com ID ${post.id}`);
    await drizzleDb.insert(postsTable).values(post);
    return post;
  }
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };
    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}
