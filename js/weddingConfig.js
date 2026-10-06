/**
 * Central Configuration for Hareesh & Gayathri Wedding Invitation
 * Authenticated directly from the official wedding invitation card (വിവാഹക്ഷണപത്രിക).
 */
export const weddingConfig = {
  couple: {
    groom: "Hareesh",
    bride: "Gayathri",
    groomMalayalam: "ഹരീഷ്",
    brideMalayalam: "ഗായത്രി",
    groomParents: "Suresh Babu & Priya",
    groomParentsMalayalam: "സുരേഷ്ബാബു & പ്രിയ",
    groomHouse: "Pulikkal House, Thirunarayanapuram, Thiruvazhiyode",
    groomHouseMalayalam: "പുളിക്കൽ ഹൗസ്, തിരുനാരായണപുരം, തിരുവാഴിയോട്",
    brideParents: "Balakrishnan & Krishnaveni",
    brideParentsMalayalam: "ശ്രീ. ബാലകൃഷ്ണൻ & ശ്രീമതി. കൃഷ്ണവേണി",
    brideHouse: "Mundayil House, Sreekrishnapuram",
    brideHouseMalayalam: "മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം",
    blessingText: "With the blessings of our families",
    blessingTextMalayalam: "ഞങ്ങളുടെ മകൻ ഹരീഷ് വിവാഹിതനാവുകയാണ്",
    compliments: "Aadish & Relatives and Friends",
    complimentsMalayalam: "ആദിഷ് & ബന്ധുമിത്രാദികൾ",
    contactPhone: "9446670237",
    tagline: "Two people. One beautiful journey."
  },

  wedding: {
    targetDate: "2026-10-24T17:00:00",
    displayDate: "24 October 2026",
    shortDate: "24 / 10 / 2026",
    malayalamDate: "1202 തുലാം 7",
    day: "Saturday",
    dayMalayalam: "ശനിയാഴ്ച",
    dayNumber: "24",
    monthName: "OCTOBER",
    yearNumber: "2026"
  },

  // Two distinct auspicious events as per the official invitation card
  events: [
    {
      id: "muhurtham",
      name: "Muhurtham & Thalikettu",
      nameMalayalam: "മുഹൂർത്തം & താലികെട്ട്",
      time: "8:00 AM – 9:00 AM",
      timeMalayalam: "രാവിലെ 8.00 നും 9.00 നും മധ്യേ",
      venueName: "Sreekrishna Temple",
      venueMalayalam: "ശ്രീകൃഷ്ണ ക്ഷേത്രം",
      location: "Sreekrishnapuram",
      locationMalayalam: "ശ്രീകൃഷ്ണപുരം",
      description: "Sacred matrimonial knot and temple blessings.",
      icon: "temple"
    },
    {
      id: "reception",
      name: "Wedding Feast & Reception",
      nameMalayalam: "സ്നേഹവിരുന്ന്",
      time: "5:00 PM – 8:00 PM",
      timeMalayalam: "വൈകുന്നേരം 5.00 മണി മുതൽ 8.00 മണിവരെ",
      venueName: "Sumangali Kalyanamandapam (Auditorium)",
      venueMalayalam: "സുമംഗലി കല്യാണമണ്ഡപം",
      location: "Thirunarayanapuram",
      locationMalayalam: "തിരുനാരായണപുരം",
      description: "Join us with your family to celebrate and bless the newlyweds.",
      mapUrl: "https://www.google.com/maps/place/Thirunarayanapuram+Sumangali+Auditorium/@10.9048812,76.394596,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba7d6e391a424ff:0xc99426cf88eeeb70!8m2!3d10.9048812!4d76.394596!16s%2Fg%2F11c2nk2ghj?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
      icon: "auditorium"
    }
  ],

  venue: {
    name: "Sumangali Kalyanamandapam / Auditorium",
    nameMalayalam: "സുമംഗലി കല്യാണമണ്ഡപം",
    location: "Thirunarayanapuram",
    locationMalayalam: "തിരുനാരായണപുരം",
    fullAddress: "Sumangali Auditorium, Thirunarayanapuram, Kerala 679514",
    templeVenue: "Sreekrishna Temple, Sreekrishnapuram",
    mapUrl: "https://www.google.com/maps/place/Thirunarayanapuram+Sumangali+Auditorium/@10.9048812,76.394596,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba7d6e391a424ff:0xc99426cf88eeeb70!8m2!3d10.9048812!4d76.394596!16s%2Fg%2F11c2nk2ghj?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
  },

  messages: {
    invitationHeaderMalayalam: "വിവാഹക്ഷണപത്രിക",
    openingSubtitle: "invite you to celebrate their wedding",
    openingHint: "Tap to open the invitation",
    heroHeading: "A beautiful beginning to a lifetime together",
    invitation: `Two hearts, two souls, and one beautiful journey.

With the love and blessings of our families, we invite you to be a part of our special day as we begin this beautiful chapter of our lives together.

വിവാഹത്തോടനുബന്ധിച്ച് വൈകുന്നേരം 5 മണി മുതൽ 8 മണിവരെ സുമംഗലി കല്യാണമണ്ഡപത്തിൽ വെച്ച് നടത്തുന്ന സ്നേഹ വിരുന്നിൽ പങ്കുകൊണ്ട് വധൂവരന്മാരെ ആശിർവദിക്കാൻ താങ്കളുടെ കുടുംബസമേതമുള്ള സാന്നിദ്ധ്യം സാദരം ക്ഷണിച്ചുകൊള്ളുന്നു.

Your presence and blessings will make our celebration complete.`,
    scratchTitle: "A Special Date Awaits...",
    scratchHint: "Scratch with your finger or mouse to reveal",
    countdownTitle: "Counting down to our special day",
    countdownComplete: "Today is the day ❤️",
    storyTitle: "Our Story & Families",
    storySubtitle: "Two families united with love, culture, and eternal blessings",
    groomBio: "Son of Suresh Babu & Priya (Pulikkal House, Thirunarayanapuram, Thiruvazhiyode)",
    groomBioMalayalam: "സുരേഷ്ബാബു & പ്രിയ ദമ്പതികളുടെ മകൻ (പുളിക്കൽ ഹൗസ്, തിരുനാരായണപുരം)",
    brideBio: "Daughter of Balakrishnan & Krishnaveni (Mundayil House, Sreekrishnapuram)",
    brideBioMalayalam: "ശ്രീ. ബാലകൃഷ്ണൻ & ശ്രീമതി. കൃഷ്ണവേണി ദമ്പതികളുടെ മകൾ (മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം)",
    coupleBio: "Bound by friendship, blessed with love, stepping hand-in-hand into forever.",
    galleryTitle: "Captured Moments",
    gallerySubtitle: "Glimpses of love, tradition, and togetherness",
    venueTitle: "The Celebration & Venues",
    venueSubtitle: "Muhurtham at Sreekrishna Temple & Reception at Sumangali Auditorium",
    shareTitle: "Share Wedding Invitation",
    shareMessage: `You're warmly invited to celebrate the wedding of Hareesh & Gayathri ❤️

📅 24 October 2026 (1202 തുലാം 7)
🕊️ Muhurtham: 8:00 AM – 9:00 AM (Sreekrishna Temple, Sreekrishnapuram)
🎉 Reception: 5:00 PM – 8:00 PM (Sumangali Auditorium, Thirunarayanapuram)

With best compliments from Suresh Babu, Priya, Aadish & Family
Contact: +91 9446670237

Join us on our special day!`,
    footerNote: "With love,\nHareesh & Gayathri",
    footerCompliments: "ആദിഷ് & ബന്ധുമിത്രാദികൾ",
    footerDate: "24 • 10 • 2026",
    footerGratitude: "Thank you for being a part of our journey ❤️"
  },

  assets: {
    heroImage: "assets/couple.jpg",
    coupleSeated: "assets/couple-seated.jpg",
    coupleStanding: "assets/couple-standing.jpg",
    coupleTraditional: "assets/couple-traditional.jpg",
    coupleRomantic: "assets/couple-romantic.jpg",
    coupleWalk: "assets/couple-walk.jpg",
    coupleEmbrace: "assets/couple-embrace.jpg",
    invitationCard: "assets/invitation-card.jpg",
    groomImage: "assets/groom.jpg",
    brideImage: "assets/bride.jpg",
    music: "assets/wedding-music.mp3",
    fallbackHero: "assets/couple.jpg"
  },

  gallery: [
    {
      src: "assets/couple-seated.jpg",
      title: "Hareesh & Gayathri",
      caption: "Seated together in radiant smiles and celebration"
    },
    {
      src: "assets/couple-standing.jpg",
      title: "Two Hearts, One Journey",
      caption: "Cherished moments framed by peaceful greenery"
    },
    {
      src: "assets/couple-traditional.jpg",
      title: "Traditional Grace",
      caption: "Two souls united with family blessings and love"
    },
    {
      src: "assets/couple-romantic.jpg",
      title: "A Gentle Promise",
      caption: "A quiet, romantic moment under the whispering palms"
    },
    {
      src: "assets/couple-walk.jpg",
      title: "Stepping Into Forever",
      caption: "Joyous moments walking hand-in-hand into a new beginning"
    },
    {
      src: "assets/couple-embrace.jpg",
      title: "Together Forever",
      caption: "Two souls, one eternal promise of companionship"
    }
  ],

  theme: {
    primaryWine: "#3D0F19",
    wineLight: "#5A1725",
    champagneGold: "#D4AF37",
    goldLight: "#F3E5AB",
    warmIvory: "#FDFBF7",
    softBeige: "#F5EFEB",
    charcoal: "#231815"
  }
};

// Also attach to window for straightforward browser access
if (typeof window !== "undefined") {
  window.weddingConfig = weddingConfig;
}
