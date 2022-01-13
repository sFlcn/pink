# Проект «Пинк»

[![build status](https://github.com/sFlcn/pink/actions/workflows/check-and-deploy.yml/badge.svg)](https://github.com/sFlcn/pink/actions/workflows/check-and-deploy.yml)
![GitHub last commit](https://img.shields.io/github/last-commit/sFlcn/pink?logo=git)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sFlcn/pink)
![GitHub repo size](https://img.shields.io/github/repo-size/sFlcn/pink)

Учебный проект, реализованный во время обучения на курсе [HTML Academy](https://htmlacademy.ru) по вёрстке.

Изначально разрабатывался с помощью *Gulp 4.0* в *Node.js 12*. После окончания курса скрипты сборки были донастроены, часть инструментов (сжатие изображений, минификация файлов, etc.) была обновлена на более актуальные ко времени *Node.js 16*; также был настроен *github-action* для автоматической развёртки на [github-pages](https://sflcn.github.io/pink/) и добавлен js-функционал (дополнительная интерактивность, загрузка данных).

![html](https://img.shields.io/badge/html-informational?style=flat&logo=HTML5&logoColor=e34f26&color=d3d3d3)
![sass](https://img.shields.io/badge/sass-informational?style=flat&logo=sass&logoColor=cc6699&color=d3d3d3)
![SVG](https://img.shields.io/badge/SVG-informational?style=flat&logo=SVG&logoColor=ffb13b&color=d3d3d3)
![JavaScript](https://img.shields.io/badge/JavaScript-informational?style=flat&logo=JavaScript&logoColor=f7df1e&color=d3d3d3)
![Gulp](https://img.shields.io/badge/Gulp-informational?style=flat&logo=gulp&logoColor=cf4647&color=d3d3d3)

---

## Разработка

- Установка зависимостей: `npm install`
- Сборка: `npm run build`
- Запуск локального сервера: `npm start`

## Техническое задание

### Общие требования

1. Сетка: *определена в макете*.
2. Адаптивность сетки: **мобильная, планшетная и десктопная версии**.
3. Адаптивность графики: **ретинизация, векторные изображения**.
4. Используемая методология: **БЭМ**.
5. Используемый препроцессор: **Sass**.
6. Используемый инструмент автоматизации: **Gulp**.
7. Используемые библиотеки: *нет*.
8. Кроссбраузерность: **Chrome, Firefox, Safari**.
9. Типографика: *частично определена в макете (прочее — на усмотрение разработчика)*.
10. Используемый шрифт: *Open Sans*.

- Разметка семантическая.
- Вёрстка адаптивная, *mobile-first* — брейкпоинты: *320px, 660px, 960px*.
- Оптимизация:
  - WebP
  - векторный спрайт
  - предзагрузка шрифтов и изображений

### Дизайн

- [Видео-обзор проекта на youtube](https://www.youtube.com/watch?v=5gGJ5Qcc-MU):

  [![ссылка на youtube](https://img.youtube.com/vi/5gGJ5Qcc-MU/0.jpg)](https://www.youtube.com/watch?v=5gGJ5Qcc-MU)

---

Репозиторий создан в рамках обучения на профессиональном онлайн‑курсе «[HTML и CSS. Адаптивная вёрстка и автоматизация](https://htmlacademy.ru/intensive/adaptive)» от [HTML Academy](https://htmlacademy.ru).
