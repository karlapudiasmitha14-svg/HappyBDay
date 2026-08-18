import { PhotoMemory } from '../types';

export interface ExtendedPhotoMemory extends PhotoMemory {
  photoId: string;
  contextTitle: string;
  sisterCommentary: string;
  anilsDefense: string;
  blackmailLevel: number;
  animePowerLevel: string;
  imageAlt: string;
  originalFileName: string;
}

export const PHOTO_MEMORIES: ExtendedPhotoMemory[] = [
  {
    id: 'origin-01',
    photoId: 'banana-protocol',
    title: 'THE BANANA PROTOCOL & THE YELLOW SHIRT ERA',
    subtitle: 'EPISODE 001: The Dawn of Sibling Dynamics',
    caption: 'Little Anil in his iconic yellow shirt ("SALE LSS NAVY CREW 470") staring into the distance with pure confusion while baby sister sits in the armchair holding a banana like a legendary ancient artifact.',
    placeholderPath: '/assets/photos/childhood-01.jpg',
    originalFileName: 'WhatsApp Image 2026-08-18 at 6.58.13 PM.jpeg',
    imageAlt: 'Young Anil in yellow shirt standing next to baby sister holding a banana',
    tags: ['ERA: TODDLER SIBLINGS', 'WEAPON: SACRED BANANA', 'OUTFIT: LEGENDARY YELLOW SHIRT'],
    mangaQuote: '"He did not know what the banana was for. But he knew he wanted it."',
    contextTitle: 'Baby Sister & Toddler Anil',
    sisterCommentary: 'Look at how cute and confused you looked! And why was I holding a banana like a championship trophy?! Even back then, our chaotic energy was unmatched.',
    anilsDefense: '"I wasn\'t confused, I was calculating the gravitational velocity required to steal that banana without waking up mom."',
    blackmailLevel: 45,
    animePowerLevel: 'Level 1: Pure Innocence (0% Rage)'
  },
  {
    id: 'origin-02',
    photoId: 'sweet-feeding',
    title: 'THE FORCED SWEET FEEDING CEREMONY',
    subtitle: 'EPISODE 002: Rare Peacetime Footage',
    caption: 'Historical documentary evidence: Sister gently feeding a sweet directly into Anil\'s mouth. Anil opened his mouth without hesitation because when free food is deployed, combat ceases immediately.',
    placeholderPath: '/assets/photos/childhood-02.jpg',
    originalFileName: 'WhatsApp Image 2026-08-18 at 6.58.54 PM.jpeg',
    imageAlt: 'Sister in magenta dress feeding sweet into young Anil\'s mouth',
    tags: ['ARC: FOOD TRUCE', 'FOOD RADAR: 100%', 'SWEET FEEDING: SUCCESS'],
    mangaQuote: '"A truce was signed in the universal currency of sugar and snacks."',
    contextTitle: 'Sister Feeding Sweet to Brother',
    sisterCommentary: 'See?! I used to feed you sweets nicely! Two seconds after this photo, you probably ran off with the entire sweet box and refused to share.',
    anilsDefense: '"A true pirate takes what is offered. Luffy would be proud of my eating discipline."',
    blackmailLevel: 30,
    animePowerLevel: 'Level 10: Food Radar Activated'
  },
  {
    id: 'origin-03',
    photoId: 'foot-touching-ceremony',
    title: 'THE SUPREME "TOUCH MY FEET" POWER TRIP',
    subtitle: 'EPISODE 003: The Festival Sibling Hierarchy',
    caption: 'The single greatest moment of Anil\'s existence: Sister bowing down to touch his feet for traditional blessings. Anil, dressed in a royal red shirt and holding the yellow tray, looks down with the smirk of an ancient emperor.',
    placeholderPath: '/assets/photos/family-01.jpg',
    originalFileName: 'WhatsApp Image 2026-08-18 at 6.58.30 PM.jpeg',
    imageAlt: 'Sister bowing down touching Anil\'s feet while he stands in red shirt holding yellow tray',
    tags: ['CEREMONY: ROYAL BLESSINGS', 'AURA: +999999', 'SISTER REGRET: 100%'],
    mangaQuote: '"Bow before your older brother, mortal! Blessings granted with 50% discount."',
    contextTitle: 'Traditional Foot Touching Blessing',
    sisterCommentary: 'You literally made me touch your feet and held that yellow tray like you were the King of the Universe. That smug smile is forever burned into my memory!',
    anilsDefense: '"Tradition is tradition. For 10 seconds, I was the undisputed ruler of the household. Cherish that memory, Pandhi."',
    blackmailLevel: 85,
    animePowerLevel: 'Level 50: Supreme Older Brother Aura'
  },
  {
    id: 'origin-classified',
    photoId: 'derp-unbreakable',
    title: 'UNBREAKABLE SPIRIT DERP MODE (TOP SECRET 😂)',
    subtitle: 'EPISODE 004: 3 AM Goblin Evolution',
    caption: 'T-shirt says "CONQUER UNBREAKABLE SPIRIT", but the ultra-wide stretched smile says "I haven\'t slept in 48 hours and I just lost my 12th Free Fire match in a row". Peak derp unlocked.',
    placeholderPath: '/assets/photos/funny-01.jpg',
    originalFileName: 'Screenshot 2025-06-23 131818.png',
    imageAlt: 'Hilarious wide grin distorted filter selfie of Anil wearing Unbreakable Spirit t-shirt',
    tags: ['CLASSIFIED: TOP SECRET', 'DERP LEVEL: OVER 9000', 'SPIRIT: UNBREAKABLY WEIRD'],
    mangaQuote: '"When the coder stares into the void, the void smiles back like this."',
    contextTitle: 'The Legendary Wide-Smile Filter Selfie',
    isClassified: true,
    classificationStatus: 'SISTER BLACKMAIL VAULT (PRIORITY 1)',
    sisterCommentary: 'I have this saved in 3 different Google Drive accounts, an encrypted flash drive, and printed in a secret vault. If you ever refuse to buy me food, this photo is going on Instagram.',
    anilsDefense: '"That wasn\'t a filter, that was my pure unadulterated shonen energy breaking the limits of the front camera."',
    blackmailLevel: 100,
    animePowerLevel: 'Level 99: Final Form Goblin Energy'
  },
  {
    id: 'origin-lazy-bed',
    photoId: 'bed-coder-selfie',
    title: 'THE "I WILL CODE LATER" BEDROOM CHRONICLES',
    subtitle: 'EPISODE 005: Tactical Horizontal Hibernation',
    caption: 'The exact face Anil makes when asked: "Did you finish the assignment?" or "Can you help clean the living room?". Maximum coziness, zero guilt, full chill mode engaged.',
    placeholderPath: '/assets/photos/lazy-01.jpg',
    originalFileName: 'WhatsApp Image 2026-08-18 at 6.57.35 PM.jpeg',
    imageAlt: 'Cozy selfie of Anil resting horizontally on bed looking at camera',
    tags: ['MODE: HORIZONTAL CODER', 'PRODUCTIVITY: 0%', 'COZINESS: 100%'],
    mangaQuote: '"Lying down is simply a tactical recharge for my next big gaming clutch."',
    contextTitle: 'Cozy Bedtime / Lazy Day Selfie',
    sisterCommentary: 'You look so peaceful here, but I know for a fact you were supposed to be studying or doing chores when you took this!',
    anilsDefense: '"Newton discovered gravity while sitting down. I am discovering new algorithms while lying down."',
    blackmailLevel: 60,
    animePowerLevel: 'Level 35: Tactical Sloth Mode'
  },
  {
    id: 'origin-current',
    photoId: 'bike-protagonist',
    title: 'LEVEL 22: THE STREET PROTAGONIST (RONIN RIDER)',
    subtitle: 'EPISODE 006: Present Day — Main Character Energy',
    caption: 'Sitting on the TVS Ronin in a black jacket, gazing into the distance like a shonen anime protagonist in the middle of an epic opening theme. Level 22 achieved.',
    placeholderPath: '/assets/photos/current-01.jpg',
    originalFileName: 'WhatsApp Image 2026-08-18 at 6.59.21 PM.jpeg',
    imageAlt: 'Anil sitting cool on his TVS Ronin bike at night in black jacket',
    tags: ['LEVEL 22: COMPLETED', 'RIDE: TVS RONIN', 'ROLE: GREATEST SUPPORTER'],
    mangaQuote: '"The road ahead is long, but with a loyal sister and a fast bike, nothing can stop him."',
    contextTitle: 'Level 22 Biker Hero',
    sisterCommentary: 'Okay fine, I have to give you credit where it is due: you actually look really cool here. Happy 22nd Birthday Annaya! You\'ll always be my hero (even when you annoy me).',
    anilsDefense: '"The camera simply captured 1% of my natural aura."',
    blackmailLevel: 10,
    animePowerLevel: 'Level 22: Master Rank Legendary Brother'
  }
];

export const PHOTO_PLACEHOLDER_INSTRUCTIONS = {
  header: 'CUSTOM PHOTO GALLERY SYSTEM',
  description: 'Your uploaded photos are seamlessly integrated into the story arc with hilarious sibling commentary!',
  paths: [
    { key: 'childhood-01.jpg', desc: 'Baby sister holding banana & toddler Anil in yellow shirt' },
    { key: 'childhood-02.jpg', desc: 'Sister feeding sweet to young Anil' },
    { key: 'family-01.jpg', desc: 'Sister touching Anil\'s feet in blessing with yellow tray' },
    { key: 'funny-01.jpg', desc: 'Unbreakable Spirit wide smile derp selfie' },
    { key: 'lazy-01.jpg', desc: 'Cozy lying down bedroom selfie' },
    { key: 'current-01.jpg', desc: 'Anil on the TVS Ronin motorcycle' }
  ]
};
