import { styleText } from 'util';

export function logColor(...msg: (string | number)[]) {
  const messages = msg
    .map(message => styleText(['green'], `${message}`))
    .join(' ');
  console.log(styleText('green', messages));
}
