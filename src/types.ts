type ItemType = 'TASK' | 'EVENT'

type Task = {
  title: string
  date: Date
  type: ItemType
  memo: string
  id?: string
}

type Dow = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

type Periodic = {
  title: string
  dow: Dow
  type: ItemType
  memo: string
  id?: string
}

type ApparentItem = Task | Periodic

export type { Task, Periodic, Dow, ApparentItem }
