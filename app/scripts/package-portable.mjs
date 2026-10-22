import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'portable');
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const scriptTag = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/);
const styleTag = html.match(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/);
if (!scriptTag || !styleTag) throw new Error('Expected one bundled script and stylesheet.');
const js = await readFile(resolve(root, 'dist', scriptTag[1].replace(/^\//, '')), 'utf8');
const css = await readFile(resolve(root, 'dist', styleTag[1].replace(/^\//, '')), 'utf8');
// A classic inline script at the end of body also works with file:// URLs.
// Parsing as a function rejects unresolved module imports, exports and import.meta.
new Function(js);
html = html.replace(scriptTag[0], '');
html = html.replace('</body>', () => `<script>\n(() => {\n${js.replace(/<\/script/gi, '<\\/script')}\n})();\n</script>\n</body>`);
html = html.replace(styleTag[0], () => `<style>\n${css.replace(/<\/style/gi, '<\\/style')}\n</style>`);
if (/<(?:script|link)\b[^>]*(?:src|href)="/i.test(html)) throw new Error('External script or stylesheet remains.');
await mkdir(output, { recursive: true });
await writeFile(resolve(output, 'index.html'), html, 'utf8');
await writeFile(resolve(output, 'ПРОЧИТАЙТЕ МЕНЯ.txt'), '\ufeff' + [
  'ЭНЕРГЕТИЧЕСКИЙ ПРОЕКТ — ГОТОВЫЙ ПРОТОТИП',
  '',
  'КАК ОТКРЫТЬ',
  '1. Сохраните ZIP-архив на компьютер.',
  '2. Распакуйте архив (в Windows: правая кнопка → «Извлечь все»).',
  '3. Откройте index.html двойным щелчком.',
  '4. Страница откроется в вашем браузере. Рекомендуется современный Chrome, Edge, Firefox или Safari.',
  '',
  'Установка программ, Node.js, терминал, сервер и подключение к интернету не нужны.',
  'Если файл открылся как текст, нажмите правой кнопкой → «Открыть с помощью» → выберите браузер.',
  '',
  'ЧТО ВНУТРИ',
  'index.html — вся страница, оформление, схема энергоцентра и интерактивные функции в одном файле.',
  'Работают меню, ссылки на разделы, подробности проекта, FAQ и три сценария демонстрационной формы.',
  '',
  'ДАННЫЕ И ФОРМЫ',
  'Это демонстрационный прототип. Параметры проекта не подтверждены.',
  'Данные формы никуда не отправляются и не сохраняются. После закрытия формы поля очищаются.',
  'Инвестиционные сделки через этот прототип не заключаются.',
  '',
  'КАК ПЕРЕСЛАТЬ',
  'Перешлите ZIP-архив целиком. Получатель распаковывает его и открывает index.html.',
  'Адрес localhost или 127.0.0.1 от компьютера автора для просмотра не требуется.',
  '',
].join('\r\n'), 'utf8');
console.log(`Portable HTML created: ${output}`);
