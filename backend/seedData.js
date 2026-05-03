
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');

const courses = [
  {
    title: 'Data Structures and Algorithms',
    description: 'Master the fundamentals of data structures and algorithms for efficient problem-solving',
    modules: [
      { title: 'Introduction to Arrays and Strings', content: 'Learn about arrays, strings, and basic operations like insertion, deletion, and traversal.', order: 1 },
      { title: 'Linked Lists and Stacks', content: 'Understand linked lists, stacks, and their applications in real-world scenarios.', order: 2 },
      { title: 'Queues and Trees', content: 'Explore queues, binary trees, and tree traversal techniques.', order: 3 },
      { title: 'Sorting and Searching', content: 'Master various sorting algorithms and efficient searching techniques.', order: 4 }
    ],
    mcqs: [
      { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 'O(log n)' },
      { question: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correctAnswer: 'Stack' },
      { question: 'What is the height of a balanced binary tree with n nodes?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 'O(log n)' },
      { question: 'Which sorting algorithm has the best average time complexity?', options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'], correctAnswer: 'Quick Sort' },
      { question: 'What is the maximum number of nodes in a binary tree of height h?', options: ['2^h', '2^(h+1)-1', 'h²', 'h'], correctAnswer: '2^(h+1)-1' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Operating Systems',
    description: 'Learn the core concepts of operating systems including processes, memory management, and file systems',
    modules: [
      { title: 'Introduction to Operating Systems', content: 'Understand what operating systems are and their key functions.', order: 1 },
      { title: 'Process Management', content: 'Learn about processes, threads, and process scheduling algorithms.', order: 2 },
      { title: 'Memory Management', content: 'Explore virtual memory, paging, and segmentation.', order: 3 },
      { title: 'File Systems', content: 'Understand file organization, directory structures, and file allocation methods.', order: 4 }
    ],
    mcqs: [
      { question: 'Which scheduling algorithm is optimal?', options: ['FCFS', 'SJF', 'Round Robin', 'Priority'], correctAnswer: 'SJF' },
      { question: 'What is the purpose of virtual memory?', options: ['Increase RAM size', 'Allow programs larger than RAM to run', 'Speed up CPU', 'Store files permanently'], correctAnswer: 'Allow programs larger than RAM to run' },
      { question: 'Which page replacement algorithm suffers from Belady\'s anomaly?', options: ['LRU', 'FIFO', 'Optimal', 'MRU'], correctAnswer: 'FIFO' },
      { question: 'What is a deadlock?', options: ['System crash', 'Process waiting indefinitely', 'Memory overflow', 'Disk failure'], correctAnswer: 'Process waiting indefinitely' },
      { question: 'Which is a file allocation method?', options: ['Linked', 'Stack', 'Queue', 'Tree'], correctAnswer: 'Linked' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Computer Networks',
    description: 'Dive into the world of computer networks, protocols, and internet architecture',
    modules: [
      { title: 'Introduction to Computer Networks', content: 'Learn about network topologies, types, and basic concepts.', order: 1 },
      { title: 'OSI Model', content: 'Understand the seven layers of the OSI model and their functions.', order: 2 },
      { title: 'TCP/IP Protocol Suite', content: 'Explore TCP, IP, UDP, and other key internet protocols.', order: 3 },
      { title: 'Network Security', content: 'Learn about firewalls, encryption, and network security best practices.', order: 4 }
    ],
    mcqs: [
      { question: 'Which layer is responsible for routing?', options: ['Transport', 'Network', 'Data Link', 'Application'], correctAnswer: 'Network' },
      { question: 'What is the full form of TCP?', options: ['Transmission Control Protocol', 'Total Control Protocol', 'Transfer Control Protocol', 'Transmission Computer Protocol'], correctAnswer: 'Transmission Control Protocol' },
      { question: 'Which protocol is connectionless?', options: ['TCP', 'UDP', 'HTTP', 'FTP'], correctAnswer: 'UDP' },
      { question: 'What is the default port for HTTP?', options: ['21', '22', '80', '443'], correctAnswer: '80' },
      { question: 'Which is a network topology?', options: ['Star', 'Stack', 'Queue', 'Tree'], correctAnswer: 'Star' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Database Management Systems (DBMS)',
    description: 'Master database concepts, SQL, normalization, and database design',
    modules: [
      { title: 'Introduction to DBMS', content: 'Learn what databases are and why we need them.', order: 1 },
      { title: 'Relational Databases and SQL', content: 'Understand relational model and SQL queries.', order: 2 },
      { title: 'Normalization', content: 'Learn about normal forms and database normalization.', order: 3 },
      { title: 'Transactions and Concurrency', content: 'Explore ACID properties and concurrency control.', order: 4 }
    ],
    mcqs: [
      { question: 'Which SQL command is used to retrieve data?', options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], correctAnswer: 'SELECT' },
      { question: 'What does ACID stand for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Atomicity, Consistency, Integrity, Durability', 'Automation, Consistency, Isolation, Durability', 'Atomicity, Control, Isolation, Durability'], correctAnswer: 'Atomicity, Consistency, Isolation, Durability' },
      { question: 'Which normal form removes transitive dependencies?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: '3NF' },
      { question: 'What is a primary key?', options: ['Any column', 'Unique identifier for a row', 'Foreign key', 'Index'], correctAnswer: 'Unique identifier for a row' },
      { question: 'Which JOIN returns all rows from both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correctAnswer: 'FULL OUTER JOIN' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Computer Organization and Architecture',
    description: 'Understand the internal workings of computers, CPU architecture, and memory hierarchy',
    modules: [
      { title: 'Introduction to Computer Architecture', content: 'Learn about basic computer components and organization.', order: 1 },
      { title: 'CPU Architecture', content: 'Understand instruction sets, pipelining, and parallel processing.', order: 2 },
      { title: 'Memory Hierarchy', content: 'Explore cache, main memory, and storage systems.', order: 3 },
      { title: 'I/O Systems', content: 'Learn about input/output systems and device management.', order: 4 }
    ],
    mcqs: [
      { question: 'What is the purpose of cache memory?', options: ['Store data permanently', 'Speed up CPU access to data', 'Increase hard disk space', 'Connect peripherals'], correctAnswer: 'Speed up CPU access to data' },
      { question: 'Which is a RISC characteristic?', options: ['Complex instructions', 'Simple instructions', 'Variable length instructions', 'Many addressing modes'], correctAnswer: 'Simple instructions' },
      { question: 'What is pipelining?', options: ['Breaking instructions into stages', 'Storing data in pipeline', 'Sending data over network', 'Printing documents'], correctAnswer: 'Breaking instructions into stages' },
      { question: 'Which is the fastest memory?', options: ['RAM', 'Cache', 'Hard Disk', 'SSD'], correctAnswer: 'Cache' },
      { question: 'What does ALU stand for?', options: ['Arithmetic Logic Unit', 'Advanced Logic Unit', 'Arithmetic Local Unit', 'Automated Logic Unit'], correctAnswer: 'Arithmetic Logic Unit' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Software Engineering',
    description: 'Learn software development lifecycle, design patterns, and best practices',
    modules: [
      { title: 'Introduction to Software Engineering', content: 'Understand software engineering principles and methodologies.', order: 1 },
      { title: 'Software Development Life Cycle', content: 'Learn about SDLC models like Waterfall, Agile, and Scrum.', order: 2 },
      { title: 'Software Design Patterns', content: 'Explore common design patterns and their applications.', order: 3 },
      { title: 'Testing and Maintenance', content: 'Learn about software testing strategies and maintenance.', order: 4 }
    ],
    mcqs: [
      { question: 'Which is an Agile methodology?', options: ['Waterfall', 'Scrum', 'Spiral', 'V-Model'], correctAnswer: 'Scrum' },
      { question: 'What is the first phase of SDLC?', options: ['Design', 'Testing', 'Requirements', 'Implementation'], correctAnswer: 'Requirements' },
      { question: 'Which design pattern ensures only one instance?', options: ['Factory', 'Singleton', 'Observer', 'Decorator'], correctAnswer: 'Singleton' },
      { question: 'What is black box testing?', options: ['Testing internal structure', 'Testing functionality without knowing code', 'Testing performance', 'Testing security'], correctAnswer: 'Testing functionality without knowing code' },
      { question: 'Which UML diagram shows system structure?', options: ['Sequence', 'Use Case', 'Class', 'Activity'], correctAnswer: 'Class' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Web Development (Frontend + Backend)',
    description: 'Become a full-stack web developer with modern technologies',
    modules: [
      { title: 'HTML, CSS, and JavaScript Basics', content: 'Learn the fundamentals of web development.', order: 1 },
      { title: 'Frontend Frameworks (React)', content: 'Build interactive UIs with React.', order: 2 },
      { title: 'Backend Development with Node.js', content: 'Create APIs and servers with Node.js and Express.', order: 3 },
      { title: 'Full-Stack Integration', content: 'Connect frontend and backend, deploy applications.', order: 4 }
    ],
    mcqs: [
      { question: 'Which is used for styling web pages?', options: ['HTML', 'CSS', 'JavaScript', 'Python'], correctAnswer: 'CSS' },
      { question: 'What is React?', options: ['Backend framework', 'Frontend library', 'Database', 'Programming language'], correctAnswer: 'Frontend library' },
      { question: 'Which is a Node.js framework?', options: ['Django', 'Express', 'Flask', 'Spring'], correctAnswer: 'Express' },
      { question: 'What does DOM stand for?', options: ['Data Object Model', 'Document Object Model', 'Digital Object Model', 'Dynamic Object Model'], correctAnswer: 'Document Object Model' },
      { question: 'Which HTTP method is used to update data?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 'PUT' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Mobile Application Development',
    description: 'Learn to build mobile apps for iOS and Android platforms',
    modules: [
      { title: 'Introduction to Mobile Development', content: 'Understand mobile platforms and development approaches.', order: 1 },
      { title: 'Android Development', content: 'Build Android apps using Java/Kotlin.', order: 2 },
      { title: 'iOS Development', content: 'Create iOS apps with Swift and Xcode.', order: 3 },
      { title: 'Cross-Platform Development', content: 'Learn React Native and Flutter for cross-platform apps.', order: 4 }
    ],
    mcqs: [
      { question: 'Which language is used for iOS development?', options: ['Java', 'Kotlin', 'Swift', 'C#'], correctAnswer: 'Swift' },
      { question: 'What is React Native?', options: ['Native iOS framework', 'Native Android framework', 'Cross-platform framework', 'Web framework'], correctAnswer: 'Cross-platform framework' },
      { question: 'Which is Android\'s UI toolkit?', options: ['UIKit', 'Jetpack Compose', 'SwiftUI', 'Flutter'], correctAnswer: 'Jetpack Compose' },
      { question: 'What is an APK?', options: ['iOS app package', 'Android app package', 'Web app', 'Windows app'], correctAnswer: 'Android app package' },
      { question: 'Which company developed Flutter?', options: ['Apple', 'Google', 'Facebook', 'Microsoft'], correctAnswer: 'Google' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Artificial Intelligence and Machine Learning',
    description: 'Explore AI, ML, deep learning, and build intelligent systems',
    modules: [
      { title: 'Introduction to AI and ML', content: 'Understand the basics of artificial intelligence and machine learning.', order: 1 },
      { title: 'Machine Learning Algorithms', content: 'Learn supervised, unsupervised, and reinforcement learning.', order: 2 },
      { title: 'Deep Learning', content: 'Explore neural networks, CNNs, RNNs, and transformers.', order: 3 },
      { title: 'Practical ML Projects', content: 'Build real-world ML applications with Python.', order: 4 }
    ],
    mcqs: [
      { question: 'Which is a supervised learning algorithm?', options: ['K-means', 'Linear Regression', 'PCA', 'DBSCAN'], correctAnswer: 'Linear Regression' },
      { question: 'What is a neural network?', options: ['Biological network', 'Computational model inspired by brain', 'Database', 'Operating system'], correctAnswer: 'Computational model inspired by brain' },
      { question: 'Which library is used for ML in Python?', options: ['React', 'TensorFlow', 'Express', 'Django'], correctAnswer: 'TensorFlow' },
      { question: 'What does CNN stand for?', options: ['Convolutional Neural Network', 'Central Neural Network', 'Computer Neural Network', 'Complex Neural Network'], correctAnswer: 'Convolutional Neural Network' },
      { question: 'Which is used for classification?', options: ['Linear Regression', 'Logistic Regression', 'PCA', 'K-means'], correctAnswer: 'Logistic Regression' }
    ],
    passingCriteria: 60
  },
  {
    title: 'Cybersecurity and Ethical Hacking',
    description: 'Learn cybersecurity principles, ethical hacking, and how to protect systems',
    modules: [
      { title: 'Introduction to Cybersecurity', content: 'Understand threats, vulnerabilities, and security fundamentals.', order: 1 },
      { title: 'Ethical Hacking Methodology', content: 'Learn reconnaissance, scanning, and enumeration.', order: 2 },
      { title: 'Web Application Security', content: 'Explore OWASP Top 10 and secure coding practices.', order: 3 },
      { title: 'Network Security', content: 'Learn about firewalls, IDS, IPS, and secure networks.', order: 4 }
    ],
    mcqs: [
      { question: 'What is phishing?', options: ['Fishing activity', 'Fraudulent attempt to get sensitive info', 'Malware', 'Firewall'], correctAnswer: 'Fraudulent attempt to get sensitive info' },
      { question: 'Which is a symmetric encryption algorithm?', options: ['RSA', 'AES', 'ECC', 'DSA'], correctAnswer: 'AES' },
      { question: 'What does OWASP stand for?', options: ['Open Web Application Security Project', 'Online Web Application Security Project', 'Open World Application Security Project', 'Open Web Advanced Security Project'], correctAnswer: 'Open Web Application Security Project' },
      { question: 'Which is a SQL injection?', options: ['Database backup', 'Attack that injects SQL code', 'Encryption method', 'Firewall rule'], correctAnswer: 'Attack that injects SQL code' },
      { question: 'What is a firewall?', options: ['Malware', 'Network security device', 'Database', 'Web server'], correctAnswer: 'Network security device' }
    ],
    passingCriteria: 60
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Course.deleteMany({});
    await User.deleteMany({});

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    for (let course of courses) {
      course.createdBy = admin._id;
    }

    await Course.insertMany(courses);
    console.log('Data seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
