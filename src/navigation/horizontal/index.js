const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline'
  },
  {
    path: '/generate-card',
    action: 'read',
    subject: 'acl-page',
    title: 'Generate Card',
    icon: 'mdi:credit-card'
  },
  {
    title: 'User',
    icon: 'mdi:accounts-outline',
    children: [
      {
        title: 'List',
        path: '/user'
      },
    ]
  },
  {
    title: 'Profile',
    icon: 'mdi:account-outline',
    children: [
      {
        title: 'View',
        action: 'read',
        subject: 'acl-page',
        path: '/profile/view'
      },
      {
        title: 'Edit',
        action: 'read',
        subject: 'acl-page',
        path: '/profile/edit'
      },
      {
        title: 'Change Password',
        action: 'read',
        subject: 'acl-page',
        path: '/profile/change-password'
      },
    ]
  },
]

export default navigation
