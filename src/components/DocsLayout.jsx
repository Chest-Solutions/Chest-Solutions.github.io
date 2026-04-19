// components/DocsLayout.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { 
  ChevronRight, ChevronDown, Search, 
  Copy, Check, ExternalLink, ArrowLeft, ArrowRight,
  FileText, Home, Settings, Zap, Shield,
  Code, Terminal
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { Github } from 'lucide-react';

// Icon mapping based on file name
const iconMap = {
  'getting-started': Home,
  'configuration': Settings,
  'commands': Terminal,
  'api': Code,
  'checks': Shield,
  'flags': Zap,
  'installation': Terminal,
};

// Fetch docs structure from public folder
const fetchDocsStructure = async () => {
  try {
    const response = await fetch('/docs/docs.json');
    if (!response.ok) throw new Error('docs.json not found');
    const data = await response.json();
    return data;
  } catch (error) {
    const plugins = ['foliamines', 'rinoac'];
    const structure = {};
    
    for (const plugin of plugins) {
      try {
        const res = await fetch(`/docs/${plugin}/index.json`);
        if (res.ok) {
          const pluginData = await res.json();
          structure[plugin] = pluginData;
        }
      } catch (e) {
        // Plugin folder doesn't exist
      }
    }
    
    if (Object.keys(structure).length === 0) {
      return {
        foliamines: {
          name: 'FoliaMines',
          description: 'A Minecraft mines plugin for Folia servers',
          color: '#3a84f6',
          icon: 'Home',
          files: {
            'getting-started': { title: 'Getting Started', order: 1 },
            'installation': { title: 'Installation', order: 2 },
            'configuration': { title: 'Configuration', order: 3 },
            'commands': { title: 'Commands & Permissions', order: 4 },
            'api': { title: 'Developer API', order: 5 },
          }
        },
        rinoac: {
          name: 'RinoAC',
          description: 'A Minecraft anti-cheat plugin',
          color: '#f6853a',
          icon: 'Shield',
          files: {
            'installation': { title: 'Installation', order: 1 },
            'configuration': { title: 'Configuration', order: 2 },
            'checks': { title: 'Checks', order: 3 },
            'flags': { title: 'Flags & Alerts', order: 4 },
          }
        }
      };
    }
    
    return structure;
  }
};

// Get icon component
const getIcon = (iconName) => {
  const icons = {
    Home, Terminal, Settings, Code, Shield, Zap,
    FileText
  };
  return icons[iconName] || FileText;
};

// Copy button component
const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
      title="Copy code"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
    </button>
  );
};

// Custom code block component
const CodeBlock = ({ children, className, node, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');
  if (!match) {
    return <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm font-mono text-blue-400" {...props}>{children}</code>;
  }
  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-white/10 group">
      {language && (
        <div className="flex items-center justify-between bg-white/5 px-4 py-2 border-b border-white/5">
          <span className="text-xs text-gray-500 font-mono uppercase">{language}</span>
        </div>
      )}
      <pre className="bg-[#0d0d0d] p-4 overflow-x-auto">
        <code className={`text-sm font-mono leading-relaxed ${className}`} {...props}>
          {children}
        </code>
      </pre>
      <CopyButton code={code} />
    </div>
  );
};

