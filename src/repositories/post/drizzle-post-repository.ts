import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { desc, eq } from 'drizzle-orm';
import { logColor } from '@/utils/log-color';
import { formatHour } from '@/utils/format-datetime';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
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
    logColor(
      formatHour(Date.now()),
      'findAll: Executando consulta de todos os posts',
    );
    return await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
  }
  async findById(id: string): Promise<PostModel> {
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
}

// (async () => {
//   const repo = new DrizzlePostRepository();
//   const posts = await repo.findAll();

//   console.log(posts);
// })();
