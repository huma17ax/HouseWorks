type Task = {
  title: string
  date: Date
  type: string
  memo: string
  id?: string
}

type Dow = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

type Periodic = {
  title: string
  dow: Dow
  type: string
  memo: string
  id?: string
}

type ApparentItem = Task | Periodic

export type { Task, Periodic, Dow, ApparentItem }
