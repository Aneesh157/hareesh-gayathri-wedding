/**
 * Central Configuration for Gayathri B (Malavika) & Hareesh Wedding Invitation
 * Authenticated directly from the official bride-side wedding invitation card.
 * Single source of truth: assets/invitation-card.jpg
 */
export const weddingConfig = {
  couple: {
    bride: "Gayathri B (Malavika)",
    groom: "Hareesh",
    brideMalayalam: "ഗായത്രി ബി (മാളവിക)",
    groomMalayalam: "ഹരീഷ്",
    pairingTitle: "Gayathri B (Malavika) & Hareesh",
    pairingTitleMalayalam: "ഗായത്രി ബി (മാളവിക) & ഹരീഷ്",
    
    // Bride & Family Details (Single Source of Truth: Uploaded Card)
    brideParents: "Sri. Balakrishnan & Smt. Krishnaveni",
    brideParentsMalayalam: "ശ്രീ. ബാലകൃഷ്ണൻ & ശ്രീമതി. കൃഷ്ണവേണി",
    brideHouse: "Mundayil House, Sreekrishnapuram, 679513",
    brideHouseMalayalam: "മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം, 679513",
    contactPhone: "9895882177",
    contactDisplay: "+91 98958 82177",

    // Groom Details (As stated on the bride-side card)
    groomParents: "Sri. Suresh Babu & Smt. Priya",
    groomParentsMalayalam: "ശ്രീ. സുരേഷ് ബാബു & ശ്രീമതി. പ്രിയ",
    groomHouse: "Pulikkal, Thirunarayanapuram, Thiruvazhiyode P.O., 679514",
    groomHouseMalayalam: "പുള്ളിക്കൽ, തിരുനാരായണപുരം, തിരുവാഴിയോട് പി.ഒ., 679514",

    // Compliments / Relatives & Friends (Single Source of Truth: Uploaded Card)
    complimentsSalutation: "ഉപചാരപൂർവ്വം:",
    compliments: "Kishore, Akhil Shankar, Nithin Shankar, Nikhil Shankar, Nikhila Shankar & Relatives and Friends",
    complimentsMalayalam: "കിഷോർ, അഖിൽ ശങ്കർ, നിധിൻ ശങ്കർ, നിഖിൽ ശങ്കർ, നിഖില ശങ്കർ & ബന്ധുമിത്രാദികൾ",
    tagline: "Two souls, two families, united in sacred love and timeless Kerala traditions."
  },

  wedding: {
    targetDate: "2026-10-24T08:00:00",
    displayDate: "24 October 2026",
    shortDate: "24 / 10 / 2026",
    malayalamDate: "1202 തുലാം 7",
    day: "Saturday",
    dayMalayalam: "ശനിയാഴ്ച",
    dayNumber: "24",
    monthNumber: "10",
    yearShort: "26",
    monthName: "OCTOBER",
    yearNumber: "2026"
  },

  // The 3 Auspicious Details Columns from the Card
  auspiciousColumns: [
    {
      id: "date",
      icon: "calendar",
      labelMalayalam: "തീയതി",
      year: "2026",
      dateMalayalam: "ഒക്ടോബർ 24",
      malayalamEra: "(1202 തുലാം 7)",
      dayMalayalam: "ശനിയാഴ്ച"
    },
    {
      id: "venue",
      icon: "location",
      labelMalayalam: "താലികെട്ട്:",
      venueNameLine1: "ശ്രീകൃഷ്ണ",
      venueNameLine2: "ക്ഷേത്രം",
      locationMalayalam: "ശ്രീകൃഷ്ണപുരം",
      hasQr: true
    },
    {
      id: "muhurtham",
      icon: "clock",
      labelMalayalam: "മുഹൂർത്തം",
      timeLine1: "രാവിലെ",
      timeLine2: "8:00 നും",
      timeLine3: "9:00 നും മധ്യേ"
    }
  ],

  // Events strictly matching the uploaded card
  events: [
    {
      id: "thalikettu",
      name: "Thalikettu & Muhurtham",
      nameMalayalam: "താലികെട്ട് & മുഹൂർത്തം",
      time: "8:00 AM – 9:00 AM",
      timeMalayalam: "രാവിലെ 8:00 നും 9:00 നും മധ്യേ",
      venueName: "Sreekrishna Temple",
      venueMalayalam: "ശ്രീകൃഷ്ണ ക്ഷേത്രം",
      location: "Sreekrishnapuram",
      locationMalayalam: "ശ്രീകൃഷ്ണപുരം",
      description: "Sacred thalikettu and matrimonial vows at Sreekrishna Temple, Sreekrishnapuram.",
      icon: "temple",
      mapUrl: "https://www.google.com/maps/search/Sreekrishna+Temple+Sreekrishnapuram+Kerala/@10.916667,76.433333,15z"
    },
    {
      id: "salkkaram",
      name: "Wedding Reception & Feast",
      nameMalayalam: "വിവാഹസൽക്കാരം",
      time: "Following Ceremony",
      timeMalayalam: "വിവാഹത്തോടനുബന്ധിച്ച്",
      venueName: "Sreekrishna Temple & Family Reception",
      venueMalayalam: "വിവാഹസൽക്കാരം",
      location: "Sreekrishnapuram",
      locationMalayalam: "ശ്രീകൃഷ്ണപുരം",
      description: "വിവാഹത്തിലും തുടർന്ന് നടത്തുന്ന വിവാഹസൽക്കാരത്തിലും പങ്കുകൊണ്ട് വധൂവരന്മാരെ ആശീർവദിക്കാൻ താങ്കളെ കുടുംബസമേതം സാദരം ക്ഷണിച്ചുകൊള്ളുന്നു.",
      icon: "feast"
    }
  ],

  venue: {
    templeName: "Sreekrishna Temple, Sreekrishnapuram",
    templeMalayalam: "ശ്രീകൃഷ്ണ ക്ഷേത്രം, ശ്രീകൃഷ്ണപുരം",
    brideHouseAddress: "Mundayil House, Sreekrishnapuram, Kerala 679513",
    brideHouseMalayalam: "മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം, 679513",
    mapUrl: "https://www.google.com/maps/search/Sreekrishna+Temple+Sreekrishnapuram+Kerala/@10.916667,76.433333,15z"
  },

  // Exact card wording verbatim
  cardDetails: {
    announcementLine1: "ഞങ്ങളുടെ മകൾ",
    brideName: "ഗായത്രി ബി",
    bridePetName: "(മാളവിക)",
    statusLine: "വിവാഹിതയാവുകയാണ്",
    groomIntro: "വരൻ :",
    groomName: "ഹരീഷ്",
    groomParentage: "S/o. ശ്രീ. സുരേഷ് ബാബു & ശ്രീമതി. പ്രിയ",
    groomAddressLine1: "പുള്ളിക്കൽ, തിരുനാരായണപുരം,",
    groomAddressLine2: "തിരുവാഴിയോട് പി.ഒ., 679514",
    
    // Invitation message paragraph
    invitationMessage: "വിവാഹത്തിലും തുടർന്ന് നടത്തുന്ന വിവാഹസൽക്കാരത്തിലും പങ്കുകൊണ്ട് വധൂവരന്മാരെ ആശീർവദിക്കാൻ താങ്കളെ കുടുംബസമേതം സാദരം ക്ഷണിച്ചുകൊള്ളുന്നു.",

    // Inviting parents
    closingIntro: "എന്ന്,",
    parentsName: "ശ്രീ. ബാലകൃഷ്ണൻ & ശ്രീമതി. കൃഷ്ണവേണി",
    houseAddress: "മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം, 679513",
    phoneNumber: "ഫോൺ: 9895882177",

    // Compliments
    complimentsHeader: "ഉപചാരപൂർവ്വം:",
    complimentsLine1: "കിഷോർ, അഖിൽ ശങ്കർ, നിധിൻ ശങ്കർ,",
    complimentsLine2: "നിഖിൽ ശങ്കർ, നിഖില ശങ്കർ",
    complimentsLine3: "& ബന്ധുമിത്രാദികൾ"
  },

  messages: {
    invitationHeaderMalayalam: "വിവാഹക്ഷണപത്രിക",
    heroHeading: "A Sacred Beginning to a Lifetime of Togetherness",
    scratchTitle: "Save The Date",
    scratchHint: "Scratch the card to reveal the sacred date & hours",
    countdownTitle: "Counting down to our auspicious day",
    countdownComplete: "Today is the auspicious day ❤️",
    storyTitle: "The Bride, Groom & Families",
    storySubtitle: "United in love, culture, and familial blessings",
    galleryTitle: "Cherished Moments",
    gallerySubtitle: "Glimpses of love, tradition, and joyous togetherness",
    venueTitle: "Ceremonies & Venues",
    venueSubtitle: "Thalikettu at Sreekrishna Temple, Sreekrishnapuram & Vivahasalkkaram",
    shareTitle: "Share Wedding Invitation",
    shareMessage: `Warm wedding invitation from the family of Gayathri B (Malavika) & Hareesh ❤️

✨ വിവാഹക്ഷണപത്രിക
👰 വധു: ഗായത്രി ബി (മാളവിക)
(D/o ശ്രീ. ബാലകൃഷ്ണൻ & ശ്രീമതി. കൃഷ്ണവേണി, മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം, 679513)
🤵 വരൻ: ഹരീഷ്
(S/o ശ്രീ. സുരേഷ് ബാബു & ശ്രീമതി. പ്രിയ, പുള്ളിക്കൽ, തിരുനാരായണപുരം, തിരുവാഴിയോട് പി.ഒ., 679514)

📅 തീയതി: 2026 ഒക്ടോബർ 24 ശനിയാഴ്ച (1202 തുലാം 7)
🕊️ താലികെട്ട് / മുഹൂർത്തം: രാവിലെ 8:00 നും 9:00 നും മധ്യേ (ശ്രീകൃഷ്ണ ക്ഷേത്രം, ശ്രീകൃഷ്ണപുരം)
🎉 വിവാഹത്തിലും തുടർന്ന് നടത്തുന്ന വിവാഹസൽക്കാരത്തിലും പങ്കുകൊണ്ട് വധൂവരന്മാരെ ആശീർവദിക്കാൻ താങ്കളെ കുടുംബസമേതം സാദരം ക്ഷണിച്ചുകൊള്ളുന്നു.

എന്ന്,
ശ്രീ. ബാലകൃഷ്ണൻ & ശ്രീമതി. കൃഷ്ണവേണി
മുണ്ടയിൽ ഹൗസ്, ശ്രീകൃഷ്ണപുരം, 679513
ഫോൺ: 9895882177

ഉപചാരപൂർവ്വം: കിഷോർ, അഖിൽ ശങ്കർ, നിധിൻ ശങ്കർ, നിഖിൽ ശങ്കർ, നിഖില ശങ്കർ & ബന്ധുമിത്രാദികൾ`,
    footerNote: "With warm family blessings,",
    footerCompliments: "കിഷോർ, അഖിൽ ശങ്കർ, നിധിൻ ശങ്കർ, നിഖിൽ ശങ്കർ, നിഖില ശങ്കർ & ബന്ധുമിത്രാദികൾ",
    footerDate: "24 • 10 • 2026 • 1202 തുലാം 7",
    footerGratitude: "Thank you for sharing in our joy & blessing the couple ❤️"
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
    music: "assets/wedding-music.mp3"
  },

  gallery: [
    {
      src: "assets/couple-seated.jpg",
      title: "Gayathri & Hareesh",
      caption: "Seated in joyous grace and family warmth"
    },
    {
      src: "assets/couple-standing.jpg",
      title: "Two Hearts, One Journey",
      caption: "Cherished moments framed by serene Kerala greenery"
    },
    {
      src: "assets/couple-traditional.jpg",
      title: "Traditional Elegance",
      caption: "Blessed with sacred traditions and familial love"
    },
    {
      src: "assets/couple-romantic.jpg",
      title: "A Gentle Promise",
      caption: "A quiet, romantic promise under the whispering palms"
    },
    {
      src: "assets/couple-walk.jpg",
      title: "Stepping Into Forever",
      caption: "Walking hand-in-hand into a bright and beautiful chapter"
    },
    {
      src: "assets/couple-embrace.jpg",
      title: "Together Forever",
      caption: "Two souls united in lifelong companionship"
    }
  ],

  theme: {
    paperIvory: "#FAF8F5",
    paperWhite: "#FFFFFF",
    creamSilk: "#F5EFEB",
    kasavuGold: "#C59A3F",
    goldDeep: "#9E7422",
    goldFoil: "#DFBF6C",
    charcoalInk: "#1C1917",
    charcoalMuted: "#665D56",
    royalMaroon: "#7A1E32"
  }
};

if (typeof window !== "undefined") {
  window.weddingConfig = weddingConfig;
}
