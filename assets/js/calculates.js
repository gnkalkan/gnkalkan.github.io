//Kdv Hesaplaması
function calculateKDV() {
    // Değerleri al
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('taxRate').value);
    const type = document.querySelector('input[name="calcType"]:checked').value;
    //const resultBox = document.getElementById('resultBox');

    // Giriş kontrolü
    if (isNaN(amount) || amount < 0) {
        alert("Lütfen geçerli bir tutar giriniz.");
        return;
    }

    let baseAmount, taxAmount, totalAmount;

    if (type === 'exclusive') {
        // KDV Hariç ise (Tutar + KDV)
        baseAmount = amount;
        taxAmount = amount * (rate / 100);
        totalAmount = baseAmount + taxAmount;
    } else {
        // KDV Dahil ise (Tutarın içinden KDV ayır)
        // Formül: Tutar / (1 + Oran/100)
        baseAmount = amount / (1 + (rate / 100));
        totalAmount = amount;
        taxAmount = totalAmount - baseAmount;
    }

    // Sonuçları yazdır (Para birimi formatı)
    const formatMoney = (num) => {
        return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
    };

    document.getElementById('resBase').innerText = formatMoney(baseAmount);
    document.getElementById('resTax').innerText = formatMoney(taxAmount);
    document.getElementById('resTotal').innerText = formatMoney(totalAmount);

    // Sonuç kutusunu göster
    //resultBox.style.display = 'block';
    document.getElementById('resultBox').classList.remove('d-none');
}

//İskonto Hesaplaması
const formatCurrency = (num) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(num);
};

function calculateDiscount() {
    // Değerleri al
    let price = parseFloat(document.getElementById('price').value);
    let rate = parseFloat(document.getElementById('discountRate').value);

    // Basit validasyon
    if (isNaN(price) || isNaN(rate) || price <= 0 || rate <= 0) {
        alert("Lütfen tüm alanları geçerli ve sıfırdan büyük olacak şekilde doldurun.");
        return;
    }

    // Hesaplama
    let discountAmount = price * (rate / 100);
    let totalAmount = price - discountAmount;

    // Sonuçları yazdır
    document.getElementById('resBase').innerText = formatCurrency(price);
    document.getElementById('resDiscount').innerText = formatCurrency(discountAmount);
    document.getElementById('resTotal').innerText = formatCurrency(totalAmount);

    // Sonuç alanını görünür yapma
    document.getElementById('resultBox').classList.remove('d-none');
}



// Basit Kredi Hesaplaması
function calculatesimpleloan() {
    const tutar = parseFloat(document.getElementById('krediTutari').value);
    const faiz = parseFloat(document.getElementById('faizOrani').value);
    const vade = parseInt(document.getElementById('vade').value);

    // Boş veya hatalı giriş kontrolü
    if (isNaN(tutar) || isNaN(faiz) || isNaN(vade) || tutar <= 0 || faiz <= 0 || vade <= 0) {
        alert("Lütfen tüm alanları geçerli ve sıfırdan büyük olacak şekilde doldurun.");
        return;
    }

    // Standart Kredi Hesaplama Formülü
    const aylikFaiz = faiz / 100;
    // Taksit = Tutar * (Aylık Faiz * (1 + Aylık Faiz)^Vade) / ((1 + Aylık Faiz)^Vade - 1)
    const taksit = tutar * (aylikFaiz * Math.pow(1 + aylikFaiz, vade)) / (Math.pow(1 + aylikFaiz, vade) - 1);
    const toplamOdeme = taksit * vade;
    const toplamFaiz = toplamOdeme - tutar;

    // Sonuçları formatlayarak HTML'e yazdırma
    document.getElementById('aylikTaksit').innerText = taksit.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";
    document.getElementById('toplamOdeme').innerText = toplamOdeme.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";
    document.getElementById('toplamFaiz').innerText = toplamFaiz.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";

    // Sonuç alanını görünür yapma
    document.getElementById('resultBox').classList.remove('d-none');
}


