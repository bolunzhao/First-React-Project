import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // First check if the user exists
    // Check the username and password match
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: 'Home',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/mall',
              name: 'mall',
              label: 'Product Management',
              icon: 'video-play',
              url: 'mall/index'
            },
            {
              path: '/user',
              name: 'user',
              label: 'User Management',
              icon: 'user',
              url: 'User/index'
            },
            {
              label: 'Others',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: 'Page One',
                  icon: 'setting',
                  url: 'other/pageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: 'Page Two',
                  icon: 'setting',
                  url: 'other/pageTwo.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: 'Success'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: 'Home',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: 'Product Management',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: 'Success'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: 'Wrong Password'
        }
      }
    }

  }
}