import {
  format,
  formatDistanceToNow as dateFnsFormatDistanceToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cacheLife, cacheTag } from 'next/cache';

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawDate: string): string {
  const date = new Date(rawDate);

  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}

export function formatHour(timestamp: number): string {
  const date = new Date(timestamp);

  return format(date, 'HH:mm:ss', {
    locale: ptBR,
  });
}

export async function formatHourCached() {
  'use cache';
  // cacheLife('seconds'); // Cache this page for 60 seconds
  cacheTag('formatHourCached'); // Tag this page with 'randomuser' tag

  return formatHour(new Date().getTime());
}
