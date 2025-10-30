export interface ArchiveDataProp {
  subject: { title: string; id: string;}[]
}

export const ArchiveData: ArchiveDataProp = {
  subject: [
    { title: '오프닝파티', id: 'opening'},
    { title: '워크숍', id: 'workshop'},
    { title: '판매 부스', id: 'market'},
  ]
}