// Mevduat Faizi Hesaplaması
function calculateDepositInterest() {
    // Değerleri al
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('interestRate').value);
    const days = parseInt(document.getElementById('days').value);
    const type = document.querySelector('input[name="calcType"]:checked').value;

    // Giriş kontrolü
    if (isNaN(amount) || amount <= 0 || isNaN(rate) || rate <= 0 || isNaN(days) || days <= 0) {
        alert("Lütfen geçerli değerler giriniz.");
        return;
    }

    // Brüt Faiz Formülü: (Anapara * Faiz Oranı * Vade) / 36500
    let interestAmount = (amount * rate * days) / 36500;

    // Eğer Net seçildiyse Stopaj kesintisi uygula (Türkiye'de 6 aya kadar genelde %7.5 kesinti uygulanır)
    if (type === 'net') {
        interestAmount = interestAmount * 0.925; // %7.5 stopajı çıkarır
    }

    let totalAmount = amount + interestAmount;

    // Sonuçları yazdır (Para birimi formatı)
    const formatMoney = (num) => {
        return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
    };

    document.getElementById('resBase').innerText = formatMoney(amount);
    document.getElementById('resInterest').innerText = formatMoney(interestAmount);
    document.getElementById('resTotal').innerText = formatMoney(totalAmount);

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Kar/Zarar Hesaplaması
function calculateProfitLoss() {
    // Değerleri al
    const cost = parseFloat(document.getElementById('costAmount').value);
    const rate = parseFloat(document.getElementById('rateAmount').value);
    const type = document.querySelector('input[name="calcType"]:checked').value;

    // Giriş kontrolü
    if (isNaN(cost) || cost < 0 || isNaN(rate) || rate < 0) {
        alert("Lütfen geçerli ve pozitif değerler giriniz.");
        return;
    }

    let diffAmount = cost * (rate / 100);
    let totalAmount;
    
    // Etiket ve renk ayarlamaları için elementleri seç
    const lblProfitLoss = document.getElementById('lblProfitLoss');
    const resProfitLoss = document.getElementById('resProfitLoss');

    if (type === 'kar') {
        // Kâr hesaplaması
        totalAmount = cost + diffAmount;
        lblProfitLoss.innerText = "Kâr Tutarı";
        resProfitLoss.className = "fw-bold text-success small"; // Yeşil renk
    } else {
        // Zarar hesaplaması
        totalAmount = cost - diffAmount;
        lblProfitLoss.innerText = "Zarar Tutarı";
        resProfitLoss.className = "fw-bold text-danger small"; // Kırmızı renk
    }

    // Sonuçları yazdır (Para birimi formatı)
    const formatMoney = (num) => {
        return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
    };

    document.getElementById('resCost').innerText = formatMoney(cost);
    document.getElementById('resProfitLoss').innerText = formatMoney(diffAmount);
    document.getElementById('resTotal').innerText = formatMoney(totalAmount);

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Vücut Kitle İndeksi Hesaplaması
function calculateVKI() {
    // Değerleri al
    const heightCm = parseFloat(document.getElementById('heightCm').value);
    const weight = parseFloat(document.getElementById('weightKg').value);

    // Giriş kontrolü
    if (isNaN(heightCm) || heightCm <= 0 || isNaN(weight) || weight <= 0) {
        alert("Lütfen geçerli boy ve kilo değerleri giriniz.");
        return;
    }

    // Boyu metreye çevir ve VKİ hesapla: Kilo / (Boy * Boy)
    const heightM = heightCm / 100;
    const vki = weight / (heightM * heightM);

    // Durum analizi
    let statusText = "";
    let statusClass = ""; // Duruma göre renk verebilmek için sınıf belirliyoruz

    if (vki < 18.5) {
        statusText = "Zayıf";
        statusClass = "text-warning"; // Sarı
    } else if (vki >= 18.5 && vki < 24.9) {
        statusText = "Normal";
        statusClass = "text-success"; // Yeşil
    } else if (vki >= 25 && vki < 29.9) {
        statusText = "Fazla Kilolu";
        statusClass = "text-warning"; // Sarı
    } else if (vki >= 30 && vki < 34.9) {
        statusText = "1. Derece Obez";
        statusClass = "text-danger";  // Kırmızı
    } else {
        statusText = "2. Derece Obez+";
        statusClass = "text-danger";  // Kırmızı
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resHeightWeight').innerText = `${heightCm}cm / ${weight}kg`;
    document.getElementById('resVki').innerText = vki.toFixed(2); // Virgülden sonra 2 hane göster
    
    const resStatus = document.getElementById('resStatus');
    resStatus.innerText = statusText;
    resStatus.className = `fw-bold small ${statusClass}`; // Rengi duruma göre değiştir

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Günlük Su İhtiyacı Hesaplaması
function calculateWater() {
    // Değerleri al
    const weight = parseFloat(document.getElementById('weightKg').value);
    const multiplier = parseInt(document.getElementById('activityLevel').value);

    // Giriş kontrolü
    if (isNaN(weight) || weight <= 0) {
        alert("Lütfen geçerli bir kilo değeri giriniz.");
        return;
    }

    // İhtiyacı hesapla (Kilo * Hareket Katsayısı = Mililitre)
    const totalMl = weight * multiplier;
    
    // Litreye çevir
    const totalLiters = totalMl / 1000;
    
    // 200 ml'lik standart su bardağı sayısını hesapla
    const glasses = Math.ceil(totalMl / 200);

    // Sonuçları DOM'a yazdır
    document.getElementById('resWeight').innerText = `${weight} kg`;
    document.getElementById('resWater').innerText = `${totalLiters.toFixed(2)} Litre`;
    document.getElementById('resGlasses').innerText = `~${glasses} Bardak`; 

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Bazal Metabolizma Hızı (BMH) Hesaplaması
function calculateBMH() {
    // Değerleri al
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('heightCm').value);
    const weight = parseFloat(document.getElementById('weightKg').value);

    // Giriş kontrolü
    if (isNaN(age) || age <= 0 || isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
        alert("Lütfen yaş, boy ve kilo için geçerli değerler giriniz.");
        return;
    }

    // Mifflin-St Jeor Formülü
    // Temel hesaplama: (10 x kilo) + (6.25 x boy) - (5 x yaş)
    let bmh = (10 * weight) + (6.25 * height) - (5 * age);

    // Cinsiyet çarpanı eklemesi
    if (gender === 'male') {
        bmh += 5; // Erkekler için +5
    } else {
        bmh -= 161; // Kadınlar için -161
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resProfile').innerText = `${age} Yaş / ${height}cm`;
    document.getElementById('resGender').innerText = gender === 'male' ? 'Erkek' : 'Kadın';
    document.getElementById('resBmh').innerText = `${Math.round(bmh)} kcal`; // Küsuratı yuvarlıyoruz

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Bel / Kalça Oranı (WHR) Hesaplaması
function calculateBKO() {
    // Değerleri al
    const gender = document.querySelector('input[name="bkoGender"]:checked').value;
    const waist = parseFloat(document.getElementById('waistCm').value);
    const hip = parseFloat(document.getElementById('hipCm').value);

    // Giriş kontrolü
    if (isNaN(waist) || waist <= 0 || isNaN(hip) || hip <= 0) {
        alert("Lütfen bel ve kalça için geçerli değerler giriniz.");
        return;
    }

    // Oranı hesapla
    const ratio = waist / hip;

    // Dünya Sağlık Örgütü (WHO) standartlarına göre risk analizi
    let riskText = "";
    let riskClass = "";

    if (gender === 'male') {
        if (ratio < 0.90) {
            riskText = "Düşük Risk";
            riskClass = "text-success"; // Yeşil
        } else if (ratio >= 0.90 && ratio <= 0.99) {
            riskText = "Orta Risk";
            riskClass = "text-warning"; // Sarı
        } else {
            riskText = "Yüksek Risk";
            riskClass = "text-danger"; // Kırmızı
        }
    } else {
        // Kadınlar için standartlar
        if (ratio < 0.80) {
            riskText = "Düşük Risk";
            riskClass = "text-success"; // Yeşil
        } else if (ratio >= 0.80 && ratio <= 0.84) {
            riskText = "Orta Risk";
            riskClass = "text-warning"; // Sarı
        } else {
            riskText = "Yüksek Risk";
            riskClass = "text-danger"; // Kırmızı
        }
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resMeasurements').innerText = `${waist} / ${hip} cm`;
    document.getElementById('resRatio').innerText = ratio.toFixed(2);
    
    const resRisk = document.getElementById('resRisk');
    resRisk.innerText = riskText;
    resRisk.className = `fw-bold small ${riskClass}`;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// İdeal Kilo Hesaplaması (Devine Formülü)
function calculateIdealWeight() {
    // Değerleri al
    const gender = document.querySelector('input[name="ikGender"]:checked').value;
    const height = parseFloat(document.getElementById('heightCm').value);
    const currentWeight = parseFloat(document.getElementById('currentWeight').value);

    // Giriş kontrolü
    if (isNaN(height) || height <= 0 || isNaN(currentWeight) || currentWeight <= 0) {
        alert("Lütfen boy ve kilo için geçerli değerler giriniz.");
        return;
    }

    let idealWeight = 0;

    // Devine Formülü
    // Erkekler: 50 kg + 2.3 kg * (her inç 5 feet üzeri)
    // Kadınlar: 45.5 kg + 2.3 kg * (her inç 5 feet üzeri)
    // 5 feet = 152.4 cm. Formülü santimetreye uyarlıyoruz:
    if (gender === 'male') {
        idealWeight = 50 + 0.91 * (height - 152.4);
    } else {
        idealWeight = 45.5 + 0.91 * (height - 152.4);
    }

    // Sonucu yuvarla (Örn: 70.5)
    idealWeight = parseFloat(idealWeight.toFixed(1));

    // Farkı hesapla ve durumu belirle
    const diff = currentWeight - idealWeight;
    const resGoal = document.getElementById('resGoal');

    if (Math.abs(diff) <= 1) {
        // +- 1 kg farkı "ideal" olarak kabul edebiliriz
        resGoal.innerText = "İdealsiniz!";
        resGoal.className = "fw-bold text-success small";
    } else if (diff > 0) {
        // Kilo vermeli
        resGoal.innerText = `${diff.toFixed(1)} kg verilmeli`;
        resGoal.className = "fw-bold text-danger small";
    } else {
        // Kilo almalı
        resGoal.innerText = `${Math.abs(diff).toFixed(1)} kg alınmalı`;
        resGoal.className = "fw-bold text-warning small";
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resIdealWeight').innerText = `${idealWeight} kg`;
    document.getElementById('resCurrentWeight').innerText = `${currentWeight} kg`;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Yakıt Tüketimi Hesaplaması
function calculateFuelConsumption() {
    const distance = parseFloat(document.getElementById('distanceKm').value);
    const consumption = parseFloat(document.getElementById('consumptionRate').value);
    const price = parseFloat(document.getElementById('fuelPrice').value);
    
    // Giriş kontrolü
    if (isNaN(distance) || distance <= 0 || isNaN(consumption) || consumption <= 0 || isNaN(price) || price <= 0) {
        alert("Lütfen tüm alanlara sıfırdan büyük geçerli sayılar giriniz.");
        return;
    }

    // Toplam harcanacak yakıt (Litre) = (Mesafe * 100 km'deki tüketim) / 100
    const totalLiters = (distance * consumption) / 100;
    
    // Toplam maliyet (₺) = Toplam Litre * Litre Fiyatı
    const totalCost = totalLiters * price;

    // Kilometre başına düşen maliyet (₺) = Toplam Maliyet / Toplam Mesafe
    const costPerKm = totalCost / distance;

    // Para ve sayı birimi formatlayıcı (Virgülden sonra 2 hane)
    const formatNumber = (num) => {
        return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Sonuçları DOM'a yazdır
    document.getElementById('resTotalLiters').innerText = formatNumber(totalLiters) + " L";
    document.getElementById('resCostPerKm').innerText = formatNumber(costPerKm) + " ₺";
    document.getElementById('resTotalCost').innerText = formatNumber(totalCost) + " ₺";

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Bahşiş ve Hesap Bölme İşlemi
function calculateBahsis() {
    const bill = parseFloat(document.getElementById('billAmount').value);
    const tipRate = parseFloat(document.getElementById('tipRate').value);
    const people = parseInt(document.getElementById('peopleCount').value);
    
    // Giriş kontrolü
    if (isNaN(bill) || bill <= 0 || isNaN(tipRate) || tipRate < 0 || isNaN(people) || people < 1) {
        alert("Lütfen tüm alanlara sıfırdan büyük geçerli sayılar giriniz. (Kişi sayısı en az 1 olmalıdır)");
        return;
    }

    // Toplam Bahşişi Hesapla
    const totalTip = bill * (tipRate / 100);
    
    // Genel Toplamı Hesapla (Hesap + Bahşiş)
    const grandTotal = bill + totalTip;

    // Kişi Başına Düşen Tutarı Hesapla
    const perPerson = grandTotal / people;

    // Para birimi formatlayıcı (Virgülden sonra 2 hane)
    const formatNumber = (num) => {
        return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
    };

    // Sonuçları DOM'a yazdır
    document.getElementById('resTip').innerText = formatNumber(totalTip);
    document.getElementById('resPerPerson').innerText = formatNumber(perPerson);
    document.getElementById('resTotal').innerText = formatNumber(grandTotal);

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Şifre Oluşturucu
// Seçime göre input alanlarını göster/gizle
function toggleInputFields() {
    const isCustom = document.getElementById('typeCustom').checked;
    const lengthDiv = document.getElementById('lengthDiv');
    const customTextDiv = document.getElementById('customTextDiv');
    const customTextInput = document.getElementById('customText');

    if (isCustom) {
        lengthDiv.classList.add('d-none');
        customTextDiv.classList.remove('d-none');
        // Kendi metnini girdiğinde boş geçilmesini engellemek için required ekleyelim
        customTextInput.required = true; 
    } else {
        lengthDiv.classList.remove('d-none');
        customTextDiv.classList.add('d-none');
        customTextInput.required = false;
    }
}

// Şifre ve Kriptografi Hesaplaması
async function calculatePassword() {
    const inputType = document.querySelector('input[name="inputType"]:checked').value;
    const algo = document.getElementById('cryptoAlgo').value;
    
    let plainText = "";

    // 1. Düz Metni Belirleme (Kullanıcı Girişi veya Rastgele Üretim)
    if (inputType === 'random') {
        const length = parseInt(document.getElementById('pwdLength').value);
        if (isNaN(length) || length < 4 || length > 64) {
            alert("Lütfen 4 ile 64 arasında geçerli bir uzunluk giriniz.");
            return;
        }
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        for (let i = 0; i < length; i++) {
            plainText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } else {
        plainText = document.getElementById('customText').value;
        if (!plainText.trim()) {
            alert("Lütfen şifrelenecek metni giriniz.");
            return;
        }
    }

    let cipherText = "";
    let algoName = "";

    // 2. Seçilen Algoritmaya Göre Şifreleme İşlemleri
    if (algo === "base64") {
        algoName = "Base64";
        // Türkçe/Unicode karakter hatalarını önlemek için güvenli Base64 kodlaması
        cipherText = btoa(unescape(encodeURIComponent(plainText)));
        
    } else if (algo === "rot13") {
        algoName = "Sezar (ROT13)";
        // Harfleri alfabede 13 adım kaydıran meşhur antik şifreleme algoritması
        cipherText = plainText.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        
    } else if (algo === "hex") {
        algoName = "Hexadecimal";
        // Karakterleri 16'lık sayı sistemine (Hex) dönüştürme
        cipherText = Array.from(plainText).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
        
    } else if (algo === "sha256") {
        algoName = "SHA-256";
        // Web Crypto API kullanarak modern, güvenli ve tek yönlü kriptografik özet (Hash) çıkarma
        const msgBuffer = new TextEncoder().encode(plainText);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        cipherText = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resPlain').innerText = plainText;
    document.getElementById('resAlgoName').innerText = algoName;
    document.getElementById('resCipher').innerText = cipherText;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}


// Yüzde Hesaplaması
function calculatePercentage() {
    // Değerleri al
    const base = parseFloat(document.getElementById('baseNumber').value);
    const rate = parseFloat(document.getElementById('percentageRate').value);
    const type = document.querySelector('input[name="yuzdeType"]:checked').value;

    // Giriş kontrolü
    if (isNaN(base) || isNaN(rate) || rate < 0) {
        alert("Lütfen geçerli sayılar giriniz.");
        return;
    }

    // Yüzde miktarını hesapla
    const amount = base * (rate / 100);
    let total = 0;
    
    // Etiket ve renk ayarlamaları için elementleri seç
    const lblAmount = document.getElementById('lblAmount');
    const resAmount = document.getElementById('resAmount');

    // İşlem türüne göre sonuç belirle
    if (type === 'find') {
        total = amount;
        lblAmount.innerText = "Yüzde Karşılığı";
        resAmount.className = "fw-bold text-info small"; // Mavi
    } else if (type === 'add') {
        total = base + amount;
        lblAmount.innerText = "Artış Miktarı";
        resAmount.className = "fw-bold text-success small"; // Yeşil
    } else if (type === 'sub') {
        total = base - amount;
        lblAmount.innerText = "İndirim Miktarı";
        resAmount.className = "fw-bold text-danger small"; // Kırmızı
    }

    // Sonuçları yazdır (Eğer tam sayıysa virgülsüz, küsuratlıysa 2 hane göster)
    const formatNum = (num) => {
        return Number.isInteger(num) ? num.toString() : num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    document.getElementById('resBase').innerText = formatNum(base);
    document.getElementById('resAmount').innerText = formatNum(amount);
    document.getElementById('resTotal').innerText = formatNum(total);

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Alan ve Çevre Hesaplaması
// Şekil seçimine göre 2. input'u açma/kapatma
function toggleInputs() {
    const shape = document.getElementById('shapeSelect').value;
    const val2 = document.getElementById('val2');
    const lblVal2 = document.getElementById('lblVal2');
    
    if (shape === 'dikdortgen') {
        val2.disabled = false;
        val2.placeholder = "Örn: 20";
        lblVal2.classList.remove('text-muted');
    } else {
        val2.disabled = true;
        val2.value = "";
        val2.placeholder = "Gerekli değil";
        lblVal2.classList.add('text-muted');
    }
}

function calculateAreaPerimeter() {
    // Değerleri al
    const shape = document.getElementById('shapeSelect').value;
    const val1 = parseFloat(document.getElementById('val1').value);
    const val2 = parseFloat(document.getElementById('val2').value);

    // Giriş kontrolü
    if (isNaN(val1) || val1 <= 0) {
        alert("Lütfen 1. değer için geçerli bir pozitif sayı giriniz.");
        return;
    }
    if (shape === 'dikdortgen' && (isNaN(val2) || val2 <= 0)) {
        alert("Dikdörtgen için lütfen 2. kenar uzunluğunu da giriniz.");
        return;
    }

    let perimeter = 0;
    let area = 0;
    let shapeName = "";

    // Matematiksel Hesaplamalar
    if (shape === 'kare') {
        shapeName = "Kare";
        perimeter = 4 * val1;
        area = val1 * val1;
    } else if (shape === 'dikdortgen') {
        shapeName = "Dikdörtgen";
        perimeter = 2 * (val1 + val2);
        area = val1 * val2;
    } else if (shape === 'daire') {
        shapeName = "Daire";
        // Çevre = 2 * π * r, Alan = π * r²
        perimeter = 2 * Math.PI * val1;
        area = Math.PI * val1 * val1;
    }

    // Sonuçları formatla (Maksimum 2 küsurat)
    const formatNum = (num) => parseFloat(num.toFixed(2));

    document.getElementById('resShape').innerText = shapeName;
    document.getElementById('resPerimeter').innerText = formatNum(perimeter) + " cm";
    document.getElementById('resArea').innerText = formatNum(area) + " cm²";

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// EBOB ve EKOK Hesaplaması
function calculateEbobEkok() {
    // Değerleri al ve tam sayıya çevir
    let num1 = parseInt(document.getElementById('num1').value);
    let num2 = parseInt(document.getElementById('num2').value);

    // Giriş kontrolü (Negatif veya sıfır olmamalı)
    if (isNaN(num1) || num1 <= 0 || isNaN(num2) || num2 <= 0) {
        alert("Lütfen geçerli pozitif tam sayılar giriniz.");
        return;
    }

    // EBOB Hesaplama Fonksiyonu (Öklid Algoritması)
    const calculateGCD = (a, b) => {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    // EBOB'u bul
    const ebob = calculateGCD(num1, num2);
    
    // EKOK'u bul -> Formül: (Sayı1 * Sayı2) / EBOB
    const ekok = (num1 * num2) / ebob;

    // Sonuçları DOM'a yazdır
    document.getElementById('resNumbers').innerText = `${num1} ve ${num2}`;
    document.getElementById('resEbob').innerText = ebob;
    document.getElementById('resEkok').innerText = ekok;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}


// Faktöriyel Hesaplaması
function calculateFaktoriyel() {
    const numInput = document.getElementById('numInput').value;
    const num = parseInt(numInput);

    // Giriş kontrolü
    if (isNaN(num) || num < 0) {
        alert("Lütfen 0 veya daha büyük bir pozitif tam sayı giriniz.");
        return;
    }

    // Sistemin kilitlenmemesi için bir sınır belirleyelim (Örn: 1000)
    if (num > 1000) {
        alert("Tarayıcınızın yorulmaması için lütfen en fazla 1000'e kadar bir sayı giriniz.");
        return;
    }

    // Matematiksel Hesaplama (Çok büyük sayılar için BigInt kullanıyoruz)
    let fact = 1n;
    for (let i = 2n; i <= BigInt(num); i++) {
        fact *= i;
    }

    // Sonucu String'e çevirelim
    let resultStr = fact.toString();
    let displayStr = "";

    // Eğer sonuç 20 basamaktan uzunsa, ekrana sığması için bilimsel formata dönüştürelim
    if (resultStr.length > 20) {
        const exponent = resultStr.length - 1;
        // İlk 1 rakam, virgül ve sonraki 4 rakamı al
        const mantissa = resultStr.substring(0, 1) + "," + resultStr.substring(1, 5);
        displayStr = mantissa + "e+" + exponent;
    } else {
        // Sonuç küçükse sayıların arasına nokta koyarak daha okunaklı yapalım (Örn: 3.628.800)
        displayStr = resultStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resNumber').innerText = num;
    document.getElementById('resNotation').innerText = num + "!";
    document.getElementById('resFactorial').innerText = displayStr;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Rastgele Sayı Üretme Fonksiyonu
function generateRandom() {
    // Değerleri al ve tam sayıya çevir
    const min = parseInt(document.getElementById('minNum').value);
    const max = parseInt(document.getElementById('maxNum').value);
    const count = parseInt(document.getElementById('numCount').value);

    // Giriş kontrolü
    if (isNaN(min) || isNaN(max) || isNaN(count)) {
        alert("Lütfen tüm alanlara geçerli sayılar giriniz.");
        return;
    }

    if (min >= max) {
        alert("Alt sınır, üst sınırdan küçük olmalıdır.");
        return;
    }

    if (count < 1 || count > 50) {
        alert("Lütfen 1 ile 50 arasında bir adet giriniz.");
        return;
    }

    // Rastgele sayıları tutacağımız dizi
    let randomNumbers = [];

    // İstenen adet kadar rastgele sayı üret
    for (let i = 0; i < count; i++) {
        // Math.random() ile min ve max(dahil) arasında sayı üretme formülü
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(randomNum);
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resRange').innerText = `${min} - ${max}`;
    document.getElementById('resCount').innerText = count;
    
    // Dizideki sayıları aralarına virgül ve boşluk koyarak metne çevir
    document.getElementById('resResult').innerText = randomNumbers.join(', ');

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Yaş Hesaplaması
function calculateAge() {
    const birthInput = document.getElementById('birthDate').value;
    
    // Giriş kontrolü
    if (!birthInput) {
        alert("Lütfen geçerli bir doğum tarihi seçiniz.");
        return;
    }

    const birthDate = new Date(birthInput);
    const today = new Date(); // Bugünün tarihi

    // Gelecek tarih seçimi kontrolü
    if (birthDate > today) {
        alert("Doğum tarihi bugünden ileri bir tarih olamaz.");
        return;
    }

    // Yıl, ay ve gün farklarını bul
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Gün eksi çıkarsa, bir önceki aydan gün al
    if (days < 0) {
        months--;
        // Bir önceki ayın toplam gün sayısını bul
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Ay eksi çıkarsa, yıldan bir ay al
    if (months < 0) {
        years--;
        months += 12;
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resYears').innerText = years + " Yıl";
    document.getElementById('resMonths').innerText = months + " Ay";
    document.getElementById('resDays').innerText = days + " Gün";

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// İki Tarih Arası Gün Farkı Hesaplaması
function calculateDateDifference() {
    const startInput = document.getElementById('startDate').value;
    const endInput = document.getElementById('endDate').value;
    
    // Giriş kontrolü
    if (!startInput || !endInput) {
        alert("Lütfen her iki tarihi de seçiniz.");
        return;
    }

    const startDate = new Date(startInput);
    const endDate = new Date(endInput);

    // Saat farklılıklarından doğabilecek küsuratları önlemek için saatleri gece yarısına sıfırlıyoruz
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // İki tarih arasındaki zaman farkını milisaniye cinsinden mutlak değer (Math.abs) ile al
    // Böylece kullanıcı önce bitişi, sonra başlangıcı seçse bile eksi (-) sonuç çıkmaz
    const diffTime = Math.abs(endDate - startDate);
    
    // Milisaniyeyi güne çevir: 1000 ms * 60 sn * 60 dk * 24 saat
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Tarihleri Türkiye formatında (GG.AA.YYYY) yazdırmak için yardımcı fonksiyon
    const formatDate = (dateObj) => {
        return dateObj.toLocaleDateString('tr-TR');
    };

    // Sonuçları DOM'a yazdır
    document.getElementById('resStart').innerText = formatDate(startDate);
    document.getElementById('resEnd').innerText = formatDate(endDate);
    document.getElementById('resDiff').innerText = diffDays + " Gün";

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Hangi Gün Doğdun Hesaplaması
function calculateBirthDay() {
    const dateInput = document.getElementById('birthDate').value;
    
    // Giriş kontrolü
    if (!dateInput) {
        alert("Lütfen geçerli bir tarih seçiniz.");
        return;
    }

    const targetDate = new Date(dateInput);

    // Gün isimlerini Türkçe olarak bir diziye alıyoruz
    // getDay() fonksiyonu Pazar için 0, Pazartesi için 1... Cumartesi için 6 döndürür
    const gunler = [
        "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"
    ];

    // Haftanın kaçıncı günü olduğunu bul (0-6 arası)
    const dayIndex = targetDate.getDay();
    const dayName = gunler[dayIndex];

    // Hafta içi mi hafta sonu mu olduğunu belirle
    let dayType = "";
    let dayClass = "";
    
    if (dayIndex === 0 || dayIndex === 6) {
        dayType = "Hafta Sonu";
        dayClass = "text-success"; // Hafta sonu için yeşil
    } else {
        dayType = "Hafta İçi";
        dayClass = "text-warning"; // Hafta içi için sarı/turuncu
    }

    // Tarihi Türkiye formatında (GG.AA.YYYY) yazdırmak için
    const formattedDate = targetDate.toLocaleDateString('tr-TR');

    // Sonuçları DOM'a yazdır
    document.getElementById('resDate').innerText = formattedDate;
    document.getElementById('resDayName').innerText = dayName;
    
    const resDayType = document.getElementById('resDayType');
    resDayType.innerText = dayType;
    resDayType.className = `fw-bold small ${dayClass}`;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Şafak / Geri Sayım Hesaplaması
function calculateDaysUntil() {
    const targetInput = document.getElementById('targetDate').value;
    
    // Giriş kontrolü
    if (!targetInput) {
        alert("Lütfen bir hedef tarih seçiniz.");
        return;
    }

    const targetDate = new Date(targetInput);
    const today = new Date();

    // Saat farklılıklarından doğabilecek hataları önlemek için saatleri gece yarısına sıfırlıyoruz
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Milisaniye cinsinden farkı bul ve güne çevir
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let statusText = "";
    let statusClass = "";
    let daysText = diffDays + " Gün";

    // Kalan gün sayısına göre durum belirleme
    if (diffDays < 0) {
        statusText = "Süre Doldu!";
        statusClass = "text-danger"; // Kırmızı
        daysText = "Bitti";
    } else if (diffDays === 0) {
        statusText = "Doğan Güneş!";
        statusClass = "text-success"; // Yeşil
        daysText = "0 Gün";
    } else if (diffDays > 0 && diffDays <= 81) {
        statusText = "Plakalardayız!";
        statusClass = "text-info"; // Mavi
    } else {
        statusText = "Sabır...";
        statusClass = "text-warning"; // Sarı
    }

    // Tarihi Türkiye formatında (GG.AA.YYYY) yazdırmak için
    const formattedDate = targetDate.toLocaleDateString('tr-TR');

    // Sonuçları DOM'a yazdır
    document.getElementById('resTargetDate').innerText = formattedDate;
    document.getElementById('resDaysLeft').innerText = daysText;
    
    const resStatus = document.getElementById('resStatus');
    resStatus.innerText = statusText;
    resStatus.className = `fw-bold small ${statusClass}`;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Burç Hesaplaması
function calculateZodiac() {
    const dateInput = document.getElementById('birthDate').value;
    
    // Giriş kontrolü
    if (!dateInput) {
        alert("Lütfen geçerli bir doğum tarihi seçiniz.");
        return;
    }

    const targetDate = new Date(dateInput);
    const day = targetDate.getDate();
    const month = targetDate.getMonth() + 1; // getMonth() 0-11 arası döndüğü için 1 ekliyoruz

    let zodiac = "";
    let element = "";
    let elementClass = "";

    // Burç Tarihleri ve Elementleri
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        zodiac = "Koç"; element = "Ateş"; elementClass = "text-danger";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        zodiac = "Boğa"; element = "Toprak"; elementClass = "text-success";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        zodiac = "İkizler"; element = "Hava"; elementClass = "text-info";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        zodiac = "Yengeç"; element = "Su"; elementClass = "text-primary";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        zodiac = "Aslan"; element = "Ateş"; elementClass = "text-danger";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        zodiac = "Başak"; element = "Toprak"; elementClass = "text-success";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        zodiac = "Terazi"; element = "Hava"; elementClass = "text-info";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        zodiac = "Akrep"; element = "Su"; elementClass = "text-primary";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        zodiac = "Yay"; element = "Ateş"; elementClass = "text-danger";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        zodiac = "Oğlak"; element = "Toprak"; elementClass = "text-success";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        zodiac = "Kova"; element = "Hava"; elementClass = "text-info";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        zodiac = "Balık"; element = "Su"; elementClass = "text-primary";
    }

    // Ay isimlerini Türkçe yazdırmak için dizi
    const aylar = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const formattedDate = `${day} ${aylar[month]}`;

    // Sonuçları DOM'a yazdır
    document.getElementById('resDate').innerText = formattedDate;
    document.getElementById('resZodiac').innerText = zodiac;
    
    const resElement = document.getElementById('resElement');
    resElement.innerText = element;
    resElement.className = `fw-bold small ${elementClass}`; // Elementin rengini ayarla

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Yükselen Burç Hesaplaması
function calculateRisingZodiac() {
    const dateInput = document.getElementById('birthDate').value;
    const timeInput = document.getElementById('birthTime').value;
    
    // Giriş kontrolü
    if (!dateInput || !timeInput) {
        alert("Lütfen doğum tarihinizi ve saatinizi eksiksiz giriniz.");
        return;
    }

    const targetDate = new Date(dateInput);
    const day = targetDate.getDate();
    const month = targetDate.getMonth() + 1; // 1-12 arası

    // Doğum saatinin sadece saat kısmını alıyoruz (0-23)
    const birthHour = parseInt(timeInput.split(':')[0]);

    // Burçlar ve Yönetici Gezegenleri Dizi Sıralaması (Ateş, Toprak, Hava, Su döngüsü)
    const zodiacs = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
    const planets = ["Mars", "Venüs", "Merkür", "Ay", "Güneş", "Merkür", "Venüs", "Plüton (Mars)", "Jüpiter", "Satürn", "Uranüs (Satürn)", "Neptün (Jüpiter)"];

    let sunIndex = 0;

    // Önce Güneş Burcunun İndeksini Bul (0'dan 11'e kadar)
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunIndex = 0; // Koç
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunIndex = 1; // Boğa
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunIndex = 2; // İkizler
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunIndex = 3; // Yengeç
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunIndex = 4; // Aslan
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunIndex = 5; // Başak
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunIndex = 6; // Terazi
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunIndex = 7; // Akrep
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunIndex = 8; // Yay
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunIndex = 9; // Oğlak
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunIndex = 10; // Kova
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sunIndex = 11; // Balık

    // Yükselen Burç Yaklaşım Algoritması (2 Saat Kuralı)
    // Sabah 06:00'da Güneş burcu ufuktadır. Her 2 saatte bir burç değişir.
    // Formül: (Güneş İndeksi + (Saat / 2'nin tam kısmı) - 3 + 12) % 12
    const ascendantOffset = Math.floor(birthHour / 2) - 3; 
    let ascIndex = (sunIndex + ascendantOffset) % 12;
    
    // Negatif indeks çıkarsa 12 ekleyerek döngüyü düzelt
    if (ascIndex < 0) {
        ascIndex += 12;
    }

    // Sonuçları DOM'a yazdır
    document.getElementById('resSun').innerText = zodiacs[sunIndex];
    document.getElementById('resAscendant').innerText = zodiacs[ascIndex];
    document.getElementById('resPlanet').innerText = planets[ascIndex];

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Veri Boyutu Çevirme İşlemi
function calculateDataSize() {
    const amount = parseFloat(document.getElementById('dataAmount').value);
    const fromUnitVal = parseInt(document.getElementById('fromUnit').value);
    const toUnitVal = parseInt(document.getElementById('toUnit').value);

    // Giriş kontrolü
    if (isNaN(amount) || amount < 0) {
        alert("Lütfen sıfırdan büyük geçerli bir miktar giriniz.");
        return;
    }

    // Birim isimleri dizisi (Seçilen value değerine karşılık gelen isimler)
    const unitNames = ["Byte", "KB", "MB", "GB", "TB"];

    // Matematiksel Hesaplama (Taban: 1024)
    // Üs farkını alıp 1024'ün o kuvvetiyle çarpıyoruz
    const exponentDiff = fromUnitVal - toUnitVal;
    let result = amount * Math.pow(1024, exponentDiff);

    // Sonucu formatlama (Çok uzun küsuratları engellemek için)
    let displayResult = "";
    
    // Eğer sonuç tam sayıysa düz yazdır, değilse maksimum 6 hane küsurat gösterip gereksiz sıfırları at
    if (Number.isInteger(result)) {
        displayResult = result.toString();
    } else {
        // parseFloat ve toFixed birleşimi gereksiz sıfırları siler (Örn: 1.5000 -> 1.5)
        // Çok küçük veya çok büyük sayılar için bilimsel formatı önlemek adına 6 basamak ideal
        if(result < 0.000001) {
             displayResult = result.toExponential(2); // Çok küçükse bilimsel göster
        } else {
             displayResult = parseFloat(result.toFixed(6)).toString(); 
        }
    }

    // Girdi metnini oluştur
    const inputText = `${amount} ${unitNames[fromUnitVal]}`;
    const targetUnitText = unitNames[toUnitVal];

    // Sonuçları DOM'a yazdır
    document.getElementById('resInput').innerText = inputText;
    document.getElementById('resTargetUnit').innerText = targetUnitText;
    document.getElementById('resOutput').innerText = `${displayResult} ${targetUnitText}`;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Ağırlık Çevirme İşlemi
function calculateWeightConvert() {
    const amount = parseFloat(document.getElementById('weightAmount').value);
    const fromUnit = document.getElementById('fromWeight').value;
    const toUnit = document.getElementById('toWeight').value;

    // Giriş kontrolü
    if (isNaN(amount) || amount < 0) {
        alert("Lütfen sıfırdan büyük geçerli bir miktar giriniz.");
        return;
    }

    // Birimlerin Gram (g) cinsinden karşılıkları (Dönüşüm Çarpanları)
    const rates = {
        "mg": 0.001,
        "g": 1,
        "kg": 1000,
        "ton": 1000000,
        "lb": 453.59237,        // 1 Pound (Libre) yaklaşık 453.59 gram
        "oz": 28.349523125      // 1 Ounce (Ons) yaklaşık 28.35 gram
    };

    // Birimlerin kısa isimleri (Ekrana yazdırmak için)
    const unitNames = {
        "mg": "mg",
        "g": "g",
        "kg": "kg",
        "ton": "ton",
        "lb": "lb",
        "oz": "oz"
    };

    // 1. Adım: Girilen değeri baz birime (gram) çevir
    const amountInGrams = amount * rates[fromUnit];

    // 2. Adım: Gram cinsindeki değeri hedef birime bölerek sonucu bul
    let result = amountInGrams / rates[toUnit];

    // Sonucu formatlama (Çok uzun küsuratları engellemek için, maksimum 6 basamak ve gereksiz sıfırları atma)
    let displayResult = "";
    if (Number.isInteger(result)) {
        displayResult = result.toString();
    } else {
        if(result > 0 && result < 0.000001) {
             displayResult = result.toExponential(2); 
        } else {
             displayResult = parseFloat(result.toFixed(6)).toString(); 
        }
    }

    // Ekrana yazılacak metinleri hazırla
    const inputText = `${amount} ${unitNames[fromUnit]}`;
    const targetUnitText = unitNames[toUnit];
    const outputText = `${displayResult} ${targetUnitText}`;

    // Sonuçları DOM'a yazdır
    document.getElementById('resInput').innerText = inputText;
    document.getElementById('resTargetUnit').innerText = targetUnitText;
    document.getElementById('resOutput').innerText = outputText;

    // Sonuç kutusunu göster
    document.getElementById('resultBox').classList.remove('d-none');
}

// Uzunluk Çevirme İşlemi
function calculateLengthConvert() {
    const amount = parseFloat(document.getElementById('lengthAmount').value);
    const fromUnit = document.getElementById('fromLength').value;
    const toUnit = document.getElementById('toLength').value;

    // Giriş kontrolü
    if (isNaN(amount) || amount < 0) {
        alert("Lütfen geçerli bir miktar giriniz.");
        return;
    }

    // Birimlerin Metre (m) cinsinden karşılıkları
    const rates = {
        "mm": 0.001,
        "cm": 0.01,
        "m": 1,
        "km": 1000,
        "in": 0.0254,           // 1 İnç = 0.0254 metre
        "ft": 0.3048,           // 1 Ayak = 0.3048 metre
        "yd": 0.9144,           // 1 Yarda = 0.9144 metre
        "mi": 1609.344,         // 1 Kara Mili = ~1.6 km
        "nmi": 1852             // 1 Deniz Mili = 1.852 metre
    };

    const unitNames = {
        "mm": "mm", "cm": "cm", "m": "m", "km": "km", 
        "in": "in", "ft": "ft", "yd": "yd", "mi": "mi", "nmi": "nmi"
    };

    // 1. Adım: Baz birime (Metre) çevir
    const amountInMeters = amount * rates[fromUnit];

    // 2. Adım: Hedef birime çevir
    let result = amountInMeters / rates[toUnit];

    // Sayı formatlama
    let displayResult = "";
    if (Number.isInteger(result)) {
        displayResult = result.toString();
    } else {
        // Çok küçük veya çok büyük sayılar için düzenleme
        if (result > 0 && result < 0.000001) {
            displayResult = result.toExponential(4);
        } else {
            displayResult = parseFloat(result.toFixed(6)).toString();
        }
    }

    // Sonuçları yazdır
    document.getElementById('resInput').innerText = `${amount} ${unitNames[fromUnit]}`;
    document.getElementById('resTargetUnit').innerText = unitNames[toUnit];
    document.getElementById('resOutput').innerText = `${displayResult} ${unitNames[toUnit]}`;

    document.getElementById('resultBox').classList.remove('d-none');
}

// Sıcaklık Çevirme İşlemi
function calculateTempConvert() {
    const temp = parseFloat(document.getElementById('tempAmount').value);
    const fromUnit = document.getElementById('fromTemp').value;
    const toUnit = document.getElementById('toTemp').value;

    if (isNaN(temp)) {
        alert("Lütfen geçerli bir sayı giriniz.");
        return;
    }

    let result;
    let celsius;

    // 1. Adım: Her şeyi önce Celsius'a çevir (Ortak Payda)
    if (fromUnit === "C") {
        celsius = temp;
    } else if (fromUnit === "F") {
        celsius = (temp - 32) * 5 / 9;
    } else if (fromUnit === "K") {
        celsius = temp - 273.15;
    }

    // 2. Adım: Celsius'tan hedef birime çevir
    if (toUnit === "C") {
        result = celsius;
    } else if (toUnit === "F") {
        result = (celsius * 9 / 5) + 32;
    } else if (toUnit === "K") {
        result = celsius + 273.15;
    }

    // Birim sembollerini ayarla
    const symbols = { "C": "°C", "F": "°F", "K": "K" };

    // Formatlama
    let displayResult = parseFloat(result.toFixed(2)).toString();

    // Sonuçları yazdır
    document.getElementById('resInput').innerText = `${temp}${symbols[fromUnit]}`;
    document.getElementById('resTargetUnit').innerText = symbols[toUnit];
    document.getElementById('resOutput').innerText = `${displayResult}${symbols[toUnit]}`;

    document.getElementById('resultBox').classList.remove('d-none');
}




