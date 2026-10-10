# BazarDor চালু করার নিয়ম

1. `BazarDor-API-Integrated.zip` Extract করুন।
2. VS Code-এ সেই ফোল্ডার খুলুন, যেখানে `package.json` সরাসরি দেখা যায়।
3. Node.js 22 LTS বা 24 LTS ব্যবহার করুন।
4. Terminal-এ চালান: `npm install`
5. `.env.example` কপি করে `.env.local` করুন। লোকাল ডেমোর জন্য ডিফল্ট secret কাজ করবে; deploy করার আগে নতুন secret দিন।
6. চালান: `npm run dev` এবং `http://localhost:3000` খুলুন।

## API কোথায় ব্যবহার হচ্ছে
- `/categories` — Navbar-এর ক্যাটাগরি তালিকা।
- `/categories/:slug` — ক্যাটাগরি পেজের নাম/আইকন/মেটাডেটা।
- `/products` — হোমপেজের সব পণ্য ও দামের ticker।
- `/products?category=:slug` — নির্দিষ্ট ক্যাটাগরির পণ্য।
- `/products/:id` — লগইন-সুরক্ষিত পণ্যের বিস্তারিত, বাজারদর ও মূল্য-সারাংশ।
- প্রথম API ব্যর্থ হলে দেওয়া alternative API ব্যবহার করা হয়।

## গুরুত্বপূর্ণ
- Figma ফাইলের basket illustration hero-তে রাখা হয়েছে। আলাদা লোগো/হিরো ছবি পরে দিলে সেটি বসানো যাবে।
- প্রকৃত API price না পেলে ০ টাকা বা বানানো বাজারদর দেখানো হয় না। API বন্ধ থাকলে স্পষ্ট unavailable/empty state দেখায়।
- API থেকে পণ্যের ছবি এলে সেটি দেখায়; না এলে assignment-এ অনুমোদিত পণ্য-উপযোগী emoji/illustration দেখায়।
- API আগের দিনের দাম বা change percentage না দিলে মিথ্যা `▲/▼ ০%` দেখানো হয় না; পরিবর্তনের তথ্য নেই বলা হয়।
- Google/GitHub login চালু করতে OAuth Client ID/Secret লাগবে। Email/password login-এর জন্য আগে এই সাইটে Sign Up করতে হবে; ব্যক্তিগত Gmail password দিয়ে email/password login হবে না।
- জমা দেওয়ার আগে অন্তত ৮টি অর্থপূর্ণ Git commit, live deployment, এবং browser-এ সব route পরীক্ষা করতে হবে।
