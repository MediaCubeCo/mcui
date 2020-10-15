const value = {
  filter: {
    views_count: {
      more: 10,
    },
    countries: {
      is: [1],
      is_not: [2],
    },
    email: "crocodile@gena.com",
  },
  filter_name: {
    views_count: {
      more: 10,
    },
    countries: {
      is: {
        1: 'Беларусь',
      },
      is_not: {
        2: 'Россия',
      },
    },
    email: "crocodile@gena.com",
  },
}
const filters = [
  {
    name: "Поиск",
    value: "email",
    type: "text",
  },
  {
    name: "Страна",
    value: "countries",
    type: "relation",
    options: [
      { name: "Беларусь", value: 1 },
      { name: "Россия", value: 2 },
      { name: "Украина", value: 3 },
    ],
  },
  {
    name: "Пользователь",
    value: "users",
    type: "relation",
    getAjaxOne: val => {
      return fetch("https://reqres.in/api/users")
        .then(result => {
          return result.json()
        })
        .then(result => {
          return result.data.map(r => ({
            name: r.first_name + " " + r.last_name,
            value: r.id,
          }))
        })
    },
    getAjaxOptions: val => {
      return fetch("https://reqres.in/api/users/" + val)
        .then(result => {
          return result.json()
        })
        .then(result => {
          const r = result.data
          return {
            name: r.first_name + " " + r.last_name,
            value: r.id,
          }
        })
    },
  },
  {
    name: "Просмотры",
    value: "views_count",
    type: "range",
    min: 0,
    max: 10000,
  },
  {
    name: "Дата создания",
    value: "created_at",
    type: "date",
  },
]

const placeholders = {
  "value": "Значение",
  "condition": "Условие",
  "create_preset": "Создать новый пресет",
  "fast_filters": "Быстрые фильтры",
  "added_filters": "Добавленные фильтры",
  "enter_preset_name": "Введите название пресета",
  "enter_preset_tooltip": "Сохранение выбранных параметров фильтра в пользовательский пресет",
  "from": "От",
  "to": "До",
  "enter": "Введите",
  "choose": "Выберите",
  "actions": {
    "add": "Добавить",
    "save": "Сохранить",
    "clear": "Очистить",
    "create": "Создать",
    "delete_preset": "Удалить пресет",
    "is": "Это",
    "is_not": "Это не",
    "empty": "Пустой",
    "confirm": "Применить"
  },
  "calendar": {
    "week": "Неделя",
    "month": "Месяц",
    "quarter": "Квартал",
    "year": "Год",
    "confirm": "Применить"
  },
  "messages": {
    "same_filter": "Уже есть фильтр с таким параметром",
    "same_preset_name": "Уже есть фильтр с таким именем",
    "accidentally_cleared": "Случайно очистили?",
    "accidentally_deleted": "Случайно удалили?",
    "more_than": "Значение \"от\" не может быть больше значения \"до\""
  }
}

export { value, filters, placeholders }
