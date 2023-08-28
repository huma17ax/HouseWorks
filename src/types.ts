type ItemType = 'TASK' | 'EVENT'

class Task {
  title: string
  date: Date
  type: ItemType
  memo: string
  id?: string
  refer: string | null
  constructor() {
    this.title = ''
    this.date = new Date()
    this.type = 'TASK'
    this.memo = ''
    this.refer = null
  }
}

type Dow = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

class Periodic {
  title: string
  dow: Dow
  type: ItemType
  memo: string
  id?: string
  constructor() {
    this.title = ''
    this.dow = 'Sunday'
    this.type = 'TASK'
    this.memo = ''
  }
}

type ApparentItem = Task | Periodic

export { Task, Periodic }
export type { Dow, ApparentItem }
