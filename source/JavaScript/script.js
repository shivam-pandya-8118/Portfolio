// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Load data from JSON
  loadData();

  // Remove loading animation
  setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
  }, 1000);

  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "light");
    }
  });

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }

  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
      hamburger.querySelector("i").classList.remove("fa-bars");
      hamburger.querySelector("i").classList.add("fa-times");
    } else {
      hamburger.querySelector("i").classList.remove("fa-times");
      hamburger.querySelector("i").classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").classList.remove("fa-times");
      hamburger.querySelector("i").classList.add("fa-bars");
    });
  });

  // Page Navigation
  document.querySelectorAll("[data-page]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetPage = this.getAttribute("data-page");
      navigateToPage(targetPage);
    });
  });

  // Books Carousel Auto-Scroll
  const booksSlider = document.querySelector(".books-slider");
  if (booksSlider) {
    setInterval(() => {
      const firstBook = booksSlider.firstElementChild;
      booksSlider.style.transition = "transform 0.5s ease";
      booksSlider.style.transform = `translateX(-${
        firstBook.offsetWidth + 15
      }px)`;

      setTimeout(() => {
        booksSlider.style.transition = "none";
        booksSlider.style.transform = "translateX(0)";
        booksSlider.appendChild(firstBook);
      }, 500);
    }, 3000);
  }

  // Publications Filter
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter publications
      document.querySelectorAll(".publication-card").forEach((card) => {
        if (filter === "all" || card.getAttribute("data-type") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  const clearFormBtn = document.getElementById("clearForm");
  const interestSelect = document.getElementById("interest");
  const otherInterestGroup = document.getElementById("otherInterestGroup");

  interestSelect.addEventListener("change", function () {
    if (this.value === "other") {
      otherInterestGroup.style.display = "block";
    } else {
      otherInterest;
      Group.style.display = "none";
    }
  });

  clearFormBtn.addEventListener("click", function () {
    contactForm.reset();
    otherInterestGroup.style.display = "none";
  });

  // Blog Post Links
  document.querySelectorAll(".blog-link[data-post]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const postId = this.getAttribute("data-post");
      loadBlogPost(postId);
      navigateToPage("blog-post");
    });
  });
});

// Navigation Function
function navigateToPage(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active");
  });

  // Show target page
  document.getElementById(page).classList.add("active");

  // Scroll to top
  window.scrollTo(0, 0);

  // Update URL (for demo purposes)
  history.pushState({ page: page }, "", `#${page} `);
}

// Handle browser back/forward
window.addEventListener("popstate", function (e) {
  if (e.state && e.state.page) {
    navigateToPage(e.state.page);
  } else {
    navigateToPage("home");
  }
});

