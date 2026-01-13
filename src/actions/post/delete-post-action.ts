'use server';

import { formatHour } from '@/utils/format-datetime';
import { logColor } from '@/utils/log-color';

export async function DeletePostAction(id: string) {
  if (typeof id !== 'string') {
    throw new Error('ID inválido');
  }

  // Aqui você pode chamar a função para deletar o post do banco de dados
  // Exemplo: await deletePostById(id);

  logColor(formatHour(Date.now()), `Post com ID ${id} deletado.`);

  return id;
}
