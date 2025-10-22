export interface AboutDataProp {
  poster: string;
  subject: { title: string; id: string;}[]
}

export const AboutData: AboutDataProp = {
  poster: '/about/poster.jpg',
  subject: [
    { title: '전시 사진', id: 'dp'},
    { title: '리플렛', id: 'leaflet'}
  ]
}