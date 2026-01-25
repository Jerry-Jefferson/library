/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: ".env.local" })

const mongoose = require("mongoose")
const { Author } = require("../models/author.ts")
const { Book } = require("../models/book.ts")

const DATABASE_URI = process.env.DATABASE_URI
if (!DATABASE_URI) throw new Error("DATABASE_URI не задан")

async function connectMongo() {
  return mongoose.connect(DATABASE_URI)
}

// ===== helpers =====
function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function round2(num: number) {
  return Math.round(num * 100) / 100
}

function dateMsAgo(ms: number) {
  return new Date(Date.now() - ms)
}

// ===== данные =====
const AUTHORS = [
  {
    name: "Александр Сидоров",
    bio: "Писатель приключенческих и фантастических романов.",
    birthDay: new Date("1975-06-15"),
  },
  {
    name: "Мария Иванова",
    bio: "Автор психологических драм и современной прозы.",
    birthDay: new Date("1982-02-03"),
  },
  {
    name: "Дмитрий Кузнецов",
    bio: "Пишет научную фантастику и антиутопии.",
    birthDay: new Date("1978-11-21"),
  },
  {
    name: "Екатерина Смирнова",
    bio: "Романист, лауреат литературных премий.",
    birthDay: new Date("1985-07-09"),
  },
  {
    name: "Иван Петров",
    bio: "Автор исторических романов.",
    birthDay: new Date("1969-04-18"),
  },
  {
    name: "Ольга Фёдорова",
    bio: "Пишет книги для подростков.",
    birthDay: new Date("1990-09-12"),
  },
  {
    name: "Сергей Волков",
    bio: "Мастер детективного жанра.",
    birthDay: new Date("1973-01-30"),
  },
  {
    name: "Анна Морозова",
    bio: "Современная женская проза.",
    birthDay: new Date("1988-05-27"),
  },
  {
    name: "Павел Орлов",
    bio: "Фантаст и автор фэнтези-саг.",
    birthDay: new Date("1980-08-14"),
  },
  {
    name: "Наталья Белова",
    bio: "Автор документальной и биографической литературы.",
    birthDay: new Date("1976-12-02"),
  },
]

const GENRES = ["adventure", "fantasy", "drama", "detective", "science fiction", "historical"]

const BOOK_TITLES = [
  "Последний горизонт",
  "Тень над городом",
  "Когда погаснет свет",
  "Память о прошлом",
  "Голос за стеной",
  "Дом на краю леса",
  "Пепел и звёзды",
  "За гранью времени",
  "Осколки истины",
  "Письма без адреса",
  "Северный ветер",
  "Между двух миров",
  "Тихая гавань",
  "Цена выбора",
  "Путь домой",
  "Сквозь туман",
  "Хроники забытого мира",
  "Отражение в воде",
  "Ночь перед рассветом",
  "Там, где кончается дорога",
  "Линия судьбы",
  "Город без имени",
  "Один шаг до завтра",
  "Шёпот прошлого",
  "Знак на ладони",
  "Падение империи",
  "Время собирать камни",
  "Сердце бури",
  "Тайна старого архива",
  "За последней чертой",
]

// ===== seed =====
async function seed() {
  await connectMongo()
  console.log("✅ Подключение к MongoDB")

  // очищаем
  await Author.deleteMany({})
  await Book.deleteMany({})

  // создаём авторов
  const authors = await Author.insertMany(AUTHORS)
  console.log("✅ Создано авторов:", authors.length)

  const books = []

  const DISTRIBUTION = [
    { count: 20, rating: [0, 2], createdAt: dateMsAgo(365 * 24 * 60 * 60 * 1000) }, // 1 год
    { count: 30, rating: [2, 3], createdAt: dateMsAgo(30 * 24 * 60 * 60 * 1000) }, // 1 месяц
    { count: 20, rating: [3, 4], createdAt: dateMsAgo(14 * 24 * 60 * 60 * 1000) }, // 2 недели
    { count: 30, rating: [4, 5], createdAt: dateMsAgo(2 * 24 * 60 * 60 * 1000) }, // 2 дня
  ]

  let bookIndex = 1

  for (let authorIndex = 0; authorIndex < authors.length; authorIndex++) {
    const author = authors[authorIndex]

    for (let j = 0; j < 10; j++) {
      const dist = DISTRIBUTION.find(
        (d) =>
          bookIndex <=
          DISTRIBUTION.slice(0, DISTRIBUTION.indexOf(d) + 1).reduce((sum, x) => sum + x.count, 0)
      )

      if (!dist) throw new Error("Распределение не найдено")

      const title = BOOK_TITLES[Math.floor(Math.random() * BOOK_TITLES.length)]

      books.push({
        title,
        description: `Роман в жанре ${GENRES[bookIndex % GENRES.length]}, раскрывающий сложные человеческие судьбы и неожиданные повороты.`,
        authorId: author._id,
        year: 2000 + (bookIndex % 25),
        genres: [GENRES[bookIndex % GENRES.length]],
        rating: round2(randomBetween(dist.rating[0], dist.rating[1])),
        createdAt: dist.createdAt,
      })

      bookIndex++
    }
  }

  await Book.insertMany(books)

  console.log(`✅ Создано книг: ${books.length}`)
  console.log("🎉 Seed успешно завершён")

  process.exit(0)
}

seed()
