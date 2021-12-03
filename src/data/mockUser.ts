const singleUserFull = {
  data: {
    email: 'nice@yopmail.com',
    name: 'Nice Sir',
    posts: {
      createMany: {
        data: [
          {
            title: 'post 1',
            content: 'konten post 1',
          },
          {
            title: 'post 2',
            content: 'konten post 2',
          },
          {
            title: 'post 3',
            content: 'konten post 3',
          },
        ],
      },
    },
    profile: {
      create: { bio: 'bio aing' },
    },
  },
}

const multiUser = {
  data: [
    {
      name: 'Dio 1',
      email: '1@1.com',
    },
    {
      name: 'Dio 2',
      email: '2@1.com',
    },
    {
      name: 'Dio 3',
      email: '3@1.com',
    },
    {
      name: 'Dio 4',
      email: '4@1.com',
    },
    {
      name: 'Dio 5',
      email: '5@1.com',
    },
  ],
}

export { singleUserFull, multiUser }
