
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Mail, 
  Star, 
  Lock, 
  Home, 
  X, 
  Sparkles
} from 'lucide-react';
import { OWNER_MODE, APP_CONFIG, SECRET_CONFIG } from './config';

/**
 * --- SUB-COMPONENTS ---
 */

// 1. Floating Hearts Background
const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * APP_CONFIG.heartAnimationSpeed + 10,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-20 transition-transform duration-1000"
          style={{
            left: `${heart.x}%`,
            bottom: `-50px`,
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// 2. Falling Petals Effect
const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<{ id: number; x: number; size: number; duration: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ['#fbcfe8', '#ec4899', '#f472b6', '#fdf2f8'];
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-60"
          style={{
            left: `${petal.x}%`,
            top: `-20px`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            backgroundColor: petal.color,
            borderRadius: '50% 0 50% 50%',
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `fallDown ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes fallDown {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// 3. macOS Traffic Light Buttons
const TrafficLights: React.FC = () => (
  <div className="hidden md:flex gap-2 px-4 py-3">
    <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500 shadow-sm"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500 shadow-sm"></div>
    <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500 shadow-sm"></div>
  </div>
);

// 4. Sidebar Item
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, disabled }) => {
  if (disabled) return null;
  return (
    <button
      onClick={onClick}
      className={`flex-1 md:w-full flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 group ${
        active 
          ? 'bg-pink-100/50 text-pink-600 shadow-sm' 
          : 'text-gray-500 hover:bg-white/30 hover:text-pink-400'
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="text-[10px] md:text-sm font-medium">{label}</span>
    </button>
  );
};

/**
 * --- MAIN APP COMPONENT ---
 */
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'letter' | 'surprise' | 'secret'>('home');
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseStatus, setSurpriseStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleUnlockSecret = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim().toLowerCase();
    const isValid = SECRET_CONFIG.validPasswords.some(pw => pw.toLowerCase() === cleanInput);
    
    if (isValid) {
      setIsSecretUnlocked(true);
    } else {
      alert("Incorrect answer, my love.");
    }
  };

  const closeSurprise = () => {
    setShowSurprise(false);
    setTimeout(() => setSurpriseStatus('pending'), 300);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 select-none overflow-hidden">
      <FloatingHearts />

      {/* Main Container */}
      <div className="relative z-10 w-full md:w-[95%] lg:w-[90%] max-w-6xl h-screen md:h-[85vh] glass rounded-none md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border-0 md:border border-white/40 animate-in fade-in zoom-in duration-700">
        
        {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
        <aside className="order-2 md:order-1 w-full md:w-64 border-t md:border-t-0 md:border-r border-white/20 flex flex-row md:flex-col bg-white/20 backdrop-blur-xl md:bg-white/10 p-2 md:p-0">
          <TrafficLights />
          
          <div className="hidden md:block px-6 py-8">
            <h1 className="text-xl font-serif font-bold text-gray-800 tracking-wide mb-10 flex items-center gap-2">
              <Sparkles className="text-pink-400 w-5 h-5" />
              L'Amour
            </h1>
            
            <nav className="space-y-3">
              <SidebarItem icon={<Home size={20} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <SidebarItem icon={<Mail size={20} />} label="Love Letter" active={activeTab === 'letter'} onClick={() => setActiveTab('letter')} />
              <SidebarItem icon={<Star size={20} />} label="Surprise" active={activeTab === 'surprise'} onClick={() => setActiveTab('surprise')} />
              <SidebarItem 
                icon={<Lock size={20} />} 
                label="Secret Vault" 
                active={activeTab === 'secret'} 
                onClick={() => setActiveTab('secret')} 
                disabled={!SECRET_CONFIG.enabled}
              />
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex w-full justify-around items-center px-4 py-2">
              <SidebarItem icon={<Home size={20} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <SidebarItem icon={<Mail size={20} />} label="Letter" active={activeTab === 'letter'} onClick={() => setActiveTab('letter')} />
              <SidebarItem icon={<Star size={20} />} label="Surprise" active={activeTab === 'surprise'} onClick={() => setActiveTab('surprise')} />
              <SidebarItem 
                icon={<Lock size={20} />} 
                label="Vault" 
                active={activeTab === 'secret'} 
                onClick={() => setActiveTab('secret')} 
                disabled={!SECRET_CONFIG.enabled}
              />
          </div>

          <div className="hidden md:flex mt-auto p-6">
            <div className="glass p-3 rounded-2xl border border-white/30 flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-500 font-bold shadow-inner">
                {APP_CONFIG.partnerName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-gray-700 truncate">{APP_CONFIG.partnerName}</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="order-1 md:order-2 flex-1 overflow-y-auto no-scrollbar relative flex flex-col h-full">
          
          {/* Top Navbar Info (Owner Only) */}
          {OWNER_MODE && (
            <div className="sticky top-0 z-30 px-6 md:px-8 py-3 bg-white/20 backdrop-blur-md border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-pink-600 font-bold">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-[0.2em]">Owner Editor Active</span>
              </div>
            </div>
          )}

          <div className="p-6 md:p-12 flex-1 flex flex-col">
            
            {/* HOME SECTION */}
            {activeTab === 'home' && (
              <section className="animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto md:mx-0">
                <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100/50 text-pink-600 text-[10px] font-black tracking-widest uppercase mb-6 shadow-sm border border-pink-200">
                  Welcome to our Sanctuary
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6 leading-[1.1]">
                  My heart belongs <br />
                  to <span className="text-pink-500">{APP_CONFIG.partnerName}</span>.
                </h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                  I built this private space to celebrate our love. Explore the letters, reveals, and the secret vault I've prepared just for you.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass p-6 rounded-3xl hover:translate-y-[-4px] transition-all cursor-pointer group shadow-lg" onClick={() => setActiveTab('letter')}>
                    <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-500">
                      <Mail size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">Our Love Notes</h3>
                    <p className="text-xs text-gray-400">Words straight from my soul.</p>
                  </div>
                  <div className="glass p-6 rounded-3xl hover:translate-y-[-4px] transition-all cursor-pointer group shadow-lg" onClick={() => setActiveTab('secret')}>
                    <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-500">
                      <Lock size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">The Vault</h3>
                    <p className="text-xs text-gray-400">Our most precious memories.</p>
                  </div>
                </div>
              </section>
            )}

            {/* LOVE LETTER SECTION */}
            {activeTab === 'letter' && (
              <section className="max-w-3xl mx-auto w-full animate-in zoom-in-95 duration-500">
                <div className="glass bg-white/70 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-white/50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/50 rounded-bl-full -z-10"></div>
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xs font-black uppercase tracking-widest text-pink-500">Heart-to-Heart</h2>
                  </div>
                  <article className="prose">
                    <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed italic whitespace-pre-wrap">
                      {APP_CONFIG.loveLetter}
                    </p>
                  </article>
                  <div className="mt-12 md:mt-16 pt-8 border-t border-pink-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-pink-200 p-1">
                      <div className="w-full h-full rounded-full bg-pink-500 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg">
                        {APP_CONFIG.ownerName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{APP_CONFIG.ownerName}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Always yours</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SURPRISE SECTION */}
            {activeTab === 'surprise' && (
              <section className="flex flex-col items-center justify-center min-h-[50vh] animate-in slide-in-from-top-4 duration-500 text-center">
                <div className="mb-8">
                  <div className="w-20 md:w-28 h-20 md:h-28 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mb-6 mx-auto animate-bounce shadow-2xl">
                    <Heart size={48} fill="currentColor" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4 tracking-tight px-4">A Little Question...</h2>
                  <p className="text-gray-400 max-w-xs mx-auto text-sm">Tap the button to reveal a message from my heart.</p>
                </div>
                
                <button 
                  onClick={() => setShowSurprise(true)}
                  className="bg-gray-800 text-white px-12 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs hover:bg-black hover:scale-105 transition-all shadow-xl active:scale-95"
                >
                  Open Surprise
                </button>

                {showSurprise && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/10 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="glass bg-white/90 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.1)] max-w-lg w-full text-center relative border-pink-100 border-2 scale-100 transform transition-transform animate-in zoom-in duration-500 overflow-hidden">
                      {surpriseStatus === 'accepted' && <FallingPetals />}
                      
                      <button 
                        onClick={closeSurprise}
                        className="absolute top-6 right-6 text-gray-300 hover:text-gray-800 z-20 transition-colors"
                      >
                        <X size={24} />
                      </button>
                      
                      {surpriseStatus === 'rejected' ? (
                        <div className="flex flex-col items-center animate-in zoom-in">
                          <span className="text-6xl mb-6">😡</span>
                          <p className="text-3xl font-serif text-red-600 leading-tight">
                            AISAA THAPPAD PADEGA
                          </p>
                        </div>
                      ) : (
                        <Heart size={64} className="text-pink-500 mx-auto mb-8 animate-pulse z-20" fill="currentColor" />
                      )}
                      
                      {surpriseStatus === 'pending' && (
                        <>
                          <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-10 z-20">
                            {APP_CONFIG.surpriseMessage}
                          </p>
                          <div className="flex flex-col gap-3 justify-center items-center z-20">
                            <div className="flex flex-wrap gap-4 justify-center">
                              <button 
                                onClick={() => setSurpriseStatus('accepted')}
                                className="bg-pink-500 text-white px-8 md:px-10 py-3.5 rounded-full font-bold hover:bg-pink-600 transition-all shadow-xl hover:shadow-pink-200"
                              >
                                Yes, Always
                              </button>
                              <button 
                                onClick={() => setSurpriseStatus('accepted')}
                                className="bg-pink-50 text-pink-500 px-8 md:px-10 py-3.5 rounded-full font-bold border border-pink-200 hover:bg-pink-100 transition-all"
                              >
                                Absolutely
                              </button>
                            </div>
                            <button 
                              onClick={() => setSurpriseStatus('rejected')}
                              className="text-gray-300 text-[10px] uppercase font-bold tracking-widest hover:text-red-400 transition-colors mt-6"
                            >
                              No, I won't
                            </button>
                          </div>
                        </>
                      )}

                      {surpriseStatus === 'accepted' && (
                        <div className="animate-in zoom-in-90 duration-700 z-20 relative pt-4">
                          <p className="text-3xl md:text-4xl font-serif text-pink-600 leading-tight">
                            YAYYYYYYYY!<br />
                            <span className="text-xl md:text-2xl mt-4 block text-gray-600">I love you more than words can say.</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* SECRET SECTION */}
            {activeTab === 'secret' && (
              <section className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-700">
                {!isSecretUnlocked ? (
                  <div className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] w-full max-w-md shadow-2xl text-center border-white/60">
                    <div className="w-16 md:w-20 h-16 md:h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-300 mx-auto mb-8 shadow-inner">
                      <Lock size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2">Private Vault</h2>
                    <p className="text-pink-500 font-bold mb-2 italic">Hint: {SECRET_CONFIG.hint}</p>
                    <p className="text-gray-400 text-xs mb-10 px-6">Access restricted to authorized hearts only.</p>
                    
                    <form onSubmit={handleUnlockSecret} className="space-y-4">
                      <input 
                        type="text" 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter secret word..."
                        className="w-full px-6 py-4 rounded-2xl bg-white/40 border border-pink-100 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all text-center font-bold text-gray-800 placeholder:font-medium"
                        autoComplete="off"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-pink-600 transition-all active:scale-95"
                      >
                        Decrypt Memory
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="glass bg-white/70 p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] w-full max-w-3xl text-center shadow-2xl border-white/50 animate-in zoom-in-95 duration-500">
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex flex-col items-center pt-4">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 mb-4 shadow-inner">
                          <Star size={20} fill="currentColor" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-gray-800 leading-tight px-4 mb-2">
                          {SECRET_CONFIG.secretMessage}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-200 to-transparent my-4"></div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black">
                          Our Private Infinite Space
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setIsSecretUnlocked(false);
                        setPasswordInput('');
                      }}
                      className="mt-12 text-[10px] font-black text-pink-300 hover:text-pink-500 transition-colors uppercase tracking-[0.2em]"
                    >
                      Close Vault
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Footer Branding */}
          <footer className="mt-auto px-8 py-6 border-t border-white/10 text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest flex flex-col md:flex-row items-center justify-between gap-2">
            <span>Designed with love by {APP_CONFIG.ownerName}</span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-pink-200"></span>
              <span>Est. {APP_CONFIG.anniversaryDate.split('-')[0]}</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Aesthetic Background Elements */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-pink-300/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-rose-200/10 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default App;
