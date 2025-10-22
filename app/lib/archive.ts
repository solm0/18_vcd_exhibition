export interface ArchiveDataProp {
  poster: string;
  subject: { title: string; id: string;}[]
}

export const ArchiveData: ArchiveDataProp = {
  poster: '/about/poster.jpg',
  subject: [
    { title: '오프닝파티', id: 'opening'},
    { title: '워크숍', id: 'workshop'},
    { title: '판매 부스', id: 'market'},
  ]
}