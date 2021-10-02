import consola from 'consola';
import { Telegraf } from 'telegraf';

const bot = new Telegraf('token');

bot.launch()
  .then(() => consola.success('Bot started'))
  .catch((error) => consola.error(error));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