// Parse redirects like >(path)
const RedirectRenderer = ({ children }) => {
  if (typeof children !== 'string') return children;
  
  const regex = />\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(children)) !== null) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }
    
    const path = match[1];
    const [plugin, docSlug] = path.split('/');
    
    if (plugin && docSlug) {
      parts.push(
        <Link
          key={match.index}
          to={`/docs/${plugin}/${docSlug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-blue-400 hover:text-blue-300 hover:border-blue-400/30 transition-all text-sm"
        >
          <span>{docSlug}</span>
          <ExternalLink size={12} />
        </Link>
      );
    }
    
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }
  return parts.length > 0 ? parts : children;
};

// Parse next page directive
const parseNextDirective = (content) => {
  const regex = />\s*next:([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/;
  const match = content.match(regex);
  if (match) {
    return { plugin: match[1], slug: match[2] };
  }
  return null;
};

// Search component
const SearchModal = ({ isOpen, onClose, docs, currentPlugin }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (query.length > 0) {
      const filtered = docs.filter(doc => 
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.pluginName.toLowerCase().includes(query.toLowerCase()) ||
        doc.slug.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, docs]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search size={20} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">ESC</kbd>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((doc) => (
                <Link
                  key={`${doc.plugin}-${doc.slug}`}
                  to={`/docs/${doc.plugin}/${doc.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {React.createElement(getIcon(doc.icon), { size: 18, style: { color: doc.color } })}
                  <div>
                    <div className="text-white font-medium">{doc.title}</div>
                    <div className="text-gray-500 text-sm">{doc.pluginName}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-8 text-center text-gray-500">No results found</div>
          ) : (
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">Quick links</p>
              {docs.slice(0, 5).map((doc) => (
                <Link
                  key={`${doc.plugin}-${doc.slug}`}
                  to={`/docs/${doc.plugin}/${doc.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {React.createElement(getIcon(doc.icon), { size: 16, style: { color: doc.color } })}
                  <span className="text-gray-300 text-sm">{doc.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// In-page search
const PageSearch = ({ isOpen, onClose, content, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (query.length > 0) {
      const lines = content.split('\n');
      const found = [];
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          found.push({ line: index + 1, text: line.trim().substring(0, 100) });
        }
      });
      setResults(found.slice(0, 20));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, content]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onNavigate(results[selectedIndex].line);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search size={20} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Find in page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">ESC</kbd>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result, i) => (
                <button
                  key={result.line}
                  onClick={() => {
                    onNavigate(result.line);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${
                    i === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">Line {result.line}</div>
                  <div className="text-gray-300 text-sm truncate">{result.text}</div>
                </button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-8 text-center text-gray-500">No results found</div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">Type to search in this document</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Docs Header Component
const DocsHeader = ({ docsStructure, plugin, onSearchClick }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 bg-neutral-900 rounded-b-2xl"
    >
      <div className="max-w-6xl mx-10">
        <div className="flex items-center justify-between h-16">
          <Link to="/docs" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img 
                src="/chest_short.png" 
                alt="Chest Solutions" 
                className="h-8 w-20 shadow-lg" 
                onError={(e) => {e.target.style.display='none'}} 
              />
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/downloads" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Downloads
            </Link>
            <Link to="/team" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Team
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search button */}
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search size={16} />
              <span className="text-sm hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-xs">⌘K</kbd>
            </button>
            
            <motion.a 
              whileHover={{ scale: 1.1, color: "#5865F2" }} 
              href="https://discord.gg/MsWqevupwh" 
              target="_blank" 
              className="text-gray-400 transition-colors"
            >
              <FaDiscord size={20} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#ffffff" }} 
              href="https://github.com/chest-solutions" 
              target="_blank" 
              className="text-gray-400 transition-colors"
            >
              <Github size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Main DocsLayout component
const DocsLayout = () => {
  const { plugin, slug } = useParams();
  const location = useLocation();
  const [docsStructure, setDocsStructure] = useState(null);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [pageSearchOpen, setPageSearchOpen] = useState(false);
  const contentRef = useRef(null);

  // Flatten docs for search
  const allDocs = useMemo(() => {
    if (!docsStructure) return [];
    const docs = [];
    Object.entries(docsStructure).forEach(([pluginKey, group]) => {
      Object.entries(group.files).forEach(([fileSlug, file], index) => {
        const fileList = Object.keys(group.files);
        docs.push({
          plugin: pluginKey,
          pluginName: group.name,
          slug: fileSlug,
          title: file.title,
          color: group.color,
          icon: file.icon || iconMap[fileSlug] || 'FileText',
          order: file.order || index + 1,
          prev: index > 0 ? { plugin: pluginKey, slug: fileList[index - 1] } : null,
          next: index < fileList.length - 1 ? { plugin: pluginKey, slug: fileList[index + 1] } : null,
        });
      });
    });
    return docs.sort((a, b) => a.order - b.order);
  }, [docsStructure]);

  // Load docs structure
  useEffect(() => {
    const loadDocs = async () => {
      const structure = await fetchDocsStructure();
      setDocsStructure(structure);
      
      const expanded = {};
      Object.keys(structure).forEach(key => {
        expanded[key] = true;
      });
      setExpandedGroups(expanded);
    };
    loadDocs();
  }, []);

  // Set current doc and auto-redirect
  useEffect(() => {
    if (plugin && docsStructure?.[plugin]) {
      if (!slug) {
        const files = Object.keys(docsStructure[plugin].files);
        const sortedFiles = files.sort((a, b) => 
          (docsStructure[plugin].files[a].order || 0) - (docsStructure[plugin].files[b].order || 0)
        );
        const firstDocSlug = sortedFiles[0];
        window.history.replaceState(null, '', `/docs/${plugin}/${firstDocSlug}`);
        setCurrentDoc({ plugin, slug: firstDocSlug });
      } else {
        setCurrentDoc({ plugin, slug });
      }
    }
  }, [plugin, slug, docsStructure]);

  // Load markdown content
  useEffect(() => {
    const loadContent = async () => {
      if (!currentDoc?.plugin || !currentDoc?.slug) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/docs/${currentDoc.plugin}/${currentDoc.slug}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent('# Document Not Found\n\nThis document could not be loaded.');
      }
      setLoading(false);
    };
    
    loadContent();
  }, [currentDoc]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !e.shiftKey) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        setPageSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setPageSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const getCurrentDocData = () => {
    return allDocs.find(d => d.plugin === currentDoc?.plugin && d.slug === currentDoc?.slug);
  };

  const getNextDoc = () => {
    const directive = parseNextDirective(content);
    if (directive) {
      return { plugin: directive.plugin, slug: directive.slug };
    }
    return getCurrentDocData()?.next;
  };

  const getPrevDoc = () => {
    return getCurrentDocData()?.prev;
  };

  const scrollToLine = (lineNumber) => {
    const lines = contentRef.current?.querySelectorAll('p, h1, h2, h3, li');
    if (lines && lines[Math.min(lineNumber - 1, lines.length - 1)]) {
      lines[Math.min(lineNumber - 1, lines.length - 1)].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentDocData = getCurrentDocData();
  const nextDoc = getNextDoc();
  const prevDoc = getPrevDoc();

  if (!docsStructure) {
    return (
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading docs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c]">
      {/* Header */}
      <DocsHeader 
        docsStructure={docsStructure} 
        plugin={plugin} 
        onSearchClick={() => setSearchOpen(true)}
      />

      <div className="pt-16 flex">
        {/* Sidebar - Not fixed, flows naturally */}
        <aside className="w-72 shrink-0 bg-[#0a0a0a] border-r border-white/5 overflow-y-auto pb-8 px-4 min-h-[calc(100vh-4rem)]">
          {/* Plugin selector */}
          <div className="sticky top-0 bg-[#0a0a0a] py-4 z-10">
            <select
              value={plugin || ''}
              onChange={(e) => {
                const pluginData = docsStructure[e.target.value];
                if (pluginData) {
                  const files = Object.keys(pluginData.files).sort((a, b) => 
                    (pluginData.files[a].order || 0) - (pluginData.files[b].order || 0)
                  );
                  window.history.pushState(null, '', `/docs/${e.target.value}/${files[0]}`);
                  setCurrentDoc({ plugin: e.target.value, slug: files[0] });
                }
              }}
              className="w-full p-3 rounded-xl bg-[#111] border border-[#222] text-white text-sm appearance-none cursor-pointer hover:bg-[#161616] transition-colors focus:outline-none"
            >
              <option value="" disabled>Select a plugin</option>
              {Object.entries(docsStructure).map(([slug, group]) => (
                <option key={slug} value={slug}>{group.name}</option>
              ))}
            </select>
          </div>

          {/* Navigation */}
          <div className="space-y-1">
            {Object.entries(docsStructure).map(([pluginSlug, group]) => {
              const sortedFiles = Object.entries(group.files).sort((a, b) => 
                (a[1].order || 0) - (b[1].order || 0)
              );
              const IconComponent = getIcon(group.icon);
              
              return (
                <div key={pluginSlug}>
                  <button
                    onClick={() => toggleGroup(pluginSlug)}
                    className="flex items-center justify-between w-full text-left py-2"
                  >
                    <span className="text-white font-semibold text-sm flex items-center gap-2">
                      <IconComponent size={16} style={{ color: group.color }} />
                      {group.name}
                    </span>
                    <ChevronDown 
                      className={`text-gray-500 transition-transform ${expandedGroups[pluginSlug] ? 'rotate-180' : ''}`} 
                      size={14} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expandedGroups[pluginSlug] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-0.5 ml-1 border-l border-white/10 pl-3">
                          {sortedFiles.map(([fileSlug, file]) => {
                            const FileIcon = getIcon(file.icon || iconMap[fileSlug] || 'FileText');
                            const isActive = currentDoc?.slug === fileSlug && currentDoc?.plugin === pluginSlug;
                            
                            return (
                              <Link
                                key={fileSlug}
                                to={`/docs/${pluginSlug}/${fileSlug}`}
                                className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                                  isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <FileIcon size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                                <span>{file.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-8 px-4 sm:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
              <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
              <ChevronRight size={14} />
              <span style={{ color: docsStructure[plugin]?.color }}>{docsStructure[plugin]?.name}</span>
              <ChevronRight size={14} />
              <span className="text-white">{currentDocData?.title}</span>
            </nav>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : (
              <div ref={contentRef}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code: CodeBlock,
                    p: ({ children }) => (
                      <p className="text-gray-300 my-4 leading-relaxed">
                        <RedirectRenderer>{children}</RedirectRenderer>
                      </p>
                    ),
                    a: ({ href, children }) => {
                      if (href?.startsWith('http')) {
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                            {children} <ExternalLink size={12} />
                          </a>
                        );
                      }
                      return <Link to={href} className="text-blue-400 hover:underline">{children}</Link>;
                    },
                    h1: ({ children, ...props }) => {
                      const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h1 id={id} className="text-3xl font-bold text-white mt-8 mb-4 scroll-mt-24" {...props}>{children}</h1>;
                    },
                    h2: ({ children, ...props }) => {
                      const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h2 id={id} className="text-2xl font-bold text-white mt-8 mb-3 scroll-mt-24" {...props}>{children}</h2>;
                    },
                    h3: ({ children, ...props }) => {
                      const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h3 id={id} className="text-xl font-semibold text-white mt-6 mb-2 scroll-mt-24" {...props}>{children}</h3>;
                    },
                    ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 my-4 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 my-4 space-y-2">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-300">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-white/20 pl-4 my-4 text-gray-400 italic">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="w-full border-collapse border border-white/10">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-white/10 bg-white/5 px-4 py-2 text-left text-white font-semibold">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-white/10 px-4 py-2 text-gray-300">{children}</td>
                    ),
                    hr: () => <hr className="border-white/10 my-8" />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}

            {/* Previous / Next navigation */}
            <nav className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
              {prevDoc ? (
                <Link
                  to={`/docs/${prevDoc.plugin}/${prevDoc.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Previous</div>
                    <div className="text-white font-medium">
                      {docsStructure[prevDoc.plugin]?.files[prevDoc.slug]?.title}
                    </div>
                  </div>
                </Link>
              ) : <div />}
              
              {nextDoc && (
                <Link
                  to={`/docs/${nextDoc.plugin}/${nextDoc.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-right"
                >
                  <div>
                    <div className="text-xs text-gray-500">Next</div>
                    <div className="text-white font-medium">
                      {docsStructure[nextDoc.plugin]?.files[nextDoc.slug]?.title}
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </Link>
              )}
            </nav>
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        docs={allDocs}
        currentPlugin={plugin}
      />

      {/* Page Search Modal */}
      <PageSearch
        isOpen={pageSearchOpen}
        onClose={() => setPageSearchOpen(false)}
        content={content}
        onNavigate={scrollToLine}
      />
    </div>
  );
};

export default DocsLayout;