// Load data from JSON
function loadData() {
  // This would normally fetch from a server
  // For demo, we'll create a data object
  const portfolioData = {
    profile: {
      name: "John Doe",
      title: "Full Stack Developer",
      description:
        "I craft beautiful, functional websites and applications using modern technologies. With a passion for clean code and user-centered design, I bring ideas to life in the digital world.",
      image: "https://via.placeholder.com/400x500",
    },
    about: {
      bio: "Hi there! I'm a passionate developer with over 5 years of experience in creating web and mobile applications. I specialize in JavaScript, React, and Node.js, and I'm always eager to learn new technologies. When I'm not coding, you can find me reading books, listening to music, or exploring the great outdoors.",
      books: [
        {
          title: "Atomic Habits",
          image: "https://via.placeholder.com/150x200",
        },
        { title: "Clean Code", image: "https://via.placeholder.com/150x200" },
        { title: "Deep Work", image: "https://via.placeholder.com/150x200" },
        {
          title: "Eloquent JavaScript",
          image: "https://via.placeholder.com/150x200",
        },
      ],
      music: [
        {
          title: "Random Access Memories",
          artist: "Daft Punk",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "In Rainbows",
          artist: "Radiohead",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Currents",
          artist: "Tame Impala",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Blonde",
          artist: "Frank Ocean",
          image: "https://via.placeholder.com/150",
        },
      ],
      education: [
        {
          institution: "Stanford University",
          degree: "Master of Computer Science",
          years: "2018 - 2020",
          logo: "https://via.placeholder.com/50",
        },
      ],
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "React", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "UI/UX Design", level: 75 },
        { name: "Docker", level: 70 },
      ],
      experience: [
        {
          title: "Senior Frontend Developer",
          company: "Google",
          period: "2022 - Present",
          description:
            "Leading the frontend development team for Google Cloud Platform products.",
        },
        {
          title: "Full Stack Developer",
          company: "Microsoft",
          period: "2020 - 2022",
          description:
            "Developed and maintained web applications for Microsoft Office 365.",
        },
        {
          title: "Junior Developer",
          company: "Acme Inc.",
          period: "2018 - 2020",
          description:
            "Contributed to various client projects and internal tools.",
        },
      ],
      publications: [
        {
          title: "Modern JavaScript Techniques for 2023",
          type: "article",
          journal: "JavaScript Weekly",
          date: "June 2023",
          link: "#",
        },
        {
          title: "React Patterns and Best Practices",
          type: "book",
          journal: "O'Reilly Media",
          date: "March 2022",
          link: "#",
        },
      ],
    },
    projects: [
      {
        title: "E-Commerce Platform",
        description:
          "A full-featured e-commerce platform with product management, cart functionality, payment processing, and user authentication.",
        image: "https://via.placeholder.com/350x200",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        website: "#",
        github: "#",
      },
      {
        title: "AI Image Generator",
        description:
          "An application that uses AI to generate unique images based on text descriptions. Features a gallery and sharing functionality.",
        image: "https://via.placeholder.com/350x200",
        technologies: ["React", "Python", "TensorFlow", "Flask"],
        website: "#",
        github: "#",
      },
      {
        title: "Task Management App",
        description:
          "A productivity app for managing tasks, projects, and deadlines. Features include drag-and-drop organization and team collaboration.",
        image: "https://via.placeholder.com/350x200",
        technologies: ["Vue.js", "Firebase", "Vuex", "PWA"],
        website: "#",
        github: "#",
      },
      {
        title: "Weather Dashboard",
        description:
          "A weather application that provides real-time forecasts, historical data, and interactive maps for locations worldwide.",
        image: "https://via.placeholder.com/350x200",
        technologies: ["React", "OpenWeather API", "Leaflet", "Chart.js"],
        website: "#",
        github: "#",
      },
      {
        title: "Fitness Tracker",
        description:
          "A mobile application for tracking workouts, nutrition, and fitness progress. Includes custom workout plans and progress visualization.",
        image: "https://via.placeholder.com/350x200",
        technologies: ["React Native", "Redux", "Firebase", "D3.js"],
        website: "#",
        github: "#",
      },
      {
        title: "Code Editor",
        description:
          "An online code editor with real-time collaboration, syntax highlighting, and integrated terminal. Supports multiple programming languages.",
        image: "https://via.placeholder.com/350x200",
        technologies: ["JavaScript", "WebSockets", "Monaco Editor", "Docker"],
        website: "#",
        github: "#",
      },
    ],
    testimonials: [
      {
        text: "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding. It was a pleasure working with him on our project.",
        name: "Sarah Johnson",
        position: "Product Manager, Adobe",
        image: "https://via.placeholder.com/60x60",
        rating: 5,
      },
      {
        text: "Working with John was a game-changer for our startup. He not only delivered a fantastic website but also provided valuable insights that improved our overall product. Highly recommended!",
        name: "Michael Chen",
        position: "CEO, TechStart",
        image: "https://via.placeholder.com/60x60",
        rating: 5,
      },
      {
        text: "John has an excellent eye for design and a deep understanding of user experience. He transformed our outdated website into a modern, responsive platform that our customers love.",
        name: "Emily Rodriguez",
        position: "Marketing Director, GlobalBrand",
        image: "https://via.placeholder.com/60x60",
        rating: 5,
      },
      {
        text: "As a fellow developer, I've had the pleasure of collaborating with John on several projects. His code is clean, well-documented, and follows best practices. He's a true professional.",
        name: "David Kim",
        position: "Senior Developer, TechCorp",
        image: "https://via.placeholder.com/60x60",
        rating: 4.5,
      },
    ],
    blogs: [
      {
        id: 1,
        title: "How to Build a React App with TypeScript",
        excerpt:
          "Learn how to set up and build a React application using TypeScript to improve code quality and developer experience.",
        date: "April 15, 2023",
        image: "https://via.placeholder.com/800x400",
        author: "John Doe",
        category: "Web Development",
        content: `
                            <p>TypeScript has become increasingly popular in the React ecosystem due to its strong typing system and improved developer experience. In this tutorial, we'll walk through setting up a new React project with TypeScript and explore the benefits it brings to your development workflow.</p>
                            
                            <h2>Why Use TypeScript with React?</h2>
                            <p>TypeScript offers several advantages when working with React:</p>
                            <ul>
                                <li>Static type checking helps catch errors during development</li>
                                <li>Better IDE support with autocompletion and inline documentation</li>
                                <li>Improved code maintainability for larger projects</li>
                                <li>Explicit interface definitions for props and state</li>
                                <li>Enhanced refactoring capabilities</li>
                            </ul>
                            
                            <h2>Setting Up a New Project</h2>
                            <p>The easiest way to start a new React project with TypeScript is to use Create React App with the TypeScript template:</p>
                            <pre><code>npx create-react-app my-app --template typescript</code></pre>
                            
                            <p>This command sets up a new React project with TypeScript configuration already in place. Let's explore the key files it creates:</p>
                            
                            <h3>tsconfig.json</h3>
                            <p>This file contains TypeScript compiler options. The template provides sensible defaults, but you can customize it based on your project needs.</p>
                            
                            <h3>Source Files with .tsx Extension</h3>
                            <p>React components are written with the .tsx extension, which allows you to use TypeScript with JSX syntax.</p>
                            
                            <h2>Creating a Typed Component</h2>
                            <p>Let's create a simple component with proper TypeScript types:</p>
                            
                            <pre><code>
// UserProfile.tsx
import React from 'react';

// Define the props interface
interface UserProfileProps {
  name: admin;
  email: admin;
  age: number;
  isAdmin?: boolean; // Optional prop
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, age, isAdmin = false }) => {
  return (
    <div className="user-profile">
      <h2>{name} {isAdmin && '(Admin)'}</h2>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
};

export default UserProfile;
                            </code></pre>
                            
                            <p>In this example, we've defined an interface for our component props, making it clear what props are required and what types they should be. The '?' symbol indicates an optional prop.</p>
                            
                            <h2>Using Typed Hooks</h2>
                            <p>TypeScript works great with React hooks. Here's an example of a typed useState hook:</p>
                            
                            <pre><code>
// Counter.tsx
import React, { useState } from 'react';

interface CounterProps {
  initialCount: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  // TypeScript infers the type from the initial value
  const [count, setCount] = useState(initialCount);
  
  // But we can also be explicit
  const [error, setError] = useState<string | null>(null);
  
  const increment = () => {
    setCount(count + 1);
    setError(null);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
                            </code></pre>
                            
                            <h2>Conclusion</h2>
                            <p>TypeScript brings numerous benefits to React development, especially for larger projects or teams. While there is a slight learning curve, the improved developer experience and reduced runtime errors make it well worth the investment.</p>
                            
                            <p>In future tutorials, we'll explore more advanced TypeScript patterns with React, including generic components, custom hooks, and context API with proper typing.</p>
                        `,
      },
      {
        id: 2,
        title: "The Future of Web Development: What to Expect in 2024",
        excerpt:
          "Explore the upcoming trends, technologies, and paradigms that will shape web development in the coming year.",
        date: "March 22, 2023",
        image: "https://via.placeholder.com/800x400",
        author: "John Doe",
        category: "Web Development",
        content: `
                            <p>The web development landscape continues to evolve at a rapid pace, with new technologies, frameworks, and approaches emerging every year. As we look ahead to 2024, several key trends are poised to reshape how we build and interact with web applications.</p>
                            
                            <h2>1. AI-Assisted Development</h2>
                            <p>Artificial intelligence is revolutionizing the way developers write code. Tools like GitHub Copilot and similar AI pair programmers are becoming increasingly sophisticated, capable of generating entire functions, suggesting optimizations, and helping developers navigate complex codebases.</p>
                            
                            <p>In 2024, expect to see:</p>
                            <ul>
                                <li>More integrated AI development assistants in popular IDEs</li>
                                <li>AI-powered code review and optimization tools</li>
                                <li>Natural language interfaces for generating code and components</li
                                <li>AI systems that can explain complex code and suggest architectural improvements</li>
                            </ul >
                            
                            <h2>2. Web Components and Micro-Frontends</h2>
                            <p>As applications grow in complexity, we're seeing a shift towards more modular, composable architectures. Web Components, the browser-native component model, are gaining traction as developers seek framework-agnostic solutions.</p>
                            
                            <p>Micro-frontends extend this concept to application architecture, allowing teams to build and deploy portions of a website independently. This approach is particularly valuable for large organizations with multiple teams working on different parts of the same application.</p>
                            
                            <h2>3. Edge Computing Goes Mainstream</h2>
                            <p>Edge computing—running server code closer to users—is becoming more accessible through platforms like Cloudflare Workers, Deno Deploy, and Vercel Edge Functions. This approach reduces latency and improves performance by executing code at edge locations worldwide rather than in a central datacenter.</p>
                            
                            <p>In 2024, we'll see more applications leveraging edge computing for:</p>
                            <ul>
                                <li>Personalization based on user location or device</li>
                                <li>Real-time data processing</li>
                                <li>Improved global performance</li>
                                <li>Reduced backend complexity</li>
                            </ul>
                            
                            <h2>4. WebAssembly Expands Beyond Performance-Critical Applications</h2>
                            <p>WebAssembly (WASM) has primarily been used for performance-intensive web applications, like games and image processing. However, as the ecosystem matures, we're seeing WASM used for a wider range of applications.</p>
                            
                            <p>In 2024, expect WebAssembly to be used for:</p>
                            <ul>
                                <li>Running server-side code in the browser</li>
                                <li>Supporting multiple programming languages in web applications</li>
                                <li>Secure sandboxing of third-party code</li>
                                <li>More complex in-browser applications like CAD software and video editors</li>
                            </ul>
                            
                            <h2>5. Improved CSS Capabilities</h2>
                            <p>CSS continues to evolve with powerful new features that reduce the need for JavaScript and complex workarounds. Features like container queries, cascade layers, and the :has() selector are changing how developers approach layout and styling.</p>
                            
                            <p>Looking ahead to 2024, we can expect:</p>
                            <ul>
                                <li>Wider browser support for recent CSS features</li>
                                <li>More powerful animation capabilities</li>
                                <li>Improved layout systems beyond Grid and Flexbox</li>
                                <li>Better tools for working with design systems in CSS</li>
                            </ul>
                            
                            <h2>6. Sustainability in Web Development</h2>
                            <p>As awareness of technology's environmental impact grows, we're seeing increased attention to building more sustainable, energy-efficient websites. This includes optimizing assets, reducing unnecessary animations, and being more thoughtful about the resources our applications consume.</p>
                            
                            <p>In 2024, expect to see:</p>
                            <ul>
                                <li>More tools for measuring a website's carbon footprint</li>
                                <li>Best practices for environmentally friendly web development</li>
                                <li>Client preferences for greener web solutions</li>
                                <li>Performance optimizations driven by sustainability concerns</li>
                            </ul>
                            
                            <h2>Conclusion</h2>
                            <p>The web development field continues to evolve in exciting ways, with new tools and approaches making it possible to build faster, more capable, and more user-friendly applications. By staying informed about these trends and experimenting with new technologies, developers can position themselves at the forefront of the industry and create better experiences for users worldwide.</p>
                            
                            <p>What trends are you most excited about for 2024? Let me know in the comments below!</p>
                        `,
      },
      {
        id: 3,
        title: "Optimizing React Performance: A Comprehensive Guide",
        excerpt:
          "Discover practical techniques and best practices for improving the performance of your React applications.",
        date: "February 10, 2023",
        image: "https://via.placeholder.com/800x400",
        author: "John Doe",
        category: "React",
        content: `
                        < p > As React applications grow in complexity, performance optimization becomes increasingly important.In this comprehensive guide, we'll explore practical techniques to make your React applications faster and more responsive.</p>

                        < h2 > Understanding React's Rendering Process</h2>
                        < p > Before diving into optimization techniques, it's essential to understand how React renders components. React uses a virtual DOM to minimize expensive DOM operations. When a component's state or props change, React:</p >
                            
                            <ol>
                                <li>Creates a new virtual DOM representation</li>
                                <li>Compares it with the previous virtual DOM (diffing)</li>
                                <li>Updates only the parts of the actual DOM that changed</li>
                            </ol>
                            
                            <p>While this process is efficient, unnecessary re-renders can still impact performance, especially in complex applications.</p>
                            
                            <h2>1. Memoization with React.memo</h2>
                            <p>React.memo is a higher-order component that memoizes your component, preventing re-renders if props haven't changed:</p>
                            
                            <pre><code>
const ExpensiveComponent = React.memo(function ExpensiveComponent(props) {
  // Your component logic
  return (
    <div>{props.value}</div>
  );
});
                            </code></pre>
                            
                            <p>This is particularly useful for components that render frequently or perform expensive calculations.</p>
                            
                            <h2>2. Using useMemo and useCallback Hooks</h2>
                            <p>The useMemo hook memoizes computed values, recalculating them only when dependencies change:</p>
                            
                            <pre><code>
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
                            </code></pre>
                            
                            <p>Similarly, useCallback memoizes functions, useful for preventing unnecessary re-renders of child components:</p>
                            
                            <pre><code>
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
                            </code></pre>
                            
                            <h2>3. Virtualization for Long Lists</h2>
                            <p>When rendering long lists, consider using virtualization libraries like react-window or react-virtualized. These libraries render only the items currently visible in the viewport, significantly reducing DOM nodes and improving performance:</p>
                            
                            <pre><code>
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const Example = () => (
  <FixedSizeList
    height={500}
    width={300}
    itemCount={10000}
    itemSize={35}
  >
    {Row}
  </FixedSizeList>
);
                            </code></pre>
                            
                            <h2>4. Code Splitting and Lazy Loading</h2>
                            <p>React.lazy and Suspense allow you to split your code into smaller chunks and load components only when needed:</p>
                            
                            <pre><code>
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </React.Suspense>
    </div>
  );
}
                            </code></pre>
                            
                            <p>This approach reduces the initial bundle size and improves the application's load time.</p>
                            <h2>5. State Management Optimization</h2>
                            <p>Inefficient state management is a common performance bottleneck. Consider these strategies:</p>
                            
                            <ul>
                                <li><strong>Use local state when possible:</strong> Not everything needs to be in global state</li>
                                <li><strong>Normalize complex state:</strong> Avoid deeply nested state structures</li>
                                <li><strong>Consider state selectors:</strong> Libraries like Reselect help prevent unnecessary recalculations</li>
                            </ul>
                            
                            <p>If using Redux, use the Redux Toolkit which implements many performance best practices by default.</p>
                            
                            <h2>6. Avoid Anonymous Functions in Render</h2>
                            <p>Creating functions inside render methods creates new function instances on each render, which can lead to unnecessary re-renders of child components:</p>
                            
                            <pre><code>
// Avoid
return (
  <button onClick={() => handleClick(id)}>Click me</button>
);

// Better (with useCallback)
const handleClickCallback = useCallback(() => {
  handleClick(id);
}, [id]);

return (
  <button onClick={handleClickCallback}>Click me</button>
);
                            </code></pre>
                            
                            <h2>7. Optimize Images and Assets</h2>
                            <p>While not React-specific, optimizing assets is crucial for performance:</p>
                            
                            <ul>
                                <li>Use appropriate image formats (WebP where supported)</li>
                                <li>Implement responsive images</li>
                                <li>Consider lazy loading images with the loading="lazy" attribute</li>
                                <li>Optimize SVGs and other assets</li>
                            </ul>
                            
                            <h2>8. Use Production Builds</h2>
                            <p>Always use production builds for deployed applications. Development builds include extra warnings and development tools that significantly impact performance. With Create React App, use:</p>
                            
                            <pre><code>npm run build</code></pre>
                            
                            <p>This creates an optimized production build with minified code, dead code elimination, and other optimizations.</p>
                            
                            <h2>9. Implement Proper Loading States and Skeleton Screens</h2>
                            <p>Improve perceived performance with thoughtful loading states:</p>
                            
                            <ul>
                                <li>Use skeleton screens instead of spinner loaders where appropriate</li>
                                <li>Prioritize loading critical content first</li>
                                <li>Consider techniques like optimistic UI updates</li>
                            </ul>
                            
                            <h2>10. Performance Monitoring</h2>
                            <p>Regularly measure and monitor your application's performance:</p>
                            
                            <ul>
                                <li>Use React DevTools Profiler to identify problematic components</li>
                                <li>Set up performance budgets and monitoring</li>
                                <li>Consider tools like Lighthouse, WebPageTest, or commercial monitoring solutions</li>
                            </ul>
                            
                            <h2>Conclusion</h2>
                            <p>Performance optimization is an ongoing process, not a one-time task. By implementing these techniques and regularly monitoring your application, you can provide a smoother, more responsive experience for your users.</p>
                            
                            <p>Remember that premature optimization can lead to more complex, harder-to-maintain code. Always measure first to identify actual bottlenecks rather than optimizing based on assumptions.</p>
                            
                            <p>What performance techniques have you found most effective in your React applications? Share your experiences in the comments!</p>
                        `,
      },
      {
        id: 4,
        title: "Building Accessible Web Applications: Why It Matters",
        excerpt:
          "Learn about the importance of web accessibility and how to implement it in your projects for a better user experience.",
        date: "January 5, 2023",
        image: "https://via.placeholder.com/800x400",
        author: "John Doe",
        category: "Accessibility",
        content: `
                            <p>Web accessibility is often overlooked in the development process, yet it's one of the most important aspects of building inclusive web applications. In this article, we'll explore why accessibility matters and how to implement it effectively in your projects.</p>
                            
                            <h2>What is Web Accessibility?</h2>
                            <p>Web accessibility means designing and developing websites and applications that can be used by everyone, including people with disabilities. This encompasses a wide range of conditions, including visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>
                            
                            <p>The World Health Organization estimates that over one billion people—about 15% of the global population—experience some form of disability. By building accessible applications, we ensure that these users can access and interact with our content.</p>
                            
                            <h2>Why Accessibility Matters</h2>
                            
                            <h3>1. Inclusivity and Equal Access</h3>
                            <p>The web is an essential resource in many aspects of life including education, employment, commerce, healthcare, and recreation. Making it accessible ensures everyone has equal access to these resources.</p>
                            
                            <h3>2. Legal Requirements</h3>
                            <p>In many countries, web accessibility is mandated by law. For example:</p>
                            <ul>
                                <li>The Americans with Disabilities Act (ADA) in the United States</li>
                                <li>The Equality Act in the United Kingdom</li>
                                <li>The European Accessibility Act in the EU</li>
                                <li>The Accessibility for Ontarians with Disabilities Act (AODA) in Canada</li>
                            </ul>
                            <p>Non-compliance can lead to legal issues and penalties.</p>
                            
                            <h3>3. Better User Experience for Everyone</h3>
                            <p>Accessibility improvements often enhance usability for all users, not just those with disabilities. For instance, clear navigation, proper heading structure, and keyboard accessibility benefit everyone.</p>
                            
                            <h3>4. SEO Benefits</h3>
                            <p>Many accessibility practices, such as proper heading structure, alternative text for images, and semantic HTML, also improve search engine optimization.</p>
                            
                            <h2>Key Principles of Web Accessibility</h2>
                            <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content accessible. They are organized around four principles, often referred to as POUR:</p>
                            
                            <h3>1. Perceivable</h3>
                            <p>Information and user interface components must be presentable to users in ways they can perceive.</p>
                            <ul>
                                <li>Provide text alternatives for non-text content</li>
                                <li>Provide captions and alternatives for multimedia</li>
                                <li>Create content that can be presented in different ways</li>
                                <li>Make it easier for users to see and hear content</li>
                            </ul>
                            
                            <h3>2. Operable</h3>
                            <p>User interface components and navigation must be operable.</p>
                            <ul>
                                <li>Make all functionality available from a keyboard</li>
                                <li>Give users enough time to read and use content</li>
                                <li>Avoid content that could cause seizures or physical reactions</li>
                                <li>Help users navigate and find content</li>
                            </ul>
                            
                            <h3>3. Understandable</h3>
                            <p>Information and the operation of the user interface must be understandable.</p>
                            <ul>
                                <li>Make text readable and understandable</li>
                                <li>Make content appear and operate in predictable ways</li>
                                <li>Help users avoid and correct mistakes</li>
                            </ul>
                            
                            <h3>4. Robust</h3>
                            <p>Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.</p>
                            <ul>
                                <li>Maximize compatibility with current and future tools</li>
                            </ul>
                            
                            <h2>Practical Implementation Tips</h2>
                            
                            <h3>Semantic HTML</h3>
                            <p>Use HTML elements according to their intended purpose:</p>
                            <pre><code>
<!-- Avoid -->
<div class="button" onclick="submit()">Submit</div>

<!-- Better -->
<button type="submit">Submit</button>
                            </code></pre>
                            
                            <h3>Alternative Text for Images</h3>
                            <p>Provide descriptive alt text for images:</p>
                            <pre><code>
<!-- Informative image -->
<img src="chart.png" alt="Bar chart showing sales growth of 25% in Q1 2023">

<!-- Decorative image -->
<img src="decoration.png" alt="">
                            </code></pre>
                            
                            <h3>Keyboard Navigation</h3>
                            <p>Ensure all interactive elements are accessible via keyboard:</p>
                            <ul>
                                <li>Maintain a logical tab order</li>
                                <li>Provide visible focus indicators</li>
                                <li>Implement keyboard event handlers where necessary</li>
                            </ul>
                            
                            <h3>Color and Contrast</h3>
                            <p>Ensure sufficient color contrast between text and background:</p>
                            <ul>
                                <li>WCAG 2.1 recommends a contrast ratio of at least 4.5:1 for normal text</li>
                                <li>Don't rely on color alone to convey information</li>
                                <li>Use tools like the WebAIM Contrast Checker to verify contrast ratios</li>
                            </ul>
                            
                            <h3>Form Accessibility</h3>
                            <p>Create accessible forms with these practices:</p>
                            <pre><code>
<form>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" aria-required="true">
  </div>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" aria-required="true">
    <p id="email-error" class="error" aria-live="polite"></p>
  </div>
  
  <button type="submit">Submit</button>
</form>
                            </code></pre>
                            
                            <h3>ARIA When Necessary</h3>
                            <p>Accessible Rich Internet Applications (ARIA) attributes can enhance accessibility when HTML alone isn't sufficient:</p>
                            <pre><code>
<div role="alert" aria-live="assertive">
  Your form has been submitted successfully!
</div>
                            </code></pre>
                            <p>Remember: "No ARIA is better than bad ARIA." Only use ARIA when necessary and ensure you understand its proper implementation.</p>
                            
                            <h3>Testing for Accessibility</h3>
                            <p>Incorporate these testing methods:</p>
                            <ul>
                                <li>Automated testing tools like Axe, WAVE, or Lighthouse</li>
                                <li>Keyboard testing (navigate without a mouse)</li>
                                <li>Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                                <li>User testing with people with disabilities</li>
                            </ul>
                            
                            <h2>Accessibility in Modern JavaScript Frameworks</h2>
                            
                            <h3>React</h3>
                            <p>React provides several features for building accessible applications:</p>
                            <ul>
                                <li>Use semantic HTML elements with JSX</li>
                                <li>Implement proper focus management for SPAs</li>
                                <li>Consider libraries like react-axe for testing during development</li>
                            </ul>
                            
                            <h3>Vue.js</h3>
                            <p>Vue's official documentation includes accessibility guidance:</p>
                            <ul>
                                <li>Use built-in directives like v-bind and v-model with ARIA attributes</li>
                                <li>Implement focus management for SPAs</li>
                                <li>Consider vue-axe for development-time testing</li>
                            </ul>
                            
                            <h2>Conclusion</h2>
                            <p>Building accessible web applications is not just a nice-to-have feature—it's an essential aspect of web development that benefits all users. By following the WCAG guidelines and implementing the practices outlined in this article, you can create more inclusive, usable, and legally compliant applications.</p>
                            
                            <p>Remember that accessibility is an ongoing process, not a one-time task. Regularly test your applications with a variety of tools and, when possible, with users who have disabilities to ensure you're providing the best possible experience for everyone.</p>
                            
                            <p>Have you implemented accessibility features in your projects? What challenges did you face? Share your experiences in the comments below!</p>
                        `,
      },
    ],
  };

  // Save data to localStorage for demo purposes
  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
}

// Load Blog Post
function loadBlogPost(postId) {
  const portfolioData = JSON.parse(localStorage.getItem("portfolioData"));
  const post = portfolioData.blogs.find((blog) => blog.id == postId);

  if (post) {
    document.getElementById("post-image").src = post.image;
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-date").textContent = post.date;
    document.getElementById("post-author").textContent = post.author;
    document.getElementById("post-category").textContent = post.category;
    document.getElementById("post-content").innerHTML = post.content;
  }
}
