const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline'
  },

  // {
  //   title: 'Second Page',
  //   path: '/second-page',
  //   icon: 'mdi:email-outline'
  // },
  // {
  //   path: '/acl',
  //   action: 'read',
  //   subject: 'acl-page',
  //   title: 'Access Control',
  //   icon: 'mdi:shield-outline'
  // },
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
