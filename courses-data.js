// LuminaStudy AI - Expandable Course Library, Educational Content & Glossary Data

window.LUMINA_CATEGORIES = [
  {
    id: "business",
    name: "Business and Commerce",
    badge: "Commerce",
    description: "Core business degrees, accounting, management, marketing, and strategy for beginners.",
    disclaimer: "",
    subjects: [
      "BBA", "BCom", "MBA fundamentals", "Accounting", "Business management",
      "Marketing", "Human resource management", "Entrepreneurship",
      "Business communication", "Economics", "Finance basics",
      "International business", "Business strategy"
    ]
  },
  {
    id: "tech",
    name: "Computer and Technology",
    badge: "Tech",
    description: "Foundational computing, programming languages, web development, databases, and cloud.",
    disclaimer: "",
    subjects: [
      "Computer fundamentals", "IT fundamentals", "Computer science", "Programming",
      "Python", "JavaScript", "Web development", "HTML", "CSS",
      "Database fundamentals", "Cybersecurity awareness", "Cloud computing",
      "Software development"
    ]
  },
  {
    id: "ai",
    name: "AI and Future Technology",
    badge: "AI & Future",
    description: "Understand how modern AI works, machine learning, prompt engineering, and AI safety.",
    disclaimer: "",
    subjects: [
      "Artificial intelligence fundamentals", "Machine learning fundamentals",
      "Generative AI", "Prompt engineering", "AI automation", "Data science",
      "Robotics", "AI ethics", "AI safety", "How AI models work"
    ]
  },
  {
    id: "engineering",
    name: "Engineering and IIT-Level Learning",
    badge: "Engineering",
    description: "Beginner-friendly STEM foundations and structured problem-solving concepts.",
    disclaimer: "Disclaimer: These are independent beginner-friendly educational learning paths, not official IIT courses or certifications.",
    subjects: [
      "Mathematics", "Physics", "Chemistry", "Engineering fundamentals",
      "Computer science", "Electrical engineering fundamentals",
      "Mechanical engineering fundamentals", "Civil engineering fundamentals",
      "Problem solving", "Competitive-exam preparation concepts"
    ]
  },
  {
    id: "finance",
    name: "Financial Education",
    badge: "Finance Edu",
    description: "Personal money skills, banking, how businesses and markets work, and fraud awareness.",
    disclaimer: "Educational only: This section does not provide trading execution, investment recommendations, or financial advice.",
    subjects: [
      "Financial literacy", "Money management", "Budgeting", "Saving", "Banking",
      "Compound interest", "Understanding businesses", "Stock market fundamentals",
      "Understanding shares", "Index funds and ETFs", "Risk and diversification",
      "Cryptocurrency fundamentals", "Blockchain fundamentals", "Bitcoin technology",
      "Market volatility", "Financial scams and fraud awareness"
    ]
  },
  {
    id: "personal",
    name: "Personal Development",
    badge: "Growth",
    description: "Practical communication, critical thinking, discipline, and career readiness.",
    disclaimer: "",
    subjects: [
      "Communication", "English learning", "Critical thinking", "Productivity",
      "Decision-making", "Discipline", "Career skills", "Interview preparation",
      "Entrepreneurship"
    ]
  }
];

