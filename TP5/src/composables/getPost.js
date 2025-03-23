export default function getPost(id) {
  const posts = [
    {
      id: 1,
      title: 'Understanding Vue.js',
      body: 'Vue.js is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adoptable and focuses on the view layer only, making it easy to integrate with other libraries or existing projects.',
      tags: ['JavaScript', 'Vue', 'Frontend'],
    },
    {
      id: 2,
      title: 'Getting Started with Node.js',
      body: 'Node.js is a runtime environment that allows you to run JavaScript on the server. It is lightweight, efficient, and uses an event-driven, non-blocking I/O model.',
      tags: ['JavaScript', 'Node.js', 'Backend'],
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      body: 'CSS Grid and Flexbox are two powerful layout systems in CSS. While Flexbox is one-dimensional, CSS Grid is two-dimensional, making it more suitable for complex layouts.',
      tags: ['CSS', 'Frontend', 'Design'],
    },
  ];
  return posts.find(post => post.id === id);
}
