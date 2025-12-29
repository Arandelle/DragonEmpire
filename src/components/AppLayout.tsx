import React, { useState, useEffect } from 'react';
import { ExternalLink, Egg, Sword, Heart, Wheat, ChevronDown, ChevronUp, Rocket, TrendingUp, Smartphone, Copy, Check, Menu, X, Wallet, ArrowDownUp, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';

// Image URLs
const HERO_IMAGE = "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668613441_1be975ef.png";
const DRAGON_EGGS = [
  { name: "Fire Dragon", element: "Fire", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668632376_a158ec52.png", color: "from-orange-500 to-red-600", description: "Born from volcanic flames, these fierce dragons excel in combat." },
  { name: "Water Dragon", element: "Water", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668649700_0e73e19c.png", color: "from-cyan-400 to-blue-600", description: "Masters of the deep, they bring healing and protection." },
  { name: "Earth Dragon", element: "Earth", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668668218_b7930796.png", color: "from-amber-500 to-yellow-700", description: "Sturdy and resilient, perfect for farming and defense." },
  { name: "Wind Dragon", element: "Wind", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668688662_41219e82.png", color: "from-gray-300 to-slate-400", description: "Swift as the breeze, unmatched in speed and agility." },
  { name: "Lightning Dragon", element: "Lightning", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668714690_79e5eed1.png", color: "from-purple-500 to-blue-500", description: "Crackling with power, devastating in arena battles." },
  { name: "Ice Dragon", element: "Ice", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668734763_e65e2e2b.png", color: "from-blue-300 to-cyan-500", description: "Frozen guardians with powerful crowd control abilities." },
  { name: "Nature Dragon", element: "Nature", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668750498_ffdd4a23.jpg", color: "from-emerald-400 to-green-600", description: "Connected to life itself, boosting farm yields greatly." },
  { name: "Shadow Dragon", element: "Shadow", image: "https://d64gsuwffb70l.cloudfront.net/694d38ef4ecefc5b5dc88587_1766668765389_0c2a9e0c.jpg", color: "from-purple-800 to-gray-900", description: "Mysterious and deadly, masters of stealth attacks." },
];

const CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const TOKEN_SYMBOL = "$DRAGON";
const DEX_SWAP_URL = "https://app.uniswap.org/#/swap";

const AppLayout: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [ethAmount, setEthAmount] = useState('');
  const [dragonAmount, setDragonAmount] = useState('');
  const [tokenPrice, setTokenPrice] = useState(0.00000042);
  const [priceChange, setPriceChange] = useState(12.5);
  const [refreshingPrice, setRefreshingPrice] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.00000005;
      setTokenPrice(prev => Math.max(0.00000001, prev + change));
      setPriceChange(prev => {
        const newChange = prev + (Math.random() - 0.5) * 2;
        return Math.max(-50, Math.min(50, newChange));
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Calculate dragon amount based on ETH input
  useEffect(() => {
    if (ethAmount && !isNaN(parseFloat(ethAmount))) {
      const ethValue = parseFloat(ethAmount);
      const ethPrice = 3500; // Simulated ETH price in USD
      const usdValue = ethValue * ethPrice;
      const dragons = usdValue / tokenPrice;
      setDragonAmount(dragons.toLocaleString(undefined, { maximumFractionDigits: 0 }));
    } else {
      setDragonAmount('');
    }
  }, [ethAmount, tokenPrice]);

  const handleCopyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const connectWallet = async () => {
    setConnecting(true);
    
    // Check if MetaMask or other Web3 wallet is available
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        // Simulate connection for demo
        simulateWalletConnection();
      }
    } else {
      // Simulate connection for demo purposes
      simulateWalletConnection();
    }
    
    setConnecting(false);
  };

  const simulateWalletConnection = () => {
    const fakeAddress = '0x' + Array(40).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setWalletAddress(fakeAddress);
    setWalletConnected(true);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress(null);
  };

  const refreshPrice = () => {
    setRefreshingPrice(true);
    setTimeout(() => {
      const change = (Math.random() - 0.5) * 0.0000001;
      setTokenPrice(prev => Math.max(0.00000001, prev + change));
      setRefreshingPrice(false);
    }, 1000);
  };

  const handleSwap = async () => {
    if (!walletConnected || !ethAmount) return;
    
    setSwapLoading(true);
    
    // Simulate swap transaction
    setTimeout(() => {
      setSwapLoading(false);
      setEthAmount('');
      setDragonAmount('');
      alert(`Swap successful! You received ${dragonAmount} ${TOKEN_SYMBOL}`);
    }, 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Launch",
      icon: <Rocket className="w-6 h-6" />,
      items: [
        "Launch on PUF Launchpad (World App)",
        "Release website and socials (X, Telegram)",
        "Community airdrops, early incentives, and listings on DexScreener/DexTools",
        "Community building on Telegram and X with fair airdrop and Earnable Task and challenges"
      ],
      status: "active"
    },
    {
      phase: "Phase 2",
      title: "The Growth",
      icon: <TrendingUp className="w-6 h-6" />,
      items: [
        "List on DEXs and expand trading pairs",
        "Form partnerships with other PUF creators",
        "Raise Funds for App Development"
      ],
      status: "upcoming"
    },
    {
      phase: "Phase 3",
      title: "App Development",
      icon: <Smartphone className="w-6 h-6" />,
      items: [
        "Launch the Dragon Empire as a mini app within World App"
      ],
      status: "upcoming"
    }
  ];

  const gameFeatures = [
    {
      icon: <Egg className="w-10 h-10" />,
      title: "Hatching",
      description: "Discover and hatch rare dragon eggs from different elements. Each egg holds a unique dragon with special abilities."
    },
    {
      icon: <Wheat className="w-10 h-10" />,
      title: "Farming",
      description: "Cultivate resources and grow your dragon empire. Farm magical crystals and rare items to strengthen your dragons."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Dragon Care",
      description: "Nurture and bond with your dragons. Feed, train, and evolve them to unlock their full potential."
    },
    {
      icon: <Sword className="w-10 h-10" />,
      title: "Arena Battles",
      description: "Enter the arena and battle against other dragon tamers. Prove your worth and claim legendary rewards."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-950 text-white">
      {/* Swap Modal */}
      {swapModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSwapModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-950 rounded-3xl border border-emerald-800/50 shadow-2xl shadow-emerald-500/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                  <span className="text-lg font-bold">D</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Buy {TOKEN_SYMBOL}</h3>
                  <p className="text-sm text-gray-400">Swap ETH for Dragon tokens</p>
                </div>
              </div>
              <button 
                onClick={() => setSwapModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Price Info */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">Current Price</span>
                <button 
                  onClick={refreshPrice}
                  className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={refreshingPrice}
                >
                  <RefreshCw className={`w-4 h-4 text-gray-400 ${refreshingPrice ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-white">
                  ${tokenPrice.toFixed(10)}
                </span>
                <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${
                  priceChange >= 0 
                    ? 'text-emerald-400 bg-emerald-500/20' 
                    : 'text-red-400 bg-red-500/20'
                }`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Contract Address */}
            <div className="px-6 py-4 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Contract Address</span>
                <button 
                  onClick={handleCopyContract}
                  className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span className="font-mono">{formatAddress(CONTRACT_ADDRESS)}</span>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Swap Interface */}
            <div className="p-6 space-y-4">
              {/* From (ETH) */}
              <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">From</span>
                  {walletConnected && (
                    <span className="text-sm text-gray-500">Balance: 0.00 ETH</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="0.0"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder-gray-600"
                  />
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-xs font-bold">Ξ</span>
                    </div>
                    <span className="font-semibold">ETH</span>
                  </div>
                </div>
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                  <ArrowDownUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              {/* To (DRAGON) */}
              <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">To (estimated)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="0.0"
                    value={dragonAmount}
                    readOnly
                    className="flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder-gray-600"
                  />
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600/30 to-green-600/30 border border-emerald-500/30 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                      <span className="text-xs font-bold">D</span>
                    </div>
                    <span className="font-semibold text-emerald-400">DRAGON</span>
                  </div>
                </div>
              </div>

              {/* Slippage Warning */}
              <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-xs text-yellow-500">
                  Slippage tolerance: 12% | Price impact may vary
                </span>
              </div>

              {/* Action Button */}
              {!walletConnected ? (
                <button
                  onClick={connectWallet}
                  disabled={connecting}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl font-bold text-lg hover:from-emerald-500 hover:to-green-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {connecting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm text-emerald-400">Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-400">
                        {formatAddress(walletAddress || '')}
                      </span>
                      <button 
                        onClick={disconnectWallet}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSwap}
                    disabled={!ethAmount || swapLoading}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl font-bold text-lg hover:from-emerald-500 hover:to-green-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {swapLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Swapping...
                      </>
                    ) : !ethAmount ? (
                      'Enter an amount'
                    ) : (
                      <>
                        <ArrowDownUp className="w-5 h-5" />
                        Swap
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* External DEX Link */}
              <a
                href={`${DEX_SWAP_URL}?outputCurrency=${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <span>Or swap directly on Uniswap</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                <span className="text-xl font-bold">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Dragon Empire
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-emerald-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('eggs')} className="text-gray-300 hover:text-emerald-400 transition-colors">Dragons</button>
              <button onClick={() => scrollToSection('roadmap')} className="text-gray-300 hover:text-emerald-400 transition-colors">Roadmap</button>
              <button onClick={() => scrollToSection('community')} className="text-gray-300 hover:text-emerald-400 transition-colors">Community</button>
              <button 
                onClick={() => setSwapModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg font-semibold hover:from-emerald-500 hover:to-green-500 transition-all"
              >
                Buy Token
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-emerald-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-950/95 border-b border-emerald-900/50">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-gray-300 hover:text-emerald-400 py-2">About</button>
              <button onClick={() => scrollToSection('eggs')} className="block w-full text-left text-gray-300 hover:text-emerald-400 py-2">Dragons</button>
              <button onClick={() => scrollToSection('roadmap')} className="block w-full text-left text-gray-300 hover:text-emerald-400 py-2">Roadmap</button>
              <button onClick={() => scrollToSection('community')} className="block w-full text-left text-gray-300 hover:text-emerald-400 py-2">Community</button>
              <button 
                onClick={() => { setSwapModalOpen(true); setMobileMenuOpen(false); }}
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg font-semibold"
              >
                Buy Token
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="Dragon Empire" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-emerald-950/50 to-gray-950"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
              Dragon Empire
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Enter a mystical world where you <span className="text-emerald-400 font-semibold">hatch legendary dragons</span>, 
            <span className="text-lime-400 font-semibold"> farm magical resources</span>, 
            <span className="text-green-400 font-semibold"> nurture your companions</span>, and 
            <span className="text-yellow-400 font-semibold"> battle for glory in the arena</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Buy Token Button */}
            <button
              onClick={() => setSwapModalOpen(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-lg text-gray-900 hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105"
            >
              <Wallet className="w-5 h-5" />
              <span>Buy {TOKEN_SYMBOL}</span>
            </button>

            {/* Contract Address Button */}
            <button
              onClick={handleCopyContract}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl font-bold text-lg hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
            >
              <span>Contract Address</span>
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? "Copied!" : "Click to copy"}
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://dexscreener.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-500 rounded-xl font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300 hover:scale-105"
            >
              <span>DexScreener</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://dextools.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-lime-500 rounded-xl font-bold text-lime-400 hover:bg-lime-500/20 transition-all duration-300 hover:scale-105"
            >
              <span>DexTools</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Live Price Ticker */}
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-emerald-800/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                <span className="text-sm font-bold">D</span>
              </div>
              <span className="font-bold text-white">{TOKEN_SYMBOL}</span>
            </div>
            <div className="h-6 w-px bg-gray-700" />
            <div className="text-right">
              <div className="text-lg font-bold text-white">${tokenPrice.toFixed(10)}</div>
              <div className={`text-xs font-semibold ${priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% (24h)
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce mt-12">
            <ChevronDown className="w-8 h-8 text-emerald-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Welcome to Dragon Empire
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Dragon Empire is an immersive blockchain-powered game where you build your legacy as a legendary Dragon Tamer. 
              Collect, nurture, and battle with dragons from across the elemental realms.
            </p>
          </div>

          {/* Game Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gradient-to-b from-emerald-900/30 to-gray-900/50 rounded-2xl border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center text-emerald-400 group-hover:text-lime-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dragon Eggs Section */}
      <section id="eggs" className="py-24 px-4 bg-gradient-to-b from-gray-950 via-emerald-950/30 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Elemental Dragon Eggs
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover and hatch rare dragon eggs from eight elemental types. Each dragon possesses unique abilities and traits.
            </p>
          </div>

          {/* Dragon Eggs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DRAGON_EGGS.map((egg, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${egg.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="p-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src={egg.image} 
                      alt={egg.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${egg.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${egg.color} mb-2`}>
                    {egg.element}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{egg.name}</h3>
                  <p className="text-sm text-gray-400">{egg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Our journey to build the ultimate dragon gaming experience
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-lime-500 to-gray-700"></div>

            <div className="space-y-6">
              {roadmapPhases.map((phase, index) => (
                <div key={index} className="relative pl-20">
                  {/* Timeline Node */}
                  <div className={`absolute left-5 w-6 h-6 rounded-full border-4 ${
                    phase.status === 'active' 
                      ? 'bg-emerald-500 border-emerald-300 shadow-lg shadow-emerald-500/50' 
                      : 'bg-gray-700 border-gray-600'
                  }`}></div>

                  {/* Phase Card */}
                  <div 
                    className={`bg-gradient-to-r ${
                      phase.status === 'active' 
                        ? 'from-emerald-900/50 to-gray-900/50 border-emerald-500/50' 
                        : 'from-gray-900/50 to-gray-900/30 border-gray-700/50'
                    } border rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/50`}
                  >
                    <button
                      onClick={() => setExpandedPhase(expandedPhase === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          phase.status === 'active' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-gray-800 text-gray-500'
                        }`}>
                          {phase.icon}
                        </div>
                        <div>
                          <span className={`text-sm font-bold ${
                            phase.status === 'active' ? 'text-emerald-400' : 'text-gray-500'
                          }`}>
                            {phase.phase}
                          </span>
                          <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                        </div>
                      </div>
                      {expandedPhase === index ? (
                        <ChevronUp className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </button>

                    {expandedPhase === index && (
                      <div className="px-6 pb-6">
                        <ul className="space-y-3 ml-16">
                          {phase.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 px-4 bg-gradient-to-b from-gray-950 via-emerald-950/30 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Join Our Community
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Connect with fellow Dragon Tamers, get the latest updates, and participate in exclusive events.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Twitter/X */}
            <a
              href="https://x.com/M9jestic_Dragon"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-5 bg-gray-900/50 border border-gray-700 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Twitter / X</div>
                <div className="text-sm text-gray-500">@M9jestic_Dragon</div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors ml-auto" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/DragonEmpirexyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-5 bg-gray-900/50 border border-gray-700 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0088cc] flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Telegram</div>
                <div className="text-sm text-gray-500">@DragonEmpirexyz</div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors ml-auto" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-emerald-900/30 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                  <span className="text-xl font-bold">D</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                  Dragon Empire
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Build your dragon empire in this immersive blockchain game. Hatch, farm, nurture, and battle your way to legendary status.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://x.com/M9jestic_Dragon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-emerald-900/50 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/DragonEmpirexyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-emerald-900/50 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('eggs')} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    Dragon Eggs
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('roadmap')} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    Roadmap
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('community')} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    Community
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    DexScreener <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://dextools.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    DexTools <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <button onClick={handleCopyContract} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    Contract Address {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </li>
                <li>
                  <button onClick={() => setSwapModalOpen(true)} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    Buy {TOKEN_SYMBOL} <Wallet className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
              <h5 className="text-sm font-bold text-yellow-500 mb-2">Disclaimer</h5>
              <p className="text-xs text-gray-500 leading-relaxed">
                Dragon Empire is a blockchain-based game token. Cryptocurrency investments carry inherent risks. 
                The value of tokens can fluctuate significantly, and you may lose some or all of your investment. 
                This is not financial advice. Please do your own research (DYOR) before making any investment decisions. 
                By participating, you acknowledge that you understand and accept these risks.
              </p>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} Dragon Empire. All rights reserved.</p>
              <p>Built with passion for the dragon community</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