window.LUMINA_COURSES = [
  {
    id: "business-fundamentals",
    title: "Business Fundamentals",
    categoryId: "business",
    level: "Beginner",
    duration: "45 min",
    description: "Learn how businesses create value, earn revenue, manage costs, and serve customers.",
    chapters: [
      {
        id: "bf-ch1",
        title: "Chapter 1: How a Business Works",
        lessons: [
          {
            id: "bf-1-1",
            title: "What Is a Business & Value Creation",
            explanation: "A business is an organized effort to solve a customer problem by offering a product or service in exchange for money. The core idea is value creation: if a customer values your solution more than the price you charge, they buy it. Sustainable businesses make sure the price customers pay is higher than the cost of producing and delivering the solution.",
            example: "A neighborhood bakery spends $1.20 on flour, butter, electricity, and labor to bake a loaf of bread, and sells it for $3.00. The customer gets fresh bread without baking it themselves, and the bakery earns $1.80 in gross profit.",
            points: [
              "Every successful business starts with a real customer need.",
              "Revenue is total money collected from sales; Profit = Revenue - Expenses.",
              "Businesses can sell physical products, digital goods, or services."
            ],
            practice: [
              "Pick a local shop you visited recently. What problem does it solve for customers?",
              "List 3 expenses that shop has to pay every month even if no one buys anything."
            ],
            quiz: {
              question: "What is the basic formula for business profit?",
              options: [
                "Revenue + Expenses",
                "Revenue - Expenses",
                "Assets + Liabilities",
                "Customers × Price"
              ],
              answerIndex: 1,
              explanation: "Profit is what remains after subtracting all business expenses from total sales revenue."
            }
          },
          {
            id: "bf-1-2",
            title: "Revenue, Costs, and Cash Flow",
            explanation: "Many beginners confuse profit with cash flow. Revenue is the money earned from sales, while costs include fixed costs (rent, salaries) and variable costs (raw materials, shipping). Cash flow tracks when money actually enters and leaves your bank account. Even a profitable business can struggle if customers pay 60 days late while rent is due today.",
            example: "A freelance designer finishes a $1,000 website in March, but the client pays in May. On paper the work was earned in March, but the cash arrives in May.",
            points: [
              "Fixed costs stay the same regardless of how many units you sell.",
              "Variable costs grow as you produce or sell more units.",
              "Positive cash flow keeps day-to-day operations running smoothly."
            ],
            practice: [
              "Classify 'monthly shop rent' and 'coffee beans' as fixed or variable costs for a cafe."
            ],
            quiz: {
              question: "Which of the following is a variable cost for a t-shirt brand?",
              options: [
                "Monthly warehouse rent",
                "Annual business license fee",
                "Cotton fabric per shirt",
                "Manager's fixed monthly salary"
              ],
              answerIndex: 2,
              explanation: "Cotton fabric cost increases with each additional t-shirt produced, making it a variable cost."
            }
          }
        ]
      },
      {
        id: "bf-ch2",
        title: "Chapter 2: Customers & Marketing Basics",
        lessons: [
          {
            id: "bf-2-1",
            title: "Understanding Your Target Audience",
            explanation: "Trying to sell to 'everyone' usually means connecting with no one. A target audience is the specific group of people most likely to need and buy your product. Businesses group customers by age, location, budget, interests, and urgent problems so they can design better products and clearer messages.",
            example: "Instead of marketing a notebook to 'all humans', a brand targets 'university engineering students who need grid paper for lab diagrams'.",
            points: [
              "Define who your ideal customer is before spending money on ads.",
              "Listen to customer feedback to improve product quality.",
              "Repeat customers are usually cheaper to serve than finding brand-new buyers."
            ],
            practice: [
              "Define a target audience for a free mobile study planner app."
            ],
            quiz: {
              question: "Why do businesses define a target audience?",
              options: [
                "To refuse service to other people",
                "To focus product design and messaging on people most likely to benefit",
                "To increase fixed costs",
                "To avoid paying taxes"
              ],
              answerIndex: 1,
              explanation: "Knowing your target audience helps tailor products and communication effectively."
            }
          },
          {
            id: "bf-2-2",
            title: "The 4 Ps of Marketing",
            explanation: "The classic 4 Ps framework helps any beginner plan how to bring a product to market: Product (what you sell and why it helps), Price (how much you charge), Place (where customers buy it—online, retail store, app), and Promotion (how customers learn about it).",
            example: "A study-lamp brand sells a glare-free LED lamp (Product) for $29 (Price) on its website and Amazon (Place) using short student desk-setup videos (Promotion).",
            points: [
              "Product must solve a clear problem.",
              "Price signals quality and must cover costs.",
              "Place should match where customers already shop."
            ],
            practice: [
              "Write the 4 Ps for a product you use every day."
            ],
            quiz: {
              question: "In the 4 Ps of Marketing, what does 'Place' refer to?",
              options: [
                "The factory address only",
                "Where and how customers can buy the product",
                "The employee break room",
                "The company logo color"
              ],
              answerIndex: 1,
              explanation: "Place refers to distribution channels—physical stores, websites, or apps where buyers purchase."
            }
          }
        ]
      }
    ]
  },
  {
    id: "bba-introduction",
    title: "BBA Introduction",
    categoryId: "business",
    level: "Beginner",
    duration: "50 min",
    description: "A beginner roadmap to Bachelor of Business Administration (BBA) core subjects: Management, Accounting, HR, and Economics.",
    chapters: [
      {
        id: "bba-ch1",
        title: "Chapter 1: Foundations of Management",
        lessons: [
          {
            id: "bba-1-1",
            title: "What Is Management? (POLC Framework)",
            explanation: "Management is the process of coordinating people and resources to achieve goals efficiently. In BBA programs, management is taught through four core functions called POLC: Planning (setting goals), Organizing (assigning tasks and resources), Leading (motivating teams), and Controlling (measuring progress and fixing issues).",
            example: "A college event team plans the budget (Planning), assigns ticket and stage teams (Organizing), motivates volunteers (Leading), and checks ticket sales daily (Controlling).",
            points: [
              "Efficiency means doing things right (minimal waste); Effectiveness means doing the right things (reaching goals).",
              "Every manager uses Planning, Organizing, Leading, and Controlling."
            ],
            practice: [
              "Apply the 4 POLC steps to organizing a 2-hour study group."
            ],
            quiz: {
              question: "What does the 'C' in the POLC management framework stand for?",
              options: ["Creating", "Controlling", "Calculating", "Communicating"],
              answerIndex: 1,
              explanation: "POLC stands for Planning, Organizing, Leading, and Controlling."
            }
          },
          {
            id: "bba-1-2",
            title: "Organizational Structure & Teamwork",
            explanation: "As companies grow, they need clear roles so work doesn't overlap or get forgotten. Common structures include Functional (grouped by Marketing, Finance, HR) and Divisional (grouped by product line or region). Clear reporting lines help decisions move faster.",
            example: "In a small software startup, one person might handle both design and marketing. In a larger firm, Marketing and Engineering become separate departments.",
            points: [
              "Functional structure groups specialists together.",
              "Clear accountability prevents confusion over who owns a task."
            ],
            practice: [
              "Draw a simple 3-department chart for an online bookstore."
            ],
            quiz: {
              question: "In a Functional organizational structure, how are employees grouped?",
              options: [
                "By birth month",
                "By specialized department such as Marketing, Finance, or HR",
                "Randomly each week",
                "By office desk color"
              ],
              answerIndex: 1,
              explanation: "Functional structures group people who perform similar specialized roles."
            }
          }
        ]
      },
      {
        id: "bba-ch2",
        title: "Chapter 2: Accounting & Economics in BBA",
        lessons: [
          {
            id: "bba-2-1",
            title: "The Accounting Equation (Assets = Liabilities + Equity)",
            explanation: "Accounting is the language of business. Every balance sheet follows one golden rule: Assets = Liabilities + Equity. Assets are things the business owns (cash, equipment). Liabilities are debts owed to others (loans, unpaid bills). Equity is the owner's remaining stake.",
            example: "You start a delivery service with $1,000 of your own cash (Equity) and a $500 bank loan (Liability). Your total cash (Asset) is $1,500, and $1,500 = $500 + $1,000.",
            points: [
              "The equation must always balance.",
              "Assets bring future economic value; Liabilities are obligations."
            ],
            practice: [
              "If Assets = $10,000 and Liabilities = $4,000, what is Equity?"
            ],
            quiz: {
              question: "If a company has $8,000 in Assets and $3,000 in Liabilities, what is its Equity?",
              options: ["$11,000", "$5,000", "$3,000", "$24,000"],
              answerIndex: 1,
              explanation: "Equity = Assets - Liabilities = $8,000 - $3,000 = $5,000."
            }
          },
          {
            id: "bba-2-2",
            title: "Microeconomics vs. Macroeconomics",
            explanation: "BBA students study two levels of economics. Microeconomics looks at individual consumers, prices, and firms (like why coffee prices rise). Macroeconomics looks at the whole country's economy—inflation, unemployment, interest rates, and GDP growth.",
            example: "Deciding how much a bakery charges for a cake is Microeconomics; studying how national inflation affects all bakeries is Macroeconomics.",
            points: [
              "Micro = small scale (individuals, single markets).",
              "Macro = big picture (national GDP, inflation, central banks)."
            ],
            practice: [
              "Is 'national unemployment rate' a micro or macro topic?"
            ],
            quiz: {
              question: "Which topic belongs to Macroeconomics?",
              options: [
                "Pricing strategy of one local restaurant",
                "A family's weekly grocery budget",
                "National inflation and GDP growth",
                "One student's choice between tea and coffee"
              ],
              answerIndex: 2,
              explanation: "Macroeconomics studies economy-wide phenomena like inflation, GDP, and unemployment."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    categoryId: "ai",
    level: "Beginner",
    duration: "45 min",
    description: "Understand Artificial Intelligence, Machine Learning, Generative AI, and Prompt Engineering in plain English.",
    chapters: [
      {
        id: "ai-ch1",
        title: "Chapter 1: What Is Artificial Intelligence?",
        lessons: [
          {
            id: "ai-1-1",
            title: "AI, Machine Learning, and Deep Learning",
            explanation: "Artificial Intelligence (AI) is the broad field of making computers perform tasks that normally require human intelligence—like understanding language or recognizing images. Machine Learning (ML) is a subset of AI where computers learn patterns from data instead of following only hand-written rules. Deep Learning uses multi-layered neural networks inspired loosely by how neurons connect.",
            example: "Traditional code uses fixed rules ('if email contains FREE MONEY, mark spam'). Machine Learning studies 100,000 emails to learn subtle spam patterns on its own.",
            points: [
              "AI is the umbrella term; ML is inside AI; Deep Learning is inside ML.",
              "ML models improve when given clean, relevant training data."
            ],
            practice: [
              "Name two AI features you use on a smartphone today."
            ],
            quiz: {
              question: "How does Machine Learning differ from traditional rule-based programming?",
              options: [
                "It never uses computers",
                "It learns patterns from data rather than relying only on manually coded rules",
                "It only works without electricity",
                "It cannot process numbers"
              ],
              answerIndex: 1,
              explanation: "Machine Learning algorithms discover patterns from data examples."
            }
          },
          {
            id: "ai-1-2",
            title: "How Generative AI & Large Language Models Work",
            explanation: "Generative AI creates new text, images, or code. Large Language Models (LLMs) work by breaking text into small pieces called 'tokens' and predicting the most helpful next token based on patterns learned during training. Because they predict probable text rather than looking up guaranteed facts, they can sometimes sound confident even when wrong—a flaw called 'hallucination'.",
            example: "If you type 'The capital of France is', an LLM predicts 'Paris' with very high probability based on its training.",
            points: [
              "LLMs process text as tokens, not whole ideas like humans.",
              "Always verify important facts, dates, or medical/financial claims from reliable sources."
            ],
            practice: [
              "Why should you double-check AI-generated citations or statistics?"
            ],
            quiz: {
              question: "What is an AI 'hallucination'?",
              options: [
                "When a screen turns purple",
                "When an AI model generates confident-sounding information that is factually wrong",
                "When your Wi-Fi disconnects",
                "When a computer restarts"
              ],
              answerIndex: 1,
              explanation: "Hallucination occurs when a generative model produces plausible-sounding but incorrect or fabricated output."
            }
          }
        ]
      },
      {
        id: "ai-ch2",
        title: "Chapter 2: Prompt Engineering & Responsible AI",
        lessons: [
          {
            id: "ai-2-1",
            title: "Writing Clear Prompts (Role, Task, Context, Format)",
            explanation: "Prompt engineering is simply giving clear instructions to an AI tool. A great study prompt includes 4 parts: Role ('Act as a friendly physics tutor'), Task ('Explain Newton's 2nd law'), Context ('I am a beginner'), and Format ('Use 3 bullet points and 1 everyday example').",
            example: "Weak prompt: 'Explain marketing.' Strong prompt: 'Act as a BBA tutor. Explain the 4 Ps of marketing for a beginner using a local coffee shop example in 5 bullet points.'",
            points: [
              "Specific prompts produce much clearer answers.",
              "Ask for examples, quizzes, or step-by-step breakdowns."
            ],
            practice: [
              "Rewrite 'Help me with Python' into a 4-part structured prompt."
            ],
            quiz: {
              question: "Which prompt is most likely to give a beginner-friendly, structured answer?",
              options: [
                "AI",
                "Tell me stuff",
                "Explain photosynthesis for a 10th-grade student using 3 simple steps and a daily-life analogy",
                "Science please"
              ],
              answerIndex: 2,
              explanation: "Specifying audience, topic, and format guides the model to a clear, useful response."
            }
          },
          {
            id: "ai-2-2",
            title: "AI Ethics, Privacy, and Safety",
            explanation: "Using AI responsibly means protecting your privacy and thinking critically. Never paste passwords, bank details, or private personal IDs into public AI chats. Also watch out for bias: if training data contains unfair human biases, AI outputs can repeat them.",
            example: "Before asking an AI tool to proofread a resume, remove your phone number and home address.",
            points: [
              "Do not share confidential passwords or private IDs with AI tools.",
              "Use AI as a study partner, not a substitute for your own thinking."
            ],
            practice: [
              "List 3 types of personal information you should never paste into a public chatbot."
            ],
            quiz: {
              question: "Which item should you NEVER paste into a public AI chat?",
              options: [
                "A math homework question",
                "Your bank password or government ID number",
                "A request to summarize a public article",
                "A request for a study timetable"
              ],
              answerIndex: 1,
              explanation: "Sensitive credentials and government IDs should never be shared in external chat prompts."
            }
          }
        ]
      }
    ]
  },
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    categoryId: "tech",
    level: "Beginner",
    duration: "50 min",
    description: "Start coding from scratch with Python variables, data types, conditions, loops, and functions.",
    chapters: [
      {
        id: "py-ch1",
        title: "Chapter 1: Variables & Data Types",
        lessons: [
          {
            id: "py-1-1",
            title: "Your First Python Program & Variables",
            explanation: "Python is one of the most beginner-friendly programming languages because its syntax reads almost like English. A variable is like a labeled box that stores a value in memory. You create one simply by writing name = value.",
            example: "student_name = 'Aarav'\nstudy_minutes = 30\nprint('Hello', student_name)",
            points: [
              "Use print() to display output on the screen.",
              "Variable names should be descriptive and use underscores (snake_case)."
            ],
            practice: [
              "Write two variables: one for your favorite subject and one for your daily goal in minutes."
            ],
            quiz: {
              question: "Which line correctly creates a variable in Python?",
              options: [
                "var score == 100",
                "score = 100",
                "100 = score",
                "int score := 100"
              ],
              answerIndex: 1,
              explanation: "In Python, variables are assigned with a single equals sign: variable_name = value."
            }
          },
          {
            id: "py-1-2",
            title: "Strings, Integers, Floats, and Booleans",
            explanation: "Python uses different data types for different kinds of information: Strings (str) hold text inside quotes ('Hello'), Integers (int) hold whole numbers (25), Floats (float) hold decimals (98.6), and Booleans (bool) hold True or False.",
            example: "course = 'Python'  # str\nlessons = 6        # int\nrating = 4.9       # float\nis_free = True     # bool",
            points: [
              "Strings must be wrapped in single or double quotes.",
              "Booleans start with capital T (True) or capital F (False)."
            ],
            practice: [
              "Identify the data type of: price = 19.99 and passed = True."
            ],
            quiz: {
              question: "What data type is the value 3.14 in Python?",
              options: ["int", "str", "float", "bool"],
              answerIndex: 2,
              explanation: "Numbers with a decimal point are stored as floating-point numbers (float)."
            }
          }
        ]
      },
      {
        id: "py-ch2",
        title: "Chapter 2: Decisions & Loops",
        lessons: [
          {
            id: "py-2-1",
            title: "If / Else Conditions",
            explanation: "Programs make decisions using if, elif, and else statements. Python uses indentation (spaces at the start of a line) to know which code belongs inside the if block.",
            example: "score = 82\nif score >= 50:\n    print('Passed!')\nelse:\n    print('Keep practicing!')",
            points: [
              "Always end if/else lines with a colon (:).",
              "Consistent 4-space indentation is required in Python."
            ],
            practice: [
              "Write an if/else check for whether daily_minutes >= 20."
            ],
            quiz: {
              question: "How does Python group code inside an if statement?",
              options: [
                "With curly braces { }",
                "With indentation (spaces)",
                "With parentheses ( )",
                "With HTML tags"
              ],
              answerIndex: 1,
              explanation: "Python relies on indentation to define code blocks."
            }
          },
          {
            id: "py-2-2",
            title: "For Loops & Functions",
            explanation: "A for loop repeats an action for each item in a list or range. A function (defined with def) packages reusable steps under one name so you don't have to copy-paste code.",
            example: "def greet(name):\n    print('Welcome,', name)\n\nfor i in range(3):\n    greet('Student')",
            points: [
              "range(3) produces 0, 1, 2 (three iterations).",
              "Functions make code cleaner and easier to test."
            ],
            practice: [
              "What will range(5) print if looped over?"
            ],
            quiz: {
              question: "Which keyword defines a function in Python?",
              options: ["func", "define", "def", "function"],
              answerIndex: 2,
              explanation: "In Python, functions are declared using the 'def' keyword."
            }
          }
        ]
      }
    ]
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    categoryId: "finance",
    level: "Beginner",
    duration: "45 min",
    description: "Build lifelong money skills: budgeting, emergency funds, compound interest, and spotting financial scams. (Educational only.)",
    chapters: [
      {
        id: "fl-ch1",
        title: "Chapter 1: Budgeting & Saving",
        lessons: [
          {
            id: "fl-1-1",
            title: "Needs vs. Wants & The 50/30/20 Guideline",
            explanation: "Financial literacy starts with knowing where your money goes. A simple starting framework is the 50/30/20 guideline: roughly 50% of after-tax income for Needs (housing, groceries, utilities), 30% for Wants (dining out, hobbies), and 20% for Savings or paying off debt. It's a flexible guide, not a rigid law.",
            example: "If someone earns $1,000/month after tax, $500 goes to essentials, $300 to flexible lifestyle spending, and $200 to savings.",
            points: [
              "Track every expense for 2 weeks to spot hidden leaks.",
              "Needs are required for survival/work; Wants improve comfort."
            ],
            practice: [
              "List 3 Needs and 3 Wants from your own monthly spending."
            ],
            quiz: {
              question: "In the 50/30/20 budgeting guideline, what is the 20% category typically used for?",
              options: [
                "Entertainment only",
                "Savings and debt repayment",
                "Luxury vacations",
                "Impulse shopping"
              ],
              answerIndex: 1,
              explanation: "The 20% bucket is dedicated to building savings and reducing debt."
            }
          },
          {
            id: "fl-1-2",
            title: "Emergency Funds & Banking Basics",
            explanation: "An emergency fund is cash kept in a safe, accessible bank account for unexpected events like medical bills or job loss—not for everyday shopping. Keeping 3 to 6 months of essential expenses as a long-term goal protects you from falling into high-interest debt.",
            example: "If your essential monthly bills are $400, even a starter emergency fund of $400–$1,200 prevents you from borrowing at high interest when a laptop or bike breaks.",
            points: [
              "Keep emergency savings separate from your daily spending account.",
              "Start small—consistency matters more than starting big."
            ],
            practice: [
              "Calculate 1 month of essential expenses for your household or student budget."
            ],
            quiz: {
              question: "What is the main purpose of an emergency fund?",
              options: [
                "To buy the latest phone on launch day",
                "To cover unexpected urgent expenses without going into debt",
                "To trade high-risk assets",
                "To lend to strangers"
              ],
              answerIndex: 1,
              explanation: "An emergency fund acts as a safety buffer for unforeseen expenses."
            }
          }
        ]
      },
      {
        id: "fl-ch2",
        title: "Chapter 2: Compound Interest & Scam Awareness",
        lessons: [
          {
            id: "fl-2-1",
            title: "How Compound Interest Works",
            explanation: "Simple interest is earned only on your original deposit (principal). Compound interest is earned on your principal PLUS previously earned interest. Over long periods, compounding grows faster—and works against you if you carry high-interest credit card debt.",
            example: "$1,000 at 8% annual compound interest becomes $1,080 in Year 1, and in Year 2 you earn 8% on $1,080 ($1,166.40).",
            points: [
              "Time is the biggest multiplier in compounding.",
              "High-interest debt compounds against you just as savings compound for you."
            ],
            practice: [
              "Use the built-in Compound Interest Calculator in Tools to compare 5 years vs. 20 years."
            ],
            quiz: {
              question: "What makes compound interest different from simple interest?",
              options: [
                "It is only paid once in a lifetime",
                "You earn interest on both the original amount and previously accumulated interest",
                "It is always 0%",
                "It ignores time"
              ],
              answerIndex: 1,
              explanation: "Compounding calculates interest on the growing balance, not just the initial principal."
            }
          },
          {
            id: "fl-2-2",
            title: "Spotting Financial Scams & Fraud",
            explanation: "Scammers often promise 'guaranteed high returns with zero risk', create fake urgency ('act in 10 minutes!'), or ask for OTPs, PINs, or crypto transfers. Legitimate banks and educators never ask for your password or OTP, and no real investment has guaranteed high returns with zero risk.",
            example: "A message says 'Send $100 in Bitcoin and get $1,000 back in 1 hour.' That is a classic advance-fee scam.",
            points: [
              "Never share OTPs, PINs, or recovery seed phrases with anyone.",
              "High promised returns with 'zero risk' is almost always a red flag."
            ],
            practice: [
              "Write down 3 warning signs of an online financial scam."
            ],
            quiz: {
              question: "Which statement is a major warning sign of a financial scam?",
              options: [
                "A bank reminding you never to share your OTP",
                "A promise of guaranteed 50% weekly profit with zero risk",
                "A public library book on budgeting",
                "A school course on accounting"
              ],
              answerIndex: 1,
              explanation: "Guaranteed high returns with zero risk are a hallmark of financial fraud."
            }
          }
        ]
      }
    ]
  }
];

window.LUMINA_DAILY_TOPICS = [
  {
    title: "The Feynman Technique",
    summary: "Learn any hard topic by explaining it in simple words as if teaching a 12-year-old. Wherever you get stuck, go back to the source material.",
    category: "Personal Development",
    courseId: "business-fundamentals"
  },
  {
    title: "Compound Interest Over Time",
    summary: "Small, steady habits and savings compound exponentially over years. Time matters more than trying to rush overnight.",
    category: "Financial Education",
    courseId: "financial-literacy"
  },
  {
    title: "How AI Tokens Work",
    summary: "Language models read text in chunks called tokens and predict the next likely token—which is why clear prompts give much better answers.",
    category: "AI and Future Technology",
    courseId: "ai-fundamentals"
  },
  {
    title: "Active Recall vs. Re-reading",
    summary: "Testing yourself with flashcards and quizzes builds stronger memory than passively highlighting notes.",
    category: "Study Skills",
    courseId: "python-fundamentals"
  }
];

window.LUMINA_DICTIONARY = [
  { term: "Revenue", category: "Business", def: "Total money a business earns from selling products or services before subtracting expenses." },
  { term: "Profit", category: "Business", def: "Money remaining after all business expenses are subtracted from revenue." },
  { term: "Asset", category: "Accounting", def: "Anything of economic value owned by a person or business (cash, equipment, property)." },
  { term: "Liability", category: "Accounting", def: "Money or obligations owed to others, such as loans or unpaid bills." },
  { term: "Algorithm", category: "Computer Science", def: "A clear, step-by-step set of instructions for solving a problem or completing a task." },
  { term: "Variable", category: "Programming", def: "A named container in memory that stores data such as numbers or text." },
  { term: "Machine Learning", category: "AI", def: "A branch of AI where software learns patterns from data rather than following only fixed rules." },
  { term: "Prompt", category: "AI", def: "The instruction or question you give an AI system to guide its response." },
  { term: "Hallucination (AI)", category: "AI", def: "When an AI model outputs plausible-sounding text that is factually incorrect or fabricated." },
  { term: "Compound Interest", category: "Finance", def: "Interest calculated on both the initial principal and the accumulated interest from prior periods." },
  { term: "Diversification", category: "Finance", def: "Spreading exposure across different types of assets so one failure doesn't ruin everything." },
  { term: "Index Fund", category: "Finance", def: "A fund designed to track the performance of a broad market index rather than picking single companies." },
  { term: "Volatility", category: "Finance", def: "How sharply and quickly an asset's price moves up and down over time." },
  { term: "Blockchain", category: "Technology", def: "A distributed digital ledger where transactions are grouped into linked, tamper-evident blocks." },
  { term: "Encryption", category: "Cybersecurity", def: "Converting readable data into scrambled code so only authorized parties with a key can read it." }
];

window.LUMINA_MARKET_TOPICS = [
  {
    id: "stock-market",
    title: "What Is the Stock Market?",
    summary: "A regulated marketplace where shares of publicly listed companies are bought and sold between investors.",
    details: "Stock exchanges (such as NSE/BSE in India or NYSE/NASDAQ in the US) provide rules, transparency, and price discovery. Companies list shares to raise money for growth, and investors buy shares to own a small piece of a business."
  },
  {
    id: "what-is-stock",
    title: "What Is a Stock (Share)?",
    summary: "A stock represents fractional ownership in a company.",
    details: "If a company is divided into 1,000,000 shares and you own 100 shares, you own a tiny fraction of that business. Share values can rise or fall based on company earnings, competition, and broader economic conditions."
  },
  {
    id: "what-is-index",
    title: "What Is a Market Index?",
    summary: "A benchmark score tracking a basket of representative companies (e.g., S&P 500, Nifty 50).",
    details: "Instead of checking hundreds of individual companies one by one, an index summarizes how a whole group of major companies is performing together."
  },
  {
    id: "cryptocurrency",
    title: "What Is a Cryptocurrency?",
    summary: "A digital asset secured by cryptography that operates on decentralized networks.",
    details: "Unlike government-issued currencies (USD, INR), cryptocurrencies generally run on peer-to-peer networks without a central bank. Prices are often highly volatile."
  },
  {
    id: "bitcoin",
    title: "What Is Bitcoin?",
    summary: "The first decentralized cryptocurrency, introduced in 2009.",
    details: "Bitcoin uses a public ledger and a consensus mechanism (Proof of Work) to verify transactions without a central intermediary. Its supply is capped at 21 million coins."
  },
  {
    id: "blockchain",
    title: "What Is Blockchain?",
    summary: "A shared, append-only ledger of records grouped into cryptographically linked blocks.",
    details: "Each new block includes a cryptographic hash of the previous block, making past records very difficult to alter secretly."
  },
  {
    id: "risk-volatility",
    title: "Risk, Volatility & Historical Concepts",
    summary: "All markets experience cycles, drawdowns, and uncertainty.",
    details: "Higher potential returns almost always come with higher risk of loss. Diversification, emergency savings, and long-term education help people avoid emotional decisions during sharp market swings."
  }
];

window.LUMINA_NEWS_SOURCES = {
  daily: [
    { name: "Reuters", desc: "Global breaking news, business, and world events", url: "https://www.reuters.com/" },
    { name: "AP News", desc: "Independent global journalism and world updates", url: "https://apnews.com/" },
    { name: "BBC News", desc: "World, science, technology, and education coverage", url: "https://www.bbc.com/news" }
  ],
  ai: [
    { name: "MIT Technology Review (AI)", desc: "In-depth reporting on AI research and impact", url: "https://www.technologyreview.com/topic/artificial-intelligence/" },
    { name: "Google DeepMind Blog", desc: "Official AI research updates and safety papers", url: "https://deepmind.google/discover/blog/" },
    { name: "OpenAI News", desc: "Model releases, research, and safety announcements", url: "https://openai.com/news/" }
  ],
  tech: [
    { name: "Ars Technica", desc: "Technology, science, cybersecurity, and software", url: "https://arstechnica.com/" },
    { name: "TechCrunch", desc: "Startups, apps, cloud, and tech industry news", url: "https://techcrunch.com/" },
    { name: "The Verge", desc: "Consumer tech, science, and digital culture", url: "https://www.theverge.com/" }
  ],
  science: [
    { name: "Nature News", desc: "Peer-reviewed science discoveries and research", url: "https://www.nature.com/news" },
    { name: "ScienceDaily", desc: "Summaries of university research breakthroughs", url: "https://www.sciencedaily.com/" }
  ],
  business: [
    { name: "Financial Times", desc: "Global business, economics, and markets", url: "https://www.ft.com/" },
    { name: "Bloomberg", desc: "Business, finance, and economic reporting", url: "https://www.bloomberg.com/" }
  ],
  education: [
    { name: "Edutopia", desc: "Practical learning strategies and education", url: "https://www.edutopia.org/" },
    { name: "UNESCO Education", desc: "Global education initiatives and resources", url: "https://www.unesco.org/en/education" }
  ]
};

window.LUMINA_ENGLISH_EXERCISES = [
  {
    prompt: "Choose the most clear and professional sentence:",
    options: [
      "Please revert back to me ASAPly.",
      "Could you please share an update by Friday?",
      "I am needing your reply very fastly."
    ],
    answer: 1,
    tip: "'Could you please share an update by Friday?' is polite, clear, and natural."
  },
  {
    prompt: "Which word correctly completes the sentence? 'She ___ studying Python for two months.'",
    options: ["have been", "has been", "is been"],
    answer: 1,
    tip: "Use 'has been' with singular third-person subjects like 'she' or 'he'."
  },
  {
    prompt: "Choose the correct spelling:",
    options: ["Entrepreneureship", "Entrepreneurship", "Entreprenurship"],
    answer: 1,
    tip: "Entrepreneurship comes from 'entrepreneur'."
  }
];

window.LUMINA_INTERVIEW_QUESTIONS = [
  {
    q: "Tell me about yourself.",
    guide: "Use Present → Past → Future: what you currently study/do, 1–2 relevant achievements, and why you're excited about this role."
  },
  {
    q: "Describe a challenge you faced and how you solved it.",
    guide: "Use STAR: Situation, Task, Action (what YOU did), and Result (measurable outcome or lesson learned)."
  },
  {
    q: "What is your biggest strength and one area you are improving?",
    guide: "Share a real strength with an example, plus an honest skill you are actively practicing (e.g., public speaking or Excel)."
  },
  {
    q: "Why do you want to learn or work in this field?",
    guide: "Connect your curiosity, past projects, and long-term goals to the industry."
  }
];
