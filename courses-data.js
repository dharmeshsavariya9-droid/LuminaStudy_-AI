javascript
// LuminaStudy AI - Expandable Course Library (Beginner -> Intermediate -> Advanced), Guided Paths, Google News Feeds & Glossary

window.LUMINA_CATEGORIES = [
  {
    id: "business",
    name: "Business and Commerce",
    badge: "Commerce",
    description: "Core business degrees, accounting, management, marketing, strategy, and valuation.",
    disclaimer: "",
    subjects: [
      "BBA", "BCom", "MBA fundamentals", "Accounting", "Business management",
      "Marketing", "Human resource management", "Entrepreneurship",
      "Business communication", "Economics", "Finance basics",
      "International business", "Business strategy", "Financial statements", "Valuation"
    ]
  },
  {
    id: "tech",
    name: "Computer and Technology",
    badge: "Tech",
    description: "Foundational computing, Python programming, OOP, APIs, testing, and system architecture.",
    disclaimer: "",
    subjects: [
      "Computer fundamentals", "IT fundamentals", "Computer science", "Programming",
      "Python", "JavaScript", "Web development", "HTML", "CSS",
      "Database fundamentals", "Cybersecurity awareness", "Cloud computing",
      "Software development", "APIs & JSON", "System design"
    ]
  },
  {
    id: "ai",
    name: "AI and Future Technology",
    badge: "AI & Future",
    description: "From AI basics to Machine Learning, RAG, Prompt Engineering, and autonomous AI Agents.",
    disclaimer: "",
    subjects: [
      "Artificial intelligence fundamentals", "Machine learning fundamentals",
      "Generative AI", "Prompt engineering", "RAG systems", "AI agents",
      "Data science", "Robotics", "AI ethics", "AI safety", "Transformers & LLMs"
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
    description: "Personal money skills, investing fundamentals, macroeconomics, and risk management.",
    disclaimer: "Educational only: This section does not provide trading execution, investment recommendations, or financial advice.",
    subjects: [
      "Financial literacy", "Money management", "Budgeting", "Saving", "Banking",
      "Compound interest", "Understanding businesses", "Stock market fundamentals",
      "Understanding shares", "Index funds and ETFs", "Risk and diversification",
      "Cryptocurrency fundamentals", "Blockchain fundamentals", "Macroeconomics",
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

window.LUMINA_LEARNING_PATHS = [
  {
    id: "path-business",
    title: "Business & Strategy Mastery",
    categoryId: "business",
    description: "Go from how a basic shop earns profit to analyzing financial statements, competitive moats, and company valuation.",
    steps: [
      { level: "Beginner", courseId: "business-fundamentals", label: "1. Business Fundamentals" },
      { level: "Beginner", courseId: "bba-introduction", label: "2. BBA Introduction" },
      { level: "Intermediate", courseId: "business-strategy-finance", label: "3. Strategy & Financial Statements" },
      { level: "Advanced", courseId: "strategic-leadership-valuation", label: "4. Leadership & Valuation" }
    ]
  },
  {
    id: "path-ai",
    title: "AI & LLM Engineering Path",
    categoryId: "ai",
    description: "Progress from understanding AI & tokens to building RAG workflows, evaluating models, and designing AI agents.",
    steps: [
      { level: "Beginner", courseId: "ai-fundamentals", label: "1. AI Fundamentals" },
      { level: "Intermediate", courseId: "applied-ml-prompting", label: "2. Applied ML & Prompting" },
      { level: "Advanced", courseId: "llm-agents-production", label: "3. LLM Architecture & Agents" }
    ]
  },
  {
    id: "path-python",
    title: "Python Developer Path",
    categoryId: "tech",
    description: "Start with variables and loops, level up to OOP and REST APIs, and master async code, testing, and architecture.",
    steps: [
      { level: "Beginner", courseId: "python-fundamentals", label: "1. Python Fundamentals" },
      { level: "Intermediate", courseId: "python-intermediate", label: "2. Intermediate Python & APIs" },
      { level: "Advanced", courseId: "python-advanced", label: "3. Advanced Python & Architecture" }
    ]
  },
  {
    id: "path-finance",
    title: "Financial & Market Education Path",
    categoryId: "finance",
    description: "Build a rock-solid foundation in budgeting, index funds, valuation ratios, macroeconomics, and portfolio risk.",
    steps: [
      { level: "Beginner", courseId: "financial-literacy", label: "1. Financial Literacy" },
      { level: "Intermediate", courseId: "investing-fundamentals", label: "2. Investing & Index Funds" },
      { level: "Advanced", courseId: "macro-risk-management", label: "3. Macro & Risk Management" }
    ]
  }
];

window.LUMINA_COURSES = [
  // ==================== BUSINESS TRACK ====================
  {
    id: "business-fundamentals",
    title: "Business Fundamentals",
    categoryId: "business",
    level: "Beginner",
    duration: "45 min",
    prerequisites: "None — ideal starting point",
    guidance: "Start here if you are new to business. Complete all 4 lessons and quizzes, then move to BBA Introduction.",
    nextCourseId: "bba-introduction",
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
              options: ["Revenue + Expenses", "Revenue - Expenses", "Assets + Liabilities", "Customers × Price"],
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
              options: ["Monthly warehouse rent", "Annual business license fee", "Cotton fabric per shirt", "Manager's fixed monthly salary"],
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
            practice: ["Define a target audience for a free mobile study planner app."],
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
            practice: ["Write the 4 Ps for a product you use every day."],
            quiz: {
              question: "In the 4 Ps of Marketing, what does 'Place' refer to?",
              options: ["The factory address only", "Where and how customers can buy the product", "The employee break room", "The company logo color"],
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
    prerequisites: "Recommended: Business Fundamentals",
    guidance: "Builds core management, accounting, and economics vocabulary. Next step: Business Strategy & Financial Statements.",
    nextCourseId: "business-strategy-finance",
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
            practice: ["Apply the 4 POLC steps to organizing a 2-hour study group."],
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
            practice: ["Draw a simple 3-department chart for an online bookstore."],
            quiz: {
              question: "In a Functional organizational structure, how are employees grouped?",
              options: ["By birth month", "By specialized department such as Marketing, Finance, or HR", "Randomly each week", "By office desk color"],
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
            practice: ["If Assets = $10,000 and Liabilities = $4,000, what is Equity?"],
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
            practice: ["Is 'national unemployment rate' a micro or macro topic?"],
            quiz: {
              question: "Which topic belongs to Macroeconomics?",
              options: ["Pricing strategy of one local restaurant", "A family's weekly grocery budget", "National inflation and GDP growth", "One student's choice between tea and coffee"],
              answerIndex: 2,
              explanation: "Macroeconomics studies economy-wide phenomena like inflation, GDP, and unemployment."
            }
          }
        ]
      }
    ]
  },
  {
    id: "business-strategy-finance",
    title: "Business Strategy & Financial Statements",
    categoryId: "business",
    level: "Intermediate",
    duration: "65 min",
    prerequisites: "Business Fundamentals & BBA Introduction",
    guidance: "Learn to read P&L statements, analyze competition with Porter's 5 Forces, and calculate CAC & LTV unit economics.",
    nextCourseId: "strategic-leadership-valuation",
    description: "Bridge the gap from basics to real business analysis: Income Statements, SWOT, Porter's 5 Forces, and Unit Economics.",
    chapters: [
      {
        id: "bsf-ch1",
        title: "Chapter 1: Reading Financial Statements",
        lessons: [
          {
            id: "bsf-1-1",
            title: "Income Statement (P&L) & Profit Margins",
            explanation: "An Income Statement (Profit & Loss) shows performance over a period (month, quarter, or year). It flows top-down: Revenue minus Cost of Goods Sold (COGS) gives Gross Profit. Subtracting operating expenses (marketing, salaries, rent) gives Operating Profit (EBIT), and subtracting taxes/interest gives Net Income.",
            example: "If a SaaS company makes $100,000 in Revenue and spends $20,000 on cloud servers (COGS), its Gross Profit is $80,000 — an 80% Gross Margin.",
            points: [
              "Gross Margin = (Revenue - COGS) / Revenue.",
              "High gross margins give a business room to invest in growth and R&D.",
              "Always compare margins over multiple quarters, not just one month."
            ],
            practice: ["Calculate Gross Margin if Revenue is $50,000 and COGS is $30,000."],
            quiz: {
              question: "If a business earns $200,000 in Revenue and has $50,000 in COGS, what is its Gross Margin?",
              options: ["25%", "50%", "75%", "150%"],
              answerIndex: 2,
              explanation: "Gross Profit is $150,000; $150,000 / $200,000 = 75%."
            }
          },
          {
            id: "bsf-1-2",
            title: "Unit Economics: CAC, LTV & Payback Period",
            explanation: "Unit economics measures whether a company makes money on a single customer. CAC (Customer Acquisition Cost) is how much you spend in marketing and sales to win one customer. LTV (Lifetime Value) is the total gross profit earned from that customer before they churn. Healthy businesses generally aim for an LTV that is at least 3× their CAC.",
            example: "If you spend $1,000 on ads and get 20 paying customers, your CAC is $50. If each customer stays for 10 months paying $20/month at 80% gross margin, LTV = 10 × $20 × 0.8 = $160 (3.2× CAC).",
            points: [
              "Growing fast with LTV < CAC loses more money with every new customer.",
              "Payback Period is how many months it takes to earn back the CAC."
            ],
            practice: ["A gym spends $600 on ads to sign 6 members. Each pays $40/month. What is the CAC and payback period in months?"],
            quiz: {
              question: "If CAC is $100 and LTV is $350, what is the LTV:CAC ratio?",
              options: ["0.35:1", "3.5:1", "1:3.5", "2.5:1"],
              answerIndex: 1,
              explanation: "LTV ($350) divided by CAC ($100) equals 3.5:1."
            }
          }
        ]
      },
      {
        id: "bsf-ch2",
        title: "Chapter 2: Competitive Strategy Frameworks",
        lessons: [
          {
            id: "bsf-2-1",
            title: "Porter's Five Forces Industry Analysis",
            explanation: "Michael Porter's Five Forces explains why some industries are highly profitable while others are brutal price wars: (1) Threat of New Entrants, (2) Bargaining Power of Buyers, (3) Bargaining Power of Suppliers, (4) Threat of Substitutes, and (5) Competitive Rivalry.",
            example: "Airlines face high rivalry, high fuel supplier power, and low switching costs for buyers—making average airline profit margins thin compared to enterprise software.",
            points: [
              "High barriers to entry protect existing companies from new competitors.",
              "Unique products reduce buyer bargaining power."
            ],
            practice: ["Pick a local coffee shop and rate each of the 5 forces as Low, Medium, or High."],
            quiz: {
              question: "Which factor makes an industry MORE attractive (higher profit potential)?",
              options: [
                "Very easy for anyone to start a competitor tomorrow",
                "High barriers to entry and low threat of substitutes",
                "Customers can switch to a free alternative in 1 click",
                "One supplier controls 100% of your raw materials"
              ],
              answerIndex: 1,
              explanation: "High barriers to entry and few substitutes protect margins from competition."
            }
          }
        ]
      }
    ]
  },
  {
    id: "strategic-leadership-valuation",
    title: "Strategic Leadership & Company Valuation",
    categoryId: "business",
    level: "Advanced",
    duration: "75 min",
    prerequisites: "Business Strategy & Financial Statements",
    guidance: "Master economic moats, capital allocation, Discounted Cash Flow (DCF) intuition, and executive decision-making.",
    nextCourseId: null,
    description: "Advanced business thinking: durable competitive moats, capital allocation, DCF valuation concepts, and strategic leadership.",
    chapters: [
      {
        id: "slv-ch1",
        title: "Chapter 1: Economic Moats & Capital Allocation",
        lessons: [
          {
            id: "slv-1-1",
            title: "The 5 Sources of Durable Economic Moats",
            explanation: "A competitive 'moat' protects a company's profits from rivals over decades. Five classic moat sources are: (1) Network Effects (each user makes the product more valuable), (2) Switching Costs (painful to leave), (3) Intangible Assets (patents, strong brands, licenses), (4) Cost Advantages (scale or proprietary process), and (5) Efficient Scale (niche markets too small for two rivals).",
            example: "Payment networks like Visa benefit from two-sided network effects: more merchants attract more cardholders, which attracts more merchants.",
            points: [
              "A great product without a moat gets copied quickly.",
              "Switching costs are especially strong in enterprise accounting, cloud, and medical software."
            ],
            practice: ["Identify the primary moat of two global companies you admire."],
            quiz: {
              question: "Which moat occurs when a product becomes more valuable as more people use it?",
              options: ["Switching Costs", "Network Effects", "Cost Advantage", "Patent Protection"],
              answerIndex: 1,
              explanation: "Network effects increase product value with each additional participant."
            }
          },
          {
            id: "slv-1-2",
            title: "Discounted Cash Flow (DCF) & Time Value of Money",
            explanation: "A dollar today is worth more than a dollar 5 years from now because today's dollar can be invested to earn a return. DCF valuation estimates a business's intrinsic value by projecting its future Free Cash Flows and discounting them back to today's value using a discount rate (WACC / required return).",
            example: "At a 10% annual discount rate, $110 received 1 year from now is worth $110 / 1.10 = $100 today.",
            points: [
              "Higher interest rates or higher risk increase the discount rate, lowering the present value of distant cash flows.",
              "Free Cash Flow = Operating Cash Flow - Capital Expenditures (CapEx)."
            ],
            practice: ["At a 10% discount rate, what is $121 received 2 years from now worth today?"],
            quiz: {
              question: "If the discount rate rises sharply, what happens to the present value of future cash flows?",
              options: ["It increases", "It decreases", "It stays identical", "It doubles"],
              answerIndex: 1,
              explanation: "Dividing by a larger (1 + r)^n factor reduces the present value of future cash flows."
            }
          }
        ]
      }
    ]
  },

  // ==================== AI & FUTURE TECH TRACK ====================
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    categoryId: "ai",
    level: "Beginner",
    duration: "45 min",
    prerequisites: "None — ideal starting point",
    guidance: "Start here to understand AI, Machine Learning, tokens, and basic prompt structure. Next: Applied ML & Prompt Engineering.",
    nextCourseId: "applied-ml-prompting",
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
            practice: ["Name two AI features you use on a smartphone today."],
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
            practice: ["Why should you double-check AI-generated citations or statistics?"],
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
            practice: ["Rewrite 'Help me with Python' into a 4-part structured prompt."],
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
            practice: ["List 3 types of personal information you should never paste into a public chatbot."],
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
    id: "applied-ml-prompting",
    title: "Applied Machine Learning & Prompt Engineering",
    categoryId: "ai",
    level: "Intermediate",
    duration: "60 min",
    prerequisites: "AI Fundamentals",
    guidance: "Go beyond basic prompts: learn Supervised vs. Unsupervised ML, Few-Shot & Chain-of-Thought prompting, and RAG.",
    nextCourseId: "llm-agents-production",
    description: "Level up your AI skills with ML paradigms, Few-Shot & Chain-of-Thought prompting, Embeddings, and Retrieval-Augmented Generation (RAG).",
    chapters: [
      {
        id: "amp-ch1",
        title: "Chapter 1: Machine Learning Paradigms & Evaluation",
        lessons: [
          {
            id: "amp-1-1",
            title: "Supervised, Unsupervised & Reinforcement Learning",
            explanation: "Machine Learning has three major learning styles. Supervised Learning trains on labeled examples (e.g., emails labeled 'spam' or 'not spam'). Unsupervised Learning finds hidden groups in unlabeled data (e.g., customer segmentation). Reinforcement Learning trains an agent through trial, error, and reward signals (like game-playing AI).",
            example: "Predicting house prices from past labeled sales is Supervised Learning; grouping shoppers by buying habits without labels is Unsupervised Learning.",
            points: [
              "Always split data into Training, Validation, and Test sets to catch overfitting.",
              "Overfitting happens when a model memorizes training data instead of learning general patterns."
            ],
            practice: ["Classify 'predicting student exam scores from study hours' as Supervised or Unsupervised."],
            quiz: {
              question: "Which ML approach learns from labeled input-output pairs?",
              options: ["Unsupervised Learning", "Supervised Learning", "Random Guessing", "Manual Coding"],
              answerIndex: 1,
              explanation: "Supervised learning uses labeled examples where the correct answer is known during training."
            }
          }
        ]
      },
      {
        id: "amp-ch2",
        title: "Chapter 2: Advanced Prompting & RAG",
        lessons: [
          {
            id: "amp-2-1",
            title: "Few-Shot & Chain-of-Thought Prompting",
            explanation: "Zero-shot prompting gives no examples. Few-shot prompting provides 2–5 input/output examples in the prompt so the model matches your exact style or format. Chain-of-Thought (CoT) asks the model to reason step-by-step before giving a final answer, which dramatically improves accuracy on math and logic tasks.",
            example: "Instead of 'What is 17 × 24?', ask 'Solve 17 × 24 step by step, breaking 24 into 20 + 4 first.'",
            points: [
              "Few-shot examples lock in tone, JSON structure, or classification rules.",
              "Chain-of-Thought reduces careless arithmetic and reasoning errors."
            ],
            practice: ["Write a 2-shot prompt that classifies customer reviews as Positive, Neutral, or Negative."],
            quiz: {
              question: "Why does Chain-of-Thought prompting improve reasoning accuracy?",
              options: [
                "It disables the model's vocabulary",
                "It guides the model to generate intermediate reasoning steps before the final conclusion",
                "It makes the internet faster",
                "It deletes system instructions"
              ],
              answerIndex: 1,
              explanation: "Generating intermediate steps lets the model condition its final answer on structured reasoning."
            }
          },
          {
            id: "amp-2-2",
            title: "Retrieval-Augmented Generation (RAG)",
            explanation: "LLMs only know what they were trained on, which goes stale and lacks your private documents. RAG solves this in 3 steps: (1) Convert your documents into vector embeddings, (2) Search and retrieve the most relevant chunks for the user's question, and (3) Paste those chunks into the prompt so the LLM answers strictly from your verified sources.",
            example: "A university support bot retrieves the exact 2026 hostel fee PDF paragraph and asks the LLM to summarize it for the student.",
            points: [
              "RAG reduces hallucinations by grounding answers in retrieved documents.",
              "RAG is faster and cheaper to update than retraining an entire model."
            ],
            practice: ["Explain in 2 sentences why a company uses RAG instead of retraining a model every day."],
            quiz: {
              question: "What is the main benefit of RAG (Retrieval-Augmented Generation)?",
              options: [
                "It eliminates the need for any documents",
                "It grounds AI answers in up-to-date, retrieved source documents to reduce hallucinations",
                "It makes images higher resolution",
                "It replaces databases with spreadsheets"
              ],
              answerIndex: 1,
              explanation: "RAG injects relevant, current documents into the model's context window at query time."
            }
          }
        ]
      }
    ]
  },
  {
    id: "llm-agents-production",
    title: "LLM Architecture, AI Agents & Production Systems",
    categoryId: "ai",
    level: "Advanced",
    duration: "75 min",
    prerequisites: "Applied Machine Learning & Prompt Engineering",
    guidance: "Deep dive into Transformer self-attention, tool-calling AI agents, Fine-Tuning vs. RAG trade-offs, and AI guardrails.",
    nextCourseId: null,
    description: "Advanced AI engineering: Transformer Attention, autonomous tool-calling agents, Fine-Tuning vs. RAG, and production safety.",
    chapters: [
      {
        id: "lap-ch1",
        title: "Chapter 1: Inside Transformers & AI Agents",
        lessons: [
          {
            id: "lap-1-1",
            title: "Self-Attention & Context Windows",
            explanation: "Modern LLMs are built on the Transformer architecture. Its breakthrough mechanism—Self-Attention—allows the model to weigh how every word in a sentence relates to every other word simultaneously (for example, knowing whether 'bank' means a river bank or a financial bank). The Context Window is the maximum number of tokens the model can attend to at once.",
            example: "In 'The trophy didn't fit in the suitcase because it was too big', self-attention links 'it' strongly to 'trophy'.",
            points: [
              "Attention scales quadratically with sequence length in standard Transformers.",
              "Longer context windows help process whole codebases, but retrieval quality ('lost in the middle') still matters."
            ],
            practice: ["Explain how self-attention resolves pronoun ambiguity in a sentence."],
            quiz: {
              question: "What does the Self-Attention mechanism allow a Transformer to do?",
              options: [
                "Only read one word at a time without memory",
                "Weigh relationships between all tokens in a sequence simultaneously",
                "Compress images into MP3s",
                "Bypass GPUs completely"
              ],
              answerIndex: 1,
              explanation: "Self-attention computes pairwise relevance weights across tokens in the context."
            }
          },
          {
            id: "lap-1-2",
            title: "Tool-Calling AI Agents & Guardrails",
            explanation: "An AI Agent is an LLM inside a loop that can observe, plan, call external tools (search, calculators, APIs, databases), inspect results, and decide the next step. In production, agents require strict guardrails: input/output validation, least-privilege tool permissions, human-in-the-loop confirmation for destructive actions, and prompt-injection defenses.",
            example: "A travel agent LLM searches live flights via an API, checks calendar conflicts, and asks the user for confirmation before booking.",
            points: [
              "Use RAG for new knowledge; use Fine-Tuning for consistent style, domain jargon, or specialized small-model speed.",
              "Never execute untrusted user-supplied text as direct code or SQL without sandboxing."
            ],
            practice: ["Design a 3-tool architecture for a student homework assistant agent with 1 safety guardrail."],
            quiz: {
              question: "When should you prefer Fine-Tuning over RAG?",
              options: [
                "When facts change every hour",
                "When you need consistent specialized formatting, tone, or domain behavior rather than fresh facts",
                "When you want to avoid any training data",
                "Whenever you need live stock prices"
              ],
              answerIndex: 1,
              explanation: "RAG excels at dynamic factual knowledge; fine-tuning excels at teaching consistent behavior, style, or task specialization."
            }
          }
        ]
      }
    ]
  },

  // ==================== PYTHON & TECH TRACK ====================
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    categoryId: "tech",
    level: "Beginner",
    duration: "50 min",
    prerequisites: "None — ideal starting point",
    guidance: "Start here if you have never coded before. Next step: Intermediate Python (Data Structures, OOP & APIs).",
    nextCourseId: "python-intermediate",
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
            practice: ["Write two variables: one for your favorite subject and one for your daily goal in minutes."],
            quiz: {
              question: "Which line correctly creates a variable in Python?",
              options: ["var score == 100", "score = 100", "100 = score", "int score := 100"],
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
            practice: ["Identify the data type of: price = 19.99 and passed = True."],
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
            practice: ["Write an if/else check for whether daily_minutes >= 20."],
            quiz: {
              question: "How does Python group code inside an if statement?",
              options: ["With curly braces { }", "With indentation (spaces)", "With parentheses ( )", "With HTML tags"],
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
            practice: ["What will range(5) print if looped over?"],
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
    id: "python-intermediate",
    title: "Intermediate Python: Data Structures, OOP & APIs",
    categoryId: "tech",
    level: "Intermediate",
    duration: "65 min",
    prerequisites: "Python Fundamentals",
    guidance: "Build real-world Python fluency with Lists, Dictionaries, Classes (OOP), and REST API calls. Next: Advanced Python.",
    nextCourseId: "python-advanced",
    description: "Move past basics into Python data structures, list comprehensions, Object-Oriented Programming (OOP), and JSON APIs.",
    chapters: [
      {
        id: "pyi-ch1",
        title: "Chapter 1: Lists, Dictionaries & Comprehensions",
        lessons: [
          {
            id: "pyi-1-1",
            title: "Dictionaries, Sets & List Comprehensions",
            explanation: "Lists store ordered items (`[1, 2, 3]`), Sets store unique items (`{1, 2, 3}`), and Dictionaries store fast key-value pairs (`{'name': 'Aarav', 'score': 95}`). List comprehensions provide a clean one-line syntax to transform or filter lists.",
            example: "scores = [45, 82, 91, 60]\npassed = [s for s in scores if s >= 60]  # [82, 91, 60]\nstudent = {'name': 'Aarav', 'level': 'Intermediate'}",
            points: [
              "Dictionary lookups by key are O(1) on average—super fast.",
              "Use .get('key', default) on dictionaries to avoid KeyError crashes."
            ],
            practice: ["Write a list comprehension that squares every number in [1, 2, 3, 4]."],
            quiz: {
              question: "Which Python method safely reads a dictionary key without crashing if the key is missing?",
              options: ["dict.find(key)", "dict.get(key)", "dict.pop!(key)", "dict.read(key)"],
              answerIndex: 1,
              explanation: "dict.get(key) returns None (or a default value) instead of raising KeyError."
            }
          }
        ]
      },
      {
        id: "pyi-ch2",
        title: "Chapter 2: Object-Oriented Programming & APIs",
        lessons: [
          {
            id: "pyi-2-1",
            title: "Classes, Objects & Methods (OOP)",
            explanation: "Object-Oriented Programming bundles data (attributes) and behavior (methods) into reusable blueprints called Classes. The `__init__` method initializes each new object's starting state, and `self` refers to that specific object instance.",
            example: "class Course:\n    def __init__(self, title, level):\n        self.title = title\n        self.level = level\n    def summary(self):\n        return f'{self.title} ({self.level})'",
            points: [
              "Use classes when data and functions naturally belong together.",
              "Inheritance lets a child class reuse and extend a parent class."
            ],
            practice: ["Add a `complete_lesson()` method to a `Student` class that increments `lessons_done`."],
            quiz: {
              question: "What is the role of `__init__` inside a Python class?",
              options: [
                "It deletes the class",
                "It initializes a newly created object's attributes",
                "It imports external packages",
                "It stops a loop"
              ],
              answerIndex: 1,
              explanation: "__init__ is the constructor method called automatically when a new instance is created."
            }
          },
          {
            id: "pyi-2-2",
            title: "Working with JSON & REST APIs",
            explanation: "Most web apps exchange data using JSON over HTTP REST APIs. In Python, the `json` module converts between JSON strings and dictionaries (`json.loads` / `json.dumps`), and `requests.get(url).json()` fetches live API data.",
            example: "import requests\nresp = requests.get('https://api.example.com/courses', timeout=10)\nresp.raise_for_status()\ndata = resp.json()",
            points: [
              "Always set a `timeout` and call `raise_for_status()` on HTTP requests.",
              "Never hardcode secret API keys directly in public GitHub files—use environment variables."
            ],
            practice: ["Explain what `resp.raise_for_status()` protects your script against."],
            quiz: {
              question: "Which Python `json` function converts a JSON string into a Python dictionary?",
              options: ["json.dumps()", "json.loads()", "json.stringify()", "json.open()"],
              answerIndex: 1,
              explanation: "json.loads() parses a JSON-formatted string into Python objects."
            }
          }
        ]
      }
    ]
  },
  {
    id: "python-advanced",
    title: "Advanced Python: Async, Testing & System Design",
    categoryId: "tech",
    level: "Advanced",
    duration: "75 min",
    prerequisites: "Intermediate Python",
    guidance: "Write production-grade Python using decorators, generators, asyncio concurrency, pytest unit testing, and clean architecture.",
    nextCourseId: null,
    description: "Production Python engineering: decorators, memory-efficient generators, async/await concurrency, and automated testing.",
    chapters: [
      {
        id: "pya-ch1",
        title: "Chapter 1: Decorators, Generators & Asyncio",
        lessons: [
          {
            id: "pya-1-1",
            title: "Decorators & Generators",
            explanation: "A Decorator is a function that wraps another function to add behavior (like logging, timing, or auth checks) without modifying its core code. A Generator uses `yield` instead of `return` to produce values lazily one at a time, saving huge amounts of memory on large datasets.",
            example: "def stream_lines(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()",
            points: [
              "Generators allow processing gigabyte-sized files using constant memory.",
              "Use `functools.wraps` inside decorators to preserve the original function's metadata."
            ],
            practice: ["Write a generator `countdown(n)` that yields numbers from `n` down to `1`."],
            quiz: {
              question: "What keyword turns a Python function into a memory-efficient generator?",
              options: ["return", "async", "yield", "lambda"],
              answerIndex: 2,
              explanation: "Using 'yield' pauses the function and produces one item at a time on demand."
            }
          },
          {
            id: "pya-1-2",
            title: "Asyncio, Unit Testing & Clean Architecture",
            explanation: "`async def` and `await` let Python handle thousands of network/API calls concurrently without blocking while waiting for responses. Automated tests (using `pytest`) verify edge cases before code ships, and Clean Architecture separates business rules from databases and UI.",
            example: "import asyncio\nasync def fetch_all():\n    await asyncio.gather(fetch_user(), fetch_courses())",
            points: [
              "Use `asyncio` for I/O-bound tasks (APIs, databases); use `multiprocessing` for CPU-heavy math.",
              "Write small, pure functions so they are effortless to unit-test."
            ],
            practice: ["Why is `asyncio` ideal for fetching 20 web APIs at once, but not for heavy video encoding?"],
            quiz: {
              question: "When does `asyncio` provide the biggest speedup?",
              options: [
                "Heavy CPU matrix multiplication",
                "I/O-bound work like waiting on many network or database calls",
                "Sorting a 5-item list",
                "Drawing pixels manually on CPU"
              ],
              answerIndex: 1,
              explanation: "Asyncio excels at I/O-bound concurrency by switching tasks while waiting on network responses."
            }
          }
        ]
      }
    ]
  },

  // ==================== FINANCIAL EDUCATION TRACK ====================
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    categoryId: "finance",
    level: "Beginner",
    duration: "45 min",
    prerequisites: "None — ideal starting point",
    guidance: "Start here to master budgeting, emergency funds, compound interest, and scam protection. Next: Investing Fundamentals.",
    nextCourseId: "investing-fundamentals",
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
            practice: ["List 3 Needs and 3 Wants from your own monthly spending."],
            quiz: {
              question: "In the 50/30/20 budgeting guideline, what is the 20% category typically used for?",
              options: ["Entertainment only", "Savings and debt repayment", "Luxury vacations", "Impulse shopping"],
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
            practice: ["Calculate 1 month of essential expenses for your household or student budget."],
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
            practice: ["Use the built-in Compound Interest Calculator in Tools to compare 5 years vs. 20 years."],
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
            practice: ["Write down 3 warning signs of an online financial scam."],
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
  },
  {
    id: "investing-fundamentals",
    title: "Investing Fundamentals: Stocks, Index Funds & Risk",
    categoryId: "finance",
    level: "Intermediate",
    duration: "60 min",
    prerequisites: "Financial Literacy",
    guidance: "Educational guide to how stocks, bonds, ETFs/index funds, and diversification work. Next: Macroeconomics & Risk Management.",
    nextCourseId: "macro-risk-management",
    description: "Learn how asset classes, index funds, valuation ratios (P/E), and portfolio diversification work in plain English.",
    chapters: [
      {
        id: "if-ch1",
        title: "Chapter 1: Asset Classes & Index Funds",
        lessons: [
          {
            id: "if-1-1",
            title: "Stocks, Bonds & Broad Index Funds (ETFs)",
            explanation: "Stocks represent ownership in companies (higher growth potential, higher short-term volatility). Bonds are loans to governments or corporations (generally steadier income, lower volatility). An Index Fund or ETF pools hundreds of stocks (like the S&P 500 or Nifty 50) into one low-cost basket so you don't bet everything on one company.",
            example: "Instead of trying to guess which single tech company will win over 20 years, an index fund holds all 50 or 500 top companies automatically.",
            points: [
              "Low expense ratios (fees) keep more of your compounding intact.",
              "Diversification reduces single-company failure risk, though market-wide drops still happen."
            ],
            practice: ["Explain the difference between buying 1 company's stock vs. buying a 500-company index fund."],
            quiz: {
              question: "What is the main advantage of a broad index fund for beginners?",
              options: [
                "Guaranteed zero price movement",
                "Instant diversification across many companies with low fees",
                "Free daily lottery tickets",
                "It eliminates inflation completely"
              ],
              answerIndex: 1,
              explanation: "Index funds spread risk across dozens or hundreds of companies at low cost."
            }
          },
          {
            id: "if-1-2",
            title: "Understanding P/E Ratio & Market Cap",
            explanation: "Market Capitalization = Share Price × Total Shares (the total price tag of a company). The P/E (Price-to-Earnings) Ratio = Share Price / Earnings Per Share, showing how many years of current profit investors are paying for. A high P/E often means investors expect rapid future growth—or that the stock is expensive.",
            example: "If a company trades at $100 per share and earns $5 per share annually, its P/E ratio is 20.",
            points: [
              "Never judge a company by share price alone—look at Market Cap and earnings.",
              "Compare P/E ratios within the same industry (tech vs. utilities differ)."
            ],
            practice: ["If a company's share price is ₹240 and EPS is ₹12, what is its P/E ratio?"],
            quiz: {
              question: "A company's stock price is $60 and its annual Earnings Per Share (EPS) is $3. What is its P/E ratio?",
              options: ["15", "20", "63", "180"],
              answerIndex: 1,
              explanation: "P/E = Share Price ($60) / EPS ($3) = 20."
            }
          }
        ]
      }
    ]
  },
  {
    id: "macro-risk-management",
    title: "Macroeconomics, Market Cycles & Risk Management",
    categoryId: "finance",
    level: "Advanced",
    duration: "70 min",
    prerequisites: "Investing Fundamentals",
    guidance: "Understand how central bank interest rates, inflation, behavioral biases, and rebalancing shape long-term outcomes.",
    nextCourseId: null,
    description: "Advanced market education: interest rates, inflation cycles, behavioral finance biases, and portfolio risk management.",
    chapters: [
      {
        id: "mrm-ch1",
        title: "Chapter 1: Macro Forces & Behavioral Discipline",
        lessons: [
          {
            id: "mrm-1-1",
            title: "Interest Rates, Inflation & Market Cycles",
            explanation: "Central banks (like the RBI or Federal Reserve) raise interest rates to cool down high inflation and lower rates to stimulate a slowing economy. Higher rates make borrowing more expensive for companies and increase yields on safe savings/bonds, which often puts downward pressure on high-valuation growth stocks.",
            example: "When interest rates jump from 2% to 6%, mortgages and business loans cost more, slowing spending and cooling inflation.",
            points: [
              "Existing bond prices generally move opposite to interest rates.",
              "Recessions and expansions are normal parts of economic cycles."
            ],
            practice: ["Trace what happens to business borrowing costs when a central bank raises interest rates."],
            quiz: {
              question: "Why do central banks typically raise interest rates?",
              options: [
                "To make loans free for everyone",
                "To cool down high inflation by making borrowing more expensive",
                "To increase grocery prices",
                "To shut down stock exchanges"
              ],
              answerIndex: 1,
              explanation: "Higher interest rates slow borrowing and spending to bring inflation down."
            }
          },
          {
            id: "mrm-1-2",
            title: "Behavioral Biases & Portfolio Rebalancing",
            explanation: "Human psychology is often the biggest risk in finance. Loss Aversion makes us panic-sell during crashes; FOMO (Fear Of Missing Out) makes us buy at market peaks. Systematic rebalancing—periodically resetting your mix (e.g., 70% equities / 30% bonds)—forces you to trim what surged and add to what lagged.",
            example: "If a rally pushes your 70/30 mix to 80/20, rebalancing trims 10% back into safer assets to keep your risk level steady.",
            points: [
              "Write down your rules before a market crash happens.",
              "Never risk money needed in the next 1–3 years in volatile assets."
            ],
            practice: ["List two emotional biases that hurt beginners during a sharp market drop."],
            quiz: {
              question: "What does periodic portfolio rebalancing accomplish?",
              options: [
                "Guarantees 100% profit every week",
                "Keeps your risk exposure aligned with your target asset mix",
                "Eliminates all taxes",
                "Predicts tomorrow's news"
              ],
              answerIndex: 1,
              explanation: "Rebalancing restores your intended risk profile by trimming overweight assets."
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
    title: "How AI Tokens & RAG Work",
    summary: "Language models read text in chunks called tokens. Grounding them with retrieved documents (RAG) dramatically improves accuracy.",
    category: "AI and Future Technology",
    courseId: "applied-ml-prompting"
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
  { term: "Gross Margin", category: "Business", def: "Percentage of revenue remaining after subtracting Cost of Goods Sold (COGS)." },
  { term: "CAC & LTV", category: "Business", def: "Customer Acquisition Cost vs. Lifetime Value—core unit economics metrics." },
  { term: "Economic Moat", category: "Strategy", def: "A durable competitive advantage (like network effects or switching costs) that protects profits." },
  { term: "Asset", category: "Accounting", def: "Anything of economic value owned by a person or business (cash, equipment, property)." },
  { term: "Liability", category: "Accounting", def: "Money or obligations owed to others, such as loans or unpaid bills." },
  { term: "Algorithm", category: "Computer Science", def: "A clear, step-by-step set of instructions for solving a problem or completing a task." },
  { term: "REST API", category: "Programming", def: "A web interface allowing apps to exchange structured data (usually JSON) over HTTP." },
  { term: "Machine Learning", category: "AI", def: "A branch of AI where software learns patterns from data rather than following only fixed rules." },
  { term: "RAG (Retrieval-Augmented Generation)", category: "AI", def: "Fetching relevant documents and feeding them to an LLM so answers stay grounded and up to date." },
  { term: "Hallucination (AI)", category: "AI", def: "When an AI model outputs plausible-sounding text that is factually incorrect or fabricated." },
  { term: "Compound Interest", category: "Finance", def: "Interest calculated on both the initial principal and the accumulated interest from prior periods." },
  { term: "P/E Ratio", category: "Finance", def: "Share Price divided by Earnings Per Share—a common valuation multiple." },
  { term: "Index Fund", category: "Finance", def: "A fund designed to track the performance of a broad market index rather than picking single companies." },
  { term: "Volatility", category: "Finance", def: "How sharply and quickly an asset's price moves up and down over time." }
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

// Google News RSS feeds (fetched live via rss2json CORS bridge in app.js, with curated fallback below)
window.LUMINA_GOOGLE_NEWS_FEEDS = {
  IN: {
    label: "India (en-IN)",
    daily: "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en",
    ai: "https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
    tech: "https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-IN&gl=IN&ceid=IN:en",
    business: "https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en",
    science: "https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-IN&gl=IN&ceid=IN:en",
    education: "https://news.google.com/rss/search?q=Education+Students+Technology+when:7d&hl=en-IN&gl=IN&ceid=IN:en"
  },
  US: {
    label: "Global / US (en-US)",
    daily: "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
    ai: "https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-US&gl=US&ceid=US:en",
    tech: "https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-US&gl=US&ceid=US:en",
    business: "https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-US&gl=US&ceid=US:en",
    science: "https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-US&gl=US&ceid=US:en",
    education: "https://news.google.com/rss/search?q=Education+Universities+Learning+when:7d&hl=en-US&gl=US&ceid=US:en"
  }
};

window.LUMINA_NEWS_SOURCES = {
  daily: [
    { name: "Google News", desc: "Live aggregated world & regional headlines", url: "https://news.google.com/" },
    { name: "Reuters", desc: "Global breaking news, business, and world events", url: "https://www.reuters.com/" },
    { name: "AP News", desc: "Independent global journalism and world updates", url: "https://apnews.com/" },
    { name: "BBC News", desc: "World, science, technology, and education coverage", url: "https://www.bbc.com/news" }
  ],
  ai: [
    { name: "Google News — AI", desc: "Daily AI headlines from global publications", url: "https://news.google.com/search?q=Artificial%20Intelligence" },
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

