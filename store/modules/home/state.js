import postsIcon from '@/assets/images/posts-icon.svg'
import addIcon from '@/assets/images/add-icon.svg'
export const navLinks = [
  {
    id: 1,
    name: 'Show Posts',
    icon: postsIcon,
    isSuccess: false,
    isDanger: false,

    path: '/',
  },
  {
    id: 2,
    name: 'Add Post',
    icon: addIcon,
    isSuccess: true,
    isDanger: false,

    path: '/add-post',
  },
]
export const blog = {
  title: 'HiTech Blog',
  content: 'Blog content',
  posts: [],
}
