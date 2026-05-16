export interface DialogData {
    title: string
    text: string
    links?: string[]
}

export interface InteractableConfig {
    id: string
    type: 'monitor' | 'server' | 'bookshelf' | 'whiteboard' | 'laptop' | 'frame' | 'window'
    position: [number, number]
    radius: number
    dialog: DialogData
}

export const roomConfig = {
    size: [12, 10],
    objects: [
        {
            id: 'monitor_sber',
            type: 'monitor',
            position: [2.5, 2.5],
            radius: 1.5,
            dialog: {
                title: 'Сбер — Frontend-разработчик',
                text: 'Разработка high-load финтех-сервисов (СБОЛ PRO, СберБизнес).\n• Запустил с нуля сервис «СберБанк Онлайн Pro» за 1 месяц\n• Мигрировал стейт-менеджмент Redux → Effector (–40% кода)',
            },
        },
        {
            id: 'server_interest_mebel',
            type: 'server',
            position: [-3, -2],
            radius: 1.5,
            dialog: {
                title: 'Пет-проект: interest-mebel.ru',
                text: 'Full-stack интернет-магазин мебели на Next.js 14.\n• Полный цикл за 1.5 месяца: БД → деплой на VPS\n• CI/CD, Nginx, SSL, админ-панель\n• AI-ассистент (DeepSeek) для ускорения разработки',
            },
        },
        {
            id: 'bookshelf_itb',
            type: 'bookshelf',
            position: [-3, 3],
            radius: 1.5,
            dialog: {
                title: 'ITB Company — Fullstack Developer',
                text: 'Internal tools и аналитические панели для digital-маркетинга.\n• Панель аналитики с API Яндекс.Метрика/Директ (Highcharts)\n• Оптимизация backend: +30% производительности\n• Миграция legacy на FSD-архитектуру',
            },
        },
        {
            id: 'whiteboard_practicum',
            type: 'whiteboard',
            position: [3, -3],
            radius: 1.5,
            dialog: {
                title: 'Яндекс.Практикум — Образование',
                text: 'Мидл фронтенд-разработчик (2023)\n• Мессенджер на WebSocket (чистый JS)\n• Игра на Canvas API (React)\n• React-разработчик (2023)\n• SSR, Docker, CI/CD, безопасность',
            },
        },
        {
            id: 'laptop_ai',
            type: 'laptop',
            position: [1, -3.5],
            radius: 1.5,
            dialog: {
                title: 'AI/LLM-агент на TypeScript',
                text: 'Активно интересуюсь AI/ML-интеграцией на фронтенде.\n• Разрабатываю LLM-агента на TypeScript\n• Применяю AI-ассистентов в пет-проектах\n• Готов осваивать новые области для AI-команды',
            },
        },
        {
            id: 'frame_about',
            type: 'frame',
            position: [-4, -3.5],
            radius: 1.5,
            dialog: {
                title: 'Татаринов Антон Алексеевич',
                text: 'Frontend Developer, 38 лет, Омск.\n• 4+ года коммерческого опыта\n• Готов к переезду: Москва, Санкт-Петербург\n• tosha-t@mail.ru\n• +7 (965) 9787878\n• Английский B1',
            },
        },
        {
            id: 'window_goals',
            type: 'window',
            position: [0, 4.8],
            radius: 1.2,
            dialog: {
                title: 'Цели',
                text: 'Ищу позицию Frontend-разработчика.\n• Полная занятость, офис/гибрид/удалённо\n• Зарплата: 350 000 ₽\n• Продуктовый подход, чистая архитектура, тестирование',
            },
        },
    ] as InteractableConfig[],
}
