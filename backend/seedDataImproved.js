
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');

const courses = [
  {
    title: 'Data Structures and Algorithms',
    description: 'Master the fundamentals of data structures and algorithms for efficient problem-solving. This comprehensive course covers arrays, linked lists, stacks, queues, trees, and sorting algorithms with practical examples.',
    modules: [
      {
        title: 'Introduction to Arrays and Strings',
        content: `## Introduction to Arrays and Strings\n\n### What is an Array?\nAn array is a data structure that stores a collection of elements of the same type in contiguous memory locations. Arrays provide random access to elements using an index, which makes them extremely efficient for certain operations.\n\n### Key Concepts:\n- **Indexing**: Elements are accessed using their position (index) starting from 0\n- **Contiguous Memory**: All elements are stored in adjacent memory locations\n- **Fixed Size**: Traditional arrays have a fixed size defined at creation\n- **Homogeneous Elements**: All elements must be of the same data type\n\n### Real-world Example:\nImagine you need to store the scores of 5 students in a class. Instead of creating 5 separate variables, you can use an array: const scores = [85, 92, 78, 90, 88];\n\n### Strings as Character Arrays:\nStrings are essentially arrays of characters. In many programming languages, strings are implemented as arrays of characters with a null terminator.\n\n### Common Operations:\n1. **Access**: O(1) time complexity\n2. **Insertion**: O(n) time complexity (shifting elements)\n3. **Deletion**: O(n) time complexity\n4. **Search**: O(n) time complexity for linear search\n\n### Summary:\nArrays are fundamental data structures that offer fast access but have limitations in insertion and deletion. Understanding arrays is crucial for building more complex data structures.`,
        order: 1
      },
      {
        title: 'Linked Lists and Stacks',
        content: `## Linked Lists and Stacks\n\n### What is a Linked List?\nA linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (or pointer) to the next node in the sequence.\n\n### Key Concepts of Linked Lists:\n- **Nodes**: Each element is a node with data and a next pointer\n- **Head**: The first node in the list\n- **Tail**: The last node in the list (points to null)\n- **Dynamic Size**: Can grow or shrink during runtime\n- **Non-contiguous Memory**: Nodes can be anywhere in memory\n\n### Types of Linked Lists:\n1. **Singly Linked List**: Each node has a pointer to the next node\n2. **Doubly Linked List**: Each node has pointers to both next and previous nodes\n3. **Circular Linked List**: Last node points back to the head\n\n### What is a Stack?\nA stack is a linear data structure that follows the LIFO (Last-In-First-Out) principle. The last element added is the first one to be removed.\n\n### Key Stack Operations:\n- **Push**: Add an element to the top of the stack\n- **Pop**: Remove the top element from the stack\n- **Peek/Top**: View the top element without removing it\n- **isEmpty**: Check if the stack is empty\n\n### Real-world Example of Stack:\nImagine a stack of plates. You can only add or remove plates from the top. This is exactly how a stack data structure works!\n\n### Common Applications of Stacks:\n1. Function call management in programming languages\n2. Undo/Redo operations in editors\n3. Expression evaluation (infix to postfix conversion)\n4. Backtracking algorithms\n\n### Summary:\nLinked lists provide dynamic size but slower access times. Stacks are essential for many algorithms and system designs. Mastering these data structures is fundamental to computer science.`,
        order: 2
      },
      {
        title: 'Queues and Trees',
        content: `## Queues and Trees\n\n### What is a Queue?\nA queue is a linear data structure that follows the FIFO (First-In-First-Out) principle. The first element added is the first one to be removed.\n\n### Key Queue Operations:\n- **Enqueue**: Add an element to the rear of the queue\n- **Dequeue**: Remove an element from the front of the queue\n- **Front/Peek**: View the front element without removing it\n- **Rear**: View the rear element without removing it\n- **isEmpty**: Check if the queue is empty\n\n### Real-world Example of Queue:\nThink of people standing in a line at a ticket counter. The first person in line gets served first, and new people join at the end.\n\n### What is a Tree?\nA tree is a hierarchical data structure consisting of nodes connected by edges. It has a root node, and each node can have child nodes.\n\n### Key Tree Terminology:\n- **Root**: The topmost node of the tree\n- **Parent**: A node that has child nodes\n- **Child**: A node that has a parent node\n- **Leaf**: A node with no children\n- **Depth**: Number of edges from root to a node\n- **Height**: Number of edges from a node to the deepest leaf\n\n### Binary Trees:\nA binary tree is a tree where each node can have at most two children (left and right).\n\n### Types of Binary Trees:\n1. **Full Binary Tree**: Every node has 0 or 2 children\n2. **Complete Binary Tree**: All levels except possibly the last are completely filled\n3. **Perfect Binary Tree**: All internal nodes have 2 children and all leaves are at the same level\n4. **Binary Search Tree (BST)**: For every node, left child < parent < right child\n\n### Tree Traversal:\n1. **In-order**: Left → Root → Right (gives sorted order for BST)\n2. **Pre-order**: Root → Left → Right\n3. **Post-order**: Left → Right → Root\n\n### Summary:\nQueues are used for order-based processing, while trees enable hierarchical data representation and efficient searching. Both are crucial for many algorithms and applications.`,
        order: 3
      },
      {
        title: 'Sorting and Searching Algorithms',
        content: `## Sorting and Searching Algorithms\n\n### What is Sorting?\nSorting is the process of arranging elements in a specific order (ascending or descending). It's one of the most fundamental operations in computer science.\n\n### Common Sorting Algorithms:\n\n#### 1. Bubble Sort\n- **How it works**: Repeatedly swap adjacent elements if they are in wrong order\n- **Time Complexity**: O(n²)\n- **Space Complexity**: O(1)\n- **Best for**: Small datasets or educational purposes\n\n#### 2. Selection Sort\n- **How it works**: Find minimum element and place it at the beginning\n- **Time Complexity**: O(n²)\n- **Space Complexity**: O(1)\n- **Best for**: Small datasets\n\n#### 3. Insertion Sort\n- **How it works**: Build sorted array one element at a time\n- **Time Complexity**: O(n²)\n- **Space Complexity**: O(1)\n- **Best for**: Small or nearly sorted datasets\n\n#### 4. Quick Sort\n- **How it works**: Choose a pivot and partition array around it\n- **Time Complexity**: O(n log n) average, O(n²) worst\n- **Space Complexity**: O(log n)\n- **Best for**: Most cases (very efficient in practice)\n\n#### 5. Merge Sort\n- **How it works**: Divide array into halves, sort, and merge\n- **Time Complexity**: O(n log n)\n- **Space Complexity**: O(n)\n- **Best for**: Stable sort required\n\n### What is Searching?\nSearching is the process of finding a specific element in a data structure.\n\n### Common Searching Algorithms:\n\n#### 1. Linear Search\n- **How it works**: Check each element sequentially\n- **Time Complexity**: O(n)\n- **Best for**: Unsorted arrays\n\n#### 2. Binary Search\n- **How it works**: Repeatedly divide search interval in half\n- **Time Complexity**: O(log n)\n- **Requirement**: Array must be sorted\n- **Best for**: Large sorted datasets\n\n### Real-world Example:\nImagine searching for a word in a dictionary. You don't check every page sequentially (linear search). Instead, you open the middle and decide whether to go left or right (binary search)!\n\n### Summary:\nUnderstanding sorting and searching algorithms is crucial for optimizing program performance. Choose the right algorithm based on your data size and requirements!`,
        order: 4
      }
    ],
    mcqs: [
      {
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        question: 'Which data structure follows the LIFO (Last-In-First-Out) principle?',
        options: ['Queue', 'Stack', 'Linked List', 'Tree'],
        correctAnswer: 'Stack'
      },
      {
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 'O(log n)'
      },
      {
        question: 'In a binary search tree (BST), what is the relationship between a parent node and its right child?',
        options: ['Right child < Parent', 'Right child > Parent', 'Right child = Parent', 'No relationship'],
        correctAnswer: 'Right child > Parent'
      },
      {
        question: 'Which sorting algorithm has an average time complexity of O(n log n)?',
        options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
        correctAnswer: 'Quick Sort'
      },
      {
        question: 'Which data structure is best suited for implementing a function call stack?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 'Stack'
      },
      {
        question: 'What is the main advantage of linked lists over arrays?',
        options: ['Faster access', 'Dynamic size', 'Less memory', 'Simpler implementation'],
        correctAnswer: 'Dynamic size'
      },
      {
        question: 'Which tree traversal gives elements in sorted order for a binary search tree?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswer: 'In-order'
      }
    ],
    passingCriteria: 60
  },
  {
    title: 'Operating Systems',
    description: 'Learn the core concepts of operating systems including processes, memory management, file systems, and deadlocks. Understand how OS manages hardware resources and provides an interface for applications.',
    modules: [
      {
        title: 'Introduction to Operating Systems',
        content: `## Introduction to Operating Systems\n\n### What is an Operating System?\nAn Operating System (OS) is a system software that manages computer hardware, software resources, and provides common services for computer programs. It acts as an intermediary between users and the computer hardware.\n\n### Key Concepts:\n- **Resource Manager**: Manages CPU, memory, storage, and I/O devices\n- **Abstraction**: Hides hardware complexity from users\n- **Control Program**: Controls execution of programs\n- **Interface**: Provides user and application interfaces\n\n### Functions of an OS:\n1. **Process Management**: Creates, schedules, and terminates processes\n2. **Memory Management**: Allocates and deallocates memory space\n3. **File Management**: Manages files, directories, and storage\n4. **Device Management**: Controls I/O devices\n5. **Security**: Protects system from unauthorized access\n\n### Real-world Example:\nThink of an OS as the manager of a restaurant. It manages tables (memory), assigns chefs (CPU), takes orders (processes), and ensures everything runs smoothly without conflicts.\n\n### Types of Operating Systems:\n1. **Batch OS**: Processes jobs in batches without user interaction\n2. **Time-sharing OS**: Multiple users share resources simultaneously\n3. **Distributed OS**: Manages a group of independent computers\n4. **Real-time OS**: Responds to events within strict time constraints\n5. **Multi-threading OS**: Supports multiple threads within a single process\n\n### Summary:\nOperating systems are essential for running computers. They make hardware usable, manage resources efficiently, and provide a platform for applications to run.`,
        order: 1
      },
      {
        title: 'Process Management and Scheduling',
        content: `## Process Management and Scheduling\n\n### What is a Process?\nA process is a program in execution. It's more than just the code - it includes the current activity, program counter, registers, stack, data section, and heap.\n\n### Process States:\n1. **New**: Process is being created\n2. **Ready**: Process is waiting to be assigned to a processor\n3. **Running**: Instructions are being executed\n4. **Waiting**: Process is waiting for an event (I/O, signal, etc.)\n5. **Terminated**: Process has finished execution\n\n### Process Control Block (PCB):\nEach process has a PCB that stores:\n- Process state\n- Program counter\n- CPU registers\n- CPU scheduling information\n- Memory management information\n- I/O status information\n- Accounting information\n\n### What is CPU Scheduling?\nCPU scheduling is the process of selecting a waiting process from the ready queue and allocating the CPU to it.\n\n### Scheduling Criteria:\n1. **CPU Utilization**: Keep CPU as busy as possible\n2. **Throughput**: Number of processes completed per time unit\n3. **Turnaround Time**: Time from submission to completion\n4. **Waiting Time**: Time spent waiting in ready queue\n5. **Response Time**: Time from submission to first response\n\n### Common Scheduling Algorithms:\n1. **First-Come, First-Served (FCFS)**: Processes are served in order of arrival\n2. **Shortest Job First (SJF)**: Shortest process gets priority\n3. **Priority Scheduling**: Each process has a priority; highest priority runs first\n4. **Round Robin (RR)**: Each process gets a fixed time slice (quantum)\n\n### Real-world Example:\nImagine a bank with one teller. FCFS is like serving customers in line order. SJF is like serving customers with quick transactions first. Round Robin is like giving each customer 5 minutes at a time.\n\n### Summary:\nProcess management is crucial for multi-tasking. Scheduling algorithms determine how efficiently the CPU is utilized and how responsive the system feels to users.`,
        order: 2
      },
      {
        title: 'Memory Management',
        content: `## Memory Management\n\n### What is Memory Management?\nMemory management is the process of coordinating and controlling computer memory, assigning portions called blocks to various running programs to optimize overall system performance.\n\n### Key Concepts:\n- **Logical Address**: Address generated by the CPU (virtual address)\n- **Physical Address**: Actual address in memory hardware\n- **Address Binding**: Mapping logical to physical addresses\n- **Swapping**: Moving processes between main memory and disk\n\n### Memory Allocation Methods:\n1. **Contiguous Allocation**: Each process is in a single contiguous block\n   - Single partition: Only one process in memory\n   - Multiple partitions: Memory divided into fixed or variable partitions\n\n2. **Paging**: Physical memory divided into fixed-size frames; logical memory divided into pages of the same size\n   - Page table maps pages to frames\n   - No external fragmentation\n   - Internal fragmentation possible\n\n3. **Segmentation**: Logical address space divided into segments (code, data, stack, heap)\n   - Each segment has a name and length\n   - Addresses specify segment name and offset\n   - No internal fragmentation\n   - External fragmentation possible\n\n### What is Virtual Memory?\nVirtual memory is a technique that allows execution of processes that may not be entirely in memory. It gives the illusion of a very large main memory.\n\n### Demand Paging:\n- Pages are loaded only when needed\n- Page fault occurs when required page is not in memory\n- OS fetches the page from disk\n\n### Page Replacement Algorithms:\n1. **FIFO (First-In-First-Out)**: Replace oldest page\n2. **Optimal**: Replace page that won't be used for longest time\n3. **LRU (Least Recently Used)**: Replace page that hasn't been used for longest time\n4. **LFU (Least Frequently Used)**: Replace page with lowest frequency\n\n### Real-world Example:\nVirtual memory is like a library. You don't need all books on your desk at once. You keep the ones you're using, and get more from the shelf when needed.\n\n### Summary:\nMemory management ensures efficient use of RAM. Virtual memory allows systems to run larger programs than physical memory would otherwise allow.`,
        order: 3
      },
      {
        title: 'File Systems and Deadlocks',
        content: `## File Systems and Deadlocks\n\n### What is a File System?\nA file system is a method and data structure that the operating system uses to control how data is stored and retrieved. It manages files and directories on storage devices.\n\n### File Concepts:\n- **File**: Named collection of related information\n- **Attributes**: Name, type, location, size, protection, time\n- **Operations**: Create, read, write, delete, open, close, append, truncate\n\n### Access Methods:\n1. **Sequential Access**: Data is accessed in order, one record after another\n2. **Direct Access**: Data can be accessed directly by record number\n3. **Indexed Access**: Uses an index to find records quickly\n\n### Directory Structure:\n- **Single-level directory**: All files in one directory\n- **Two-level directory**: Each user has own directory\n- **Tree-structured directory**: Hierarchical structure with root and subdirectories\n- **Acyclic-graph directory**: Allow sharing of files and directories\n\n### Allocation Methods:\n1. **Contiguous Allocation**: Each file occupies contiguous blocks\n2. **Linked Allocation**: Each block contains a pointer to next block\n3. **Indexed Allocation**: All pointers collected in index block\n\n### What is a Deadlock?\nA deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process in the set.\n\n### Deadlock Conditions (Coffman Conditions):\n1. **Mutual Exclusion**: Only one process can use a resource at a time\n2. **Hold and Wait**: Process holds resources while waiting for others\n3. **No Preemption**: Resources cannot be taken away forcibly\n4. **Circular Wait**: Circular chain of processes waiting for each other\n\n### Deadlock Handling:\n1. **Deadlock Prevention**: Ensure at least one condition never holds\n2. **Deadlock Avoidance**: Safely grant requests if system remains safe\n3. **Deadlock Detection and Recovery**: Detect and recover from deadlocks\n4. **Ignore the Problem**: Pretend deadlocks never happen (most common!)\n\n### Real-world Example of Deadlock:\nTwo people reaching for a salt and pepper shaker at the same time. One has the salt, waiting for pepper. The other has pepper, waiting for salt. Neither will give up what they have.\n\n### Summary:\nFile systems organize and manage data on storage devices. Deadlocks are critical problems that can freeze systems, and understanding how to prevent or recover from them is essential.`,
        order: 4
      }
    ],
    mcqs: [
      {
        question: 'Which scheduling algorithm is optimal in terms of minimizing average waiting time?',
        options: ['FCFS', 'SJF', 'Round Robin', 'Priority'],
        correctAnswer: 'SJF'
      },
      {
        question: 'What is the purpose of virtual memory?',
        options: ['Increase physical RAM size', 'Allow programs larger than RAM to run', 'Speed up the CPU', 'Store files permanently'],
        correctAnswer: 'Allow programs larger than RAM to run'
      },
      {
        question: 'Which page replacement algorithm suffers from Belady\'s anomaly?',
        options: ['LRU', 'FIFO', 'Optimal', 'LFU'],
        correctAnswer: 'FIFO'
      },
      {
        question: 'What is a deadlock?',
        options: ['System crash', 'Processes waiting indefinitely for each other', 'Memory overflow', 'Disk failure'],
        correctAnswer: 'Processes waiting indefinitely for each other'
      },
      {
        question: 'Which is NOT a necessary condition for deadlock?',
        options: ['Mutual Exclusion', 'Hold and Wait', 'Circular Wait', 'Priority Scheduling'],
        correctAnswer: 'Priority Scheduling'
      },
      {
        question: 'Which memory allocation method has no external fragmentation?',
        options: ['Contiguous', 'Paging', 'Segmentation', 'Swapping'],
        correctAnswer: 'Paging'
      },
      {
        question: 'What is the first step in process lifecycle?',
        options: ['Ready', 'Running', 'New', 'Waiting'],
        correctAnswer: 'New'
      },
      {
        question: 'Which file allocation method is best for direct access?',
        options: ['Contiguous', 'Linked', 'Indexed', 'Sequential'],
        correctAnswer: 'Indexed'
      }
    ],
    passingCriteria: 60
  },
  {
    title: 'Computer Networks',
    description: 'Dive into the world of computer networks, protocols, and internet architecture. Learn about OSI model, TCP/IP, routing, switching, and network security fundamentals.',
    modules: [
      {
        title: 'Introduction to Computer Networks',
        content: `## Introduction to Computer Networks\n\n### What is a Computer Network?\nA computer network is a set of computers connected together for the purpose of sharing resources. Resources can include files, printers, applications, or an internet connection.\n\n### Key Concepts:\n- **Node**: Any device connected to the network (computer, printer, router)\n- **Link**: Connection between nodes\n- **Protocol**: Set of rules governing communication\n- **Topology**: Physical or logical arrangement of network\n\n### Network Types by Size:\n1. **PAN (Personal Area Network)**: Devices around a single person (Bluetooth)\n2. **LAN (Local Area Network)**: Devices in a small geographic area (office, home)\n3. **MAN (Metropolitan Area Network)**: Network across a city\n4. **WAN (Wide Area Network)**: Network across large geographic distance (Internet)\n\n### Network Topologies:\n1. **Bus**: All nodes connected to single cable\n2. **Star**: All nodes connected to central hub\n3. **Ring**: Nodes connected in circular fashion\n4. **Mesh**: Each node connected to every other node\n5. **Tree**: Hierarchical star topology\n6. **Hybrid**: Combination of two or more topologies\n\n### Real-world Example:\nYour home Wi-Fi network is a LAN. Your phone connecting to your smart speaker is a PAN. The internet connecting millions of devices worldwide is a WAN.\n\n### What is the Internet?\nThe Internet is the global system of interconnected computer networks that use the Internet protocol suite (TCP/IP) to link devices worldwide.\n\n### Benefits of Networks:\n1. **Resource Sharing**: Share files, printers, and internet\n2. **Communication**: Email, messaging, video calls\n3. **Backup**: Centralized data backup\n4. **Cost Savings**: Share expensive resources\n\n### Summary:\nComputer networks enable communication and resource sharing between devices. From small home networks to the global Internet, networks are fundamental to modern computing.`,
        order: 1
      },
      {
        title: 'OSI Model and TCP/IP Suite',
        content: `## OSI Model and TCP/IP Suite\n\n### What is the OSI Model?\nThe Open Systems Interconnection (OSI) model is a conceptual framework that describes network communication in 7 layers. Each layer serves a specific function and only communicates with layers immediately above and below.\n\n### OSI 7 Layers:\n\n#### Layer 7: Application Layer\n- Directly interacts with end-user applications\n- Provides network services to applications\n- Protocols: HTTP, HTTPS, FTP, SMTP, DNS\n\n#### Layer 6: Presentation Layer\n- Translates data between application and network formats\n- Encryption, compression, data conversion\n- Example: Converting text to ASCII\n\n#### Layer 5: Session Layer\n- Manages sessions between applications\n- Establishes, maintains, terminates connections\n- Example: Keeping a login session alive\n\n#### Layer 4: Transport Layer\n- Provides reliable or unreliable delivery\n- Segmentation and reassembly\n- Port numbers for application addressing\n- Protocols: TCP (reliable), UDP (unreliable)\n\n#### Layer 3: Network Layer\n- Routes packets between networks\n- Logical addressing (IP addresses)\n- Protocols: IP, ICMP, ARP\n- Devices: Routers\n\n#### Layer 2: Data Link Layer\n- Provides error-free transfer of data frames\n- Physical addressing (MAC addresses)\n- Protocols: Ethernet, Wi-Fi\n- Devices: Switches, bridges\n\n#### Layer 1: Physical Layer\n- Transmits raw bits over physical medium\n- Electrical, mechanical, physical specifications\n- Examples: Cables, voltages, pinouts\n- Devices: Hubs, repeaters\n\n### What is TCP/IP?\nTCP/IP (Transmission Control Protocol/Internet Protocol) is the protocol suite used by the Internet. It's a condensed version of OSI with 4 layers:\n\n1. **Application Layer**: Combines OSI 5-7\n2. **Transport Layer**: TCP, UDP\n3. **Internet Layer**: IP, ICMP, ARP\n4. **Link Layer**: Combines OSI 1-2\n\n### Real-world Example:\nWhen you visit a website:\n1. Application layer (HTTP): Request webpage\n2. Transport layer (TCP): Reliable delivery\n3. Network layer (IP): Find route to server\n4. Data Link/Physical: Send bits over cables/Wi-Fi\n\n### Summary:\nThe OSI model provides a framework for understanding network communication. TCP/IP is the practical implementation that powers the Internet today.`,
        order: 2
      },
      {
        title: 'IP Addressing and Routing',
        content: `## IP Addressing and Routing\n\n### What is an IP Address?\nAn IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.\n\n### IPv4 Addresses:\n- 32-bit address\n- Written as 4 decimal numbers (0-255) separated by dots\n- Example: 192.168.1.1\n- Total: ~4.3 billion addresses\n\n### IPv4 Classes:\n- **Class A**: 0.0.0.0 to 127.255.255.255 (large networks)\n- **Class B**: 128.0.0.0 to 191.255.255.255 (medium networks)\n- **Class C**: 192.0.0.0 to 223.255.255.255 (small networks)\n- **Class D**: 224.0.0.0 to 239.255.255.255 (multicast)\n- **Class E**: 240.0.0.0 to 255.255.255.255 (reserved)\n\n### CIDR (Classless Inter-Domain Routing):\n- Flexible allocation of IP addresses\n- Format: IP/prefix (e.g., 192.168.1.0/24)\n- Prefix indicates number of network bits\n\n### Private IP Addresses (RFC 1918):\n- Not routable on public Internet\n- Used in home/office networks\n- Ranges:\n  - 10.0.0.0/8\n  - 172.16.0.0/12\n  - 192.168.0.0/16\n\n### IPv6 Addresses:\n- 128-bit address\n- Written as 8 groups of 4 hexadecimal digits\n- Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334\n- Can be shortened: 2001:db8:85a3::8a2e:370:7334\n- Total: 3.4×10³⁸ addresses\n\n### What is Routing?\nRouting is the process of selecting paths in a network along which to send network traffic.\n\n### Routing Protocols:\n- **RIP (Routing Information Protocol)**: Distance vector, hop count metric\n- **OSPF (Open Shortest Path First)**: Link state, Dijkstra's algorithm\n- **BGP (Border Gateway Protocol)**: Path vector, Internet routing\n\n### Real-world Example:\nYour home router uses NAT (Network Address Translation) to allow multiple devices to share one public IP address. It maps private IPs (192.168.1.x) to your public IP.\n\n### Summary:\nIP addressing uniquely identifies devices on networks. Routing determines how data gets from source to destination across the Internet.`,
        order: 3
      },
      {
        title: 'Network Security and Protocols',
        content: `## Network Security and Protocols\n\n### What is Network Security?\nNetwork security consists of policies and practices adopted to prevent and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.\n\n### Common Threats:\n1. **Malware**: Malicious software (viruses, worms, trojans, ransomware)\n2. **Phishing**: Fraudulent attempts to obtain sensitive information\n3. **Denial of Service (DoS)**: Overwhelm system to make it unavailable\n4. **Man-in-the-Middle (MITM)**: Intercept communication between two parties\n5. **SQL Injection**: Attack databases through malicious SQL queries\n6. **Cross-Site Scripting (XSS)**: Inject malicious scripts into web pages\n\n### Security Measures:\n1. **Firewalls**: Monitor and control incoming/outgoing network traffic\n2. **Encryption**: Encode data so only authorized parties can read it\n3. **Antivirus/Antimalware**: Detect and remove malicious software\n4. **Authentication**: Verify user identity (passwords, 2FA, biometrics)\n5. **Access Control**: Limit access to authorized users\n6. **Intrusion Detection/Prevention**: Monitor and block attacks\n\n### Important Protocols:\n\n#### TCP (Transmission Control Protocol):\n- Connection-oriented\n- Reliable delivery (acknowledgments, retransmissions)\n- Flow control\n- Congestion control\n- Used for: Web, email, file transfer\n\n#### UDP (User Datagram Protocol):\n- Connectionless\n- Unreliable (no guarantees)\n- Faster than TCP\n- Used for: Video streaming, gaming, DNS\n\n#### HTTP (Hypertext Transfer Protocol):\n- Foundation of data communication on web\n- Stateless protocol\n- Port 80\n- **HTTPS**: Secure version with encryption (TLS/SSL), Port 443\n\n#### DNS (Domain Name System):\n- Translates domain names to IP addresses\n- "Phone book" of the Internet\n- Port 53\n- Example: google.com → 142.250.190.14\n\n#### FTP (File Transfer Protocol):\n- Transfer files between computers\n- Ports 20 (data), 21 (control)\n- **SFTP**: Secure FTP over SSH\n\n#### SMTP/POP3/IMAP:\n- **SMTP**: Send email (Port 25)\n- **POP3**: Receive email, download and delete (Port 110)\n- **IMAP**: Receive email, keep on server (Port 143)\n\n### Real-world Example:\nWhen you browse to https://bank.com:\n1. DNS finds bank.com's IP\n2. HTTPS encrypts your connection\n3. Firewall at bank protects their network\n4. Authentication verifies your login\n\n### Summary:\nNetwork security protects systems from threats. Understanding protocols helps you understand how the Internet works and how to keep it secure.`,
        order: 4
      }
    ],
    mcqs: [
      {
        question: 'Which OSI layer is responsible for routing packets between networks?',
        options: ['Transport', 'Network', 'Data Link', 'Application'],
        correctAnswer: 'Network'
      },
      {
        question: 'What protocol provides reliable, connection-oriented delivery?',
        options: ['UDP', 'TCP', 'HTTP', 'DNS'],
        correctAnswer: 'TCP'
      },
      {
        question: 'Which protocol translates domain names to IP addresses?',
        options: ['HTTP', 'FTP', 'DNS', 'SMTP'],
        correctAnswer: 'DNS'
      },
      {
        question: 'What is the default port for HTTPS?',
        options: ['80', '21', '443', '25'],
        correctAnswer: '443'
      },
      {
        question: 'Which IP address range is private (not routable on Internet)?',
        options: ['8.8.8.8', '192.168.1.1', '1.1.1.1', '8.8.4.4'],
        correctAnswer: '192.168.1.1'
      },
      {
        question: 'Which network topology has all nodes connected to a central hub?',
        options: ['Bus', 'Star', 'Ring', 'Mesh'],
        correctAnswer: 'Star'
      },
      {
        question: 'What does UDP stand for?',
        options: ['User Datagram Protocol', 'Universal Data Protocol', 'Unreliable Delivery Protocol', 'User Data Protocol'],
        correctAnswer: 'User Datagram Protocol'
      },
      {
        question: 'Which protocol is used for sending email?',
        options: ['POP3', 'IMAP', 'SMTP', 'FTP'],
        correctAnswer: 'SMTP'
      }
    ],
    passingCriteria: 60
  },
  {
    title: 'Database Management Systems (DBMS)',
    description: 'Master database concepts, SQL, normalization, transactions, and database design. Learn to build efficient, scalable databases for modern applications.',
    modules: [
      {
        title: 'Introduction to DBMS',
        content: `## Introduction to DBMS\n\n### What is a Database?\nA database is a collection of related data. Data is facts that can be recorded and have implicit meaning.\n\n### What is DBMS?\nA Database Management System (DBMS) is a software system that enables users to define, create, maintain, and control access to the database.\n\n### Key Concepts:\n- **Data**: Raw facts and figures\n- **Information**: Processed data that has meaning\n- **Database**: Organized collection of data\n- **DBMS**: Software to manage databases\n- **Database System**: Database + DBMS + Applications\n\n### Traditional File System vs DBMS:\n\n#### File System:\n- Data stored in separate files\n- Each file has its own format\n- Data redundancy and inconsistency\n- Difficult to share data\n- No security\n- No atomicity\n- No concurrency control\n\n#### DBMS:\n- Data centralized in database\n- Uniform format\n- Redundancy controlled\n- Easy data sharing\n- Security mechanisms\n- Atomic transactions\n- Concurrency control\n\n### Advantages of DBMS:\n1. **Controlling Redundancy**: Avoids duplicate data\n2. **Restricting Unauthorized Access**: Security mechanisms\n3. **Providing Backup and Recovery**: Prevents data loss\n4. **Enforcing Integrity Constraints**: Ensures data accuracy\n5. **Providing Multiple User Interfaces**: Different views for different users\n\n### Database Users:\n1. **Database Administrators (DBA)**: Manage the database\n2. **Database Designers**: Design database structure\n3. **End Users**: Use the database\n4. **Application Programmers**: Write applications that access database\n5. **System Analysts**: Specify requirements\n\n### Real-world Example:\nA university database stores student info, courses, grades, etc. Without DBMS, each department might have separate files, leading to duplicates and inconsistencies. With DBMS, everyone uses one consistent database.\n\n### Types of DBMS:\n1. **Relational DBMS (RDBMS)**: Tables with relations (MySQL, PostgreSQL, Oracle)\n2. **NoSQL DBMS**: Non-relational (MongoDB, Cassandra, Redis)\n3. **Hierarchical**: Tree-like structure\n4. **Network**: Graph-like structure\n5. **Object-oriented**: Store objects\n\n### Summary:\nDBMS provides efficient, reliable, and secure way to store and retrieve data. It solves many problems of traditional file systems and is essential for modern applications.`,
        order: 1
      },
      {
        title: 'Relational Model and SQL',
        content: `## Relational Model and SQL\n\n### What is the Relational Model?\nThe relational model represents data as relations (tables). Each relation has attributes (columns) and tuples (rows). It's the most widely used data model today.\n\n### Key Terms:\n- **Relation**: A table\n- **Tuple**: A row in a table\n- **Attribute**: A column in a table\n- **Domain**: Set of allowed values for an attribute\n- **Degree**: Number of attributes (columns)\n- **Cardinality**: Number of tuples (rows)\n\n### Properties of Relations:\n1. **Unique Tuples**: No duplicate rows\n2. **Atomic Values**: Each cell contains single value\n3. **Unique Attribute Names**: No duplicate column names\n4. **Order of Tuples Doesn't Matter**: Rows can be in any order\n5. **Order of Attributes Doesn't Matter**: Columns can be in any order\n\n### Keys in Relational Model:\n1. **Super Key**: Any set of attributes that uniquely identifies a tuple\n2. **Candidate Key**: Minimal super key\n3. **Primary Key**: Selected candidate key\n4. **Alternate Key**: Candidate keys not selected as primary\n5. **Foreign Key**: Attribute that refers to primary key of another table\n\n### What is SQL?\nSQL (Structured Query Language) is a standard language for accessing and manipulating databases.\n\n### SQL Categories:\n1. **DDL (Data Definition Language)**: Define database structure\n   - CREATE, ALTER, DROP, TRUNCATE\n\n2. **DML (Data Manipulation Language)**: Manipulate data\n   - INSERT, UPDATE, DELETE\n\n3. **DQL (Data Query Language)**: Query data\n   - SELECT\n\n4. **DCL (Data Control Language)**: Control access\n   - GRANT, REVOKE\n\n5. **TCL (Transaction Control Language)**: Manage transactions\n   - COMMIT, ROLLBACK, SAVEPOINT\n\n### Basic SELECT Statement:\n\`\`\`sql\nSELECT column1, column2\nFROM table_name\nWHERE condition\nORDER BY column\nLIMIT number;\n\`\`\`\n\n### JOINs:\n1. **INNER JOIN**: Returns rows when there's match in both tables\n2. **LEFT JOIN**: Returns all rows from left table, matching from right\n3. **RIGHT JOIN**: Returns all rows from right table, matching from left\n4. **FULL OUTER JOIN**: Returns all rows when there's match in either\n\n### Real-world Example:\nA simple e-commerce database might have tables:\n- Customers (customer_id, name, email)\n- Orders (order_id, customer_id, order_date, total)\n- Products (product_id, name, price)\n- Order_Items (order_id, product_id, quantity)\n\n### Summary:\nThe relational model organizes data in tables with relationships. SQL is the powerful language used to query and manipulate relational databases.`,
        order: 2
      },
      {
        title: 'Normalization and Database Design',
        content: `## Normalization and Database Design\n\n### What is Normalization?\nNormalization is the process of organizing data in a database to minimize redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them.\n\n### Why Normalize?\n1. **Eliminate Redundant Data**: Avoid storing same data multiple times\n2. **Ensure Data Consistency**: Changes in one place update everywhere\n3. **Improve Data Integrity**: Prevent anomalies\n4. **Simplify Queries**: Clearer, more maintainable structure\n\n### Insertion Anomaly:\nCannot insert data without other required data\n\n### Deletion Anomaly:\nDeleting data accidentally removes other important data\n\n### Updation Anomaly:\nUpdating data requires changing multiple records\n\n### Normal Forms:\n\n#### 1NF (First Normal Form):\n- Each cell contains atomic (single) value\n- No repeating groups\n- Each column has unique name\n\n#### 2NF (Second Normal Form):\n- Must be in 1NF\n- No partial dependencies (all non-key attributes depend on whole primary key)\n\n#### 3NF (Third Normal Form):\n- Must be in 2NF\n- No transitive dependencies (non-key attributes depend only on primary key)\n\n#### BCNF (Boyce-Codd Normal Form):\n- Stronger version of 3NF\n- Every determinant is a candidate key\n\n### ER (Entity-Relationship) Model:\nER model is a high-level conceptual data model for designing databases.\n\n### ER Diagram Components:\n1. **Entity**: Rectangles (things we want to store data about)\n2. **Attributes**: Ovals (properties of entities)\n3. **Relationships**: Diamonds (associations between entities)\n4. **Keys**: Underlined attributes (unique identifiers)\n\n### Entity Types:\n- **Strong Entity**: Can exist independently (has primary key)\n- **Weak Entity**: Depends on strong entity (has partial key)\n\n### Relationship Types:\n1. **One-to-One (1:1)**: One entity relates to exactly one other\n2. **One-to-Many (1:N)**: One entity relates to many others\n3. **Many-to-Many (M:N)**: Many entities relate to many others\n\n### Real-world Example:\nWithout normalization, a student course table might have:\nStudent | Course1 | Course2 | Course3\nJohn    | Math    | Science | History\n\nWith normalization (3NF):\nStudents: student_id, name\nCourses: course_id, name\nEnrollments: student_id, course_id\n\n### Summary:\nNormalization eliminates redundancy and anomalies. ER modeling helps design databases at conceptual level before implementation. Good database design is crucial for application performance and maintainability.`,
        order: 3
      },
      {
        title: 'Transactions and Concurrency Control',
        content: `## Transactions and Concurrency Control\n\n### What is a Transaction?\nA transaction is a single logical unit of work that accesses and possibly modifies database contents. It's a sequence of operations performed as a single, atomic action.\n\n### ACID Properties:\nACID is a set of properties that guarantee database transactions are processed reliably.\n\n#### A - Atomicity:\nAll operations in transaction complete successfully, or none do. "All or nothing."\n- If transaction fails at any point, database rolled back to previous state\n- Example: Transfer $100 from A to B - either both accounts update or neither does\n\n#### C - Consistency:\nDatabase moves from one valid state to another, preserving database invariants.\n- Constraints (primary keys, foreign keys, etc.) must be satisfied\n- Example: Total money in system should remain same after transfer\n\n#### I - Isolation:\nConcurrent execution of transactions results in system state as if transactions executed serially.\n- Intermediate state of transaction not visible to other transactions\n- Transactions don't interfere with each other\n\n#### D - Durability:\nOnce transaction committed, changes remain permanent even in case of system failure.\n- Committed changes stored in non-volatile memory\n- Example: Once transfer completes, it stays completed even if power goes out\n\n### Transaction States:\n1. **Active**: Transaction is executing\n2. **Partially Committed**: Last statement executed\n3. **Failed**: Normal execution can't continue\n4. **Aborted**: Rolled back to state before transaction\n5. **Committed**: Successfully completed\n\n### Concurrency Control:\nConcurrency control manages simultaneous operations without conflicting with each other.\n\n### Problems with Concurrency:\n1. **Dirty Read**: Transaction reads data written by uncommitted transaction\n2. **Non-repeatable Read**: Transaction reads same row twice and gets different values\n3. **Phantom Read**: Transaction re-executes query and gets different set of rows\n4. **Lost Update**: Two transactions update same data, one update lost\n\n### Isolation Levels:\n1. **Read Uncommitted**: Dirty reads allowed (very weak)\n2. **Read Committed**: Only read committed data (default in many DBMS)\n3. **Repeatable Read**: Same reads give same results\n4. **Serializable**: Full isolation, like serial execution (strongest)\n\n### Locking:\nMost DBMS use locking to ensure isolation:\n- **Shared Lock (S)**: Read lock, multiple can hold\n- **Exclusive Lock (X)**: Write lock, only one can hold\n\n### Real-world Example:\nTwo people booking same flight seat at same time. Without concurrency control, both might get same seat. With proper locking, only one gets it.\n\n### Summary:\nTransactions with ACID properties ensure reliable database operations. Concurrency control allows multiple users to access database simultaneously while maintaining data integrity.`,
        order: 4
      }
    ],
    mcqs: [
      {
        question: 'Which SQL command is used to retrieve data from a database?',
        options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
        correctAnswer: 'SELECT'
      },
      {
        question: 'Which normal form eliminates transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '3NF'
      },
      {
        question: 'What does the "A" in ACID stand for?',
        options: ['Availability', 'Atomicity', 'Accuracy', 'Authentication'],
        correctAnswer: 'Atomicity'
      },
      {
        question: 'Which isolation level is the strongest?',
        options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
        correctAnswer: 'Serializable'
      },
      {
        question: 'What is a primary key?',
        options: ['Any column', 'Unique identifier for a row', 'Foreign key', 'Index'],
        correctAnswer: 'Unique identifier for a row'
      },
      {
        question: 'Which JOIN returns all rows from both tables?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
        correctAnswer: 'FULL OUTER JOIN'
      },
      {
        question: 'What is the purpose of normalization?',
        options: ['Make databases bigger', 'Eliminate redundancy and anomalies', 'Speed up queries only', 'Add more tables'],
        correctAnswer: 'Eliminate redundancy and anomalies'
      },
      {
        question: 'Which ACID property ensures committed changes are permanent?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctAnswer: 'Durability'
      }
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
    console.log(`Data seeded successfully! ${courses.length} courses created.`);
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
