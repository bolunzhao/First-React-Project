export default  [
    {
        path: '/home',
        name: 'home',
        label: 'Homepage',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: 'Product Management',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: 'User Management',
        icon: 'UserOutlined',
        url: '/user/index'
    },
    {
        path: '/other',
        label: 'Others',
        icon: 'SettingOutlined',
        children: [
        {
            path: '/other/pageOne',
            name: 'page1',
            label: 'Page One',
            icon: 'SettingOutlined'
        },
        {
            path: '/other/pageTwo',
            name: 'page2',
            label: 'Page Two',
            icon: 'SettingOutlined'
        }
        ]
    }
]