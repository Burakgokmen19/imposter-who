export interface CategoryGroup {
  category: string;
  words: string[];
}

export const CATEGORIZED_WORDS: CategoryGroup[] = [
  {
    category: "Mutfak & Yiyecek",
    words: [
      "Pizza", "Hamburger", "Suşi", "Kebap", "Döner", "Makarna", "Çorba", "Salata", "Baklava", "Künefe",
      "Çay", "Kahve", "Limonata", "Ayran", "Kola", "Ekmek", "Peynir", "Zeytin", "Yumurta", "Sucuk",
      "Bıçak", "Çatal", "Kaşık", "Tabak", "Bardak", "Tencere", "Tava", "Fırın", "Buzdolabı", "Bulaşık Makinesi"
    ]
  },
  {
    category: "Yerler & Mekanlar",
    words: [
      "Okul", "Hastane", "Kütüphane", "Havalimanı", "Otogar", "İstasyon", "Park", "Orman", "Plaj", "Dağ",
      "Otel", "Restoran", "Kafe", "Sinema", "Tiyatro", "Müze", "Cami", "Kilise", "Saray", "Kale",
      "Market", "Alışveriş Merkezi", "Spor Salonu", "Stadyum", "Yüzme Havuzu", "Berber", "Kuaför", "Eczane", "Postane", "Banka"
    ]
  },
  {
    category: "Meslekler",
    words: [
      "Doktor", "Hemşire", "Öğretmen", "Polis", "İtfaiyeci", "Asker", "Pilot", "Kaptan", "Şoför", "Aşçı",
      "Garson", "Mühendis", "Mimar", "Avukat", "Hakim", "Savcı", "Dişçi", "Veteriner", "Çiftçi", "Balıkçı",
      "Yazar", "Ressam", "Müzisyen", "Oyuncu", "Şarkıcı", "Futbolcu", "Basketbolcu", "Hakem", "Antrenör", "Gazeteci"
    ]
  },
  {
    category: "Eşyalar & Teknoloji",
    words: [
      "Telefon", "Bilgisayar", "Tablet", "Televizyon", "Kamera", "Kulaklık", "Saat", "Gözlük", "Çanta", "Cüzdan",
      "Anahtar", "Kalem", "Defter", "Kitap", "Silgi", "Masa", "Sandalye", "Koltuk", "Yatak", "Yastık",
      "Araba", "Otobüs", "Kamyon", "Bisiklet", "Motosiklet", "Uçak", "Helikopter", "Gemi", "Tren", "Metro"
    ]
  },
  {
    category: "Hayvanlar",
    words: [
      "Kedi", "Köpek", "Kuş", "Balık", "At", "Eşek", "İnek", "Koyun", "Keçi", "Tavuk",
      "Aslan", "Kaplan", "Fil", "Zürafa", "Maymun", "Ayı", "Kurt", "Tilki", "Tavşan", "Fare",
      "Yılan", "Timsah", "Kaplumbağa", "Kurbağa", "Kertenkele", "Arı", "Kelebek", "Sinek", "Örümcek", "Karınca"
    ]
  },
  {
    category: "Doğa & Hava Durumu",
    words: [
      "Güneş", "Ay", "Yıldız", "Bulut", "Yağmur", "Kar", "Dolu", "Rüzgar", "Fırtına", "Şimşek",
      "Gökkuşağı", "Sis", "Çiçek", "Ağaç", "Çim", "Toprak", "Kaya", "Kum", "Deniz", "Göl",
      "Nehir", "Şelale", "Yanardağ", "Mağara", "Ada", "Çöl", "Kutup", "Okyanus", "Gezegen", "Uzay"
    ]
  },
  {
    category: "Spor & Hobi",
    words: [
      "Futbol", "Basketbol", "Voleybol", "Tenis", "Yüzme", "Koşu", "Bisiklet", "Kamp", "Balık Tutma", "Satranç",
      "Tavla", "Okey", "İskambil", "Dans", "Resim", "Müzik", "Fotoğrafçılık", "Yemek Yapmak", "Kitap Okumak", "Film İzlemek"
    ]
  },
  {
    category: "Giyim & Aksesuar",
    words: [
      "Gömlek", "Pantolon", "Elbise", "Etek", "Ceket", "Mont", "Kazak", "Tişört", "Şort", "Ayakkabı",
      "Terlik", "Çorap", "Şapka", "Eldiven", "Atkı", "Kemer", "Kravat", "Saat", "Yüzük", "Kolye"
    ]
  }
];

// Flat list for fallback if needed, though we will prioritize the categorized one
export const WORD_LIST = CATEGORIZED_WORDS.flatMap(g => g.words);
