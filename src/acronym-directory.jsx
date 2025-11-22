import React, { useState, useMemo } from 'react';
import { Search, Filter, Network, Book, X } from 'lucide-react';

const AcronymDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedAcronym, setSelectedAcronym] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Complete acronym data with relationships
  const acronyms = [
    {
      acronym: 'MVP',
      fullForm: 'Minimum Viable Product',
      domain: 'Product Management',
      definition: 'The most basic version of a product that can be released to early adopters to validate core ideas and gather feedback for future development.',
      relatedTo: ['SDLC', 'CI', 'CD', 'QA']
    },
    {
      acronym: 'DevOps',
      fullForm: 'Development & Operations',
      domain: 'Software Culture',
      definition: 'A set of practices, cultural philosophies, and tools that combines software development (Dev) and IT operations (Ops). It aims to shorten the development lifecycle and provide continuous delivery with high software quality.',
      relatedTo: ['CI', 'CD', 'IaC', 'SCM', 'SDLC']
    },
    {
      acronym: 'CI',
      fullForm: 'Continuous Integration',
      domain: 'DevOps',
      definition: 'The practice of developers frequently merging code changes into a central repository, where automated builds and tests are run.',
      relatedTo: ['CD', 'DevOps', 'SCM', 'QA']
    },
    {
      acronym: 'CD',
      fullForm: 'Continuous Delivery / Continuous Deployment',
      domain: 'DevOps',
      definition: 'Continuous Delivery: Ensures code is always in a deployable state after passing automated tests. Continuous Deployment: Automatically releases every change that passes tests to production.',
      relatedTo: ['CI', 'DevOps', 'IaC', 'QA']
    },
    {
      acronym: 'IaC',
      fullForm: 'Infrastructure as Code',
      domain: 'DevOps',
      definition: 'Managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.',
      relatedTo: ['DevOps', 'AWS', 'IaaS', 'CD']
    },
    {
      acronym: 'SCM',
      fullForm: 'Source Control Management',
      domain: 'Software Development',
      definition: 'The practice of tracking and managing changes to code (e.g., using Git). Broader term for managing the entire software environment.',
      relatedTo: ['CI', 'DevOps', 'VCS', 'SDLC']
    },
    {
      acronym: 'IaaS',
      fullForm: 'Infrastructure as a Service',
      domain: 'Cloud Computing',
      definition: 'Online services that provide high-level APIs used to dereference various low-level details of underlying network infrastructure (e.g., AWS, Azure, GCP).',
      relatedTo: ['PaaS', 'SaaS', 'AWS', 'IaC']
    },
    {
      acronym: 'PaaS',
      fullForm: 'Platform as a Service',
      domain: 'Cloud Computing',
      definition: 'A cloud computing model that delivers a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining the infrastructure.',
      relatedTo: ['IaaS', 'SaaS', 'AWS']
    },
    {
      acronym: 'SaaS',
      fullForm: 'Software as a Service',
      domain: 'Cloud Computing',
      definition: 'A software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted (e.g., Google Workspace, Salesforce).',
      relatedTo: ['IaaS', 'PaaS', 'CRM']
    },
    {
      acronym: 'AWS',
      fullForm: 'Amazon Web Services',
      domain: 'Cloud Computing',
      definition: 'A comprehensive and widely adopted cloud platform from Amazon, offering over 200 fully featured services from data centers globally.',
      relatedTo: ['IaaS', 'PaaS', 'RDS', 'IaC']
    },
    {
      acronym: 'SDLC',
      fullForm: 'Software Development Lifecycle',
      domain: 'Software Development',
      definition: 'The process of planning, creating, testing, and deploying an information system. DevOps is a culture that optimizes the SDLC.',
      relatedTo: ['DevOps', 'CI', 'CD', 'QA', 'MVP']
    },
    {
      acronym: 'API',
      fullForm: 'Application Programming Interface',
      domain: 'Software Development',
      definition: 'A set of rules and protocols that allows different software applications to communicate with each other.',
      relatedTo: ['JSON', 'SDK', 'URL']
    },
    {
      acronym: 'CLI',
      fullForm: 'Command-Line Interface',
      domain: 'Software Development',
      definition: 'A text-based interface used to operate software and operating systems by typing commands into a terminal.',
      relatedTo: ['GUI', 'SSH', 'OS']
    },
    {
      acronym: 'CMS',
      fullForm: 'Content Management System',
      domain: 'Web Development',
      definition: 'Software used to create, manage, and modify digital content without needing specialized technical knowledge (e.g., WordPress).',
      relatedTo: ['HTML', 'CSS', 'DB']
    },
    {
      acronym: 'CSS',
      fullForm: 'Cascading Style Sheets',
      domain: 'Web Development',
      definition: 'A language used to describe the presentation of a web page, including colors, layout, and fonts.',
      relatedTo: ['HTML', 'JS', 'UI', 'UX']
    },
    {
      acronym: 'DB',
      fullForm: 'Database',
      domain: 'Data Management',
      definition: 'An organized collection of structured data, typically stored electronically in a computer system.',
      relatedTo: ['SQL', 'RDS', 'CMS']
    },
    {
      acronym: 'DNS',
      fullForm: 'Domain Name System',
      domain: 'Networking',
      definition: 'The "phonebook of the internet," translating human-readable domain names (like google.com) to machine-readable IP addresses.',
      relatedTo: ['IP', 'URL', 'VPN']
    },
    {
      acronym: 'GUI',
      fullForm: 'Graphical User Interface',
      domain: 'Software Development',
      definition: 'A visual way for users to interact with a computer or application using items like windows, icons, and buttons.',
      relatedTo: ['CLI', 'UI', 'UX']
    },
    {
      acronym: 'HTML',
      fullForm: 'HyperText Markup Language',
      domain: 'Web Development',
      definition: 'The standard markup language for documents designed to be displayed in a web browser. It defines the structure of web content.',
      relatedTo: ['CSS', 'JS', 'CMS', 'URL']
    },
    {
      acronym: 'IP',
      fullForm: 'Internet Protocol',
      domain: 'Networking',
      definition: 'The principal communications protocol for relaying datagrams across network boundaries, enabling internetworking.',
      relatedTo: ['DNS', 'VPN', 'SSH']
    },
    {
      acronym: 'IT',
      fullForm: 'Information Technology',
      domain: 'General Business',
      definition: 'The use of computers, storage, networking, and other physical devices to create, process, store, and exchange electronic data.',
      relatedTo: ['DevOps', 'OS', 'ERP']
    },
    {
      acronym: 'JS',
      fullForm: 'JavaScript',
      domain: 'Web Development',
      definition: 'A programming language that allows for the implementation of complex features on web pages, making them dynamic and interactive.',
      relatedTo: ['HTML', 'CSS', 'JSON', 'API']
    },
    {
      acronym: 'JSON',
      fullForm: 'JavaScript Object Notation',
      domain: 'Software Development',
      definition: 'A lightweight data-interchange format that is easy for humans to read and write and for machines to parse and generate.',
      relatedTo: ['API', 'JS', 'SDK']
    },
    {
      acronym: 'OS',
      fullForm: 'Operating System',
      domain: 'Software',
      definition: 'System software that manages computer hardware, software resources, and provides common services for computer programs (e.g., Windows, Linux, macOS).',
      relatedTo: ['VM', 'CLI', 'IT']
    },
    {
      acronym: 'QA',
      fullForm: 'Quality Assurance',
      domain: 'Software Development',
      definition: 'The process of ensuring that a product or service meets specified requirements and standards through systematic testing and review.',
      relatedTo: ['QC', 'CI', 'CD', 'SDLC']
    },
    {
      acronym: 'RDS',
      fullForm: 'Relational Database Service',
      domain: 'Cloud Computing',
      definition: 'A managed database service that simplifies setup, operation, and scaling of a relational database in the cloud.',
      relatedTo: ['AWS', 'DB', 'SQL']
    },
    {
      acronym: 'SDK',
      fullForm: 'Software Development Kit',
      domain: 'Software Development',
      definition: 'A collection of software tools and programs used by developers to create applications for specific platforms.',
      relatedTo: ['API', 'JSON']
    },
    {
      acronym: 'SQL',
      fullForm: 'Structured Query Language',
      domain: 'Data Management',
      definition: 'A domain-specific language used in programming and designed for managing data held in a relational database management system.',
      relatedTo: ['DB', 'RDS']
    },
    {
      acronym: 'SSH',
      fullForm: 'Secure Shell',
      domain: 'Networking',
      definition: 'A cryptographic network protocol for operating network services securely over an unsecured network, typically used for remote command-line login.',
      relatedTo: ['CLI', 'VPN', 'IP']
    },
    {
      acronym: 'SSL/TLS',
      fullForm: 'Secure Sockets Layer / Transport Layer Security',
      domain: 'Security',
      definition: 'Cryptographic protocols designed to provide communications security over a computer network. TLS is the successor to SSL.',
      relatedTo: ['VPN', 'SSH']
    },
    {
      acronym: 'UI',
      fullForm: 'User Interface',
      domain: 'Design',
      definition: 'The space where interactions between humans and machines occur; the goal is to allow effective operation and control of the machine.',
      relatedTo: ['UX', 'GUI', 'CSS']
    },
    {
      acronym: 'URL',
      fullForm: 'Uniform Resource Locator',
      domain: 'Web Development',
      definition: 'A reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it (a "web address").',
      relatedTo: ['DNS', 'HTML', 'API']
    },
    {
      acronym: 'UX',
      fullForm: 'User Experience',
      domain: 'Design',
      definition: 'A person\'s emotions and attitudes about using a particular product, system, or service. It encompasses the entire interaction.',
      relatedTo: ['UI', 'CSS', 'GUI']
    },
    {
      acronym: 'VCS',
      fullForm: 'Version Control System',
      domain: 'Software Development',
      definition: 'A system that records changes to a file or set of files over time so that you can recall specific versions later (e.g., Git).',
      relatedTo: ['SCM', 'CI']
    },
    {
      acronym: 'VM',
      fullForm: 'Virtual Machine',
      domain: 'Computing',
      definition: 'A virtual emulation of a physical computer, with its own operating system and applications, running on a shared physical host machine.',
      relatedTo: ['OS', 'IaaS', 'AWS']
    },
    {
      acronym: 'VPN',
      fullForm: 'Virtual Private Network',
      domain: 'Networking',
      definition: 'Extends a private network across a public network, enabling users to send and receive data as if their computing devices were directly connected to the private network.',
      relatedTo: ['SSH', 'SSL/TLS', 'IP']
    },
    {
      acronym: 'B2B',
      fullForm: 'Business-to-Business',
      domain: 'Business Model',
      definition: 'A model where a business sells its products or services to other businesses.',
      relatedTo: ['B2C', 'B2B2C', 'CRM']
    },
    {
      acronym: 'B2C',
      fullForm: 'Business-to-Consumer',
      domain: 'Business Model',
      definition: 'A model where a business sells its products or services directly to individual consumers.',
      relatedTo: ['B2B', 'B2B2C', 'CRM']
    },
    {
      acronym: 'KPI',
      fullForm: 'Key Performance Indicator',
      domain: 'Business',
      definition: 'A measurable value that demonstrates how effectively a company is achieving key business objectives.',
      relatedTo: ['OKR', 'ROI', 'SLA']
    },
    {
      acronym: 'OKR',
      fullForm: 'Objectives and Key Results',
      domain: 'Business',
      definition: 'A goal-setting framework for defining and tracking objectives and their outcomes. Consists of an Objective (what to achieve) and Key Results (how to measure achievement).',
      relatedTo: ['KPI', 'SWOT']
    },
    {
      acronym: 'ROI',
      fullForm: 'Return on Investment',
      domain: 'Finance',
      definition: 'A ratio used to evaluate the financial efficiency of an investment. Calculated as (Net Profit / Cost of Investment) x 100.',
      relatedTo: ['KPI', 'P&L', 'COGS']
    },
    {
      acronym: 'SOP',
      fullForm: 'Standard Operating Procedure',
      domain: 'Operations',
      definition: 'A set of step-by-step instructions compiled by an organization to help workers carry out complex routine operations.',
      relatedTo: ['QA', 'QC', 'ERP']
    },
    {
      acronym: 'SLA',
      fullForm: 'Service Level Agreement',
      domain: 'Operations',
      definition: 'A contract between a service provider and a customer that defines the level of service expected, including metrics and remedies for failure.',
      relatedTo: ['SOW', 'KPI', 'QA']
    },
    {
      acronym: 'SOW',
      fullForm: 'Statement of Work',
      domain: 'Project Management',
      definition: 'A document that defines the project-specific activities, deliverables, and timeline for a vendor providing services to a client.',
      relatedTo: ['SLA', 'RFP', 'MOA']
    },
    {
      acronym: 'RFP',
      fullForm: 'Request for Proposal',
      domain: 'Procurement',
      definition: 'A document that an organization posts to solicit bids from potential vendors for a desired service or product.',
      relatedTo: ['RFI', 'SOW', 'NDA']
    },
    {
      acronym: 'RFI',
      fullForm: 'Request for Information',
      domain: 'Procurement',
      definition: 'A document used to gather general information from potential suppliers about their capabilities and services before a formal RFP.',
      relatedTo: ['RFP', 'SOW']
    },
    {
      acronym: 'NDA',
      fullForm: 'Non-Disclosure Agreement',
      domain: 'Legal',
      definition: 'A legally binding contract that establishes a confidential relationship between parties to protect any type of confidential and proprietary information.',
      relatedTo: ['MOA', 'MOU', 'RFP']
    },
    {
      acronym: 'MOA',
      fullForm: 'Memorandum of Agreement',
      domain: 'Legal',
      definition: 'A written document describing a cooperative relationship between two parties wishing to work together on a project or to meet an agreed-upon objective.',
      relatedTo: ['MOU', 'NDA', 'SOW']
    },
    {
      acronym: 'MOU',
      fullForm: 'Memorandum of Understanding',
      domain: 'Legal',
      definition: 'An agreement between two or more parties outlined in a formal document. It is less formal than a contract but signals a willingness to move forward.',
      relatedTo: ['MOA', 'NDA']
    },
    {
      acronym: 'QC',
      fullForm: 'Quality Control',
      domain: 'Operations',
      definition: 'A process by which entities review the quality of all factors involved in production, focusing on finding defects in the final output.',
      relatedTo: ['QA', 'SOP', 'BOM']
    },
    {
      acronym: 'CRM',
      fullForm: 'Customer Relationship Management',
      domain: 'Business',
      definition: 'A technology for managing all your company\'s relationships and interactions with customers and potential customers. Also refers to the strategy itself.',
      relatedTo: ['SaaS', 'B2B', 'B2C', 'ERP']
    },
    {
      acronym: 'ERP',
      fullForm: 'Enterprise Resource Planning',
      domain: 'Business',
      definition: 'A type of software that organizations use to manage day-to-day business activities such as accounting, procurement, project management, and supply chain operations.',
      relatedTo: ['CRM', 'IT', 'SOP']
    },
    {
      acronym: 'HR',
      fullForm: 'Human Resources',
      domain: 'Business',
      definition: 'The division of a business responsible for finding, screening, recruiting, and training job applicants, and administering employee-benefit programs.',
      relatedTo: ['ERP', 'SOP']
    },
    {
      acronym: 'PR',
      fullForm: 'Public Relations',
      domain: 'Marketing',
      definition: 'The professional maintenance of a favorable public image by an organization, often through media and other intermediaries.',
      relatedTo: ['SEO', 'UVP']
    },
    {
      acronym: 'PPC',
      fullForm: 'Pay-Per-Click',
      domain: 'Marketing',
      definition: 'An internet advertising model used to drive traffic to websites, where an advertiser pays a publisher when the ad is clicked.',
      relatedTo: ['SEO', 'CTA']
    },
    {
      acronym: 'SEO',
      fullForm: 'Search Engine Optimization',
      domain: 'Marketing',
      definition: 'The practice of increasing the quantity and quality of traffic to your website through organic search engine results.',
      relatedTo: ['PPC', 'CTA', 'PR', 'UVP']
    },
    {
      acronym: 'CTA',
      fullForm: 'Call to Action',
      domain: 'Marketing',
      definition: 'A marketing term for any device designed to prompt an immediate response or encourage an immediate sale, such as "Buy Now" or "Sign Up."',
      relatedTo: ['SEO', 'PPC', 'UVP']
    },
    {
      acronym: 'UVP',
      fullForm: 'Unique Value Proposition',
      domain: 'Marketing',
      definition: 'A clear statement that describes the unique benefit of your offer, how you solve your customer\'s needs, and what distinguishes you from the competition.',
      relatedTo: ['SEO', 'CTA', 'SWOT']
    },
    {
      acronym: 'SWOT',
      fullForm: 'Strengths, Weaknesses, Opportunities, Threats',
      domain: 'Strategy',
      definition: 'A strategic planning technique used to help a person or organization identify these four key elements for decision-making.',
      relatedTo: ['OKR', 'UVP']
    },
    {
      acronym: 'P&L',
      fullForm: 'Profit and Loss Statement',
      domain: 'Finance',
      definition: 'A financial statement that summarizes the revenues, costs, and expenses incurred during a specified period.',
      relatedTo: ['ROI', 'COGS', 'FY']
    },
    {
      acronym: 'COGS',
      fullForm: 'Cost of Goods Sold',
      domain: 'Finance',
      definition: 'The direct costs attributable to the production of the goods sold by a company, including materials and labor.',
      relatedTo: ['P&L', 'ROI', 'BOM']
    },
    {
      acronym: 'BOM',
      fullForm: 'Bill of Materials',
      domain: 'Operations',
      definition: 'A comprehensive list of raw materials, components, and assemblies required to build, manufacture, or repair a product or service.',
      relatedTo: ['COGS', 'QC', 'ERP']
    },
    {
      acronym: 'FY',
      fullForm: 'Fiscal Year',
      domain: 'Finance',
      definition: 'A one-year period that companies and governments use for financial reporting and budgeting, which may not align with the calendar year.',
      relatedTo: ['P&L', 'ROI']
    },
    {
      acronym: 'B2B2C',
      fullForm: 'Business-to-Business-to-Consumer',
      domain: 'Business Model',
      definition: 'A model where one business sells its product or service to another business, which then sells it to the end consumer.',
      relatedTo: ['B2B', 'B2C']
    }
  ];

  // Get unique domains
  const domains = ['All', ...new Set(acronyms.map(a => a.domain))];

  // Filter acronyms
  const filteredAcronyms = useMemo(() => {
    return acronyms.filter(a => {
      const matchesSearch = 
        a.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.fullForm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDomain = selectedDomain === 'All' || a.domain === selectedDomain;
      
      return matchesSearch && matchesDomain;
    });
  }, [searchTerm, selectedDomain]);

  // Get related acronyms for map view
  const getRelatedAcronyms = (acronym) => {
    const related = acronyms.find(a => a.acronym === acronym)?.relatedTo || [];
    return acronyms.filter(a => related.includes(a.acronym));
  };

  // Domain color mapping
  const getDomainColor = (domain) => {
    const colors = {
      'DevOps': 'bg-blue-100 text-blue-800 border-blue-300',
      'Software Development': 'bg-green-100 text-green-800 border-green-300',
      'Cloud Computing': 'bg-purple-100 text-purple-800 border-purple-300',
      'Web Development': 'bg-orange-100 text-orange-800 border-orange-300',
      'Networking': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Security': 'bg-red-100 text-red-800 border-red-300',
      'Business': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Finance': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Marketing': 'bg-pink-100 text-pink-800 border-pink-300',
      'Operations': 'bg-amber-100 text-amber-800 border-amber-300',
      'Legal': 'bg-slate-100 text-slate-800 border-slate-300',
      'Data Management': 'bg-teal-100 text-teal-800 border-teal-300',
      'Design': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
    };
    return colors[domain] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            DevOps & Business Acronym Directory
          </h1>
          <p className="text-slate-600">
            Interactive knowledge map for Lit & More team
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search acronyms, definitions, or terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Domain Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Book className="w-4 h-4" />
              List View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Network className="w-4 h-4" />
              Knowledge Map
            </button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredAcronyms.length} of {acronyms.length} acronyms
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAcronyms.map((item) => (
              <div
                key={item.acronym}
                onClick={() => setSelectedAcronym(item)}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {item.acronym}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDomainColor(item.domain)}`}>
                    {item.domain}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  {item.fullForm}
                </p>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {item.definition}
                </p>
                {item.relatedTo && item.relatedTo.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Related to:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.relatedTo.slice(0, 4).map(related => (
                        <span
                          key={related}
                          className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                        >
                          {related}
                        </span>
                      ))}
                      {item.relatedTo.length > 4 && (
                        <span className="text-xs text-slate-400">
                          +{item.relatedTo.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Knowledge Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 text-center text-sm text-slate-600">
              Click any acronym to see its connections
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredAcronyms.map((item) => {
                const isSelected = selectedAcronym?.acronym === item.acronym;
                const isRelated = selectedAcronym?.relatedTo?.includes(item.acronym);
                
                return (
                  <button
                    key={item.acronym}
                    onClick={() => setSelectedAcronym(item)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                        : isRelated
                        ? 'border-green-400 bg-green-50'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-bold text-lg text-slate-800">
                      {item.acronym}
                    </div>
                    <div className={`text-xs mt-1 ${getDomainColor(item.domain)} px-1 py-0.5 rounded inline-block`}>
                      {item.domain}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedAcronym && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-blue-600">
                      {selectedAcronym.acronym}
                    </h2>
                    <span className={`text-sm px-3 py-1 rounded-full ${getDomainColor(selectedAcronym.domain)}`}>
                      {selectedAcronym.domain}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700">
                    {selectedAcronym.fullForm}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAcronym(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Definition
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedAcronym.definition}
                  </p>
                </div>

                {selectedAcronym.relatedTo && selectedAcronym.relatedTo.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      Related Concepts ({selectedAcronym.relatedTo.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {getRelatedAcronyms(selectedAcronym.acronym).map((related) => (
                        <button
                          key={related.acronym}
                          onClick={() => setSelectedAcronym(related)}
                          className="text-left p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <div className="font-bold text-blue-600 mb-1">
                            {related.acronym}
                          </div>
                          <div className="text-xs text-slate-600">
                            {related.fullForm}
                          </div>
                          <div className={`text-xs mt-1 ${getDomainColor(related.domain)} px-2 py-0.5 rounded inline-block`}>
                            {related.domain}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcronymDirectory;