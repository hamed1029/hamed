export interface Governorate {
  id: string;
  nameAr: string;
  nameEn: string;
  capitalAr: string;
  capitalEn: string;
  descriptionAr: string;
  descriptionEn: string;
  heroImage: string;
  wilayats: {
    id: string;
    nameAr: string;
    nameEn: string;
    keyHighlightAr: string;
    keyHighlightEn: string;
  }[];
  climateSummaryAr: string;
  climateSummaryEn: string;
  facilitiesCount: {
    attractions: number;
    hotels: number;
    restaurants: number;
    hospitals: number;
    fuelStations: number;
    mosques: number;
  };
}

export const governorates: Governorate[] = [
  {
    id: "muscat",
    nameAr: "محافظة مسقط",
    nameEn: "Muscat Governorate",
    capitalAr: "مسقط",
    capitalEn: "Muscat",
    descriptionAr: "عاصمة سلطنة عُمان ومركزها الحضاري والثقافي؛ تجمع بين عبق التاريخ العريق وحداثة العمران المعاصر وشواطئ بحر عُمان الساحرة.",
    descriptionEn: "The capital and vibrant cultural heart of Oman, where centuries-old coastal history blends harmoniously with modern elegance and serene beaches.",
    heroImage: "/src/assets/images/hero_oman_landscape_1793615737313.jpg",
    wilayats: [
      { id: "mutrah", nameAr: "مطرح", nameEn: "Mutrah", keyHighlightAr: "سوق مطرح التاريخي والكورنيش وقلعة مطرح", keyHighlightEn: "Mutrah Souq, Corniche & Mutrah Fort" },
      { id: "bawshar", nameAr: "بوشر", nameEn: "Bawshar", keyHighlightAr: "جامع السلطان قابوس الأكبر ورمال بوشر", keyHighlightEn: "Sultan Qaboos Grand Mosque & Bawshar Dunes" },
      { id: "seeb", nameAr: "السيب", nameEn: "As Seeb", keyHighlightAr: "شاطئ السيب، سوق السمك، وحدائق الصحوة", keyHighlightEn: "Seeb Beach, Traditional Fish Market & Parks" },
      { id: "muscat_city", nameAr: "مسقط", nameEn: "Muscat (Old)", keyHighlightAr: "قصر العلم العامر، قلعتي الجلالي والميراني", keyHighlightEn: "Al Alam Palace, Al Jalali & Al Mirani Forts" },
      { id: "amerat", nameAr: "العامرات", nameEn: "Al Amerat", keyHighlightAr: "عقبة العامرات وممشى جبل العامرات البانورامي", keyHighlightEn: "Al Amerat Mountain Pass & Panoramic Trails" },
      { id: "qurayyat", nameAr: "قريات", nameEn: "Qurayyat", keyHighlightAr: "سد وادي ضيقة وحصن قريات التاريخي", keyHighlightEn: "Wadi Dayqah Dam & Qurayyat Coastal Fort" },
    ],
    climateSummaryAr: "معتدل ولطيف شتاءً (20-27 مئوية)، حار رطب صيفاً. أنسب وقت للزيارة من أكتوبر حتى أبريل.",
    climateSummaryEn: "Pleasant & mild in winter (20-27°C), warm in summer. Ideal visiting season from October to April.",
    facilitiesCount: { attractions: 28, hotels: 64, restaurants: 140, hospitals: 18, fuelStations: 45, mosques: 180 },
  },
  {
    id: "dhofar",
    nameAr: "محافظة ظفار",
    nameEn: "Dhofar Governorate",
    capitalAr: "صلالة",
    capitalEn: "Salalah",
    descriptionAr: "أرض اللبان والتاريخ وموطن موسم الخريف الاستوائي الفريد حيث تكتسي الجبال بحلة خضراء وتتدفق الشلالات البديعة.",
    descriptionEn: "The legendary land of frankincense and tropical Khareef monsoon season, when emerald mist covers mountains and dramatic waterfalls flow.",
    heroImage: "/src/assets/images/oman_salalah_khareef_1793615739183.jpg",
    wilayats: [
      { id: "salalah", nameAr: "صلالة", nameEn: "Salalah", keyHighlightAr: "شاطئ المغسيل والنافورات، وادي دربات، عين رزات", keyHighlightEn: "Mughsail Beach blowholes, Wadi Darbat & Ayn Razat" },
      { id: "taqah", nameAr: "طاقة", nameEn: "Taqah", keyHighlightAr: "حصن طاقة التاريخي وخور روري (سمهرم الأثري)", keyHighlightEn: "Taqah Historic Fort & UNESCO Sumhuram Ancient Port" },
      { id: "mirbat", nameAr: "مرباط", nameEn: "Mirbat", keyHighlightAr: "قلعة مرباط، ميناء مرباط التاريخي، مياه الغوص النقية", keyHighlightEn: "Mirbat Fort, Old Maritime Harbor & pristine diving" },
      { id: "sadah", nameAr: "سدح", nameEn: "Sadah", keyHighlightAr: "شواطئ الصيد العذراء وحصن سدح", keyHighlightEn: "Pristine fishing bays & historic Sadah Watchpost" },
      { id: "thumrait", nameAr: "ثمريت", nameEn: "Thumrait", keyHighlightAr: "بوابة الربع الخالي وموقع شصر (أوبار المفقودة)", keyHighlightEn: "Gateway to the Empty Quarter & UNESCO Ubar archeology" },
      { id: "rakhyut", nameAr: "رخيوت", nameEn: "Rakhyut", keyHighlightAr: "مرتفعات جبلية خضراء وشواطئ بكر هادئة", keyHighlightEn: "Lush green coastal heights & untouched beaches" },
      { id: "dhalkut", nameAr: "ضلكوت", nameEn: "Dhalkut", keyHighlightAr: "شجرة التبلدي المعمرة وشواطئ أقصى الجنوب الغربي", keyHighlightEn: "Ancient Baobab tree & scenic southwestern cliff coast" },
      { id: "muqshin", nameAr: "مقشن", nameEn: "Muqshin", keyHighlightAr: "واحات النخيل والكثبان الصحراوية المهيبة", keyHighlightEn: "Palm oases and towering desert dunes" },
      { id: "shalim", nameAr: "شليم وجزر الحلانيات", nameEn: "Shalim & Hallaniyat Islands", keyHighlightAr: "محمية جزر الحلانيات وتنوع الكائنات البحرية والدلافين", keyHighlightEn: "Hallaniyat Marine Islands & dolphin watching" },
      { id: "mazyunah", nameAr: "المزيونة", nameEn: "Al Mazyunah", keyHighlightAr: "المنطقة الحرة والمركز التجاري الحدودي", keyHighlightEn: "Free trade commercial hub on the western border" },
    ],
    climateSummaryAr: "موسم الخريف الاستوائي من أواخر يونيو حتى سبتمبر (22-26 مئوية مع رذاذ وضباب)، معتدل باقي العام.",
    climateSummaryEn: "World-renowned Khareef monsoon (June-Sept) with mist & waterfalls (22-26°C), warm sunshine the rest of year.",
    facilitiesCount: { attractions: 34, hotels: 42, restaurants: 88, hospitals: 12, fuelStations: 32, mosques: 120 },
  },
  {
    id: "al_dakhiliyah",
    nameAr: "محافظة الداخلية",
    nameEn: "Al Dakhiliyah Governorate",
    capitalAr: "نزوى",
    capitalEn: "Nizwa",
    descriptionAr: "قلب عُمان التاريخي ومقر القلاع والحصون الشامخة وجبال الحجر الشاهقة؛ مهد الفلج والأصالة والتراث المعماري.",
    descriptionEn: "The historical heartland of Oman featuring majestic UNESCO-listed forts, date palm oases, and the soaring peaks of Jabal Akhdar and Jabal Shams.",
    heroImage: "/src/assets/images/oman_nizwa_fort_1793615738121.jpg",
    wilayats: [
      { id: "nizwa", nameAr: "نزوى", nameEn: "Nizwa", keyHighlightAr: "قلعة نزوى وسوق نزوى التقليدي لصناعة الخناجر والفخار", keyHighlightEn: "Nizwa Fort, Historic Friday Goat Souq & Silver Khanjars" },
      { id: "bahla", nameAr: "بهلاء", nameEn: "Bahla", keyHighlightAr: "قلعة بهلاء (تراث عالمي يونسكو) وصناعة الخزف التقليدي", keyHighlightEn: "UNESCO World Heritage Bahla Fort & Traditional Pottery" },
      { id: "manah", nameAr: "منح", nameEn: "Manah", keyHighlightAr: "متحف عُمان عبر الزمان وحارة البلاد الأثرية", keyHighlightEn: "Oman Across Ages Museum & Harat Al Bilad ruins" },
      { id: "al_hamra", nameAr: "الحمراء", nameEn: "Al Hamra", keyHighlightAr: "قرية مسفاة العبريين التراثية وجبل شمس (جراند كانيون)", keyHighlightEn: "Misfat Al Abriyeen heritage village & Jabal Shams Balcony" },
      { id: "jabal_akhdar", nameAr: "الجبل الأخضر", nameEn: "Al Jabal Al Akhdar", keyHighlightAr: "مدرجات الرمان والجوز والورد الجبلي وفنادق القمم", keyHighlightEn: "Pomegranate terraces, Damask rose harvest & cliffside luxury" },
      { id: "adam", nameAr: "أدم", nameEn: "Adam", keyHighlightAr: "بوابة الصحراء وحارات أدم التاريخية وبساتين النخيل", keyHighlightEn: "Historic gateway to the desert & ancient mudbrick alleys" },
      { id: "izki", nameAr: "إزكي", nameEn: "Izki", keyHighlightAr: "حارة النزار وفلج الملكي أحد أقدم أفلاج عُمان", keyHighlightEn: "Harat An-Nizar & ancient Falaj Al Malki UNESCO canal" },
      { id: "samail", nameAr: "سمائل", nameEn: "Samail", keyHighlightAr: "حصن سمائل وواد سمائل الفاصل بين سلسلتي الحجر", keyHighlightEn: "Samail Fort & panoramic Sumail Gap pass" },
      { id: "bidbid", nameAr: "بدبد", nameEn: "Bidbid", keyHighlightAr: "ملتقى الطرق وواحة فنجاء لصناعة الفخار والأعسال", keyHighlightEn: "Fanaja pottery village & flowing wadi bridges" },
    ],
    climateSummaryAr: "بارد ومنعش صيفاً على قمم الجبال (18-25 مئوية)، بارد شتاءً مع تساقط ثلوج نادرة على جبل شمس. معتدل في الوديان شتاءً.",
    climateSummaryEn: "Alpine coolness in Jabal Akhdar & Shams in summer (18-25°C), cool winters. Pleasant valley weather year-round.",
    facilitiesCount: { attractions: 31, hotels: 38, restaurants: 76, hospitals: 9, fuelStations: 29, mosques: 150 },
  },
  {
    id: "south_sharqiyah",
    nameAr: "محافظة جنوب الشرقية",
    nameEn: "South Al Sharqiyah Governorate",
    capitalAr: "صور",
    capitalEn: "Sur",
    descriptionAr: "عروس الساحل الشرقي ومهد صناعة السفن الخشبية (الغنجة)؛ تضم وادي شاب الساحر ومحمية السلاحف الخضراء برأس الجنز.",
    descriptionEn: "A maritime wonderland famous for handcrafted dhow shipyards in Sur, the emerald pools of Wadi Shab, and sea turtles nesting at Ras Al Jinz.",
    heroImage: "/src/assets/images/oman_wadi_shab_1793615738471.jpg",
    wilayats: [
      { id: "sur", nameAr: "صور", nameEn: "Sur", keyHighlightAr: "مصنع السفن التقليدية، منارة العيجة، حصن السنيسلة", keyHighlightEn: "Traditional Dhow Shipyard, Al Ayjah Lighthouse & Sunaysilah Fort" },
      { id: "ras_hadd", nameAr: "رأس الحد / الجنز", nameEn: "Ras Al Hadd & Al Jinz", keyHighlightAr: "محمية رأس الجنز للسلاحف الخضراء النادرة وأول شروق للشمس", keyHighlightEn: "Ras Al Jinz Green Turtle Reserve & Arabian sunrise point" },
      { id: "kamil_wafi", nameAr: "الكامل والوافي", nameEn: "Al Kamil Wal Wafi", keyHighlightAr: "واحات المياه العذبة ومتحف الحصن القديم", keyHighlightEn: "Freshwater oases & Old Fort Heritage Museum" },
      { id: "jaalan_hassan", nameAr: "جعلان بني بو حسن", nameEn: "Jaalan Bani Bu Hassan", keyHighlightAr: "قلعة جعلان وفلج بو حسن التراثي", keyHighlightEn: "Historic fortified castle & traditional Falaj" },
      { id: "jaalan_ali", nameAr: "جعلان بني بو علي", nameEn: "Jaalan Bani Bu Ali", keyHighlightAr: "جامع ذو القباب الخمسين ومحمية أشخرة الشاطئية", keyHighlightEn: "50-Dome Historic Mosque & breezy Asilah / Al Ashkharah coast" },
      { id: "masirah", nameAr: "جزيرة مصيرة", nameEn: "Masirah Island", keyHighlightAr: "رياضات ركوب الأمواج بالشراع، السواحل العذراء، صيد الأسماك", keyHighlightEn: "World-class kitesurfing, secluded sandy beaches & sea wildlife" },
    ],
    climateSummaryAr: "رياح ساحلية لطيفة صيفاً في الأشخرة ومصيرة (24-28 مئوية) متأثرة بالرياح الموسمية، وطقس شتوي معتدل.",
    climateSummaryEn: "Pleasantly cooled by coastal summer monsoon breezes in Al Ashkharah & Masirah (24-28°C), mild winter sunshine.",
    facilitiesCount: { attractions: 24, hotels: 26, restaurants: 52, hospitals: 6, fuelStations: 22, mosques: 95 },
  },
  {
    id: "north_sharqiyah",
    nameAr: "محافظة شمال الشرقية",
    nameEn: "North Al Sharqiyah Governorate",
    capitalAr: "إبراء",
    capitalEn: "Ibra",
    descriptionAr: "أرض الكثبان الرملية الذهبية في رمال الشرقية وملاذ المغامرات الصحراوية وواحة وادي بني خالد الدائمة الجريان.",
    descriptionEn: "Home to the boundless golden dunes of Wahiba Sands, Bedouin desert culture, and the turquoise oasis of Wadi Bani Khalid.",
    heroImage: "/src/assets/images/oman_wahiba_desert_1793615739116.jpg",
    wilayats: [
      { id: "ibra", nameAr: "إبراء", nameEn: "Ibra", keyHighlightAr: "سوق الأربعاء للنساء وقرية المنزفة الأثرية", keyHighlightEn: "Wednesday Women's Souq & historic Al Munzafah towers" },
      { id: "bidiya", nameAr: "بدية", nameEn: "Bidiya", keyHighlightAr: "بوابة رمال الشرقية (وهيبة)، التزلج على الرمال والمخيمات الفاخرة", keyHighlightEn: "Wahiba Sands dunes, dune bashing, camel treks & luxury desert camps" },
      { id: "wadi_bani_khalid", nameAr: "وادي بني خالد", nameEn: "Wadi Bani Khalid", keyHighlightAr: "برك المياه الفيروزية الطبيعية وكهف مقل", keyHighlightEn: "Year-round emerald natural pools & Moqil Cave" },
      { id: "al_mudhaibi", nameAr: "المضيبي", nameEn: "Al Mudhaibi", keyHighlightAr: "القلاع القديمة وواحات النخيل الممتدة", keyHighlightEn: "Ancient fortifications and historic desert trade routes" },
      { id: "al_qabil", nameAr: "القابل", nameEn: "Al Qabil", keyHighlightAr: "الأفلاج المائية والقرى الحجرية التراثية", keyHighlightEn: "UNESCO Falaj channels and preserved clay architecture" },
      { id: "dima_tayeen", nameAr: "دماء والطائيين", nameEn: "Dima W'attayeen", keyHighlightAr: "أودية ضيقة وشلالات جبلية طبيعية خلابة", keyHighlightEn: "Narrow canyon wadis, lush mountain springs & fruit orchards" },
      { id: "sinaw", nameAr: "سناو", nameEn: "Sinaw", keyHighlightAr: "سوق سناو التقليدي للإبل والأغنام والمصوغات الفضية", keyHighlightEn: "Famous Thursday Bedouin livestock and antique silverware souq" },
    ],
    climateSummaryAr: "صحراوي دافئ شتاءً مع ليالي باردة مثالية للتخييم تحت النجوم (12-25 مئوية)، حار نهاراً صيفاً.",
    climateSummaryEn: "Mild winter days & crisp desert nights ideal for stargazing & camping (12-25°C), hot summer days.",
    facilitiesCount: { attractions: 20, hotels: 29, restaurants: 48, hospitals: 5, fuelStations: 20, mosques: 85 },
  },
  {
    id: "musandam",
    nameAr: "محافظة مسندم",
    nameEn: "Musandam Governorate",
    capitalAr: "خصب",
    capitalEn: "Khasab",
    descriptionAr: "شبه جزيرة ساحرة تُعرف بـ 'نرويج الشرق الأوسط' بفضل مضائقها البحرية وجبالها الشاهقة التي تنحدر مباشرة في مياه الخليج.",
    descriptionEn: "Known as the 'Norway of Arabia' for its jaw-dropping sea fjords, dolphins, and limestone mountains diving straight into turquoise waters.",
    heroImage: "/src/assets/images/hero_oman_landscape_1793615737313.jpg",
    wilayats: [
      { id: "khasab", nameAr: "خصب", nameEn: "Khasab", keyHighlightAr: "رحلات السفن الخشبية (الداو) في المضائق، جزيرة التلغراف، قلعة خصب", keyHighlightEn: "Traditional Dhow cruises in sea fjords, Telegraph Island & Khasab Castle" },
      { id: "bukha", nameAr: "بخاء", nameEn: "Bukha", keyHighlightAr: "حصن البلاد، قلعة القلعة، والشواطئ الصخرية الصافية", keyHighlightEn: "Bukha Fort, Al Qala'a stronghold & crystal coastal dive sites" },
      { id: "daba", nameAr: "دبا", nameEn: "Daba", keyHighlightAr: "منتجعات زغي باي الفاخرة، خليج حافة، التخييم البحري", keyHighlightEn: "Luxury Six Senses Zighy Bay, secluded coves & mountain paragliding" },
      { id: "madha", nameAr: "مدحاء", nameEn: "Madha", keyHighlightAr: "متحف محمد بن سالم المدحاني والنقوش الصخرية القديمة", keyHighlightEn: "Rock art petroglyphs & local heritage folk museum" },
    ],
    climateSummaryAr: "معتدل مشمس شتاءً (20-27 مئوية) مع مياه بحرية نقية مثالية للغوص ومراقبة الدلافين.",
    climateSummaryEn: "Warm & comfortable winters (20-27°C) with calm crystal waters, dolphins, and fjord cruising.",
    facilitiesCount: { attractions: 18, hotels: 15, restaurants: 32, hospitals: 4, fuelStations: 10, mosques: 45 },
  },
  {
    id: "south_batinah",
    nameAr: "محافظة جنوب الباطنة",
    nameEn: "South Al Batinah Governorate",
    capitalAr: "الرستاق",
    capitalEn: "Rustaq",
    descriptionAr: "ملتقى الحصون الكبرى والعيون الكبريتية الحارة مثل عين الكسفة وعين الثوارة ووادي الحوقين ووادي بني عوف.",
    descriptionEn: "Land of grand historic fortresses, natural thermal mineral springs like Ayn Al Kasfah, and adventure wadis like Wadi Bani Awf.",
    heroImage: "/src/assets/images/oman_nizwa_fort_1793615738121.jpg",
    wilayats: [
      { id: "rustaq", nameAr: "الرستاق", nameEn: "Rustaq", keyHighlightAr: "قلعة الرستاق الشامخة، عين الكسفة الحارة، حصن الحزم", keyHighlightEn: "Rustaq Grand Fort, Ayn Al Kasfah thermal spring & Al Hazm Castle" },
      { id: "nakhal", nameAr: "نخل", nameEn: "Nakhal", keyHighlightAr: "قلعة نخل على الصخرة وعين الثوارة المتدفقة بين النخيل", keyHighlightEn: "Nakhal Fort on bedrock & Ayn Thowarah lush spring oasis" },
      { id: "awabi", nameAr: "العوابي", nameEn: "Al Awabi", keyHighlightAr: "بوابة وادي بني عوف وممشى وادي السحتن (وادي الموت)", keyHighlightEn: "Gateway to Wadi Bani Awf canyon & Little Snake Gorge" },
      { id: "wadi_maawil", nameAr: "وادي المعاول", nameEn: "Wadi Al Ma'awil", keyHighlightAr: "قلعة السفالة ومزارع الليمون والتمور العُمانية", keyHighlightEn: "As-Sifalah Fort & traditional date and lime orchards" },
      { id: "barka", nameAr: "بركاء", nameEn: "Barka", keyHighlightAr: "حصن بركاء، مصانع الحلوى العُمانية، ونطاح الثيران الشعبي", keyHighlightEn: "Barka Fort, authentic Omani Halwa factories & coastal fish markets" },
      { id: "musannah", nameAr: "المصنعة", nameEn: "Al Musannah", keyHighlightAr: "منتجع ميلينيوم المصنعة، المدينة الرياضية للسباقات الشراعية", keyHighlightEn: "Millennium Sailing Resort & international maritime regattas" },
    ],
    climateSummaryAr: "معتدل ولطيف في الساحل والوديان شتاءً، دافئ صيفاً. العيون الحارة ممتازة على مدار العام.",
    climateSummaryEn: "Mild winter weather, pleasant spring breezes. Hot mineral springs enjoyable year-round.",
    facilitiesCount: { attractions: 22, hotels: 25, restaurants: 65, hospitals: 7, fuelStations: 28, mosques: 110 },
  },
  {
    id: "north_batinah",
    nameAr: "محافظة شمال الباطنة",
    nameEn: "North Al Batinah Governorate",
    capitalAr: "صحار",
    capitalEn: "Sohar",
    descriptionAr: "مدينة السندباد البحري ومهد التجارة البحرية القديمة؛ بوابة عُمان الصناعية والتجارية ذات السواحل الخصبة.",
    descriptionEn: "The legendary port of Sinbad the Sailor and cradle of ancient maritime silk-route trade, featuring Sohar Fort and coastal souqs.",
    heroImage: "/src/assets/images/hero_oman_landscape_1793615737313.jpg",
    wilayats: [
      { id: "sohar", nameAr: "صحار", nameEn: "Sohar", keyHighlightAr: "قلعة صحار البحرية البيضاء، سوق صحار التراثي، الكورنيش", keyHighlightEn: "White Sohar Fort & Museum, Traditional Handicrafts Souq & Corniche" },
      { id: "shinas", nameAr: "شناص", nameEn: "Shinas", keyHighlightAr: "حصن شناص وأشجار القرم البحرية والموانئ الساحلية", keyHighlightEn: "Shinas Fort & coastal mangrove marine forests" },
      { id: "liwa", nameAr: "لوى", nameEn: "Liwa", keyHighlightAr: "حصن لوى الأثري وعيون المياه العذبة", keyHighlightEn: "Liwa Historic Fortress & freshwater springs" },
      { id: "saham", nameAr: "صحم", nameEn: "Saham", keyHighlightAr: "شواطئ الصيد التقليدية وحصن صحم", keyHighlightEn: "Traditional artisanal fishing shores & Saham Castle" },
      { id: "khaburah", nameAr: "الخابورة", nameEn: "Al Khaburah", keyHighlightAr: "صناعة الخناجر الفضية وصناعة الحلوى والقلاع", keyHighlightEn: "Handcrafted silver Khanjar workshops & Khaburah Fort" },
      { id: "suwayq", nameAr: "السويق", nameEn: "As Suwayq", keyHighlightAr: "حصن السويق الأكبر مساحة وواحات الزراعة الخضراء", keyHighlightEn: "Expansive Suwayq Fort & lush agricultural plains" },
    ],
    climateSummaryAr: "معتدل شتاءً (20-28 مئوية)، مع نسيم بحري لطيف على طول الكورنيش والساحل.",
    climateSummaryEn: "Pleasant winter warmth (20-28°C), gentle coastal breezes along the Arabian Sea.",
    facilitiesCount: { attractions: 19, hotels: 22, restaurants: 58, hospitals: 8, fuelStations: 26, mosques: 105 },
  },
  {
    id: "al_dhahirah",
    nameAr: "محافظة الظاهرة",
    nameEn: "Al Dhahirah Governorate",
    capitalAr: "عبري",
    capitalEn: "Ibri",
    descriptionAr: "ملتقى القوافل القديمة وتضم موقع بات الأثري (تراث عالمي يونسكو) الذي يعود إلى الألفية الثالثة قبل الميلاد وحصن عبري العظيم.",
    descriptionEn: "Ancient crossroads of trade featuring the 3rd millennium BC Bronze Age tombs of Bat (UNESCO) and imposing Ibri Castle.",
    heroImage: "/src/assets/images/oman_nizwa_fort_1793615738121.jpg",
    wilayats: [
      { id: "ibri", nameAr: "عبري", nameEn: "Ibri", keyHighlightAr: "حصن عبري القديم، مدافن بات والخطم والعين (يونسكو)، وادي ضم", keyHighlightEn: "Ibri Fort, UNESCO Bat Bronze Age Tombs & emerald pools of Wadi Damm" },
      { id: "yanqul", nameAr: "ينقل", nameEn: "Yanqul", keyHighlightAr: "حصن بيت المراح الشامخ وقمم جبل الحوراء", keyHighlightEn: "Bait Al Marah Fort & Jabal Al Hawra towering peak" },
      { id: "dhank", nameAr: "ضنك", nameEn: "Dhank", keyHighlightAr: "وادي ضنك، فلج البزيلي، والحصون الطينية القديمة", keyHighlightEn: "Wadi Dhank, ancient water channels & fortified clay hamlets" },
    ],
    climateSummaryAr: "جاف وصحو، شتاء منعش وبارد ليلاً (14-26 مئوية)، صيف مشمس وحار.",
    climateSummaryEn: "Dry and sunny; crisp winter nights (14-26°C), hot summer days.",
    facilitiesCount: { attractions: 16, hotels: 14, restaurants: 38, hospitals: 4, fuelStations: 18, mosques: 70 },
  },
  {
    id: "al_buraimi",
    nameAr: "محافظة البريمي",
    nameEn: "Al Buraimi Governorate",
    capitalAr: "البريمي",
    capitalEn: "Al Buraimi",
    descriptionAr: "واحة عُمانية تجارية حدودية غنية بالتاريخ تضم حصن الحلة وحصن الخندق ومسارات وادي شرم الجبلي.",
    descriptionEn: "A historic frontier oasis known for its twin clay strongholds (Al Khandaq & Al Hillah Forts) and scenic Wadi Sharm oasis.",
    heroImage: "/src/assets/images/oman_wahiba_desert_1793615739116.jpg",
    wilayats: [
      { id: "buraimi_city", nameAr: "البريمي", nameEn: "Al Buraimi", keyHighlightAr: "حصن الخندق وحصن الحلة وسوق الخضار والتمور التراثي", keyHighlightEn: "Al Khandaq Fort, Al Hillah Palace Fort & Traditional Oasis Souq" },
      { id: "mahdah", nameAr: "محضة", nameEn: "Mahdah", keyHighlightAr: "وادي شرم، وادي القحفي، والكثبان الرملية الذهبية", keyHighlightEn: "Wadi Sharm natural pools, Wadi Al Qahfi & sand dunes" },
      { id: "sinainah", nameAr: "السنينة", nameEn: "Al Sinainah", keyHighlightAr: "كثبان صحراء الربع الخالي وسياحة التخييم ومزارع الألبان", keyHighlightEn: "Empty Quarter desert edges, sand camping & agricultural oasis" },
    ],
    climateSummaryAr: "صحراوي جاف، معتدل ولطيف في الشتاء (16-25 مئوية)، حار صيفاً.",
    climateSummaryEn: "Dry desert climate; wonderfully mild winter weather (16-25°C), hot summers.",
    facilitiesCount: { attractions: 14, hotels: 16, restaurants: 34, hospitals: 4, fuelStations: 15, mosques: 60 },
  },
  {
    id: "al_wusta",
    nameAr: "محافظة الوسطى",
    nameEn: "Al Wusta Governorate",
    capitalAr: "هيماء",
    capitalEn: "Hima",
    descriptionAr: "متحف الطبيعة الجيولوجية المفتوح؛ تضم كثبان الرمال السكرية البيضاء بالخلوف، حديقة الصخور بالدقم، ومحمية المها العربي.",
    descriptionEn: "A geological wonderland featuring the powdery white Sugar Dunes of Khaluf, Duqm Rock Garden, and the Arabian Oryx Sanctuary.",
    heroImage: "/src/assets/images/hero_oman_landscape_1793615737313.jpg",
    wilayats: [
      { id: "duqm", nameAr: "الدقم", nameEn: "Duqm", keyHighlightAr: "حديقة الصخور الجيولوجية النادرة، شاطئ رأس مدركة، شاطئ الدقم الرملي", keyHighlightEn: "Unique Duqm Rock Garden, Ras Madrakah black cliffs & sandy shores" },
      { id: "mahout", nameAr: "محوت", nameEn: "Mahout", keyHighlightAr: "كثبان رمال الخلوف البيضاء السكرية، جزيرة محوت، صيد الأسماك", keyHighlightEn: "Sugar Dunes of Khaluf, Mahout Island & turquoise tidal lagoons" },
      { id: "hima_city", nameAr: "هيماء", nameEn: "Hima", keyHighlightAr: "محمية الكائنات الحية والفطرية (المها العربي والغزلان العُمانية)", keyHighlightEn: "Arabian Oryx & Sand Gazelle Wildlife Reserve in Jiddat al-Harasis" },
      { id: "jazer", nameAr: "الجازر", nameEn: "Al Jazer", keyHighlightAr: "بحيرات الكحل، الجروف الصخرية الوردية، شواطئ اللكبي", keyHighlightEn: "Pink tidal lagoons, sea bird reserves & dramatic coastal cliffs" },
    ],
    climateSummaryAr: "معتدل صيفاً على السواحل بفعل نسيم بحر العرب (25-30 مئوية)، لطيف ومشمس شتاءً.",
    climateSummaryEn: "Breezy & moderate along the Arabian Sea coast in summer (25-30°C), bright winter skies.",
    facilitiesCount: { attractions: 15, hotels: 12, restaurants: 25, hospitals: 3, fuelStations: 16, mosques: 40 },
  },
];
