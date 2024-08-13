export const recommendedBlogs = [
    {
      "id": 1,
      "tag": "Design",
      "time": "19 Feb, 2023",
      "title": "Major Tech Giants Form Blockchain Consortium to Boost Interoperability",
      "preview": "Voluptate ipsum ipsum do ea voluptate laborum fugiat. Id tempor reprehenderit qui non magna cillum. Commodo ipsum voluptate ex ullamco nulla incididunt ad amet ex sunt fugiat laboris non.\r\n",
      "image": "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      "id": 2,
      "tag": "Business",
      "time": "29 Jun, 2023",
      "title": "Major Tech Giants Form Blockchain Consortium to Boost Interoperability",
      "preview": "Incididunt duis tempor magna ullamco consectetur ullamco. Excepteur cillum sunt quis cupidatat sunt proident sunt incididunt pariatur dolore esse. Occaecat et laboris irure cillum esse deserunt. Do voluptate magna sit elit deserunt amet aliquip nulla anim exercitation tempor. Eu sunt velit deserunt eiusmod magna labore. Deserunt commodo ex ea aute Lorem exercitation ea id cillum minim consequat amet duis. Deserunt mollit quis fugiat quis sint et aliqua non proident fugiat esse do amet.\r\n",
      "image": "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      "id": 3,
      "tag": "Lifestyle",
      "time": "30 Nov, 2023",
      "title": "Major Tech Giants Form Blockchain Consortium to Boost Interoperability",
      "preview": "Magna labore adipisicing non duis ex aute labore culpa. Irure duis ullamco aliqua culpa esse sit laborum eu eu irure. Eiusmod ipsum est dolor esse dolore ad et. Deserunt eu ad magna enim mollit tempor enim do. Cillum ex incididunt est eu. Veniam elit laborum deserunt irure amet aliquip occaecat. Nisi enim dolor duis ex commodo fugiat id sit culpa.\r\n",
      "image": "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
  ]

  export const blogContent = {
    "id": 1,
    "slug": "mastering-react-hooks",
    "title": "Mastering React Hooks: A Comprehensive Guide",
    "author": {
      "name": "Jane Doe",
      "profile_picture": "/images/authors/jane-doe.jpg",
      "bio": "Senior Frontend Developer with a passion for teaching and sharing knowledge on modern web technologies."
    },
    "publish_date": "2024-08-10T09:00:00Z",
    "tag": "Development",
    "preview": "React Hooks have revolutionized the way we write React components. Learn how to master them in this comprehensive guide.",
    "cover_image": "/images/blogs/mastering-react-hooks/cover.jpg",
    "content": [
        {
          "type": "heading",
          "text": "How Gearup Revolutionizes Rentals"
        },
      {
          "type": "paragraph",
        "text": "React Hooks have changed the way developers write components. With hooks, you can now use state and other React features without writing a class. In this guide, we will explore the most commonly used hooks and how you can use them to build dynamic, responsive applications."
      },
      {
        "type": "heading",
        "text": "What are React Hooks?"
      },
      {
        "type": "paragraph",
        "text": "React Hooks were introduced in React 16.8. They allow you to use state and other React features in functional components. This was a major shift from the class-based components that developers were accustomed to."
      },
      {
        "type": "image",
        "src": "https://images.unsplash.com/photo-1722603037481-6f6f7bf852fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
        "alt": "Diagram showing React hooks"
      },
      {
        "type": "paragraph",
        "text": "The most commonly used hooks are useState, useEffect, and useContext. These hooks allow you to manage state, side effects, and context within your components. Let's break down how each of these hooks works."
      },
      {
        "type": "heading",
        "text": "useState Hook"
      },
      {
        "type": "paragraph",
        "text": "The useState hook lets you add state to your functional components. You call it inside a function component to add a piece of state to it."
      },
      {
        "type": "code",
        "language": "javascript",
        "text": "const [count, setCount] = useState(0);"
      },
      {
        "type": "paragraph",
        "text": "In this example, we declare a state variable called count and set it to an initial value of 0. The useState function returns a pair: the current state value and a function that lets you update it."
      },
      {
        "type": "heading",
        "text": "useEffect Hook"
      },
      {
        "type": "paragraph",
        "text": "The useEffect hook lets you perform side effects in function components. You can think of useEffect as componentDidMount, componentDidUpdate, and componentWillUnmount combined."
      },
      {
        "type": "code",
        "language": "javascript",
        "text": "useEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);"
      },
      {
        "type": "paragraph",
        "text": "In this example, useEffect updates the document title whenever the count variable changes."
      },
      {
        "type": "heading",
        "text": "Conclusion"
      },
      {
        "type": "paragraph",
        "text": "React Hooks are a powerful addition to the React library, enabling you to write cleaner, more reusable code. By mastering hooks, you can create more efficient and manageable components."
      },
      {
        "type": "image",
        "src": "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3R8ZW58MHx8MHx8fDA%3D",
        "alt": "Diagram showing React hooks"
      },
      {
        "type": "video",
        "src": "https://youtu.be/7YhdqIR2Yzo?si=HZyyhaoN9SJ0ACgz",
        "alt": "React tutorial"
      }
    ],
    "related_posts": [
      {
        "id": 2,
        "title": "Understanding useEffect: A Deep Dive",
        "slug": "understanding-useeffect",
        "cover_image": "/images/blogs/understanding-useeffect/cover.jpg"
      },
      {
        "id": 3,
        "title": "Building Custom Hooks for Better Reusability",
        "slug": "building-custom-hooks",
        "cover_image": "/images/blogs/building-custom-hooks/cover.jpg"
      }
    ]
  }
  