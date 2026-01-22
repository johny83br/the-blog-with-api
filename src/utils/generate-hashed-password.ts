import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const password = ''; // NÃO ESQUECER DE APAGAR SENHA DAQUI
  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword);
})();
