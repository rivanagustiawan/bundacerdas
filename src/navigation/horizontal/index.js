const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline'
  },
  {
    title: 'User',
    icon: 'mdi:account-outline',
    children: [
      {
        title: 'List',
        path: '/user'
      }
    ]
  }
]

export default navigation
