
/**
 * ==========================================
 *        OWNER SETTINGS & CONFIGURATION
 * ==========================================
 * Edit the variables below to customize your app.
 */

// 1. [OWNER_MODE] - Set to true to show editing UI / Admin sections.
// Set to false before sharing the link with your partner.
export const OWNER_MODE = false;

// 2. [TEXT_CONTENT] - Personalize your messages
export const APP_CONFIG = {
  partnerName: "ashuu",
  ownerName: "Ruchuu",
  anniversaryDate: "2024-02-14",
  
  // 3. [LOVE_LETTER] - Your main love letter text
  loveLetter: `Hey Ashuu,

I love you not just for how you treat me,  
but for how safe, understood, and motivated you make me feel.  
Your kindness, patience, and constant support mean everything.  
Your smile is my favorite thing in the world.

I’m truly grateful for you and the love we share.  
Happy Valentine’s Day. Always yours.`,

  // 4. [SURPRISE_MESSAGE] - Text for the surprise popup
  surpriseMessage: "You are the most beautiful soul I have ever known. Will you be my Valentine forever?",

  // 5. [COLORS] - Theme customization
  theme: {
    primary: "#fdf2f8", // Soft Luxury Pink background
    accent: "#ec4899",  // Deep Rose
    secondary: "#fbcfe8", // Blush Rose
    glass: "rgba(255, 255, 0, 0.45)",
    text: "#1f2937",
  },

  // 6. [ANIMATION_SPEED] - Heart floating speed (higher = slower)
  heartAnimationSpeed: 15, // seconds for one full loop
};

// 7. [SECRET_SECTION]
export const SECRET_CONFIG = {
  enabled: true, 
  hint: "Who is the best boyfriend?",
  validPasswords: ["rucham", "ruchuu"],
  secretMessage: "Arey Waah, yeh lo puchhi 💋"
};
