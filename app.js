(() => {
  'use strict';

  /* ---------- Config ---------- */
  const STORE = 'kpf-v2';
  const CONTACT_EMAIL = 'contact@yourdomain.af'; // replace with the real inbox before launch
  const DISTRICTS = Array.from({ length: 22 }, (_, i) => `District ${i + 1}`);
  const TYPES = ['Apartment', 'House', 'Office', 'Land'];
  const IMG = {
    kabul: 'images/kabul-hero.jpg',
    hero: 'images/kabul-hero.jpg',
    dusk: 'images/kabul-hero.jpg',
    Apartment: 'images/apartment.svg',
    House: 'images/house.svg',
    Office: 'images/office.svg',
    Land: 'images/land.svg',
  };
  const STATUS = {
    Draft: ['Draft', 'b-draft'],
    Pending: ['In review', 'b-review'],
    Published: ['Live', 'b-live'],
    Returned: ['Returned', 'b-returned'],
    Closed: ['Closed', 'b-closed'],
  };
  const PROTECTED = ['dashboard', 'editor', 'preview'];
  const BACK = '<a class="back" href="#listings">← All homes</a>';
  const ADMIN_CODE = 'kabul-admin';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Language ---------- */
  const LANGS = {
    en: { label: 'EN', name: 'English', dir: 'ltr' },
    fa: { label: 'دری', name: 'Dari', dir: 'rtl' },
    ps: { label: 'پښتو', name: 'Pashto', dir: 'rtl' },
  };
  const LANG_KEY = 'kpf-lang';
  let lang = localStorage.getItem(LANG_KEY) || 'en';
  if (!LANGS[lang]) lang = 'en';
  const I18N = {
    en: {
      'nav.homes': 'Homes', 'nav.about': 'About', 'nav.contact': 'Contact', 'nav.moderation': 'Moderation',
      'nav.post': 'Post a listing', 'nav.signin': 'Sign in', 'nav.mylistings': 'My listings', 'nav.signout': 'Sign out',
      'nav.search': 'Search homes',
      'common.any': 'Any', 'common.anyType': 'Any type', 'common.anyDistrict': 'Any district', 'common.search': 'Search',
      'common.close': 'Close', 'common.cancel': 'Cancel', 'common.send': 'Send', 'common.chat': 'Chat',
      'common.whatsapp': 'WhatsApp', 'common.agency': 'Agency', 'common.individual': 'Individual',
      'districtLabel': 'District {n}', 'currency': 'AFN',
      'hero.eyebrow': 'Rent — Buy — Gerawi — 22 districts',
      'hero.title1': 'Find a home', 'hero.title2': 'that feels', 'hero.title3': 'like yours.',
      'hero.lead': 'Rent, buy, or take a gerawi across Kabul’s 22 numbered districts. Every home is read by a person before it goes live, and prices are always shown plainly.',
      'hero.explore': 'Explore homes', 'hero.how': 'How it works', 'hero.search': 'Search by budget',
      'hero.meta1': 'Honest prices', 'hero.meta2': 'Reviewed homes', 'hero.meta3': 'Local owners', 'hero.meta4': 'No noise',
      'hero.statDistricts': 'Districts', 'hero.statLive': 'Live homes', 'hero.statReview': 'Human review',
      'hero.featured': 'Featured home', 'hero.viewHome': 'View home', 'hero.inviteKicker': 'Have a home to share?',
      'hero.inviteTitle': 'List it with us.', 'hero.inviteText': 'Free to list. Reviewed by a person before it goes live.',
      'hero.agencyCta': 'Agency? Create a workspace',
      'search.kicker': 'Search', 'search.title': 'Find a home by district and budget.',
      'search.lead': 'Choose a purpose, a district, and the range you can afford. Rent, sale, and gerawi prices are shown in AFN.',
      'search.keyword': 'Keyword', 'search.keywordPh': 'Title or district', 'search.purpose': 'Purpose',
      'search.type': 'Type', 'search.district': 'District', 'search.budgetMin': 'Budget min (AFN)',
      'search.budgetMax': 'Budget max (AFN)', 'search.budgetMinPh': 'From', 'search.budgetMaxPh': 'To',
      'search.fine': 'Prices are entered by publishers. Confirm terms directly before you commit.',
      'intent.rent': 'For rent', 'intent.sale': 'For sale', 'intent.gerawi': 'Gerawi',
      'price.month': 'per month', 'price.total': 'total', 'price.gerawi': 'gerawi advance',
      'status.draft': 'Draft', 'status.pending': 'In review', 'status.published': 'Live', 'status.returned': 'Returned', 'status.closed': 'Closed',
      'listings.kicker': 'Kabul · Homes', 'listings.title': 'Homes in Kabul', 'listings.count': 'homes', 'listings.countOne': 'home',
      'listings.none': 'No homes match these filters', 'listings.noneText': 'Try a different district, type, budget, or purpose.',
      'listings.clear': 'Clear filters', 'listings.showing': 'Showing {shown} of {total} homes', 'listings.showMore': 'Show more homes',
      'listings.fine': 'Prices are as entered by each publisher. Confirm terms directly before you commit.',
      'home.districtsKicker': '01 — Districts', 'home.districtsTitle': 'Start where you want to live.',
      'home.listed': '{n} listed', 'home.browse': 'Browse', 'home.latestKicker': '02 — Latest',
      'home.latestTitle': 'Newly published homes.', 'home.allHomes': 'All homes →', 'home.noHomes': 'No homes are live yet',
      'home.noHomesText': 'Listings appear here once they have been reviewed and published.',
      'home.processKicker': '03 — How it works', 'home.processTitle': 'A calmer way to find a place.',
      'home.processLead': 'Three steps, no noise. Every home is read by a person before it appears on the public site.',
      'home.step1Title': 'Search by district and budget', 'home.step1Text': 'Choose the part of Kabul that works for your commute, family, and budget. Filter by purpose, type, district, and price.',
      'home.step2Title': 'Read the whole story', 'home.step2Text': 'Photos, description, and price sit on one page. Rent is monthly, sale is total, gerawi is an advance.',
      'home.step3Title': 'Arrange a visit', 'home.step3Text': 'Message the publisher from the listing and see the home in person. Nothing is published before it passes review.',
      'home.processNote': 'Reviewed by a person before it goes live', 'home.publishKicker': '04 — Publish',
      'home.publishTitle': 'Have a home to share?', 'home.publishText': 'Write the listing, check the details, and send it for review. Contact details stay off public pages.',
      'home.publishCta': 'Post a listing →',
      'listing.purpose': 'Purpose', 'listing.type': 'Type', 'listing.district': 'District', 'listing.updated': 'Updated',
      'listing.contactKicker': 'Contact the owner', 'listing.contactTitle': 'Ask about this home.',
      'listing.contactText': 'Send a message in the page. The owner replies from their dashboard.',
      'listing.contactWaText': 'Message {name} in the page, or continue on WhatsApp.',
      'listing.startChat': 'Message the owner →', 'listing.messageWa': 'WhatsApp ↗',
      'listing.chatFine': 'No account needed. The conversation stays with this listing.',
      'listing.waFine': 'WhatsApp opens with a ready-to-send message.',
      'listing.previewOnly': 'Preview only. Buyers see this contact button on the live listing.',
      'listing.addressNote': 'Exact addresses are never shown on public listings.',
      'listing.agency': 'Agency', 'listing.individual': 'Individual', 'listing.owner': 'Listed by',
      'listing.messages': 'Messages', 'listing.noMessages': 'No messages yet', 'listing.youPublish': 'You publish this home.',
      'listing.openMessages': 'Open messages →',
      'account.signin': 'Sign in', 'account.register': 'Create account', 'account.welcome': 'Welcome back.',
      'account.start': 'Start listing homes.', 'account.leadSignin': 'Sign in to manage your listings and reply to buyers.',
      'account.leadRegister': 'An individual or agency account lets you draft, submit, and track listings.',
      'account.name': 'Full name', 'account.email': 'Email', 'account.password': 'Password', 'account.confirm': 'Confirm password',
      'account.create': 'Create account', 'account.role': 'Account type', 'account.individual': 'Individual owner',
      'account.agency': 'Real estate agency', 'account.agencyName': 'Agency name', 'account.license': 'License / registration no.',
      'account.phone': 'Office phone', 'account.officeDistrict': 'Office district', 'account.agencyAbout': 'About the agency',
      'account.agencyAboutPh': 'What kinds of homes do you represent?', 'account.local': 'Listings are saved in this browser for now.',
      'account.agencyNote': 'Agency accounts get a workspace name, license details, and a team contact on every listing.',
      'dash.kicker': 'My listings', 'dash.agencyKicker': 'Agency workspace', 'dash.title': 'Your homes', 'dash.new': 'New listing',
      'dash.drafts': 'Drafts', 'dash.review': 'In review', 'dash.live': 'Live', 'dash.returned': 'Returned', 'dash.all': 'All',
      'dash.nothing': 'Nothing here yet', 'dash.create': 'Create a listing to start your workspace.',
      'dash.local': 'Listings are saved in this browser for now.', 'dash.profile': 'Workspace', 'dash.license': 'License',
      'dash.contact': 'Contact', 'dash.messages': 'messages', 'dash.message': 'message', 'dash.preview': 'Preview',
      'dash.close': 'Close', 'dash.continue': 'Continue', 'dash.revise': 'Revise', 'dash.edit': 'Edit', 'dash.view': 'View',
      'chat.title': 'Message the owner', 'chat.about': 'About “{title}” · replies arrive in the owner’s dashboard.',
      'chat.placeholder': 'Hello, is this home still available?', 'chat.name': 'Your name', 'chat.nameOptional': 'optional',
      'chat.namePh': 'So the owner knows who is asking', 'chat.send': 'Send message →', 'chat.introTitle': 'Start a conversation',
      'chat.introText': 'Ask about availability, viewings, or terms. No account needed.',
      'chat.error': 'Add at least 10 characters so the owner can help.', 'chat.sent': 'Message sent to the owner.',
      'chat.replyTitle': 'Reply to this buyer', 'chat.replyPh': 'Write a reply…', 'chat.replySend': 'Send reply →',
      'chat.replySent': 'Reply sent. It is now visible on the listing.', 'chat.replyError': 'Add at least 2 characters before sending.',
      'chat.noMessages': 'No messages yet. Share the listing to start a conversation.', 'chat.ownerReplies': 'Replies from the owner appear here.',
      'contact.kicker': 'Contact', 'contact.title': 'Tell us what would make this easier.',
      'contact.lead': 'Send a note about districts, prices, or publishing. Your message opens in your email app, addressed to our team.',
      'contact.topic': 'Topic', 'contact.message': 'Message', 'contact.send': 'Send message →',
      'contact.finding': 'Finding a home', 'contact.prices': 'Prices and terms', 'contact.publishing': 'Publishing a listing',
      'contact.privacy': 'Privacy', 'contact.other': 'Something else',
      'about.kicker': 'About', 'about.title': 'Finding a home should start with the place.',
      'about.lead': 'Kabul Property Finder organizes homes by the city’s numbered districts, states prices plainly, and keeps private details off public pages.',
      'about.p1Title': 'Districts first', 'about.p1Text': 'Search follows how Kabul is organized, so you compare homes within the places you can actually reach.',
      'about.p2Title': 'Prices, stated plainly', 'about.p2Text': 'Rent is a monthly AFN amount, a sale is a total AFN price, and gerawi is a one-time advance — shown the same way on every listing.',
      'about.p3Title': 'Private details stay private', 'about.p3Text': 'Public pages show the district and photos, never an exact address or a phone number.',
      'about.pubKicker': 'Publishers', 'about.pubTitle': 'Ready to list a home?', 'about.pubText': 'Sign in, write the listing, and submit it for review.',
      'contact.placeholder': 'What would you like us to know?', 'contact.error': 'Add a little more detail, at least 12 characters.',
      'home.browseHomes': 'Browse homes →', 'home.ticker': 'Rent · Sale · Gerawi',
      'footer.tagline': 'Homes, plainly.', 'theme.dark': 'Switch to dark mode', 'theme.light': 'Switch to light mode',
      'lang.label': 'Language', 'meta.title': 'Kabul Property Finder',
      'meta.description': 'Find a home in Kabul by district. Rent, sale, and gerawi prices, stated plainly.',
    },
    fa: {
      'nav.homes': 'خانه‌ها', 'nav.about': 'درباره', 'nav.contact': 'تماس', 'nav.moderation': 'نظارت',
      'nav.post': 'ثبت ملک', 'nav.signin': 'ورود', 'nav.mylistings': 'ملک‌های من', 'nav.signout': 'خروج',
      'nav.search': 'جستجوی خانه',
      'common.any': 'همه', 'common.anyType': 'هر نوع', 'common.anyDistrict': 'هر ناحیه', 'common.search': 'جستجو',
      'common.close': 'بستن', 'common.cancel': 'لغو', 'common.send': 'ارسال', 'common.chat': 'گفتگو',
      'common.whatsapp': 'واتس‌اپ', 'common.agency': 'اداره', 'common.individual': 'شخصی',
      'districtLabel': 'ناحیه {n}', 'currency': 'افغانی',
      'hero.eyebrow': 'کرایه — خرید — گروی — ۲۲ ناحیه',
      'hero.title1': 'خانه‌ای پیدا کن', 'hero.title2': 'که حسِ', 'hero.title3': 'خانهٔ تو را دارد.',
      'hero.lead': 'در ۲۲ ناحیهٔ کابل کرایه کنید، بخرید یا گروی بگیرید. هر ملک پیش از انتشار توسط یک نفر بررسی می‌شود و قیمت‌ها همیشه واضح نوشته می‌شوند.',
      'hero.explore': 'دیدن خانه‌ها', 'hero.how': 'چگونه کار می‌کند', 'hero.search': 'جستجو بر اساس بودجه',
      'hero.meta1': 'قیمت‌های صادقانه', 'hero.meta2': 'ملک‌های بررسی‌شده', 'hero.meta3': 'مالکان محلی', 'hero.meta4': 'بدون شلوغی',
      'hero.statDistricts': 'ناحیه‌ها', 'hero.statLive': 'ملک‌های فعال', 'hero.statReview': 'بررسی انسانی',
      'hero.featured': 'ملک ویژه', 'hero.viewHome': 'دیدن ملک', 'hero.inviteKicker': 'ملکی برای شریک کردن دارید؟',
      'hero.inviteTitle': 'با ما ثبت کنید.', 'hero.inviteText': 'ثبت رایگان است. پیش از انتشار توسط یک نفر بررسی می‌شود.',
      'hero.agencyCta': 'ادارهٔ املاک هستید؟ فضای کاری بسازید',
      'search.kicker': 'جستجو', 'search.title': 'خانه را بر اساس ناحیه و بودجه پیدا کنید.',
      'search.lead': 'هدف، ناحیه و بودجهٔ خود را انتخاب کنید. قیمت کرایه، فروش و گروی به افغانی نشان داده می‌شود.',
      'search.keyword': 'کلمهٔ کلیدی', 'search.keywordPh': 'عنوان یا ناحیه', 'search.purpose': 'هدف',
      'search.type': 'نوع', 'search.district': 'ناحیه', 'search.budgetMin': 'کمترین بودجه (افغانی)',
      'search.budgetMax': 'بیشترین بودجه (افغانی)', 'search.budgetMinPh': 'از', 'search.budgetMaxPh': 'تا',
      'search.fine': 'قیمت‌ها توسط ناشران وارد می‌شود. پیش از تصمیم، شرایط را مستقیم تأیید کنید.',
      'intent.rent': 'برای کرایه', 'intent.sale': 'برای فروش', 'intent.gerawi': 'گروی',
      'price.month': 'در ماه', 'price.total': 'مجموع', 'price.gerawi': 'پیش‌پرداخت گروی',
      'status.draft': 'پیش‌نویس', 'status.pending': 'در بررسی', 'status.published': 'فعال', 'status.returned': 'برگشت‌داده‌شده', 'status.closed': 'بسته',
      'listings.kicker': 'کابل · خانه‌ها', 'listings.title': 'خانه‌ها در کابل', 'listings.count': 'خانه', 'listings.countOne': 'خانه',
      'listings.none': 'هیچ خانه‌ای با این فیلترها پیدا نشد', 'listings.noneText': 'ناحیه، نوع، بودجه یا هدف دیگری را امتحان کنید.',
      'listings.clear': 'پاک کردن فیلترها', 'listings.showing': 'نمایش {shown} از {total} خانه', 'listings.showMore': 'نمایش خانه‌های بیشتر',
      'listings.fine': 'قیمت‌ها همان‌گونه است که هر ناشر وارد کرده. پیش از تصمیم، شرایط را مستقیم تأیید کنید.',
      'home.districtsKicker': '۰۱ — ناحیه‌ها', 'home.districtsTitle': 'از جایی شروع کنید که می‌خواهید زندگی کنید.',
      'home.listed': '{n} ملک', 'home.browse': 'مشاهده', 'home.latestKicker': '۰۲ — تازه‌ها',
      'home.latestTitle': 'خانه‌های تازه منتشرشده.', 'home.allHomes': 'همهٔ خانه‌ها →', 'home.noHomes': 'هنوز خانه‌ای فعال نیست',
      'home.noHomesText': 'ملک‌ها پس از بررسی و انتشار اینجا نمایش داده می‌شوند.',
      'home.processKicker': '۰۳ — چگونه کار می‌کند', 'home.processTitle': 'راهی آرام‌تر برای پیدا کردن خانه.',
      'home.processLead': 'سه قدم، بدون شلوغی. هر خانه پیش از نمایش در سایت عمومی توسط یک نفر خوانده می‌شود.',
      'home.step1Title': 'جستجو بر اساس ناحیه و بودجه', 'home.step1Text': 'بخشی از کابل را انتخاب کنید که با کار، خانواده و بودجهٔ شما سازگار است. بر اساس هدف، نوع، ناحیه و قیمت فیلتر کنید.',
      'home.step2Title': 'همهٔ جزئیات را بخوانید', 'home.step2Text': 'عکس، توضیحات و قیمت در یک صفحه است. کرایه ماهانه، فروش مجموع و گروی پیش‌پرداخت است.',
      'home.step3Title': 'برای بازدید هماهنگ کنید', 'home.step3Text': 'از صفحهٔ ملک به ناشر پیام بدهید و خانه را از نزدیک ببینید. هیچ ملکی پیش از بررسی منتشر نمی‌شود.',
      'home.processNote': 'پیش از انتشار توسط یک نفر بررسی می‌شود', 'home.publishKicker': '۰۴ — ثبت ملک',
      'home.publishTitle': 'ملکی برای شریک کردن دارید؟', 'home.publishText': 'ملک را بنویسید، جزئیات را بررسی کنید و برای بازبینی بفرستید. اطلاعات تماس در صفحه‌های عمومی نمایش داده نمی‌شود.',
      'home.publishCta': 'ثبت ملک →',
      'listing.purpose': 'هدف', 'listing.type': 'نوع', 'listing.district': 'ناحیه', 'listing.updated': 'به‌روزرسانی',
      'listing.contactKicker': 'تماس با مالک', 'listing.contactTitle': 'دربارهٔ این خانه بپرسید.',
      'listing.contactText': 'در همین صفحه پیام بفرستید. مالک از داشبورد خود پاسخ می‌دهد.',
      'listing.contactWaText': 'در همین صفحه به {name} پیام بدهید یا در واتس‌اپ ادامه دهید.',
      'listing.startChat': 'پیام به مالک →', 'listing.messageWa': 'واتس‌اپ ↗',
      'listing.chatFine': 'نیازی به حساب نیست. گفتگو با همین ملک می‌ماند.',
      'listing.waFine': 'واتس‌اپ با پیام آماده باز می‌شود.',
      'listing.previewOnly': 'فقط پیش‌نمایش. خریداران این دکمه را در ملک فعال می‌بینند.',
      'listing.addressNote': 'آدرس دقیق هرگز در ملک‌های عمومی نمایش داده نمی‌شود.',
      'listing.agency': 'اداره', 'listing.individual': 'شخصی', 'listing.owner': 'ثبت‌کننده',
      'listing.messages': 'پیام‌ها', 'listing.noMessages': 'هنوز پیامی نیست', 'listing.youPublish': 'شما این ملک را ثبت کرده‌اید.',
      'listing.openMessages': 'باز کردن پیام‌ها →',
      'account.signin': 'ورود', 'account.register': 'ساخت حساب', 'account.welcome': 'خوش آمدید.',
      'account.start': 'ثبت ملک را شروع کنید.', 'account.leadSignin': 'برای مدیریت ملک‌ها و پاسخ به خریداران وارد شوید.',
      'account.leadRegister': 'حساب شخصی یا اداره به شما امکان می‌دهد ملک بنویسید، بفرستید و پیگیری کنید.',
      'account.name': 'نام کامل', 'account.email': 'ایمیل', 'account.password': 'رمز عبور', 'account.confirm': 'تکرار رمز عبور',
      'account.create': 'ساخت حساب', 'account.role': 'نوع حساب', 'account.individual': 'مالک شخصی',
      'account.agency': 'ادارهٔ املاک', 'account.agencyName': 'نام اداره', 'account.license': 'شمارهٔ جواز / ثبت',
      'account.phone': 'تلفن دفتر', 'account.officeDistrict': 'ناحیهٔ دفتر', 'account.agencyAbout': 'دربارهٔ اداره',
      'account.agencyAboutPh': 'چه نوع ملک‌هایی را نمایندگی می‌کنید؟', 'account.local': 'ملک‌ها فعلاً در همین مرورگر ذخیره می‌شوند.',
      'account.agencyNote': 'حساب اداره نام فضای کاری، جزئیات جواز و تماس تیم را در هر ملک نشان می‌دهد.',
      'dash.kicker': 'ملک‌های من', 'dash.agencyKicker': 'فضای کاری اداره', 'dash.title': 'خانه‌های شما', 'dash.new': 'ملک جدید',
      'dash.drafts': 'پیش‌نویس‌ها', 'dash.review': 'در بررسی', 'dash.live': 'فعال', 'dash.returned': 'برگشتی', 'dash.all': 'همه',
      'dash.nothing': 'هنوز چیزی نیست', 'dash.create': 'برای شروع فضای کاری یک ملک بسازید.',
      'dash.local': 'ملک‌ها فعلاً در همین مرورگر ذخیره می‌شوند.', 'dash.profile': 'فضای کاری', 'dash.license': 'جواز',
      'dash.contact': 'تماس', 'dash.messages': 'پیام', 'dash.message': 'پیام', 'dash.preview': 'پیش‌نمایش',
      'dash.close': 'بستن', 'dash.continue': 'ادامه', 'dash.revise': 'اصلاح', 'dash.edit': 'ویرایش', 'dash.view': 'دیدن',
      'chat.title': 'پیام به مالک', 'chat.about': 'دربارهٔ «{title}» · پاسخ‌ها در داشبورد مالک می‌رسد.',
      'chat.placeholder': 'سلام، آیا این خانه هنوز موجود است؟', 'chat.name': 'نام شما', 'chat.nameOptional': 'اختیاری',
      'chat.namePh': 'تا مالک بداند چه کسی می‌پرسد', 'chat.send': 'ارسال پیام →', 'chat.introTitle': 'گفتگو را شروع کنید',
      'chat.introText': 'دربارهٔ موجودیت، بازدید یا شرایط بپرسید. نیازی به حساب نیست.',
      'chat.error': 'حداقل ۱۰ حرف بنویسید تا مالک بتواند کمک کند.', 'chat.sent': 'پیام برای مالک ارسال شد.',
      'chat.replyTitle': 'پاسخ به این خریدار', 'chat.replyPh': 'پاسخ خود را بنویسید…', 'chat.replySend': 'ارسال پاسخ →',
      'chat.replySent': 'پاسخ ارسال شد و اکنون در صفحهٔ ملک دیده می‌شود.', 'chat.replyError': 'حداقل ۲ حرف بنویسید.',
      'chat.noMessages': 'هنوز پیامی نیست. ملک را شریک کنید تا گفتگو شروع شود.', 'chat.ownerReplies': 'پاسخ‌های مالک اینجا نمایش داده می‌شود.',
      'contact.kicker': 'تماس', 'contact.title': 'بگویید چه چیزی این کار را آسان‌تر می‌کند.',
      'contact.lead': 'دربارهٔ ناحیه‌ها، قیمت‌ها یا ثبت ملک پیام بفرستید. پیام شما در برنامهٔ ایمیل باز می‌شود.',
      'contact.topic': 'موضوع', 'contact.message': 'پیام', 'contact.send': 'ارسال پیام →',
      'contact.finding': 'پیدا کردن خانه', 'contact.prices': 'قیمت‌ها و شرایط', 'contact.publishing': 'ثبت ملک',
      'contact.privacy': 'حریم خصوصی', 'contact.other': 'چیز دیگر',
      'about.kicker': 'درباره', 'about.title': 'پیدا کردن خانه باید با مکان شروع شود.',
      'about.lead': 'کابل پراپرتی فایندر خانه‌ها را بر اساس ناحیه‌های شماره‌دار شهر مرتب می‌کند، قیمت‌ها را واضح نشان می‌دهد و جزئیات خصوصی را از صفحه‌های عمومی دور نگه می‌دارد.',
      'about.p1Title': 'اول ناحیه‌ها', 'about.p1Text': 'جستجو از ساختار کابل پیروی می‌کند تا خانه‌ها را در جاهایی مقایسه کنید که واقعاً می‌توانید به آن‌ها برسید.',
      'about.p2Title': 'قیمت‌ها، واضح', 'about.p2Text': 'کرایه مبلغ ماهانه به افغانی، فروش قیمت مجموع به افغانی و گروی پیش‌پرداخت یک‌باره است — در هر ملک یکسان نمایش داده می‌شود.',
      'about.p3Title': 'جزئیات خصوصی خصوصی می‌ماند', 'about.p3Text': 'صفحه‌های عمومی ناحیه و عکس‌ها را نشان می‌دهند، هرگز آدرس دقیق یا شماره تلفن را نه.',
      'about.pubKicker': 'ناشران', 'about.pubTitle': 'آمادهٔ ثبت ملک هستید؟', 'about.pubText': 'وارد شوید، ملک را بنویسید و برای بازبینی بفرستید.',
      'contact.placeholder': 'چه چیزی را باید بدانیم؟', 'contact.error': 'کمی بیشتر توضیح بدهید، حداقل ۱۲ حرف.',
      'home.browseHomes': 'دیدن خانه‌ها →', 'home.ticker': 'کرایه · فروش · گروی',
      'footer.tagline': 'خانه‌ها، واضح.', 'theme.dark': 'تغییر به حالت تاریک', 'theme.light': 'تغییر به حالت روشن',
      'lang.label': 'زبان', 'meta.title': 'کابل پراپرتی فایندر',
      'meta.description': 'خانه در کابل بر اساس ناحیه پیدا کنید. قیمت کرایه، فروش و گروی به‌صورت واضح.',
    },
    ps: {
      'nav.homes': 'کورونه', 'nav.about': 'په اړه', 'nav.contact': 'اړیکه', 'nav.moderation': 'څارنه',
      'nav.post': 'ملک ثبت کړئ', 'nav.signin': 'ننوتل', 'nav.mylistings': 'زما ملکونه', 'nav.signout': 'وتل',
      'nav.search': 'د کور لټون',
      'common.any': 'ټول', 'common.anyType': 'هر ډول', 'common.anyDistrict': 'هر ناحیه', 'common.search': 'لټون',
      'common.close': 'بندول', 'common.cancel': 'لغوه', 'common.send': 'لېږل', 'common.chat': 'خبرې',
      'common.whatsapp': 'واټساپ', 'common.agency': 'اداره', 'common.individual': 'شخصي',
      'districtLabel': 'ناحیه {n}', 'currency': 'افغانۍ',
      'hero.eyebrow': 'کرایه — پیرود — ګروي — ۲۲ ناحیې',
      'hero.title1': 'کور پیدا کړه', 'hero.title2': 'چې احساس', 'hero.title3': 'ستا د کور وي.',
      'hero.lead': 'په کابل کې په ۲۲ ناحیو کې کرایه، پیرود یا ګروي وکړئ. هر ملک د خپرېدو دمخه د یو کس لخوا کتل کیږي او بیې تل په روښانه ډول ښودل کیږي.',
      'hero.explore': 'کورونه وګورئ', 'hero.how': 'څنګه کار کوي', 'hero.search': 'د بودجې له مخې لټون',
      'hero.meta1': 'ریښتینې بیې', 'hero.meta2': 'کتل شوي کورونه', 'hero.meta3': 'ځایي مالکان', 'hero.meta4': 'بې ګډوډي',
      'hero.statDistricts': 'ناحیې', 'hero.statLive': 'ژوندي کورونه', 'hero.statReview': 'بشري کتنه',
      'hero.featured': 'ځانګړی کور', 'hero.viewHome': 'کور وګورئ', 'hero.inviteKicker': 'کور لرئ چې شریک کړئ؟',
      'hero.inviteTitle': 'زموږ سره ثبت کړئ.', 'hero.inviteText': 'وړیا ثبت. د خپرېدو دمخه د یو کس لخوا کتل کیږي.',
      'hero.agencyCta': 'د املاکو اداره یاست؟ کاري ځای جوړ کړئ',
      'search.kicker': 'لټون', 'search.title': 'کور د ناحیې او بودجې له مخې پیدا کړئ.',
      'search.lead': 'هدف، ناحیه او بودجه وټاکئ. د کرایې، پلور او ګروي بیې په افغانۍ ښودل کیږي.',
      'search.keyword': 'کلیدي کلمه', 'search.keywordPh': 'عنوان یا ناحیه', 'search.purpose': 'هدف',
      'search.type': 'ډول', 'search.district': 'ناحیه', 'search.budgetMin': 'لږه بودجه (افغانۍ)',
      'search.budgetMax': 'ډېره بودجه (افغانۍ)', 'search.budgetMinPh': 'له', 'search.budgetMaxPh': 'تر',
      'search.fine': 'بیې د خپرونکو لخوا ورکول کیږي. مخکې له پریکړې شرایط مستقیم تایید کړئ.',
      'intent.rent': 'د کرایې لپاره', 'intent.sale': 'د پلور لپاره', 'intent.gerawi': 'ګروي',
      'price.month': 'په میاشت کې', 'price.total': 'ټول', 'price.gerawi': 'د ګروي پیش',
      'status.draft': 'مسوده', 'status.pending': 'په کتنه کې', 'status.published': 'ژوندی', 'status.returned': 'بیرته شوی', 'status.closed': 'بند',
      'listings.kicker': 'کابل · کورونه', 'listings.title': 'په کابل کې کورونه', 'listings.count': 'کورونه', 'listings.countOne': 'کور',
      'listings.none': 'هیڅ کور دې فلټرونو سره سم نه شو', 'listings.noneText': 'بله ناحیه، ډول، بودجه یا هدف وګورئ.',
      'listings.clear': 'فلټرونه پاک کړئ', 'listings.showing': 'د {total} کورونو څخه {shown} ښودل کیږي', 'listings.showMore': 'نور کورونه وګورئ',
      'listings.fine': 'بیې هغسې دي لکه څنګه چې خپرونکي ورکړي. مخکې له پریکړې شرایط مستقیم تایید کړئ.',
      'home.districtsKicker': '۰۱ — ناحیې', 'home.districtsTitle': 'له هغه ځایه پیل وکړئ چې غواړئ ژوند وکړئ.',
      'home.listed': '{n} ملک', 'home.browse': 'وګورئ', 'home.latestKicker': '۰۲ — نوي',
      'home.latestTitle': 'نوي خپرې شوي کورونه.', 'home.allHomes': 'ټول کورونه →', 'home.noHomes': 'لا هیڅ کور ژوندی نه دی',
      'home.noHomesText': 'ملکونه د کتنې او خپرېدو وروسته دلته ښکاري.',
      'home.processKicker': '۰۳ — څنګه کار کوي', 'home.processTitle': 'د کور پیدا کولو آرامه لاره.',
      'home.processLead': 'درې ګامه، بې ګډوډي. هر کور د عامه سایت په ښکارېدو دمخه د یو کس لخوا لوستل کیږي.',
      'home.step1Title': 'د ناحیې او بودجې له مخې لټون', 'home.step1Text': 'د کابل هغه برخه وټاکئ چې ستاسو کار، کورنۍ او بودجې سره سمه وي. د هدف، ډول، ناحیې او بیې له مخې فلټر کړئ.',
      'home.step2Title': 'ټول جزئیات ولولئ', 'home.step2Text': 'عکسونه، توضیحات او بیه په یوه پاڼه کې دي. کرایه میاشتنی، پلور ټول او ګروي پیش دی.',
      'home.step3Title': 'د لیدنې لپاره همغږي وکړئ', 'home.step3Text': 'د ملک له پاڼې خپرونکي ته پیغام ولېږئ او کور په خپله وګورئ. هیڅ ملک د کتنې دمخه نه خپرېږي.',
      'home.processNote': 'د خپرېدو دمخه د یو کس لخوا کتل کیږي', 'home.publishKicker': '۰۴ — ثبت',
      'home.publishTitle': 'کور لرئ چې شریک کړئ؟', 'home.publishText': 'ملک ولیکئ، جزئیات وګورئ او د کتنې لپاره یې ولېږئ. د اړیکې معلومات په عامه پاڼو کې نه ښکاري.',
      'home.publishCta': 'ملک ثبت کړئ →',
      'listing.purpose': 'هدف', 'listing.type': 'ډول', 'listing.district': 'ناحیه', 'listing.updated': 'تازه شوی',
      'listing.contactKicker': 'له مالک سره اړیکه', 'listing.contactTitle': 'د دې کور په اړه وپوښتئ.',
      'listing.contactText': 'په همدې پاڼه پیغام ولېږئ. مالک د خپل ډشبورډ څخه ځواب ورکوي.',
      'listing.contactWaText': 'په همدې پاڼه {name} ته پیغام ولېږئ یا په واټساپ کې دوام ورکړئ.',
      'listing.startChat': 'مالک ته پیغام →', 'listing.messageWa': 'واټساپ ↗',
      'listing.chatFine': 'حساب ته اړتیا نشته. خبرې د دې ملک سره پاتې کیږي.',
      'listing.waFine': 'واټساپ د تیار پیغام سره پرانیستل کیږي.',
      'listing.previewOnly': 'یوازې مخکتنه. پیرودونکي دا تڼۍ په ژوندي ملک کې ویني.',
      'listing.addressNote': 'دقیق پته په عامه ملکونو کې هیڅکله نه ښودل کیږي.',
      'listing.agency': 'اداره', 'listing.individual': 'شخصي', 'listing.owner': 'ثبت کوونکی',
      'listing.messages': 'پیغامونه', 'listing.noMessages': 'لا پیغام نشته', 'listing.youPublish': 'تاسو دا ملک ثبت کړی دی.',
      'listing.openMessages': 'پیغامونه پرانیستل →',
      'account.signin': 'ننوتل', 'account.register': 'حساب جوړول', 'account.welcome': 'بیا ښه راغلاست.',
      'account.start': 'د ملک ثبت پیل کړئ.', 'account.leadSignin': 'د ملکونو مدیریت او پیرودونکو ته ځواب لپاره ننوځئ.',
      'account.leadRegister': 'شخصي یا اداره حساب تاسو ته اجازه درکوي ملک ولیکئ، ولېږئ او تعقیب کړئ.',
      'account.name': 'بشپړ نوم', 'account.email': 'ایمیل', 'account.password': 'پټنوم', 'account.confirm': 'پټنوم تایید',
      'account.create': 'حساب جوړول', 'account.role': 'د حساب ډول', 'account.individual': 'شخصي مالک',
      'account.agency': 'د املاکو اداره', 'account.agencyName': 'د ادارې نوم', 'account.license': 'د جواز / ثبت شمېره',
      'account.phone': 'د دفتر تلیفون', 'account.officeDistrict': 'د دفتر ناحیه', 'account.agencyAbout': 'د ادارې په اړه',
      'account.agencyAboutPh': 'کوم ډول کورونه استازیتوب کوئ؟', 'account.local': 'ملکونه اوس مهال په همدې براوزر کې خوندي کیږي.',
      'account.agencyNote': 'د ادارې حساب کاري ځای، د جواز جزئیات او د ټیم اړیکه په هر ملک کې ښيي.',
      'dash.kicker': 'زما ملکونه', 'dash.agencyKicker': 'د ادارې کاري ځای', 'dash.title': 'ستاسو کورونه', 'dash.new': 'نوی ملک',
      'dash.drafts': 'مسودې', 'dash.review': 'په کتنه کې', 'dash.live': 'ژوندی', 'dash.returned': 'بیرته شوی', 'dash.all': 'ټول',
      'dash.nothing': 'لا هیڅ نشته', 'dash.create': 'د کاري ځای پیل لپاره ملک جوړ کړئ.',
      'dash.local': 'ملکونه اوس مهال په همدې براوزر کې خوندي کیږي.', 'dash.profile': 'کاري ځای', 'dash.license': 'جواز',
      'dash.contact': 'اړیکه', 'dash.messages': 'پیغامونه', 'dash.message': 'پیغام', 'dash.preview': 'مخکتنه',
      'dash.close': 'بندول', 'dash.continue': 'دوام', 'dash.revise': 'سمون', 'dash.edit': 'سمون', 'dash.view': 'کتنه',
      'chat.title': 'مالک ته پیغام', 'chat.about': 'د «{title}» په اړه · ځوابونه د مالک ډشبورډ ته رسیږي.',
      'chat.placeholder': 'سلام، ایا دا کور لا شته؟', 'chat.name': 'ستاسو نوم', 'chat.nameOptional': 'اختیاري',
      'chat.namePh': 'چې مالک پوه شي چې څوک پوښتنه کوي', 'chat.send': 'پیغام ولېږئ →', 'chat.introTitle': 'خبرې پیل کړئ',
      'chat.introText': 'د شتون، لیدنې یا شرایطو په اړه وپوښتئ. حساب ته اړتیا نشته.',
      'chat.error': 'لږ تر لږه ۱۰ توري ولیکئ چې مالک مرسته وکړي.', 'chat.sent': 'پیغام مالک ته ولېږل شو.',
      'chat.replyTitle': 'دې پیرودونکي ته ځواب', 'chat.replyPh': 'خپل ځواب ولیکئ…', 'chat.replySend': 'ځواب ولېږئ →',
      'chat.replySent': 'ځواب ولېږل شو او اوس په ملک پاڼه ښکاري.', 'chat.replyError': 'لږ تر لږه ۲ توري ولیکئ.',
      'chat.noMessages': 'لا پیغام نشته. ملک شریک کړئ چې خبرې پیل شي.', 'chat.ownerReplies': 'د مالک ځوابونه دلته ښکاري.',
      'contact.kicker': 'اړیکه', 'contact.title': 'ووایاست چې څه دا اسانه کوي.',
      'contact.lead': 'د ناحیو، بیو یا ثبت په اړه پیغام ولېږئ. ستاسو پیغام د ایمیل په اپلیکیشن کې پرانیستل کیږي.',
      'contact.topic': 'موضوع', 'contact.message': 'پیغام', 'contact.send': 'پیغام ولېږئ →',
      'contact.finding': 'کور پیدا کول', 'contact.prices': 'بیې او شرایط', 'contact.publishing': 'ملک ثبتول',
      'contact.privacy': 'محرمیت', 'contact.other': 'بل څه',
      'about.kicker': 'په اړه', 'about.title': 'د کور پیدا کول باید له ځای څخه پیل شي.',
      'about.lead': 'کابل پراپرټي فایندر کورونه د ښار د شمېرې شوو ناحیو له مخې تنظیموي، بیې روښانه ښيي او شخصي جزئیات له عامه پاڼو لرې ساتي.',
      'about.p1Title': 'لومړی ناحیې', 'about.p1Text': 'لټون د کابل له جوړښت سره سمون لري، ترڅو کورونه په هغو ځایونو کې پرتله کړئ چې واقعاً ورته رسېدلی شئ.',
      'about.p2Title': 'بیې، روښانه', 'about.p2Text': 'کرایه میاشتنی افغانۍ مبلغ، پلور ټوله افغانۍ بیه او ګروي یو ځلي پیش دی — په هر ملک کې یو شان ښودل کیږي.',
      'about.p3Title': 'شخصي جزئیات شخصي پاتې کیږي', 'about.p3Text': 'عامه پاڼې ناحیه او عکسونه ښيي، هیڅکله دقیقه پته یا تلیفون شمېره نه.',
      'about.pubKicker': 'خپرونکي', 'about.pubTitle': 'د ملک ثبت لپاره تیار یاست؟', 'about.pubText': 'ننوځئ، ملک ولیکئ او د کتنې لپاره یې ولېږئ.',
      'contact.placeholder': 'څه شی باید پوه شو؟', 'contact.error': 'لږ نور جزئیات ورکړئ، لږ تر لږه ۱۲ توري.',
      'home.browseHomes': 'کورونه وګورئ →', 'home.ticker': 'کرایه · پلور · ګروي',
      'footer.tagline': 'کورونه، روښانه.', 'theme.dark': 'تیاره حالت ته بدلون', 'theme.light': 'روښانه حالت ته بدلون',
      'lang.label': 'ژبه', 'meta.title': 'کابل پراپرټي فایندر',
      'meta.description': 'په کابل کې کور د ناحیې له مخې پیدا کړئ. د کرایې، پلور او ګروي بیې روښانه.',
    },
  };
  const t = (key, vars = {}) => {
    let s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    Object.entries(vars).forEach(([k, v]) => { s = s.replaceAll(`{${k}}`, String(v)); });
    return s;
  };
  const districtLabel = (d) => {
    const n = String(d || '').replace(/\D/g, '');
    return n ? t('districtLabel', { n }) : String(d || '');
  };
  const THEME_KEY = 'kpf-theme';
  const applyTheme = (theme, announce = false) => {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = next === 'dark' ? '#0b0c0f' : '#EAE5DF';
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      const label = next === 'dark' ? t('theme.light') : t('theme.dark');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
    if (announce) toast(next === 'dark' ? t('theme.light') : t('theme.dark'));
  };
  const applyLang = (next) => {
    lang = LANGS[next] ? next : 'en';
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
    document.documentElement.lang = lang;
    document.documentElement.dir = LANGS[lang].dir;
    const sel = $('#langSelect');
    if (sel) {
      sel.value = lang;
      sel.setAttribute('aria-label', t('lang.label'));
    }
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t('meta.description');
    renderAccountSlot();
    applyTheme(document.documentElement.dataset.theme || 'light');
  };
  function openSearchDialog() {
    const dlg = $('#searchDialog');
    const body = $('#searchDialogBody');
    if (!dlg || !body) return;
    body.innerHTML = `
      <div class="dialog-top">
        <div><p class="kicker">${t('search.kicker')}</p><h2>${t('search.title')}</h2></div>
        <button class="dialog-x" type="button" data-close-dialog aria-label="${t('common.close')}">×</button>
      </div>
      <p class="fine">${t('search.lead')}</p>
      ${searchBar({}, { q: true })}
      <p class="fine">${t('search.fine')}</p>`;
    if (!dlg.open) dlg.showModal();
    setTimeout(() => $('#searchDialogBody input[name="q"]')?.focus(), 60);
  }

  /* ---------- State ---------- */
  const load = () => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE));
      if (s && Array.isArray(s.users) && Array.isArray(s.listings)) {
        // Replace the small prototype seed with the full demo catalogue once.
        if (!localStorage.getItem('kpf-demo-v3') || s.listings.length < 220) {
          const demo = demoState();
          localStorage.setItem(STORE, JSON.stringify(demo));
          localStorage.setItem('kpf-demo-v3', '1');
          return demo;
        }
        return { session: null, ...s };
      }
    } catch { /* fall through to the demo catalogue */ }
    const demo = demoState();
    try {
      localStorage.setItem(STORE, JSON.stringify(demo));
      localStorage.setItem('kpf-demo-v3', '1');
    } catch { /* storage may be unavailable */ }
    return demo;
  };
  let state = load();
  let draft = null;          // { id, f, errors }
  let accountMode = 'login';
  let accountRole = 'individual';
  let dashFilter = 'All';
  let modFilter = 'Pending';
  let returnTarget = null;
  let chatTarget = null;
  let toastTimer;

  const persist = () => {
    try { localStorage.setItem(STORE, JSON.stringify(state)); return true; }
    catch { toast('This browser could not save. Try smaller photos.'); return false; }
  };

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => `${Number(n).toLocaleString('en-US')} ${t('currency')}`;
  const iso = () => new Date().toISOString();
  const fmtDate = (d) => new Date(d).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'fa' ? 'fa-AF' : 'ps-AF', { month: 'short', day: 'numeric' });
  const me = () => state.users.find((u) => u.id === state.session) || null;
  const adminUnlocked = () => sessionStorage.getItem('kpf-admin') === 'yes';
  const mine = () => state.listings.filter((l) => l.publisherId === state.session);
  const ownListing = (id) => mine().find((l) => l.listingId === id) || null;
  const published = () => state.listings.filter((l) => l.status === 'Published');
  const coverOf = (x) => x.photos?.[0]?.data || IMG[x.propertyType] || IMG.hero;
  const waDigits = (v) => String(v || '').replace(/\D/g, '');
  const contactOf = (x) => {
    const c = x.contact || {};
    const method = c.method === 'whatsapp' && waDigits(c.whatsapp) ? 'whatsapp' : 'chat';
    return { method, whatsapp: waDigits(c.whatsapp) };
  };
  const intentWord = (i) => t(i === 'sale' ? 'intent.sale' : i === 'gerawi' ? 'intent.gerawi' : 'intent.rent');
  const priceNote = (i) => t(i === 'sale' ? 'price.total' : i === 'gerawi' ? 'price.gerawi' : 'price.month');
  const badge = (s) => { const [, cls] = STATUS[s] || STATUS.Draft; return `<span class="badge ${cls}">${t(`status.${String(s || 'Draft').toLowerCase()}`)}</span>`; };
  const ownerDisplay = (u) => (u?.role === 'agency' && u.agencyName ? u.agencyName : u?.name || 'Kabul Property Finder');
  const ownerSubline = (u) => (u?.role === 'agency' ? `${u.name} · ${u.license || 'Licensed agency'}` : (u?.email || ''));
  const threadOf = (x) => {
    if (Array.isArray(x.thread) && x.thread.length) return x.thread;
    return (x.inquiries || []).map((i) => ({ id: i.id, from: 'buyer', name: i.name, text: i.message, at: i.at }));
  };
  const threadCount = (x) => threadOf(x).length;
  const contactLabel = (x) => contactOf(x).method === 'whatsapp' ? t('common.whatsapp') : t('common.chat');
  const roleLabel = (u) => (u?.role === 'agency' ? t('common.agency') : t('common.individual'));
  const paragraphs = (t) => esc(t).split(/\n+/).filter(Boolean).map((p) => `<p>${p}</p>`).join('');
  const notice = (text, type = '') => `<div class="notice ${type ? 'notice-' + type : ''}" role="${type === 'error' ? 'alert' : 'status'}">${text}</div>`;
  const emptyBlock = (title, text, action = '') => `<div class="empty"><h3>${title}</h3><p>${text}</p>${action}</div>`;

  /* ---------- Demo catalogue ---------- */
  function demoState() {
    let seed = 20261108;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const pick = (list) => list[Math.floor(rnd() * list.length)];
    const int = (min, max) => Math.floor(rnd() * (max - min + 1)) + min;
    const daysAgo = (days) => new Date(Date.now() - Math.max(0, days) * 86400000).toISOString();

    const people = [
      ['Amina', 'Rahimi', 'pub-test', 'amina@example.com', 'individual'],
      ['Farid', 'Noor', 'pub-two', 'farid@example.com', 'agency', 'Noor Estates', 'KBL-AG-1042', 'District 10'],
      ['Laila', 'Safi', 'pub-three', 'laila@example.com', 'agency', 'Safi Homes', 'KBL-AG-1188', 'District 4'],
      ['Omid', 'Karimi', 'pub-four', 'omid@example.com', 'individual'],
      ['Zahra', 'Hussaini', 'pub-five', 'zahra@example.com', 'agency', 'Hussaini Properties', 'KBL-AG-1215', 'District 7'],
      ['Sami', 'Rahman', 'pub-six', 'sami@example.com', 'individual'],
      ['Mariam', 'Yousufi', 'pub-seven', 'mariam@example.com', 'agency', 'Yousufi Realty', 'KBL-AG-1307', 'District 15'],
      ['Hamid', 'Ahmadi', 'pub-eight', 'hamid@example.com', 'individual'],
      ['Nadia', 'Popal', 'pub-nine', 'nadia@example.com', 'agency', 'Popal & Co.', 'KBL-AG-1364', 'District 2'],
      ['Jawad', 'Sultani', 'pub-ten', 'jawad@example.com', 'individual'],
      ['Roya', 'Nazari', 'pub-eleven', 'roya@example.com', 'agency', 'Nazari Homes', 'KBL-AG-1409', 'District 18'],
      ['Bashir', 'Amini', 'pub-twelve', 'bashir@example.com', 'individual'],
    ];
    const users = people.map(([first, last, id, email, role, agencyName, license, officeDistrict]) => ({
      id, name: `${first} ${last}`, email, password: 'password123', role,
      ...(role === 'agency' ? { agencyName, license, officeDistrict, phone: `+93 70 ${int(100, 999)} ${int(1000, 9999)}` } : {}),
    }));

    const landmarks = ['Shar-e-Naw', 'Wazir Akbar Khan', 'Karte Char', 'Taimani', 'Macrorayan', 'Khair Khana', 'Dasht-e-Barchi', 'Kote Sangi', 'Shahrara', 'Deh Mazang', 'Kabul University', 'Bird Market', 'Kabul Zoo', 'Lake Qargha', 'Bagh-e Babur', 'Chicken Street', 'Silk Road', 'Pashtunistan Square', 'Maiwand Road', 'Darul Aman', 'Kabul Museum', 'Tower of Victory'];
    const adjectives = ['Sunlit', 'Quiet', 'Renovated', 'Spacious', 'Bright', 'Calm', 'Modern', 'Warm', 'Open', 'Private', 'Generous', 'Thoughtful'];
    const features = {
      Apartment: ['south-facing windows', 'a renovated kitchen', 'a small balcony', 'a lift', 'a water tank', 'a backup generator', 'guarded parking', 'gas heating', 'built-in storage', 'a study nook'],
      House: ['a walled courtyard', 'a garden', 'a guest room', 'a water tank', 'a backup generator', 'parking for two cars', 'a rooftop terrace', 'gas heating', 'a separate entrance', 'built-in storage'],
      Office: ['a separate entrance', 'a meeting room', 'space for six desks', 'a kitchenette', 'backup power', 'secure parking', 'a street-facing window', 'air conditioning', 'a storage room', 'fibre internet'],
      Land: ['a flat buildable surface', 'a boundary wall', 'road access', 'water connections', 'mountain views', 'a quiet side street', 'room for a garden', 'solar potential', 'a corner position', 'clear title'],
    };
    const extras = [
      'Close to shops, schools, and public transport.',
      'The building has a lift and a guard.',
      'Water and building fees are included.',
      'Electricity is metered separately.',
      'The street is calm at night.',
      'Viewings can be arranged on weekdays.',
      'The current owners are moving abroad.',
      'A small park is two minutes away.',
      'The kitchen was renovated this year.',
      'Parking is available behind the building.',
    ];
    const reviewNotes = [
      'Please add the monthly building fee and confirm whether parking is included.',
      'The description needs more detail about the rooms and the condition of the kitchen.',
      'Add a clearer price breakdown and confirm whether the property is vacant.',
      'Please remove the exact street reference and resubmit with a district-level location.',
      'Add at least one photo of the living room and confirm the water supply.',
    ];
    const inquiryNames = ['Sara Ahmadi', 'Omid Karimi', 'Laila Safi', 'Hamid Noor', 'Zahra Popal', 'Bashir Amini'];
    const inquiryMessages = [
      'Hello, is this home still available? Could I see it this week?',
      'Is the price negotiable? I can visit on Saturday morning.',
      'Does the rent include building fees and water?',
      'Could you share a few more photos of the kitchen and the balcony?',
      'Is parking included, and is the building guarded?',
      'I am interested. What is the earliest move-in date?',
    ];
    const ownerReplies = [
      'Yes, it is still available. Would Saturday at 10:00 work for a visit?',
      'The price is slightly negotiable. Building fees and water are included.',
      'Parking is included and the building has a guard. I can share more photos this evening.',
      'The earliest move-in date is the first of next month. I can hold it for a few days.',
      'Thank you for asking. The kitchen was renovated this year and the water tank is shared.',
    ];

    const statuses = [
      ...Array(180).fill('Published'),
      ...Array(24).fill('Pending'),
      ...Array(14).fill('Draft'),
      ...Array(12).fill('Returned'),
      ...Array(10).fill('Closed'),
    ];
    for (let i = statuses.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [statuses[i], statuses[j]] = [statuses[j], statuses[i]];
    }
    ['Pending', 'Pending', 'Published', 'Returned', 'Draft'].forEach((s, i) => { statuses[i] = s; });

    const titles = new Set();
    const listings = [];
    const total = statuses.length;

    for (let i = 0; i < total; i++) {
      const district = DISTRICTS[i % DISTRICTS.length];
      const type = TYPES[Math.floor(rnd() * TYPES.length)];
      const intentRoll = rnd();
      const intent = type === 'Land'
        ? 'sale'
        : intentRoll < 0.12
          ? 'gerawi'
          : intentRoll < 0.5
            ? 'sale'
            : 'rent';
      const beds = type === 'Apartment' || type === 'House' ? int(1, 4) : 0;
      const landmark = landmarks[i % landmarks.length];
      const adj = pick(adjectives);
      const pool = features[type];
      const f1 = pick(pool);
      let f2 = pick(pool);
      let f3 = pick(pool);
      while (f2 === f1) f2 = pick(pool);
      while (f3 === f1 || f3 === f2) f3 = pick(pool);
      const extra = pick(extras);

      let title = '';
      let attempts = 0;
      do {
        if (type === 'Apartment') {
          title = rnd() < 0.5
            ? `${adj} ${beds}-bedroom apartment in ${district}`
            : `${adj} apartment near ${landmark}`;
        } else if (type === 'House') {
          title = `${adj} ${beds}-bedroom house with ${pick(features.House)} in ${district}`;
        } else if (type === 'Office') {
          title = rnd() < 0.5
            ? `${adj} office in ${district}`
            : `${adj} office near ${landmark}`;
        } else {
          title = `${adj} ${int(200, 1200)} sqm plot in ${district}`;
        }
        attempts++;
      } while (titles.has(title) && attempts < 24);
      if (titles.has(title)) title += ` — ${f1}`;
      titles.add(title);

      const price = type === 'Land'
        ? int(15, 150) * 100000
        : intent === 'sale'
          ? int(25, 180) * 100000
          : intent === 'gerawi'
            ? int(250, 2200) * 1000
            : int(8, 60) * 1000;
      const status = statuses[i];
      const publisher = i < 16 ? users[0] : users[1 + (i % (users.length - 1))];
      const createdAt = daysAgo(i * 0.3 + 1);
      const updatedAt = daysAgo(Math.max(0, i * 0.3 + 1 - rnd() * 2));
      const whatsapp = rnd() < 0.55 ? '' : `93${pick(['70', '72', '73', '74', '76', '77', '78', '79'])}${int(1000000, 9999999)}`;
      const x = {
        listingId: `KPF-${2001 + i}`,
        publisherId: publisher.id,
        status,
        createdAt,
        updatedAt,
        title,
        description: `A ${adj.toLowerCase()} ${type.toLowerCase()} in ${district} with ${f1}, ${f2}, and ${f3}. ${extra}`,
        intent,
        propertyType: type,
        district,
        priceAFN: price,
        photos: [],
        contact: { method: whatsapp ? 'whatsapp' : 'chat', whatsapp },
      };
      if (status === 'Returned') x.reviewReason = pick(reviewNotes);
      if (status === 'Published' && [2, 7, 12, 19, 26, 33, 41, 55, 68, 84, 101, 120, 144, 168, 192, 214].includes(i)) {
        const count = int(1, 2);
        const buyerName = pick(inquiryNames);
        x.thread = Array.from({ length: count }, (_, n) => ({
          id: `MSG-${2001 + i}-${n + 1}`,
          from: 'buyer',
          name: buyerName,
          text: pick(inquiryMessages),
          at: daysAgo(rnd() * 14 + 2),
        }));
        x.thread.push({
          id: `MSG-${2001 + i}-owner`,
          from: 'owner',
          name: publisher.role === 'agency' ? publisher.agencyName : publisher.name,
          text: pick(ownerReplies),
          at: daysAgo(rnd() * 6),
        });
        x.inquiries = x.thread.filter((m) => m.from === 'buyer').map((m) => ({
          id: m.id, name: m.name, message: m.text, at: m.at,
        }));
      }
      listings.push(x);
    }

    return { users, listings, session: null };
  }
  const steps = (n) => `<ol class="steps" aria-label="Progress">${['Details', 'Preview', 'Submit'].map((l, i) => `<li class="${i + 1 < n ? 'done' : i + 1 === n ? 'current' : ''}"${i + 1 === n ? ' aria-current="step"' : ''}><span>${i + 1}</span>${l}</li>`).join('')}</ol>`;

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  }

  /* ---------- Motion & reveal ---------- */
  let pageAnim;
  const revealIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          revealIO.unobserve(en.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    : null;

  function pageEnter() {
    pageAnim?.cancel();
    if (reduceMotion.matches || !app.animate) return;
    pageAnim = app.animate(
      [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
      { duration: 520, easing: 'cubic-bezier(.16, 1, .3, 1)' }
    );
  }

  function reveal(el, delay = 0) {
    if (!revealIO || reduceMotion.matches) return;
    el.classList.add('reveal');
    el.style.setProperty('--d', `${delay}ms`);
    revealIO.observe(el);
  }

  function animateCounts() {
    if (reduceMotion.matches) return;
    app.querySelectorAll('.count b, .stat b, .hero-stat strong').forEach((el) => {
      const raw = el.textContent.trim();
      const target = parseInt(raw.replace(/[^\d]/g, ''), 10);
      const suffix = raw.replace(/[\d,]+/g, '');
      if (!Number.isFinite(target) || target < 1) return;
      const start = performance.now();
      const duration = 750;
      el.textContent = `0${suffix}`;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function enhance() {
    if (!reduceMotion.matches) {
      const groups = [
        ['.hero-bottom', '.hero-featured, .hero-stats, .hero-invite'],
        ['.districts', 'li'],
        ['.cards', '.card'],
        ['.principles', 'article'],
        ['.stats', '.stat'],
        ['.rows', '.row'],
        ['.process-steps', 'li'],
        ['.mod-queue', '.mod-row'],
        ['.thumbs', '.thumb'],
        ['.thumbs-row', '.thumb-btn'],
      ];
      groups.forEach(([parent, child]) => {
        const p = app.querySelector(parent);
        if (!p) return;
        [...p.querySelectorAll(child)].forEach((el, i) => reveal(el, Math.min(i * 55, 440)));
      });
      app.querySelectorAll('.block-head, .page-head, .search-stage-head, .search, .ticker, .publish, .wide, .about-hero, .contact > *, .auth > *, .actions-bar, .checklist, .detail-grid > *, .editor-form .sec, .empty, .steps, .process-head, .process-foot, .admin-head, .admin-lead, .queue-meta, .gate-card, .publisher-card, .profile-strip, .contact-card, .reply-form, .search-stage, .tabs').forEach((el) => reveal(el));
    }
    animateCounts();

    const hero = app.querySelector('.hero');
    if (hero && !reduceMotion.matches && matchMedia('(pointer: fine)').matches) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }
  }

  /* ---------- Routing ---------- */
  const parse = () => {
    const [path, qs = ''] = location.hash.slice(1).split('?');
    const [name = 'home', arg = ''] = path.split('/');
    return { name, arg, params: new URLSearchParams(qs) };
  };
  const go = (h) => (location.hash === `#${h}` ? route() : (location.hash = h));

  function setNav(name) {
    const key = name === 'listing' ? 'listings' : name;
    document.querySelectorAll('[data-nav]').forEach((a) => {
      const on = a.dataset.nav === key;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  const ICON_PATHS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    about: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/>',
    chat: '<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.4 7.5 9.5 4.3-1.1 7.5-5 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    out: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5"/><path d="M5 12h11"/>'
  };
  const ICON_SVG = (k) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[k]}</svg>`;
  function renderAccountSlot() {
    const adminLinks = document.querySelectorAll('[data-admin-link]');
    adminLinks.forEach((el) => { el.hidden = !adminUnlocked(); });
    const slot = $('#accountSlot');
    if (!slot) return;
    const user = me();
    slot.innerHTML = user
      ? `<a class="acct-link acct-mine" href="#dashboard">${esc(user.role === 'agency' && user.agencyName ? user.agencyName : t('nav.mylistings'))}</a><button class="acct-link" type="button" data-action="signout">${t('nav.signout')}</button>`
      : `<a class="acct-link" href="#account">${t('nav.signin')}</a>`;
  }

  function bind(name) {
    if (name === 'account') {
      $('#authForm')?.addEventListener('submit', handleAuth);
      $('#authForm')?.addEventListener('change', (e) => {
        if (e.target.name !== 'role') return;
        accountRole = e.target.value === 'agency' ? 'agency' : 'individual';
        const fields = $('[data-agency-fields]');
        if (fields) fields.hidden = accountRole !== 'agency';
      });
    }
    if (name === 'contact') $('#contactForm')?.addEventListener('submit', sendContact);
    if (name === 'editor') bindEditor();
    if (name === 'moderation') bindModeration();
    if (name === 'listing') bindChat();
    if (name === 'dashboard' || name === 'listing' || name === 'moderation') bindDialogs();
  }

  function bindDialogs() {
    app.querySelectorAll('dialog').forEach((d) => {
      d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    });
  }

  function paint(name, r = parse()) {
    const html = VIEWS[name](r);
    if (html === null) return; // view redirected
    revealIO?.disconnect();
    app.innerHTML = html;
    app.dataset.view = name;
    bind(name);
    enhance();
    pageEnter();
  }

  function route() {
    const r = parse();
    if (PROTECTED.includes(r.name) && !me()) {
      sessionStorage.setItem('kpf-return', location.hash.slice(1));
      accountMode = 'login';
      return go('account');
    }
    const name = VIEWS[r.name] ? r.name : 'home';
    setNav(name);
    renderAccountSlot();
    paint(name, r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ---------- Shared components ---------- */
  function card(x) {
    return `<a class="card" href="#listing/${esc(x.listingId)}">
      <div class="card-img"><img src="${esc(coverOf(x))}" alt="${esc(x.title)}" loading="lazy"><span class="tag">${intentWord(x.intent)}</span></div>
      <div class="card-body">
        <p class="meta">${esc(districtLabel(x.district))} · ${esc(x.propertyType)}</p>
        <h3>${esc(x.title)}</h3>
        <p class="price">${money(x.priceAFN)}<small>${priceNote(x.intent)}</small></p>
      </div></a>`;
  }

  function dropdown(name, label, items, selected) {
    const cur = items.find((i) => i.value === selected) || items[0];
    return `<div class="sf" data-dd>
      <span class="sf-label">${label}</span>
      <input type="hidden" name="${name}" value="${esc(cur.value)}">
      <button type="button" class="dd-trigger" aria-haspopup="listbox" aria-expanded="false"><span class="dd-label">${esc(cur.text)}</span><span class="dd-chev" aria-hidden="true"></span></button>
      <div class="dd-menu" role="listbox" aria-label="${label}">
        <p class="dd-head">${label}</p>
        ${items.map((i, n) => `<button type="button" class="dd-opt${i.value === cur.value ? ' is-on' : ''}" role="option" aria-selected="${i.value === cur.value}" data-value="${esc(i.value)}" data-label="${esc(i.text)}" style="--i:${n}"><span class="dd-idx">${esc(i.idx || '')}</span><span class="dd-text">${esc(i.text)}</span><span class="dd-check" aria-hidden="true"></span></button>`).join('')}
      </div>
    </div>`;
  }

  function searchBar(f = {}, opts = {}) {
    return `<form class="search" data-search${opts.auto ? ' data-auto' : ''} role="search">
      ${opts.q ? `<label class="sf sf-input"><span class="sf-label">${t('search.keyword')}</span><input name="q" type="search" value="${esc(f.q || '')}" placeholder="${t('search.keywordPh')}"></label>` : ''}
      ${dropdown('intent', t('search.purpose'), [{ value: '', text: t('common.any') }, { value: 'rent', text: t('intent.rent') }, { value: 'sale', text: t('intent.sale') }, { value: 'gerawi', text: t('intent.gerawi') }], f.intent || '')}
      ${dropdown('type', t('search.type'), [{ value: '', text: t('common.anyType') }, ...TYPES.map((x) => ({ value: x, text: x }))], f.type || '')}
      ${dropdown('district', t('search.district'), [{ value: '', text: t('common.anyDistrict') }, ...DISTRICTS.map((d, i) => ({ value: d, text: districtLabel(d), idx: String(i + 1).padStart(2, '0') }))], f.district || '')}
      <label class="sf sf-budget"><span class="sf-label">${t('search.budgetMin')}</span><input name="budgetMin" type="number" min="0" step="1000" inputmode="numeric" value="${esc(f.budgetMin || '')}" placeholder="${t('search.budgetMinPh')}"></label>
      <label class="sf sf-budget"><span class="sf-label">${t('search.budgetMax')}</span><input name="budgetMax" type="number" min="0" step="1000" inputmode="numeric" value="${esc(f.budgetMax || '')}" placeholder="${t('search.budgetMaxPh')}"></label>
      <button class="btn btn-ink" type="submit">${t('common.search')}</button>
    </form>`;
  }

  function clearMenuPosition(dd) {
    const menu = dd.querySelector('.dd-menu');
    if (!menu) return;
    menu.style.position = '';
    menu.style.left = '';
    menu.style.top = '';
    menu.style.right = '';
    menu.style.bottom = '';
    menu.style.width = '';
    menu.style.maxHeight = '';
    menu.style.transformOrigin = '';
  }

  function positionMenu(dd) {
    const menu = dd.querySelector('.dd-menu');
    if (!menu) return;
    const r = dd.getBoundingClientRect();
    const pad = 12;
    const gap = 8;
    const width = Math.min(Math.max(r.width - 16, 230), window.innerWidth - pad * 2);
    menu.style.position = 'fixed';
    menu.style.width = `${width}px`;
    menu.style.right = 'auto';
    menu.style.bottom = 'auto';
    menu.style.maxHeight = '380px';
    const full = Math.min(menu.scrollHeight, Math.min(380, window.innerHeight * 0.58));
    const spaceBelow = window.innerHeight - r.bottom - gap - pad;
    const spaceAbove = r.top - gap - pad;
    const placeBelow = spaceBelow >= Math.min(full, 260) || spaceBelow >= spaceAbove;
    const available = Math.max(140, placeBelow ? spaceBelow : spaceAbove);
    const height = Math.min(full, available);
    menu.style.maxHeight = `${height}px`;
    menu.style.top = placeBelow ? `${r.bottom + gap}px` : `${Math.max(pad, r.top - gap - height)}px`;
    const left = Math.max(pad, Math.min(r.left + (r.width - width) / 2, window.innerWidth - width - pad));
    menu.style.left = `${left}px`;
    menu.style.transformOrigin = placeBelow ? 'top center' : 'bottom center';
  }

  function closeDD(except) {
    document.querySelectorAll('[data-dd].open').forEach((d) => {
      if (d === except) return;
      d.classList.remove('open');
      d.querySelector('.dd-trigger')?.setAttribute('aria-expanded', 'false');
      clearMenuPosition(d);
    });
  }
  function toggleDD(dd) {
    const open = !dd.classList.contains('open');
    closeDD(dd);
    dd.classList.toggle('open', open);
    dd.querySelector('.dd-trigger')?.setAttribute('aria-expanded', String(open));
    if (open) {
      positionMenu(dd);
      dd.querySelector('.dd-opt.is-on, .dd-opt')?.focus({ preventScroll: true });
    } else {
      clearMenuPosition(dd);
    }
  }
  function chooseDD(opt) {
    const dd = opt.closest('[data-dd]');
    const input = dd.querySelector('input[type="hidden"]');
    input.value = opt.dataset.value;
    dd.querySelectorAll('.dd-opt').forEach((o) => {
      const on = o === opt;
      o.classList.toggle('is-on', on);
      o.setAttribute('aria-selected', String(on));
    });
    dd.querySelector('.dd-label').textContent = opt.dataset.label;
    closeDD();
    dd.querySelector('.dd-trigger')?.focus({ preventScroll: true });
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  window.addEventListener('scroll', () => closeDD(), true);
  window.addEventListener('resize', () => closeDD());

  function listingBody(x, opts = {}) {
    const photos = x.photos?.length ? x.photos.map((p) => p.data) : [coverOf(x)];
    const c = contactOf(x);
    const owner = state.users.find((u) => u.id === x.publisherId);
    const ownerName = ownerDisplay(owner);
    const isOwner = !opts.preview && me()?.id === x.publisherId;
    const waText = encodeURIComponent(`Hello, I saw “${x.title}” on Kabul Property Finder. Is it still available?`);
    const contact = opts.admin
      ? `<div class="contact-card">
          <div class="contact-card-head"><div><p class="kicker">Contact method</p><h2>${c.method === 'whatsapp' ? t('common.whatsapp') : t('common.chat')}</h2></div><span class="contact-icon" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 10h8M8 14h5"/></svg></span></div>
          <p>${c.method === 'whatsapp' ? `WhatsApp number: <strong>+${esc(c.whatsapp)}</strong>` : 'Buyers message the owner from the listing page. Replies stay in the owner’s dashboard.'}</p>
          <p class="fine">${threadCount(x)} ${threadCount(x) === 1 ? t('dash.message') : t('dash.messages')}</p>
        </div>`
      : `<div class="contact-card">
          <div class="contact-card-head"><div><p class="kicker">${isOwner ? t('listing.owner') : t('listing.contactKicker')}</p><h2>${isOwner ? t('listing.youPublish') : t('listing.contactTitle')}</h2></div><span class="contact-icon" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 10h8M8 14h5"/></svg></span></div>
          <p>${isOwner ? t('listing.openMessages') : c.method === 'whatsapp' ? t('listing.contactWaText', { name: ownerName }) : t('listing.contactText')}</p>
          ${isOwner
            ? `<a class="btn btn-blue btn-block" href="#dashboard">${t('listing.openMessages')}</a>`
            : opts.preview
              ? `<button class="btn btn-blue btn-block" type="button" disabled>${t('listing.startChat')}</button>`
              : `<button class="btn btn-blue btn-block" type="button" data-contact="${esc(x.listingId)}">${t('listing.startChat')}</button>`}
          ${!isOwner && c.method === 'whatsapp' && !opts.preview ? `<a class="btn btn-ghost btn-block wa-btn" href="https://wa.me/${esc(c.whatsapp)}?text=${esc(waText)}" target="_blank" rel="noopener">${t('listing.messageWa')}</a>` : ''}
          <p class="fine">${opts.preview ? t('listing.previewOnly') : isOwner ? `${threadCount(x)} ${threadCount(x) === 1 ? t('dash.message') : t('dash.messages')}` : c.method === 'whatsapp' ? t('listing.waFine') : t('listing.chatFine')}</p>
        </div>`;
    return `<article class="detail"><div class="detail-grid">
      <div class="gallery">
        <figure class="main"><img id="mainPhoto" src="${esc(photos[0])}" alt="${esc(x.title)}"></figure>
        ${photos.length > 1 ? `<div class="thumbs-row">${photos.map((p, i) => `<button type="button" class="thumb-btn${i === 0 ? ' active' : ''}" data-thumb="${esc(p)}" aria-label="Show photo ${i + 1}"><img src="${esc(p)}" alt=""></button>`).join('')}</div>` : ''}
      </div>
      <div class="info">
        <p class="meta">${esc(districtLabel(x.district))} · ${esc(x.propertyType)}</p>
        <h1>${esc(x.title)}</h1>
        <p class="price-lg">${money(x.priceAFN)}<small>${priceNote(x.intent)}</small></p>
        <div class="publisher-card">
          <span class="role-badge${owner?.role === 'agency' ? '' : ' role-badge-soft'}">${roleLabel(owner)}</span>
          <div><strong>${esc(ownerName)}</strong><small>${esc(ownerSubline(owner))}</small></div>
        </div>
        <dl class="specs">
          <div><dt>${t('listing.purpose')}</dt><dd>${intentWord(x.intent)}</dd></div>
          <div><dt>${t('listing.type')}</dt><dd>${esc(x.propertyType)}</dd></div>
          <div><dt>${t('listing.district')}</dt><dd>${esc(districtLabel(x.district))}</dd></div>
          <div><dt>${t('listing.updated')}</dt><dd>${fmtDate(x.updatedAt)}</dd></div>
        </dl>
        <div class="desc">${paragraphs(x.description)}</div>
        ${contact}
        <p class="fine">${t('listing.addressNote')}</p>
      </div></div></article>`;
  }

  /* ---------- Public views ---------- */
  function heroFeatured(items) {
    if (!items.length) {
      return `<article class="hero-featured hero-featured-empty">
        <figure class="hero-featured-media"><img src="${IMG.kabul}" alt="" loading="lazy"></figure>
        <div class="hero-featured-body">
          <p class="hero-featured-kicker">${t('hero.featured')}</p>
          <h2>${t('home.noHomes')}</h2>
          <p class="hero-featured-meta">${t('home.noHomesText')}</p>
          <a class="hero-featured-link" href="#listings">${t('home.browseHomes')}</a>
        </div>
      </article>`;
    }
    const f = items[0];
    const count = String(items.length).padStart(2, '0');
    return `<article class="hero-featured" id="heroFeatured" data-hero="${esc(JSON.stringify(items))}">
      <figure class="hero-featured-media"><img id="heroFeaturedImg" src="${esc(f.img)}" alt="" loading="lazy"></figure>
      <div class="hero-featured-body">
        <div class="hero-featured-top"><p class="hero-featured-kicker">${t('hero.featured')}</p><span class="hero-featured-count" id="heroFeaturedCount">01 / ${count}</span></div>
        <h2 id="heroFeaturedTitle">${esc(f.title)}</h2>
        <p class="hero-featured-meta" id="heroFeaturedMeta">${esc(districtLabel(f.district))} · ${esc(f.type)} · ${intentWord(f.intent)}</p>
        <div class="hero-featured-foot">
          <p class="hero-featured-price" id="heroFeaturedPrice">${money(f.price)} <small>${priceNote(f.intent)}</small></p>
          <a class="hero-featured-link" id="heroFeaturedLink" href="#listing/${esc(f.id)}">${t('hero.viewHome')} <span>→</span></a>
        </div>
        <div class="hero-featured-nav">
          <button type="button" data-hero-prev aria-label="Previous featured home">←</button>
          <button type="button" data-hero-next aria-label="Next featured home">→</button>
        </div>
      </div>
    </article>`;
  }

  let heroIndex = 0;
  function heroStep(dir) {
    const el = $('#heroFeatured');
    if (!el) return;
    let items = [];
    try { items = JSON.parse(el.dataset.hero || '[]'); } catch { return; }
    if (!items.length) return;
    heroIndex = (heroIndex + dir + items.length) % items.length;
    el.classList.remove('is-swap');
    void el.offsetWidth;
    el.style.setProperty('--dir', dir > 0 ? '28px' : '-28px');
    el.classList.add('is-swap');
    const f = items[heroIndex];
    const img = $('#heroFeaturedImg');
    if (img) { img.dataset.fallback = ''; img.src = f.img; }
    $('#heroFeaturedCount').textContent = `${String(heroIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    $('#heroFeaturedTitle').textContent = f.title;
    $('#heroFeaturedMeta').textContent = `${districtLabel(f.district)} · ${f.type} · ${intentWord(f.intent)}`;
    $('#heroFeaturedPrice').innerHTML = `${money(f.price)} <small>${priceNote(f.intent)}</small>`;
    $('#heroFeaturedLink').href = `#listing/${f.id}`;
  }

  function home() {
    const latest = published().slice(0, 3);
    const heroItems = published().slice(0, 6).map((x) => ({
      id: x.listingId, title: x.title, district: x.district, type: x.propertyType,
      intent: x.intent, price: x.priceAFN, img: coverOf(x),
    }));
    const tickerItems = `<span>Kabul</span><i></i>${DISTRICTS.map((d) => `<span>${districtLabel(d)}</span><i></i>`).join('')}<span>${t('home.ticker')}</span><i></i>`;
    return `
    <section class="hero hero-stage" aria-labelledby="heroTitle">
      <div class="hero-frame">
        <p class="hero-eyebrow">${t('hero.eyebrow')}</p>
        <div class="hero-content">
          <h1 id="heroTitle">${t('hero.title1')}<br><em>${t('hero.title2')}</em><br>${t('hero.title3')}</h1>
          <p class="hero-lead">${t('hero.lead')}</p>
          <div class="hero-actions">
            <a class="hero-cta" href="#listings"><span>${t('hero.explore')}</span><span class="hero-cta-arrow" aria-hidden="true">→</span></a>
            <button class="hero-play" type="button" data-scroll="process"><span class="hero-play-icon" aria-hidden="true">▶</span>${t('hero.how')}</button>
          </div>
        </div>
        <figure class="hero-media"><img src="${IMG.kabul}" alt="The old city of Kabul, its blue-domed mosque, and the mountains beyond" fetchpriority="high"></figure>
        <aside class="hero-meta" aria-label="What we stand for"><span>${t('hero.meta1')}</span><span>${t('hero.meta2')}</span><span>${t('hero.meta3')}</span><span>${t('hero.meta4')}</span></aside>
        <div class="hero-bottom">
          ${heroFeatured(heroItems)}
          <div class="hero-stats">
            <div class="hero-stat"><span class="hero-stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-6h6v6"/></svg></span><strong>${DISTRICTS.length}</strong><span>${t('hero.statDistricts')}</span></div>
            <div class="hero-stat"><span class="hero-stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></span><strong>${published().length}</strong><span>${t('hero.statLive')}</span></div>
            <div class="hero-stat"><span class="hero-stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg></span><strong>100%</strong><span>${t('hero.statReview')}</span></div>
          </div>
          <a class="hero-invite" href="#editor">
            <span class="hero-invite-top"><img src="${IMG.kabul}" alt="" loading="lazy"><span class="hero-invite-arrow" aria-hidden="true">↗</span></span>
            <span class="hero-invite-kicker">${t('hero.inviteKicker')}</span>
            <strong>${t('hero.inviteTitle')}</strong>
            <small>${t('hero.inviteText')}</small>
          </a>
        </div>
      </div>
    </section>
    ${searchBar()}
    <div class="ticker" aria-hidden="true"><div class="ticker-track">
      <div class="ticker-group">${tickerItems}</div>
      <div class="ticker-group">${tickerItems}</div>
    </div></div>
    <section class="block">
      <header class="block-head"><p class="kicker">${t('home.districtsKicker')}</p><h2>${t('home.districtsTitle')}</h2></header>
      <ul class="districts">${DISTRICTS.map((d, i) => {
        const n = published().filter((x) => x.district === d).length;
        return `<li><a href="#listings?${new URLSearchParams({ district: d })}"><span class="dn">${String(i + 1).padStart(2, '0')}</span><span class="dname">${districtLabel(d)}</span><span class="dc">${n ? t('home.listed', { n }) : t('home.browse')}</span></a></li>`;
      }).join('')}</ul>
    </section>
    <section class="block">
      <header class="block-head split"><div><p class="kicker">${t('home.latestKicker')}</p><h2>${t('home.latestTitle')}</h2></div><a class="link" href="#listings">${t('home.allHomes')}</a></header>
      ${latest.length ? `<div class="cards">${latest.map(card).join('')}</div>` : emptyBlock(t('home.noHomes'), t('home.noHomesText'))}
    </section>
    <section class="process" aria-labelledby="processTitle">
      <header class="process-head">
        <p class="kicker">${t('home.processKicker')}</p>
        <h2 id="processTitle">${t('home.processTitle')}</h2>
        <p>${t('home.processLead')}</p>
      </header>
      <ol class="process-steps">
        <li><span class="pnum">01</span><h3>${t('home.step1Title')}</h3><p>${t('home.step1Text')}</p></li>
        <li><span class="pnum">02</span><h3>${t('home.step2Title')}</h3><p>${t('home.step2Text')}</p></li>
        <li><span class="pnum">03</span><h3>${t('home.step3Title')}</h3><p>${t('home.step3Text')}</p></li>
      </ol>
      <div class="process-foot">
        <p class="process-note">${t('home.processNote')}</p>
        <a class="btn btn-ink" href="#listings">${t('home.browseHomes')}</a>
      </div>
    </section>
    <section class="publish">
      <div>
        <p class="kicker">${t('home.publishKicker')}</p>
        <h2>${t('home.publishTitle')}</h2>
        <p>${t('home.publishText')}</p>
        <a class="btn btn-light" href="#editor">${t('home.publishCta')}</a>
      </div>
      <figure class="publish-media"><img class="publish-img" src="${IMG.dusk}" alt="Kabul at dusk" loading="lazy"></figure>
    </section>`;
  }

  function listings(r) {
    const f = {
      intent: r.params.get('intent') || '',
      type: r.params.get('type') || '',
      district: r.params.get('district') || '',
      q: (r.params.get('q') || '').trim(),
      budgetMin: r.params.get('budgetMin') || '',
      budgetMax: r.params.get('budgetMax') || '',
    };
    const q = f.q.toLowerCase();
    const min = Number(f.budgetMin) || 0;
    const max = Number(f.budgetMax) || Infinity;
    const items = published().filter((x) =>
      (!f.intent || x.intent === f.intent) &&
      (!f.type || x.propertyType === f.type) &&
      (!f.district || x.district === f.district) &&
      (!min || x.priceAFN >= min) &&
      (max === Infinity || x.priceAFN <= max) &&
      (!q || `${x.title} ${x.district}`.toLowerCase().includes(q)));
    const shown = Math.min(items.length, Number(r.params.get('show')) || 24);
    const alreadyShown = Math.max(0, shown - 24);
    const more = new URLSearchParams(r.params);
    more.set('show', shown + 24);
    return `
    <section class="search-stage">
      <header class="search-stage-head">
        <div><p class="kicker">${t('listings.kicker')}</p><h1>${t('listings.title')}</h1></div>
        <p class="count"><b>${items.length}</b>${items.length === 1 ? t('listings.countOne') : t('listings.count')}</p>
      </header>
      ${searchBar(f, { q: true, auto: true })}
    </section>
    ${items.length
      ? `<div class="cards">${items.slice(0, shown).map((x, i) => `<div class="stagger${i < alreadyShown ? ' is-set' : ''}" style="--i:${Math.min(i - alreadyShown, 11)}">${card(x)}</div>`).join('')}</div>
    ${shown < items.length ? `<div class="more"><p class="fine">${t('listings.showing', { shown, total: items.length })}</p><a class="btn" href="#listings?${more}">${t('listings.showMore')}</a></div>` : ''}`
      : emptyBlock(t('listings.none'), t('listings.noneText'), `<a class="btn" href="#listings">${t('listings.clear')}</a>`)}
    <p class="fine">${t('listings.fine')}</p>`;
  }

  function listing(r) {
    const x = published().find((l) => l.listingId === r.arg);
    if (!x) return `${BACK}${emptyBlock('This home is no longer available', 'It may have been closed or is still under review.', '<a class="btn btn-ink" href="#listings">Browse homes</a>')}`;
    return `${listingBody(x)}
    <dialog class="dialog chat-dialog" id="chatDialog" aria-label="${t('chat.title')}">
      <form id="chatForm" class="dialog-inner" novalidate>
        <div class="dialog-top">
          <div class="chat-head">
            <span class="chat-avatar" id="chatAvatar" aria-hidden="true">A</span>
            <div><p class="kicker">${t('chat.title')}</p><h3 id="chatOwner">${t('listing.owner')}</h3></div>
          </div>
          <button class="dialog-x" type="button" data-close-dialog aria-label="${t('common.close')}">×</button>
        </div>
        <p class="fine" id="chatAbout"></p>
        <div class="chat-thread" id="chatThread"></div>
        <label class="field"><span class="label">${t('chat.name')} <em class="fine">${t('chat.nameOptional')}</em></span><input id="chatName" name="name" type="text" autocomplete="name" placeholder="${t('chat.namePh')}"></label>
        <label class="field"><span class="label">${t('contact.message')}</span><textarea id="chatMessage" name="message" rows="3" required placeholder="${t('chat.placeholder')}"></textarea><small class="error" id="chatError"></small></label>
        <div class="dialog-actions">
          <button class="btn btn-ghost" type="button" data-close-dialog>${t('common.cancel')}</button>
          <button class="btn btn-blue" type="submit">${t('chat.send')}</button>
        </div>
      </form>
    </dialog>`;
  }

  function about() {
    return `
    <section class="about-hero">
      <p class="kicker">${t('about.kicker')}</p>
      <h1>${t('about.title')}</h1>
      <p class="lead">${t('about.lead')}</p>
    </section>
    <figure class="wide"><img src="${IMG.dusk}" alt="Kabul at dusk with the surrounding hills" loading="lazy"></figure>
    <section class="principles">
      <article><span class="num">01</span><h3>${t('about.p1Title')}</h3><p>${t('about.p1Text')}</p></article>
      <article><span class="num">02</span><h3>${t('about.p2Title')}</h3><p>${t('about.p2Text')}</p></article>
      <article><span class="num">03</span><h3>${t('about.p3Title')}</h3><p>${t('about.p3Text')}</p></article>
    </section>
    <section class="publish">
      <div><p class="kicker">${t('about.pubKicker')}</p><h2>${t('about.pubTitle')}</h2><p>${t('about.pubText')}</p><a class="btn btn-light" href="#editor">${t('home.publishCta')}</a></div>
      <figure class="publish-media"><img class="publish-img" src="${IMG.kabul}" alt="The city of Kabul, its hillside homes and streets" loading="lazy"></figure>
    </section>`;
  }

  function contact() {
    return `
    <section class="contact">
      <div>
        <p class="kicker">${t('contact.kicker')}</p>
        <h1>${t('contact.title')}</h1>
        <p class="lead">${t('contact.lead')}</p>
      </div>
      <form id="contactForm" class="stack" novalidate>
        <label class="field"><span class="label">${t('contact.topic')}</span><select name="topic"><option>${t('contact.finding')}</option><option>${t('contact.prices')}</option><option>${t('contact.publishing')}</option><option>${t('contact.privacy')}</option><option>${t('contact.other')}</option></select></label>
        <label class="field"><span class="label">${t('contact.message')}</span><textarea name="message" rows="6" required minlength="12" placeholder="${t('contact.placeholder')}"></textarea><small class="error" id="contactError"></small></label>
        <button class="btn btn-ink" type="submit">${t('contact.send')}</button>
      </form>
    </section>`;
  }

  /* ---------- Account ---------- */
  const fieldHTML = (name, label, type, placeholder, autocomplete) =>
    `<label class="field"><span class="label">${label}</span><input name="${name}" type="${type}" placeholder="${esc(placeholder)}" autocomplete="${autocomplete}" required></label>`;

  function account(r) {
    const modeParam = r?.params.get('mode');
    if (modeParam === 'register') accountMode = 'register';
    if (modeParam === 'login') accountMode = 'login';
    const roleParam = r?.params.get('role');
    if (roleParam === 'agency' || roleParam === 'individual') accountRole = roleParam;
    const login = accountMode === 'login';
    const agency = accountRole === 'agency';
    return `
    <section class="auth">
      <figure class="auth-photo"><img src="${IMG.kabul}" alt="The city of Kabul, its hillside homes and streets"></figure>
      <div class="auth-form">
        <div class="seg" role="group" aria-label="Account">
          <button type="button" class="${login ? 'on' : ''}" aria-pressed="${login}" data-action="account-mode" data-mode="login">${t('account.signin')}</button>
          <button type="button" class="${login ? '' : 'on'}" aria-pressed="${!login}" data-action="account-mode" data-mode="register">${t('account.register')}</button>
        </div>
        <h1>${login ? t('account.welcome') : t('account.start')}</h1>
        <p class="lead">${login ? t('account.leadSignin') : t('account.leadRegister')}</p>
        <div id="authMsg" aria-live="polite"></div>
        <form id="authForm" class="stack" novalidate>
          ${login ? '' : `<div class="field"><span class="label">${t('account.role')}</span><div class="seg role-seg">
            <label><input type="radio" name="role" value="individual" ${agency ? '' : 'checked'}><span>${t('account.individual')}</span></label>
            <label><input type="radio" name="role" value="agency" ${agency ? 'checked' : ''}><span>${t('account.agency')}</span></label>
          </div></div>`}
          ${login ? '' : fieldHTML('name', t('account.name'), 'text', 'Your name', 'name')}
          ${fieldHTML('email', t('account.email'), 'email', 'you@email.com', 'email')}
          ${fieldHTML('password', t('account.password'), 'password', login ? '' : 'At least 8 characters', login ? 'current-password' : 'new-password')}
          ${login ? '' : fieldHTML('confirm', t('account.confirm'), 'password', '', 'new-password')}
          <div class="agency-fields" data-agency-fields ${agency ? '' : 'hidden'}>
            <div class="agency-note">${t('account.agencyNote')}</div>
            ${fieldHTML('agencyName', t('account.agencyName'), 'text', 'Noor Estates', 'organization')}
            ${fieldHTML('license', t('account.license'), 'text', 'KBL-AG-1042', 'off')}
            ${fieldHTML('phone', t('account.phone'), 'tel', '+93 70 000 0000', 'tel')}
            <label class="field"><span class="label">${t('account.officeDistrict')}</span><select name="officeDistrict">${DISTRICTS.map((d) => `<option value="${d}">${districtLabel(d)}</option>`).join('')}</select></label>
            <label class="field"><span class="label">${t('account.agencyAbout')}</span><textarea name="agencyAbout" rows="3" placeholder="${t('account.agencyAboutPh')}"></textarea></label>
          </div>
          <button class="btn btn-ink btn-block" type="submit">${login ? t('account.signin') : t('account.create')}</button>
        </form>
        <p class="fine">${t('account.local')}</p>
      </div>
    </section>`;
  }

  function handleAuth(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim().toLowerCase();
    const password = String(fd.get('password') || '');
    const fail = (message) => { $('#authMsg').innerHTML = notice(message, 'error'); };

    if (accountMode === 'login') {
      const u = state.users.find((x) => x.email === email && x.password === password);
      if (!u) return fail('Email or password is not right. Check both and try again.');
      return signIn(u);
    }
    const name = String(fd.get('name') || '').trim();
    const confirm = String(fd.get('confirm') || '');
    const role = String(fd.get('role') || 'individual') === 'agency' ? 'agency' : 'individual';
    const agencyName = String(fd.get('agencyName') || '').trim();
    const license = String(fd.get('license') || '').trim();
    if (!name) return fail('Add your name.');
    if (role === 'agency' && !agencyName) return fail('Add the name of your agency.');
    if (role === 'agency' && !license) return fail('Add your agency license or registration number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Enter a valid email address.');
    if (password.length < 8) return fail('Use at least 8 characters for your password.');
    if (password !== confirm) return fail('The passwords do not match.');
    if (state.users.some((x) => x.email === email)) return fail('An account with this email already exists. Sign in instead.');
    const u = {
      id: `pub-${Math.random().toString(36).slice(2, 10)}`, name, email, password, role,
      ...(role === 'agency' ? {
        agencyName, license,
        phone: String(fd.get('phone') || '').trim(),
        officeDistrict: String(fd.get('officeDistrict') || '').trim(),
        about: String(fd.get('agencyAbout') || '').trim(),
      } : {}),
    };
    state.users.push(u);
    signIn(u);
  }

  function signIn(u) {
    state.session = u.id;
    if (!persist()) return;
    const ret = sessionStorage.getItem('kpf-return') || 'dashboard';
    sessionStorage.removeItem('kpf-return');
    toast(`Welcome, ${(u.role === 'agency' && u.agencyName ? u.agencyName : u.name.split(' ')[0])}.`);
    go(ret);
  }

  /* ---------- Dashboard ---------- */
  function dashboard() {
    const list = mine();
    const user = me();
    const agency = user?.role === 'agency';
    const count = (s) => list.filter((x) => x.status === s).length;
    const filters = ['All', 'Draft', 'Pending', 'Published', 'Returned', 'Closed'];
    const shown = dashFilter === 'All' ? list.filter((x) => x.status !== 'Closed') : list.filter((x) => x.status === dashFilter);
    const filterLabel = (f) => f === 'Pending' ? t('dash.review') : f === 'Draft' ? t('dash.drafts') : f === 'Published' ? t('dash.live') : f === 'Returned' ? t('dash.returned') : f === 'All' ? t('dash.all') : f;
    return `
    <section class="page-head">
      <div><p class="kicker">${agency ? t('dash.agencyKicker') : t('dash.kicker')}</p><h1>${agency ? esc(user.agencyName || user.name) : t('dash.title')}</h1></div>
      <a class="btn btn-ink" href="#editor">${t('dash.new')}</a>
    </section>
    ${agency ? `<div class="profile-strip">
      <span class="role-badge">${t('common.agency')}</span>
      <div><strong>${esc(user.agencyName || user.name)}</strong><small>${esc(user.name)} · ${t('dash.license')}: ${esc(user.license || '—')}</small></div>
      <div class="profile-strip-meta"><span>${esc(user.phone || '—')}</span><span>${esc(districtLabel(user.officeDistrict || 'District 1'))}</span></div>
    </div>` : `<div class="profile-strip profile-strip-person">
      <span class="role-badge role-badge-soft">${t('common.individual')}</span>
      <div><strong>${esc(user?.name || '')}</strong><small>${esc(user?.email || '')}</small></div>
      <div class="profile-strip-meta"><span>${list.length} ${list.length === 1 ? t('listings.countOne') : t('listings.count')}</span></div>
    </div>`}
    <div class="stats">${[['dash.drafts', 'Draft'], ['dash.review', 'Pending'], ['dash.live', 'Published'], ['dash.returned', 'Returned']].map(([l, s]) =>
      `<button type="button" class="stat ${dashFilter === s ? 'on' : ''}" data-filter="${s}"><b>${count(s)}</b><span>${t(l)}</span></button>`).join('')}</div>
    <nav class="tabs" aria-label="Filter listings">${filters.map((f) =>
      `<button type="button" data-filter="${f}" aria-pressed="${dashFilter === f}" class="${dashFilter === f ? 'on' : ''}">${filterLabel(f)}</button>`).join('')}</nav>
    ${shown.length
      ? `<ul class="rows">${shown.map(row).join('')}</ul>`
      : emptyBlock(dashFilter === 'All' ? t('dash.nothing') : `${t('dash.nothing')} — ${filterLabel(dashFilter)}`, dashFilter === 'All' ? t('dash.create') : 'Try another filter.', dashFilter === 'All' ? `<a class="btn btn-ink" href="#editor">${t('dash.new')}</a>` : '')}
    <p class="fine">${t('dash.local')}</p>
    <dialog class="dialog" id="inquiriesDialog" aria-label="Listing messages"><div class="dialog-inner" id="inquiriesBody"></div></dialog>`;
  }

  function row(x) {
    const primary = { Draft: ['dash.continue', 'editor'], Returned: ['dash.revise', 'editor'], Published: ['dash.edit', 'editor'], Pending: ['dash.view', 'preview'] }[x.status];
    const messages = threadCount(x);
    return `<li class="row">
      <img class="row-img" src="${esc(coverOf(x))}" alt="">
      <div class="row-main">
        <h3>${esc(x.title)}</h3>
        <p class="meta">${esc(districtLabel(x.district))} · ${esc(x.propertyType)} · ${intentWord(x.intent)} · ${contactLabel(x)}</p>
        ${x.status === 'Returned' && x.reviewReason ? notice(`<strong>Moderator’s note.</strong> ${esc(x.reviewReason)}`, 'error') : ''}
      </div>
      <p class="row-price">${money(x.priceAFN)}<small>${priceNote(x.intent)}</small></p>
      <div class="row-state">${badge(x.status)}<small>${fmtDate(x.updatedAt)}</small></div>
      <div class="row-actions">
        ${primary ? `<button class="btn btn-ink btn-sm" data-go="${primary[1]}/${esc(x.listingId)}">${t(primary[0])}</button>` : ''}
        ${messages ? `<button class="btn btn-sm btn-blue" data-inquiries="${esc(x.listingId)}">${messages} ${messages === 1 ? t('dash.message') : t('dash.messages')}</button>` : ''}
        <button class="btn btn-sm" data-go="preview/${esc(x.listingId)}">${t('dash.preview')}</button>
        ${x.status === 'Published' ? `<button class="btn btn-sm" data-action="close" data-id="${esc(x.listingId)}">${t('dash.close')}</button>` : ''}
      </div></li>`;
  }

  function closeListing(id) {
    const x = ownListing(id);
    if (!x || x.status !== 'Published') return;
    if (!confirm('Close this listing? It will be removed from public pages.')) return;
    x.status = 'Closed';
    x.updatedAt = iso();
    if (persist()) { paint('dashboard'); toast('Listing closed.'); }
  }

  /* ---------- Editor ---------- */
  const blankDraft = () => ({ id: null, f: { title: '', description: '', intent: 'rent', type: '', district: '', price: '', photos: [], contactMethod: 'chat', whatsapp: '' }, errors: {} });
  const draftFrom = (x) => ({
    id: x.listingId,
    f: {
      title: x.title, description: x.description, intent: x.intent, type: x.propertyType,
      district: x.district, price: String(x.priceAFN), photos: [...(x.photos || [])],
      contactMethod: x.contact?.method === 'whatsapp' ? 'whatsapp' : 'chat',
      whatsapp: x.contact?.whatsapp || '',
    },
    errors: {},
  });

  function textField(name, label, value, err, placeholder = '', o = {}) {
    const id = `f-${name}`;
    const attrs = `id="${id}" name="${name}" placeholder="${esc(placeholder)}"${err ? ` aria-invalid="true" aria-describedby="${id}-err"` : ''}`;
    const control = o.textarea
      ? `<textarea ${attrs} rows="5">${esc(value)}</textarea>`
      : `<input ${attrs} type="${o.type || 'text'}" value="${esc(value)}"${o.min ? ` min="${o.min}"` : ''}>`;
    return `<div class="field"><label for="${id}"><span class="label">${label}</span></label>${control}${o.hint && !err ? `<small class="hint">${o.hint}</small>` : ''}${err ? `<small class="error" id="${id}-err">${esc(err)}</small>` : ''}</div>`;
  }

  function selectField(name, label, options, value, err, empty) {
    const id = `f-${name}`;
    return `<div class="field"><label for="${id}"><span class="label">${label}</span></label><select id="${id}" name="${name}"${err ? ' aria-invalid="true"' : ''}><option value="">${empty}</option>${options.map((o) => {
      const v = typeof o === 'string' ? o : o.value;
      const txt = typeof o === 'string' ? o : o.label;
      return `<option value="${esc(v)}" ${v === value ? 'selected' : ''}>${esc(txt)}</option>`;
    }).join('')}</select>${err ? `<small class="error">${esc(err)}</small>` : ''}</div>`;
  }

  function editor(r) {
    if (r.arg) {
      const x = ownListing(r.arg);
      if (!x || x.status === 'Closed') { toast('That listing can’t be edited.'); go('dashboard'); return null; }
      if (!draft || draft.id !== x.listingId) draft = draftFrom(x);
    } else if (!draft || draft.id) {
      draft = blankDraft();
    }
    const d = draft, f = d.f, e = d.errors, x = d.id ? ownListing(d.id) : null;
    const priceHint = f.intent === 'sale' ? 'The total sale price.' : f.intent === 'gerawi' ? 'The one-time gerawi advance.' : 'The monthly rent.';
    return `
    <section class="page-head">
      <div><p class="kicker">${d.id ? `Editing ${esc(d.id)}` : 'New listing'}</p><h1>${d.id ? 'Update your listing' : 'Create a listing'}</h1></div>
      ${x ? badge(x.status) : ''}
    </section>
    ${steps(1)}
    ${x?.status === 'Returned' ? notice(`<strong>Moderator’s note.</strong> ${esc(x.reviewReason || 'Update this listing before you resubmit.')}`, 'error') : ''}
    ${x?.status === 'Published' ? notice('Saving changes to a live listing sends it back to review.') : ''}
    <div class="editor">
      <form id="listingForm" class="editor-form" novalidate>
        <fieldset class="sec"><legend><span class="num">01</span> Basics</legend>
          ${textField('title', 'Title', f.title, e.title, 'e.g. Bright two-room apartment near the market')}
          <div class="field"><span class="label">Purpose</span>
            <div class="seg seg-three">
              <label><input type="radio" name="intent" value="rent" ${f.intent === 'rent' ? 'checked' : ''}><span>${t('intent.rent')}</span></label>
              <label><input type="radio" name="intent" value="sale" ${f.intent === 'sale' ? 'checked' : ''}><span>${t('intent.sale')}</span></label>
              <label><input type="radio" name="intent" value="gerawi" ${f.intent === 'gerawi' ? 'checked' : ''}><span>${t('intent.gerawi')}</span></label>
            </div></div>
          <div class="grid-2">
            ${selectField('type', 'Property type', TYPES, f.type, e.type, 'Choose a type')}
            ${selectField('district', 'District', DISTRICTS.map((x) => ({ value: x, label: districtLabel(x) })), f.district, e.district, 'Choose a district')}
          </div>
        </fieldset>
        <fieldset class="sec"><legend><span class="num">02</span> Price</legend>
          ${textField('price', 'Price (AFN)', f.price, e.price, '0', { type: 'number', min: 1, hint: priceHint })}
        </fieldset>
        <fieldset class="sec"><legend><span class="num">03</span> Description</legend>
          ${textField('description', 'Description', f.description, e.description, 'Rooms, light, condition, what is included. No phone numbers or exact addresses.', { textarea: true, hint: 'At least 20 characters.' })}
        </fieldset>
        <fieldset class="sec"><legend><span class="num">04</span> Contact</legend>
          <div class="field"><span class="label">How should buyers reach you?</span>
            <div class="seg">
              <label><input type="radio" name="contactMethod" value="chat" ${f.contactMethod === 'whatsapp' ? '' : 'checked'}><span>In-site chat</span></label>
              <label><input type="radio" name="contactMethod" value="whatsapp" ${f.contactMethod === 'whatsapp' ? 'checked' : ''}><span>WhatsApp</span></label>
            </div>
          </div>
          ${f.contactMethod === 'whatsapp'
            ? textField('whatsapp', 'WhatsApp number', f.whatsapp, e.whatsapp, '+93 70 000 0000', { type: 'tel', hint: 'Include the country code. Buyers see a message button, not a raw phone number.' })
            : '<p class="fine">Buyers send a message from the listing page. You read and reply from your dashboard.</p>'}
        </fieldset>
        <fieldset class="sec"><legend><span class="num">05</span> Photos <em>optional</em></legend>
          <label class="drop"><strong>Choose photos</strong><small>JPG, PNG or WebP · up to 5 MB each</small><input id="photoInput" type="file" accept="image/jpeg,image/png,image/webp" multiple></label>
          <div id="photoFeedback"></div>
          <div id="photoGrid" class="thumbs"></div>
        </fieldset>
        <div class="actions-bar">
          <button type="button" class="btn btn-ghost" data-action="cancel-editor">Cancel</button>
          <div class="actions-right">
            <button type="button" class="btn" data-action="save-draft">Save draft</button>
            <button class="btn btn-ink" type="submit">Preview →</button>
          </div>
        </div>
      </form>
      <aside class="checklist" id="checklist"></aside>
    </div>`;
  }

  function checklistHTML() {
    const f = draft.f;
    const items = [
      ['Title, at least 5 characters', f.title.trim().length >= 5],
      ['Property type', TYPES.includes(f.type)],
      ['District', DISTRICTS.includes(f.district)],
      ['Price above zero', Number(f.price) > 0],
      ['Description, at least 20 characters', f.description.trim().length >= 20],
      ['Contact method', f.contactMethod !== 'whatsapp' || waDigits(f.whatsapp).length >= 9],
      ['Photos', f.photos.length > 0, true],
    ];
    const req = items.filter((i) => !i[2]);
    const done = req.filter((i) => i[1]).length;
    return `<p class="kicker">Before you preview</p>
      <h3>${done} of ${req.length} required</h3>
      <ul class="checks">${items.map(([l, ok, opt]) => `<li class="${ok ? 'ok' : ''}"><span aria-hidden="true">${ok ? '✓' : opt ? '+' : ''}</span>${l}${opt ? ' <em>optional</em>' : ''}</li>`).join('')}</ul>
      <p class="fine">Public listings show the district and photos. Exact addresses are never shown.</p>`;
  }

  const updateChecklist = () => { const el = $('#checklist'); if (el) el.innerHTML = checklistHTML(); };

  function renderPhotos() {
    const g = $('#photoGrid');
    if (!g) return;
    g.innerHTML = draft.f.photos.map((p, i) =>
      `<figure class="thumb"><img src="${p.data}" alt="Photo ${i + 1}"><button type="button" data-remove="${i}" aria-label="Remove photo ${i + 1}">×</button></figure>`).join('');
  }

  function captureForm() {
    const form = $('#listingForm');
    if (!form) return;
    const d = new FormData(form);
    draft.f = {
      ...draft.f,
      title: String(d.get('title') ?? ''),
      description: String(d.get('description') ?? ''),
      intent: String(d.get('intent') || 'rent'),
      type: String(d.get('type') ?? ''),
      district: String(d.get('district') ?? ''),
      price: String(d.get('price') ?? ''),
      contactMethod: String(d.get('contactMethod') || 'chat'),
      whatsapp: d.has('whatsapp') ? String(d.get('whatsapp')) : draft.f.whatsapp,
    };
  }

  function validate(f) {
    const e = {};
    const t = f.title.trim(), d = f.description.trim(), p = Number(f.price);
    if (t.length < 5) e.title = 'Use at least 5 characters so the title is clear.';
    if (!TYPES.includes(f.type)) e.type = 'Choose a property type.';
    if (!DISTRICTS.includes(f.district)) e.district = 'Choose a district.';
    if (!(p > 0)) e.price = 'Enter an amount above zero.';
    if (d.length < 20) e.description = 'Add at least 20 characters about the home.';
    else if (/\+?\d[\d ()-]{7,}/.test(d)) e.description = 'Remove phone numbers from the description.';
    else if (/\b(street|road|lane)\s+\d+/i.test(d)) e.description = 'Remove exact street details.';
    if (f.contactMethod === 'whatsapp') {
      const wa = waDigits(f.whatsapp);
      if (wa.length < 9 || wa.length > 15) e.whatsapp = 'Add a WhatsApp number with country code, e.g. +93 70 000 0000.';
    }
    return e;
  }

  const readFile = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res({ name: file.name, data: r.result });
    r.onerror = rej;
    r.readAsDataURL(file);
  });

  function handlePhotos(e) {
    const fb = $('#photoFeedback');
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    const max = 5 * 1024 * 1024;
    const files = [...e.target.files];
    e.target.value = '';
    if (files.some((f) => !allowed.includes(f.type))) fb.innerHTML = notice('Use JPG, PNG or WebP photos.', 'error');
    if (files.some((f) => f.size > max)) fb.innerHTML = notice('One photo is over 5 MB. Choose a smaller image.', 'error');
    const ok = files.filter((f) => allowed.includes(f.type) && f.size <= max);
    if (!ok.length) return;
    Promise.all(ok.map(readFile)).then((list) => {
      draft.f.photos = [...draft.f.photos, ...list];
      fb.innerHTML = '';
      renderPhotos();
      updateChecklist();
    }).catch(() => { fb.innerHTML = notice('Could not read a photo. Try another file.', 'error'); });
  }

  function bindEditor() {
    const form = $('#listingForm');
    if (!form) return;
    form.addEventListener('input', () => { captureForm(); updateChecklist(); });
    form.addEventListener('change', (e) => {
      if (e.target.id === 'photoInput') return handlePhotos(e);
      captureForm();
      if (e.target.name === 'intent' || e.target.name === 'contactMethod') paint('editor');
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      captureForm();
      const errs = validate(draft.f);
      draft.errors = errs;
      if (Object.keys(errs).length) {
        paint('editor');
        $(`#f-${Object.keys(errs)[0]}`)?.focus();
        return;
      }
      go(draft.id ? `preview/${draft.id}` : 'preview');
    });
    renderPhotos();
    updateChecklist();
  }

  /* Persist the current draft as a listing. Returns the resulting status or null. */
  function saveListing(mode) {
    const f = draft.f;
    let x = draft.id && ownListing(draft.id);
    if (!x) {
      x = { listingId: `KPF-${Math.floor(1000 + Math.random() * 9000)}`, publisherId: state.session, status: 'Draft', createdAt: iso(), photos: [] };
      state.listings.unshift(x);
      draft.id = x.listingId;
    }
    const prev = x.status;
    let next;
    if (mode === 'submit') next = 'Pending';
    else if (prev === 'Published') next = 'Pending';
    else if (prev === 'Pending' || prev === 'Returned') next = prev;
    else next = 'Draft';
    Object.assign(x, {
      title: f.title.trim(), description: f.description.trim(), intent: f.intent,
      propertyType: f.type, district: f.district, priceAFN: Number(f.price),
      photos: f.photos, status: next, updatedAt: iso(),
      contact: {
        method: f.contactMethod === 'whatsapp' ? 'whatsapp' : 'chat',
        whatsapp: f.contactMethod === 'whatsapp' ? waDigits(f.whatsapp) : '',
      },
    });
    if (next !== 'Returned') delete x.reviewReason;
    return persist() ? next : null;
  }

  function saveDraftAction() {
    const onEditor = parse().name === 'editor';
    if (onEditor) captureForm();
    if (!draft.f.title.trim()) {
      if (onEditor) { draft.errors = { title: 'Add a title before saving.' }; paint('editor'); $('#f-title')?.focus(); }
      else toast('Add a title before saving.');
      return;
    }
    const next = saveListing('draft');
    if (!next) return;
    toast(next === 'Pending' ? 'Changes saved. This listing is in review.'
      : next === 'Returned' ? 'Revision saved. It stays returned until you resubmit.'
      : 'Draft saved.');
    draft = null;
    go('dashboard');
  }

  function submitAction() {
    const errs = validate(draft.f);
    if (Object.keys(errs).length) {
      draft.errors = errs;
      toast('Finish the highlighted details first.');
      go(draft.id ? `editor/${draft.id}` : 'editor');
      return;
    }
    if (!saveListing('submit')) return;
    draft = null;
    toast('Submitted. We’ll review it before it goes live.');
    go('dashboard');
  }

  function preview(r) {
    if (r.arg) {
      const x = ownListing(r.arg);
      if (!x) { go('dashboard'); return null; }
      if (!draft || draft.id !== x.listingId) draft = draftFrom(x);
    } else if (!draft) {
      go('editor');
      return null;
    }
    const errs = validate(draft.f);
    if (Object.keys(errs).length) {
      draft.errors = errs;
      go(draft.id ? `editor/${draft.id}` : 'editor');
      return null;
    }
    const f = draft.f;
    const view = {
      title: f.title.trim(), description: f.description.trim(), intent: f.intent,
      propertyType: f.type, district: f.district, priceAFN: Number(f.price),
      photos: f.photos, updatedAt: iso(), publisherId: state.session,
      contact: { method: f.contactMethod, whatsapp: waDigits(f.whatsapp) },
    };
    return `
    <section class="page-head">
      <div><p class="kicker">Preview</p><h1>Check how it reads</h1></div>
    </section>
    ${steps(2)}
    ${listingBody(view, { preview: true })}
    <div class="actions-bar">
      <button class="btn" data-action="back-edit">← Edit</button>
      <div class="actions-right">
        <button class="btn" data-action="save-draft">Save draft</button>
        <button class="btn btn-ink" data-action="submit">Submit for review</button>
      </div>
    </div>
    <p class="fine">Submitting sends this listing for review. It isn’t public until it is approved.</p>`;
  }

  /* ---------- Moderation ---------- */
  function adminGate() {
    return `<section class="admin-gate">
      <form id="adminGateForm" class="gate-card" novalidate>
        <span class="gate-lock" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="10" width="16" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span>
        <p class="kicker">Restricted desk</p>
        <h1>Review homes before they go live.</h1>
        <p class="lead">Enter the moderator passcode to open the queue.</p>
        <label class="field"><span class="label">Passcode</span><input name="code" type="password" autocomplete="off" placeholder="Moderator passcode" required></label>
        <div id="gateMsg" aria-live="polite"></div>
        <button class="btn btn-blue btn-block" type="submit">Unlock the desk →</button>
        <p class="fine">Prototype gate for this browser-only build. Real moderation needs a server and proper accounts.</p>
      </form>
    </section>`;
  }

  function modRow(x) {
    const pub = state.users.find((u) => u.id === x.publisherId);
    return `<li class="mod-row">
      <img class="mod-img" src="${esc(coverOf(x))}" alt="" loading="lazy">
      <div class="mod-main">
        <div class="mod-top"><span class="meta">${esc(x.listingId)}</span>${badge(x.status)}</div>
        <h3>${esc(x.title)}</h3>
        <p class="meta">${esc(x.district)} · ${esc(x.propertyType)} · ${intentWord(x.intent)} · ${contactOf(x).method === 'whatsapp' ? 'WhatsApp' : 'In-site chat'}</p>
        <p class="mod-pub">${pub ? `${esc(pub.name)} <span>· ${esc(pub.email)}</span>` : 'Publisher account removed'}</p>
        <p class="fine">Updated ${fmtDate(x.updatedAt)}</p>
      </div>
      <p class="mod-price">${money(x.priceAFN)}<small>${x.intent === 'sale' ? 'total' : 'per month'}</small></p>
      <div class="mod-actions">
        <button class="btn btn-sm" type="button" data-review="${esc(x.listingId)}">Review</button>
        ${x.status !== 'Published' ? `<button class="btn btn-sm btn-blue" type="button" data-approve="${esc(x.listingId)}">Approve</button>` : ''}
        <button class="btn btn-sm btn-danger" type="button" data-return="${esc(x.listingId)}">${x.status === 'Published' ? 'Take down' : 'Return'}</button>
      </div></li>`;
  }

  function moderation() {
    if (!adminUnlocked()) return adminGate();
    const all = state.listings.filter((x) => ['Pending', 'Published', 'Returned'].includes(x.status));
    const count = (s) => state.listings.filter((x) => x.status === s).length;
    const filters = [['Pending', 'In review'], ['Published', 'Live'], ['Returned', 'Returned'], ['All', 'All']];
    const shown = (modFilter === 'All' ? all : all.filter((x) => x.status === modFilter))
      .slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const empty = {
      Pending: ['The queue is clear', 'New submissions will land here for review.'],
      Published: ['Nothing is live yet', 'Approve a listing and it will appear here and on the public site.'],
      Returned: ['No listings are with publishers', 'Returned listings wait here until they are revised or approved.'],
      All: ['No listings have been submitted', 'When publishers send their first homes, they will appear here.'],
    }[modFilter];
    return `
    <section class="page-head admin-head">
      <div><p class="kicker">Moderation</p><h1>The review desk.</h1></div>
      <div class="admin-head-actions">
        <span class="admin-live"><i aria-hidden="true"></i>${count('Pending')} waiting</span>
        <button class="btn btn-sm" type="button" data-action="lock-admin">Lock desk</button>
      </div>
    </section>
    <p class="lead admin-lead">Read the listing, then publish it or send it back with a note. Nothing reaches the public site without passing through this desk.</p>
    <div class="stats admin-stats">
      ${[['In review', 'Pending'], ['Live', 'Published'], ['Returned', 'Returned'], ['Drafts', 'Draft']].map(([label, s]) =>
        `<div class="stat"><b>${count(s)}</b><span>${label}</span></div>`).join('')}
    </div>
    <div class="queue-meta">
      <nav class="tabs admin-tabs" aria-label="Filter moderation queue">${filters.map(([s, l]) =>
        `<button type="button" data-mod-filter="${s}" aria-pressed="${modFilter === s}" class="${modFilter === s ? 'on' : ''}">${l}</button>`).join('')}</nav>
      <p class="fine">${shown.length} ${shown.length === 1 ? 'listing' : 'listings'}</p>
    </div>
    ${shown.length
      ? `<ul class="mod-queue">${shown.map(modRow).join('')}</ul>`
      : emptyBlock(empty[0], empty[1], modFilter === 'Pending' ? '<a class="btn btn-ink" href="#listings">See the public site</a>' : '')}
    <p class="fine">Prototype moderation: the passcode and queue live in this browser only.</p>
    <dialog class="dialog dialog-wide" id="reviewDialog" aria-label="Review listing"><div id="reviewBody"></div></dialog>
    <dialog class="dialog" id="returnDialog" aria-label="Return listing">
      <form id="returnForm" class="dialog-inner" novalidate>
        <div class="dialog-top"><p class="kicker">Return with a note</p><button class="dialog-x" type="button" data-close-dialog aria-label="Close">×</button></div>
        <h2 id="returnTitle">Send it back.</h2>
        <p class="dialog-sub" id="returnHint">The publisher will see this note on their dashboard and can revise the listing.</p>
        <label class="field"><span class="label">Moderator note</span><textarea id="returnNote" name="note" rows="4" placeholder="What needs to change before this can go live?" required></textarea><small class="error" id="returnError"></small></label>
        <div class="dialog-actions">
          <button class="btn btn-ghost" type="button" data-close-dialog>Cancel</button>
          <button class="btn btn-ink" type="submit">Return listing</button>
        </div>
      </form>
    </dialog>`;
  }

  function bindModeration() {
    $('#adminGateForm')?.addEventListener('submit', handleAdminGate);
    $('#returnForm')?.addEventListener('submit', handleReturn);
  }

  function handleAdminGate(e) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get('code') || '').trim();
    if (code !== ADMIN_CODE) {
      $('#gateMsg').innerHTML = notice('That passcode is not right. Try again.', 'error');
      e.currentTarget.elements.code.select();
      return;
    }
    sessionStorage.setItem('kpf-admin', 'yes');
    renderAccountSlot();
    toast('Moderation unlocked.');
    paint('moderation');
  }

  function openReview(id) {
    const x = state.listings.find((l) => l.listingId === id);
    const dlg = $('#reviewDialog');
    const body = $('#reviewBody');
    if (!x || !dlg || !body) return;
    const pub = state.users.find((u) => u.id === x.publisherId);
    body.innerHTML = `
      <div class="dialog-top">
        <p class="kicker">Reviewing ${esc(x.listingId)}</p>
        <button class="dialog-x" type="button" data-close-dialog aria-label="Close">×</button>
      </div>
      ${listingBody(x, { admin: true })}
      <p class="fine dialog-pub">Submitted by ${pub ? `${esc(pub.name)} · ${esc(pub.email)}` : 'an account that is no longer here'} · updated ${fmtDate(x.updatedAt)}</p>
      <div class="dialog-actions">
        <button class="btn btn-ghost" type="button" data-close-dialog>Close</button>
        <button class="btn btn-danger" type="button" data-return="${esc(x.listingId)}">${x.status === 'Published' ? 'Take down' : 'Return with note'}</button>
        ${x.status !== 'Published' ? `<button class="btn btn-blue" type="button" data-approve="${esc(x.listingId)}">Approve &amp; publish</button>` : ''}
      </div>`;
    if (!dlg.open) dlg.showModal();
  }

  function openReturn(id) {
    const x = state.listings.find((l) => l.listingId === id);
    const dlg = $('#returnDialog');
    if (!x || !dlg) return;
    returnTarget = id;
    $('#returnTitle').textContent = `Send “${x.title}” back.`;
    $('#returnHint').textContent = x.status === 'Published'
      ? 'This listing leaves the public site immediately. The publisher sees your note and can resubmit.'
      : 'The publisher sees this note on their dashboard and can revise the listing before resubmitting.';
    const note = $('#returnNote');
    note.value = '';
    $('#returnError').textContent = '';
    if (!dlg.open) dlg.showModal();
    setTimeout(() => note.focus(), 60);
  }

  function handleReturn(e) {
    e.preventDefault();
    const x = state.listings.find((l) => l.listingId === returnTarget);
    const note = String(new FormData(e.currentTarget).get('note') || '').trim();
    if (!x) return;
    if (note.length < 8) {
      $('#returnError').textContent = 'Add at least 8 characters so the publisher knows what to fix.';
      $('#returnNote')?.focus();
      return;
    }
    x.status = 'Returned';
    x.reviewReason = note;
    x.updatedAt = iso();
    if (!persist()) return;
    $('#returnDialog')?.close();
    $('#reviewDialog')?.close();
    returnTarget = null;
    paint('moderation');
    toast(`Returned “${x.title}” with your note.`);
  }

  function approveListing(id) {
    const x = state.listings.find((l) => l.listingId === id);
    if (!x) return;
    x.status = 'Published';
    x.updatedAt = iso();
    delete x.reviewReason;
    if (!persist()) return;
    $('#reviewDialog')?.close();
    $('#returnDialog')?.close();
    paint('moderation');
    toast(`“${x.title}” is live on the public site.`);
  }

  /* ---------- Listing contact & inquiries ---------- */
  function bindChat() {
    $('#chatForm')?.addEventListener('submit', sendInquiry);
  }

  function renderThread(x, mode = 'buyer') {
    const thread = threadOf(x).slice().sort((a, b) => new Date(a.at) - new Date(b.at));
    if (!thread.length) {
      return `<div class="chat-intro"><span>${t('chat.introTitle')}</span><p>${t('chat.introText')}</p></div>`;
    }
    return thread.map((m) => {
      const own = m.from === 'owner';
      const who = own ? (m.name || ownerDisplay(state.users.find((u) => u.id === x.publisherId))) : (m.name || 'Anonymous');
      return `<div class="bubble ${own ? 'bubble-owner' : 'bubble-me'}">
        <p>${esc(m.text)}</p>
        <span>${esc(who)} · ${fmtDate(m.at)}</span>
      </div>`;
    }).join('');
  }

  function openChat(id) {
    const x = published().find((l) => l.listingId === id);
    const dlg = $('#chatDialog');
    if (!x || !dlg) return;
    chatTarget = id;
    const owner = state.users.find((u) => u.id === x.publisherId);
    const name = owner ? ownerDisplay(owner) : 'Kabul Property Finder';
    $('#chatOwner').textContent = name;
    $('#chatAvatar').textContent = name.charAt(0).toUpperCase();
    $('#chatAbout').textContent = t('chat.about', { title: x.title });
    $('#chatThread').innerHTML = renderThread(x);
    $('#chatMessage').value = '';
    $('#chatError').textContent = '';
    $('#chatName').value = me()?.name || '';
    if (!dlg.open) dlg.showModal();
    const thread = $('#chatThread');
    thread.scrollTop = thread.scrollHeight;
    setTimeout(() => $('#chatMessage')?.focus(), 60);
  }

  function sendInquiry(e) {
    e.preventDefault();
    const x = state.listings.find((l) => l.listingId === chatTarget);
    const fd = new FormData(e.currentTarget);
    const message = String(fd.get('message') || '').trim();
    const name = String(fd.get('name') || '').trim();
    if (!x) return;
    if (message.length < 10) {
      $('#chatError').textContent = t('chat.error');
      $('#chatMessage')?.focus();
      return;
    }
    x.thread = threadOf(x);
    const buyer = name || me()?.name || 'Anonymous';
    x.thread.push({ id: `MSG-${Date.now()}`, from: 'buyer', name: buyer, text: message, at: iso() });
    x.inquiries = x.thread.filter((m) => m.from === 'buyer').map((m) => ({ id: m.id, name: m.name, message: m.text, at: m.at }));
    if (!persist()) return;
    const thread = $('#chatThread');
    thread.innerHTML = renderThread(x);
    thread.scrollTop = thread.scrollHeight;
    $('#chatMessage').value = '';
    $('#chatError').textContent = '';
    toast(t('chat.sent'));
  }

  function openInquiries(id) {
    const x = ownListing(id);
    const dlg = $('#inquiriesDialog');
    const body = $('#inquiriesBody');
    if (!x || !dlg || !body) return;
    const count = threadCount(x);
    body.innerHTML = `
      <div class="dialog-top"><p class="kicker">${t('listing.messages')} · ${esc(x.listingId)}</p><button class="dialog-x" type="button" data-close-dialog aria-label="${t('common.close')}">×</button></div>
      <h2>${esc(x.title)}</h2>
      <p class="fine">${count} ${count === 1 ? t('dash.message') : t('dash.messages')}</p>
      <div class="chat-thread inquiries-thread">${renderThread(x, 'owner')}</div>
      <form class="reply-form" id="ownerReplyForm" data-listing="${esc(x.listingId)}" novalidate>
        <label class="field"><span class="label">${t('chat.replyTitle')}</span><textarea name="reply" rows="2" required placeholder="${t('chat.replyPh')}"></textarea><small class="error" data-reply-error></small></label>
        <button class="btn btn-blue" type="submit">${t('chat.replySend')}</button>
      </form>
      <div class="dialog-actions"><button class="btn" type="button" data-close-dialog>${t('common.close')}</button></div>`;
    $('#ownerReplyForm')?.addEventListener('submit', sendOwnerReply);
    if (!dlg.open) dlg.showModal();
    const thread = $('.inquiries-thread', body);
    if (thread) thread.scrollTop = thread.scrollHeight;
  }

  function sendOwnerReply(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const x = state.listings.find((l) => l.listingId === form.dataset.listing);
    const text = String(new FormData(form).get('reply') || '').trim();
    if (!x) return;
    const err = $('[data-reply-error]', form);
    if (text.length < 2) {
      if (err) err.textContent = t('chat.replyError');
      form.elements.reply?.focus();
      return;
    }
    const owner = me();
    x.thread = threadOf(x);
    x.thread.push({ id: `MSG-${Date.now()}`, from: 'owner', name: ownerDisplay(owner), text, at: iso() });
    x.updatedAt = iso();
    if (!persist()) return;
    toast(t('chat.replySent'));
    openInquiries(x.listingId);
  }

  /* ---------- Contact ---------- */
  function sendContact(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = String(fd.get('message') || '').trim();
    const topic = String(fd.get('topic') || 'Message');
    const err = $('#contactError');
    if (msg.length < 12) {
      err.textContent = t('contact.error');
      e.currentTarget.elements.message.focus();
      return;
    }
    err.textContent = '';
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Kabul Property Finder: ${topic}`)}&body=${encodeURIComponent(msg)}`;
    toast('Opening your email app.');
  }

  /* ---------- Views map ---------- */
  const VIEWS = { home, listings, listing, about, contact, account, dashboard, editor, preview, moderation };

  /* ---------- Global events (delegated) ---------- */
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = 'images/fallback.svg';
  }, true);

  document.addEventListener('click', (e) => {
    const t = e.target;
    const ddOpt = t.closest('.dd-opt');
    if (ddOpt) { chooseDD(ddOpt); return; }
    const ddRoot = t.closest('[data-dd]');
    if (ddRoot) { toggleDD(ddRoot); return; }
    closeDD();
    const menuBtn = t.closest('.menu-toggle');
    if (menuBtn) {
      const header = $('#siteHeader');
      const open = header.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      return;
    }
    if (t.closest('#siteNav a')) {
      const header = $('#siteHeader');
      header?.classList.remove('menu-open');
      header?.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    }
    const goEl = t.closest('[data-go]');
    if (goEl) return go(goEl.dataset.go);
    const thumb = t.closest('[data-thumb]');
    if (thumb) {
      const main = $('#mainPhoto');
      if (!main) return;
      document.querySelectorAll('.thumb-btn').forEach((b) => b.classList.toggle('active', b === thumb));
      main.classList.add('swapping');
      const preload = new Image();
      preload.onload = () => {
        main.src = thumb.dataset.thumb;
        requestAnimationFrame(() => main.classList.remove('swapping'));
      };
      preload.onerror = () => main.classList.remove('swapping');
      preload.src = thumb.dataset.thumb;
      return;
    }
    const heroStepEl = t.closest('[data-hero-prev], [data-hero-next]');
    if (heroStepEl) { heroStep(heroStepEl.hasAttribute('data-hero-next') ? 1 : -1); return; }
    const scrollEl = t.closest('[data-scroll]');
    if (scrollEl) { $('.process')?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' }); return; }
    const filter = t.closest('[data-filter]');
    if (filter) { dashFilter = filter.dataset.filter; return paint('dashboard'); }
    const modFilterEl = t.closest('[data-mod-filter]');
    if (modFilterEl) { modFilter = modFilterEl.dataset.modFilter; return paint('moderation'); }
    const reviewEl = t.closest('[data-review]');
    if (reviewEl) return openReview(reviewEl.dataset.review);
    const approveEl = t.closest('[data-approve]');
    if (approveEl) return approveListing(approveEl.dataset.approve);
    const returnEl = t.closest('[data-return]');
    if (returnEl) return openReturn(returnEl.dataset.return);
    const closeDialogEl = t.closest('[data-close-dialog]');
    if (closeDialogEl) { closeDialogEl.closest('dialog')?.close(); return; }
    const contactEl = t.closest('[data-contact]');
    if (contactEl) return openChat(contactEl.dataset.contact);
    const inquiriesEl = t.closest('[data-inquiries]');
    if (inquiriesEl) return openInquiries(inquiriesEl.dataset.inquiries);
    const rm = t.closest('[data-remove]');
    if (rm && draft) { draft.f.photos.splice(Number(rm.dataset.remove), 1); renderPhotos(); updateChecklist(); return; }
    const act = t.closest('[data-action]');
    if (!act) return;
    const a = act.dataset.action;
    if (a === 'signout') { state.session = null; sessionStorage.removeItem('kpf-admin'); persist(); go('home'); toast('Signed out.'); }
    else if (a === 'account-mode') { accountMode = act.dataset.mode; paint('account'); }
    else if (a === 'theme') applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
    else if (a === 'search') openSearchDialog();
    else if (a === 'lock-admin') { sessionStorage.removeItem('kpf-admin'); renderAccountSlot(); paint('moderation'); toast('Moderation locked.'); }
    else if (a === 'cancel-editor') { if (confirm('Leave this listing? Unsaved changes will be lost.')) { draft = null; go('dashboard'); } }
    else if (a === 'save-draft') saveDraftAction();
    else if (a === 'back-edit') go(draft?.id ? `editor/${draft.id}` : 'editor');
    else if (a === 'submit') submitAction();
    else if (a === 'close') closeListing(act.dataset.id);
  });

  document.addEventListener('submit', (e) => {
    const f = e.target;
    if (!f.hasAttribute('data-search')) return;
    e.preventDefault();
    const p = new URLSearchParams();
    new FormData(f).forEach((v, k) => { const s = String(v).trim(); if (s) p.set(k, s); });
    $('#searchDialog')?.close();
    go(`listings${p.toString() ? `?${p}` : ''}`);
  });

  document.addEventListener('change', (e) => {
    const f = e.target.form;
    if (f && f.hasAttribute('data-auto')) f.requestSubmit();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDD();
  });

  /* ---------- Scroll chrome ---------- */
  const headerEl = $('.site-header');
  const progressEl = $('.progress span');
  let scrollQueued = false;
  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      headerEl?.classList.toggle('scrolled', y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressEl) progressEl.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      scrollQueued = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  $('#langSelect')?.addEventListener('change', (e) => {
    applyLang(e.target.value);
    route();
  });

  applyTheme(localStorage.getItem(THEME_KEY) || 'light');
  applyLang(lang);
  window.addEventListener('hashchange', route);
  if (!location.hash) history.replaceState(null, '', `${location.pathname}#home`);
  route();
})();
