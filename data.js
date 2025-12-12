// Данные о сёлах и объектах
const villagesData = [
    {
        id: 1,
        name: "Челутай",
        description: "",
        color: "linear-gradient(45deg, #ff6b6b, #ffa726)",
        position: { x: '44%', y: '12%' },
        objects: [
            {
                id: 1,
                name: "ДК",
                description: "",
                modelPath: "models/Челутай/дк.glb",
                icon: "",
                position: { x: '45%', y: '59%' }
            },
            {
                id: 2,
                name: "Почта",
                description: "",
                modelPath: "models/Челутай/почта.glb",
                icon: "",
                position: { x: '45%', y: '44%' }
            },
            {
                id: 3,
                name: "ФАП ЧСОШ",
                description: "",
                modelPath: "models/Челутай/фап.glb",
                icon: "",
                position: { x: '42%', y: '39%' }
            },
            {
                id: 4,
                name: "ШКОЛА ЧСОШ",
                description: "",
                modelPath: "models/Челутай/школа чсош.glb",
                icon: "",
                position: { x: '39%', y: '45%' }
            },
            {
                id: 5,
                name: "дом спорта",
                description: "",
                modelPath: "models/Челутай/дом спорта.glb",
                icon: "",
                position: { x: '46%', y: '62%' }
            },
            {
                id: 6,
                name: "усп",
                description: "",
                modelPath: "models/Челутай/усп.glb",
                icon: "",
                position: { x: '41%', y: '50%' }
            },
            {
                id: 7,
                name: "памятник вов",
                description: "",
                modelPath: "models/Челутай/памятник вов.glb",
                icon: "",
                position: { x: '45%', y: '55%' }
            },
            {
                id: 8,
                name: "садик",
                description: "",
                modelPath: "models/Челутай/садик.glb",
                icon: "",
                position: { x: '40%', y: '42%' }
            }
        ]
    },
    {
        id: 2,
        name: "Сахюрта",
        description: "Село в Могойтуйском районе",
        color: "linear-gradient(45deg, #4ecdc4, #44a08d)",
        position: { x: '35%', y: '37%' },
        objects: [
            {
                id: 1,
                name: "Администрация",
                description: "",
                modelPath: "models/Сахюрта/Администрация.glb",
                icon: "",
                position: { x: '49%', y: '55%' }
            },
            {
                id: 2,
                name: "Дом культуры",
                description: "",
                modelPath: "models/Сахюрта/Дом Культуры.glb",
                icon: "",
                position: { x: '50%', y: '51%' }
            },
            {
                id: 3,
                name: "Поликлинника",
                description: "",
                modelPath: "models/Сахюрта/Поликлинника.glb",
                icon: "",
                position: { x: '58%', y: '70%' }
            },
            {
                id: 4,
                name: "Школа",
                description: "",
                modelPath: "models/Сахюрта/Школа.glb",
                icon: "",
                position: { x: '49%', y: '45%' }
            },
            {
                id: 5,
                name: "Садик",
                description: "",
                modelPath: "models/Сахюрта/Садик.glb",
                icon: "",
                position: { x: '52%', y: '46%' }
            },
            {
                id: 6,
                name: "Памятник",
                description: "",
                modelPath: "models/Сахюрта/Памятник.glb",
                icon: "",
                position: { x: '52%', y: '52%' }
            }
        ]
    },
    {
        id: 3,
        name: "Судунтуй",
        description: "",
        color: "linear-gradient(45deg, #ffa726, #ffcc80)",
        position: { x: '50%', y: '78%' },
        objects: [
            {
                id: 1,
                name: "Школа",
                description: "",
                modelPath: "models/Судунтуй/школа.glb",
                icon: "",
                position: { x: '50%', y: '54%' }
            },
            {
                id: 2,
                name: "Спортзал",
                description: "",
                modelPath: "models/Судунтуй/спортзал.glb",
                icon: "",
                position: { x: '48%', y: '51%' }
            },
        ]
    },
    {
        id: 4,
        name: "Амитхаша",
        description: "",
        color: "linear-gradient(45deg, #ab47bc, #ce93d8)",
        position: { x: '50%', y: '30%' },
        objects: [
            {
                id: 1,
                name: "Школа",
                description: "",
                modelPath: "models/Амитхаша/школа.glb",
                icon: "",
                position: { x: '37%', y: '47%' }
            },
            {
                id: 2,
                name: "Детский сад Номин",
                description: "",
                modelPath: "models/Амитхаша/дт номин.glb",
                icon: "",
                position: { x: '38%', y: '52%' }
            },
            {
                id: 3,
                name: "Администрация",
                description: "",
                modelPath: "models/Амитхаша/администрация.glb",
                icon: "",
                position: { x: '37%', y: '57%' }
            },
            {
                
                id: 4,
                name: "памятник",
                description: "",
                modelPath: "models/Амитхаша/памятник.glb",
                icon: "",
                position: { x: '37%', y: '53%' }
            },
        ]
    },
    {
        id: 5,
        name: "Гунэй",
        description: "",
        color: "linear-gradient(45deg, #26c6da, #80deea)",
        position: { x: '55%', y: '110%' },
        objects: [
            {
                id: 1,
                name: "Администрация",
                description: "",
                modelPath: "models/Гунэй/администрация.glb",
                icon: "",
                position: { x: '56%', y: '35%' }
            },
            {
                id: 2,
                name: "дт",
                description: "",
                modelPath: "models/Гунэй/дт.glb",
                icon: "",
                position: { x: '55%', y: '55%' }
            },
            {
                id: 3,
                name: "Памятник",
                description: "",
                modelPath: "models/Гунэй/памятник.glb",
                icon: "",
                position: { x: '56%', y: '42%' }
            },
            {
                id: 4,
                name: "стадион",
                description: "",
                modelPath: "models/Гунэй/стадион.glb",
                icon: "",
                position: { x: '50%', y: '17%' }
            },
            {
                id: 5,
                name: "школа",
                description: "",
                modelPath: "models/Гунэй/школа.glb",
                icon: "",
                position: { x: '58%', y: '26%' }
            },
        ]
    },
    {
        id: 6,
        name: "Новоорловск",
        description: "",
        color: "linear-gradient(45deg, #66bb6a, #a5d6a7)",
        position: { x: '66%', y: '34%' },
        objects: [
            {
                id: 1,
                name: "Памятник",
                description: "",
                modelPath: "models/Новоорловск/Памятник.glb",
                icon: "",
                position: { x: '50%', y: '64%' }
            },
            {
                id: 2,
                name: "Администрация",
                description: "",
                modelPath: "models/Новоорловск/Администрация.glb",
                icon: "",
                position: { x: '47%', y: '32%' }
            },
            {
                id: 3,
                name: "Молодежный центр",
                description: "",
                modelPath: "models/Новоорловск/Молодежный центр.glb",
                icon: "",
                position: { x: '53%', y: '50%' }
            },
            {
                id: 4,
                name: "Стадион",
                description: "",
                modelPath: "models/Новоорловск/Стадион.glb",
                icon: "",
                position: { x: '44%', y: '50%' }
            },
            {
                id: 5,
                name: "УСП",
                description: "",
                modelPath: "models/Новоорловск/УСП.glb",
                icon: "",
                position: { x: '50%', y: '50%' }
            },
            {
                id: 6,
                name: "Хоккейная коробка",
                description: "",
                modelPath: "models/Новоорловск/Хоккейная коробка.glb",
                icon: "",
                position: { x: '55%', y: '50%' }
            },
        ]
    },
    {
        id: 7,
        name: "Будулан",
        description: "",
        color: "linear-gradient(45deg, #ff7043, #ffab91)",
        position: { x: '78%', y: '110%' },
        objects: []
    },
    {
        id: 8,
        name: "Орловск",
        description: "",
        color: "linear-gradient(45deg, #78909c, #b0bec5)",
        position: { x: '74%', y: '36%' },
        objects: [
            {
                id: 1,
                name: "памятник",
                description: "",
                modelPath: "models/Орловск/памятник.glb",
                icon: "",
                position: { x: '45%', y: '20%' }
            },
            {
                id: 2,
                name: "дс",
                description: "",
                modelPath: "models/Орловск/дс.glb",
                icon: "",
                position: { x: '41%', y: '9%' }
            },
            {
                id: 3,
                name: "дк",
                description: "",
                modelPath: "models/Орловск/дк.glb",
                icon: "",
                position: { x: '45%', y: '50%' }
            },
        ]
    },
    {
        id: 9,
        name: "Цокто-Хангил",
        description: "",
        color: "linear-gradient(45deg, #8d6e63, #bcaaa4)",
        position: { x: '60%', y: '55%' },
        objects: []
    },
    {
        id: 10,
        name: "Хойто-Ага",
        description: "",
        color: "linear-gradient(45deg, #f48fb1, #f8bbd9)",
        position: { x: '26%', y: '30%' },
        objects: []
    },
    {
        id: 11,
        name: "Урда-Ага",
        description: "",
        color: "linear-gradient(45deg, #ba68c8, #e1bee7)",
        position: { x: '39%', y: '41%' },
        objects: [
            {
                id: 1,
                name: "ДК",
                description: "",
                modelPath: "models/Урда-Ага/ДК.glb",
                icon: "",
                position: { x: '49%', y: '36%' }
            },
            {
                id: 2,
                name: "Школа",
                description: "",
                modelPath: "models/Урда-Ага/Школа.glb",
                icon: "",
                position: { x: '50%', y: '54%' }
            },
            {
                id: 3,
                name: "Администрация",
                description: "",
                modelPath: "models/Урда-Ага/Администрация.glb",
                icon: "",
                position: { x: '52%', y: '35%' }
            },
            {
                id: 4,
                name: "Детский сад",
                description: "",
                modelPath: "models/Урда-Ага/Детский сад.glb",
                icon: "",
                position: { x: '54%', y: '35%' }
            },
            {
                id: 5,
                name: "Хоккейная коробка",
                description: "",
                modelPath: "models/Урда-Ага/Хоккейная-коробка.glb",
                icon: "",
                position: { x: '50%', y: '50%' }
            },
            {
                id: 6,
                name: "Площадка",
                description: "",
                modelPath: "models/Урда-Ага/площадка.glb",
                icon: "",
                position: { x: '55%', y: '55%' }
            },
            {
                id: 7,
                name: "Водокачка",
                description: "",
                modelPath: "models/Урда-Ага/водокачка.glb",
                icon: "",
                position: { x: '45%', y: '45%' }
            }
        ]
    },
    {
        id: 12,
        name: "Аргалей",
        description: "",
        color: "linear-gradient(45deg, #ba68c8, #e1bee7)",
        position: { x: '37%', y: '23%' },
        objects: [
            {
                id: 1,
                name: "Памятник",
                description: "",
                modelPath: "models/Аргалей/памятник.glb",
                icon: "",
                position: { x: '50%', y: '65%' }
            },
            {
                id: 2,
                name: "южный",
                description: "",
                modelPath: "models/Аргалей/южный.glb",
                icon: "",
                position: { x: '52%', y: '79%' }
            }
        ]
    },
    {
        id: 13,
        name: "Кункур",
        description: "",
        color: "linear-gradient(45deg, #ba68c8, #e1bee7)",
        position: { x: '94%', y: '105%' },
        objects: []
    }
];