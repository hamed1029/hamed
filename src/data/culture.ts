export interface CultureStory {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  contentAr: string;
  contentEn: string;
  unescoStatus?: string;
  image: string;
  keyFactsAr: string[];
  keyFactsEn: string[];
}

export const cultureStories: CultureStory[] = [
  {
    id: "khanjar",
    titleAr: "الخنجر العُماني: رمز العزة والشهامة",
    titleEn: "The Omani Khanjar: Emblem of Dignity & Prestige",
    subtitleAr: "مُدرج في القائمة التمثيلية للتراث الثقافي غير المادي للبشرية (اليونسكو)",
    subtitleEn: "Inscribed on UNESCO's Representative List of Intangible Cultural Heritage",
    contentAr: "يمثل الخنجر العُماني أحد أعمق رموز الهوية الوطنية والرجولة والضيافة في عُمان. يُصنع يدوياً ببراعة متوارثة عبر الأجيال من الفضة الخالصة المنقوشة بأساليب التكفيت والترميل والتشبيك، ويُرتدى في المناسبات الوطنية والأعياد والاحتفالات الرسمية بحزام جلدي فاخر يسمى 'السبتة'. تختلف أنواع الخناجر باختلاف المحافظات ومن أشهرها: الخنجر السعيدي، والنزواني، والصوري، والساحلي، والجنوبي.",
    contentEn: "The Omani Khanjar is the most profound emblem of national identity, prestige, and timeless chivalry in the Sultanate. Handcrafted across generations using sterling silver filigree and intricate chiseling, it is worn proudly at national celebrations, weddings, and formal occasions. Regional variations include the royal Saidi Khanjar, Nizwa Khanjar, Suri Khanjar, and Dhofari styles.",
    unescoStatus: "UNESCO Intangible Heritage (2022)",
    image: "/src/assets/images/oman_nizwa_fort_1793615738121.jpg",
    keyFactsAr: [
      "مُدرج في الشعار الرسمي للسلطنة والعلم العُماني",
      "صناعة يدوية دقيقة تتطلب ما يصل إلى شهرين للخنجر الفضي الواحد",
      "الخنجر السعيدي يتميز بنقوشه الملكية الخاصة بالأسرة الحاكمة",
      "يُهدى كأسمى تعبير عن التقدير والاحترام في التقاليد العُمانية"
    ],
    keyFactsEn: [
      "Emblazoned on the National Emblem and Flag of Oman",
      "Handcrafted by master silversmiths taking up to 2 months per dagger",
      "The Saidi style features intricate royal motifs reserved for nobility",
      "Gifted as the highest gesture of esteem and friendship in Omani tradition"
    ],
  },
  {
    id: "frankincense",
    titleAr: "شجرة اللُّبان الظفاري: عطر الملوك والتاريخ",
    titleEn: "Dhofari Frankincense: The Scent of Emperors & History",
    subtitleAr: "طريق اللبان في ظفار — موقع تراث عالمي معتمد من اليونسكو",
    subtitleEn: "The Frankincense Trail in Dhofar — UNESCO World Heritage Site",
    contentAr: "منذ أكثر من 5,000 عام قبل الميلاد، انطلقت قوافل اللبان وسفنه من موانئ ظفار العريقة (سمهرم والبليد) لتصل إلى معابد الفراعنة وأباطرة روما وبلاط ملوك الصين. يُستخرج اللبان من شجرة 'بوسويليا ساكرا' التي تنمو برياً في أودية ظفار الجافة خلف الجبال. ويُعتبر اللبان الحوجري الأجود عالمياً بلونه الفضي المائل للخضرة ورائحته الليمونية المنعشة وفوائده الطبية والعطرية الفائقة.",
    contentEn: "For over 5,000 years, frankincense caravans and dhows set sail from Dhofar's ancient ports of Sumhuram and Al Baleed to ancient Egypt, Rome, and imperial China. Harvested from the Boswellia sacra trees thriving in Dhofar's rain-shadow valleys, the legendary 'Hojari' frankincense is renowned worldwide for its pale green hue, citrusy perfume, and medicinal properties.",
    unescoStatus: "UNESCO World Heritage (Land of Frankincense)",
    image: "/src/assets/images/oman_salalah_khareef_1793615739183.jpg",
    keyFactsAr: [
      "اللبان الحوجري هو الدرجة الملكية الأولى في العالم",
      "تُجرح لحاء الشجرة في موسم 'التجريح' ليتخثر الصمغ الأبيض العطري",
      "يُستخدم في الضيافة اليومية لتبخير البيوت والملابس بعبق فريد",
      "مواقع البليد وسمهرم ووادي دوكة وشصر مسجلة رسمياً باليونسكو"
    ],
    keyFactsEn: [
      "Hojari frankincense is recognized as the world's highest grade",
      "Bark is carefully scored during traditional harvest to release aromatic sap",
      "Used daily across Omani homes to welcome guests with fragrant smoke",
      "Al Baleed, Sumhuram, Wadi Dawkah, and Shisr are protected UNESCO sites"
    ],
  },
  {
    id: "aflaj",
    titleAr: "نظام الأفلاج العُماني: هندسة مائية عمرها آلاف السنين",
    titleEn: "The Omani Aflaj: Ancient Hydraulic Engineering of Fair Share",
    subtitleAr: "خمسة أفلاج عُمانية تاريخية مُدرجة في قائمة التراث العالمي لليونسكو",
    subtitleEn: "Five historic Omani Aflaj inscribed on the UNESCO World Heritage list",
    contentAr: "الأفلاج هي الشرايين المائية التي بُنيت بفضلها حضارة عُمان الزراعية ومجتمعات الواحات الخضراء منذ أكثر من ألفي عام. تعتمد على قنوات محفورة تحت الأرض بدقة متناهية لنقل المياه الجوفية من منابع الجبال إلى القرى والبسائط بالاعتماد كلياً على الجاذبية الأرضية. وتمثل الأفلاج نموذجاً ملهماً للعدالة والتكافل الاجتماعي، حيث تُقسّم المياه بنظام زمني دقيق عبر 'الأثر' و'الساعة الشمسية' وحركة النجوم ليلاً.",
    contentEn: "Aflaj are the ancient hydraulic lifeline that created Oman's lush desert oases and sustainable civilization over two millennia ago. Ingenious underground channels harness mountain gravity to carry aquifer water over tens of kilometers without modern pumps. More than irrigation, the Falaj system embodies community justice and democratic water sharing using sundials by day and star clocks by night.",
    unescoStatus: "UNESCO World Heritage (2006)",
    image: "/src/assets/images/hero_oman_landscape_1793615737313.jpg",
    keyFactsAr: [
      "تضم عُمان أكثر من 3,000 فلج حي يعمل حتى اليوم",
      "الأفلاج المدرجة باليونسكو: فلج دارس، الخطمين، الملكي، الميسر، والجيلة",
      "تنقسم إلى ثلاثة أنواع: داوودية (جوفية عميقة)، عينية، وغيلية سطحية",
      "نظام الإدارة المجتمعية (وكيل الفلج) مستمر منذ قرون بحيادية وعدالة"
    ],
    keyFactsEn: [
      "Over 3,000 living aflaj still actively flowing throughout Oman today",
      "UNESCO-listed aflaj: Falaj Daris, Al Khatmeen, Al Malki, Al Muyassar, and Al Jeela",
      "Three distinct hydraulic categories: Dawoodi (deep gravity), Ayn (spring), and Ghayli",
      "Managed by an elected 'Wakeel' (steward) ensuring egalitarian distribution"
    ],
  },
  {
    id: "hospitality-coffee",
    titleAr: "كرم الضيافة والقهوة العُمانية: حكاية الفنجان والتمر",
    titleEn: "Omani Hospitality & Kahwa: The Ritual of Cup & Date",
    subtitleAr: "أول علامات الترحاب العُماني في كل بيت ومجلس",
    subtitleEn: "The quintessential welcome in every Omani home and Sablah",
    contentAr: "لا تكتمل زيارة عُمان دون معايشة طقس القهوة العُمانية (القهوة الممزوجة بحبات الهيل والزعفران وماء الورد الجبلي المقطر من الجبل الأخضر). تُقدم القهوة طازجة في فناجين خزفية صغيرة وتبدأ الضيافة بتقديم التمور العُمانية الفاخرة (مثل الخلاص، الفرض، والخنيزي) والحلوى العُمانية الدافئة المصنوعة من السمن العُماني والهيل واللوز والمكسرات في أوانٍ نحاسية تقليدية. وهز الفنجان يمنة ويسرة هو الإشارة التراثية اللطيفة للاكتفاء.",
    contentEn: "No encounter in Oman is complete without the warm ceremony of Omani Kahwa—freshly brewed coffee infused with crushed cardamom, saffron, and fragrant mountain rosewater from Jabal Akhdar. Served in porcelain finjan cups accompanied by local dates (Khalas, Fardh) and warm Omani Halwa stirred with ghee, almonds, and caramelized sugar in brass cauldrons. Gently shaking the cup signals you have had your fill.",
    image: "/src/assets/images/oman_nizwa_fort_1793615738121.jpg",
    keyFactsAr: [
      "تُصب القهوة باليد اليسرى من الدلة وتُسلّم باليد اليمنى احتراماً للضيف",
      "تقديم التمر أو الحلوى أولاً لكسر مرارة القهوة الخفيفة بنكهة متوازنة",
      "هز الفنجان بحركة خفيفة يعني الاكتفاء بأدب ووقار",
      "المجلس العُماني (السبلة) مدرسة مفتوحة للأجيال لتعلم آداب الحديث والضيافة"
    ],
    keyFactsEn: [
      "The host pours from the Dallah pot with the left hand and serves with the right",
      "Dates or Omani Halwa are enjoyed first to balance the fragrant spices of Kahwa",
      "A gentle tilt or shake of the cup signifies graceful satisfaction",
      "The Omani Majlis (Sablah) serves as a communal sanctuary of debate and ethics"
    ],
  },
];
