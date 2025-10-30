import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../fonts/pretendard-variable.woff2',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../fonts/pretendard-variable.woff2',
      weight: '600',
      style: 'bold',
    }
  ],
})

export const gowundodum = localFont({
  src: [
    {
      path: '../fonts/gowun-dodum.ttf',
      weight: '400',
      style: 'regular'
    }
  ]
})

export const throughx = localFont({
  src: [
    {
      path: '../fonts/throughX_v1.3VF.ttf',
      weight: '400',
      style: 'regular'
    }
  ]
})