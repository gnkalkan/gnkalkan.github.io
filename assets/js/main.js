async function loadPage(pageName) {
            const contentDiv = document.getElementById('content-area');

            try {
                // 2. İlgili html dosyasını çağır (örn: anasayfa.html)
                const response = await fetch(`Content/${pageName}.html`);
                //console.log(response);
                // 3. Eğer dosya bulunamazsa hata fırlat
                if (!response.ok) {
                    throw new Error('Sayfa bulunamadı (404)');
                }

                // 4. Gelen cevabı metne çevir (HTML kodunu al)
                const html = await response.text();

                // 5. İçeriği ekrana bas
                contentDiv.innerHTML = html;

                // 6. Aktif menü butonunu güncelle
                //updateActiveLink(pageName);

            } catch (error) {
                console.error('Hata:', error);
                contentDiv.innerHTML = `<h1>Hata!</h1><p>İçerik yüklenemedi. Lütfen sunucuda çalıştığınızdan emin olun.</p>`;
            }
        }

async function resetForm() {
        // Sayfadaki TÜM formları (kdvForm, discountForm, krediForm vb.) temizler
        document.querySelectorAll('form').forEach(form => form.reset());

        // İçinde tutar yazan tüm metin alanlarını varsayılan değerine döndürür
        const textElements = ['resBase', 'resTax', 'resTotal', 'resDiscount', 'aylikTaksit', 'toplamOdeme', 'toplamFaiz'];
        textElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerText = "0.00 ₺"; 
        });
        
        //TÜM sonuç ekranlarını tek kalemde gizler
        document.querySelectorAll('.result').forEach(ekran => {
    ekran.classList.add('d-none');});

        // (Opsiyonel) Temizleme sonrası imleci sayfadaki ilk sayı girişine odaklar
        const firstInput = document.querySelector('input[type="number"]');
        if (firstInput) firstInput.focus();
        
        /*  
        // KDV Hesaplama: Sonuç kutusunu gizler (display: none ile)
        const resultBox = document.getElementById('resultBox');
        if (resultBox) resultBox.style.display = 'none';

        // Kredi Hesaplama: Sonuç kutusunu gizler (Bootstrap d-none class'ı ile)
        const sonucAlani = document.getElementById('sonucAlani');
        if (sonucAlani) sonucAlani.classList.add('d-none'); 
        */
        
    }

    /* function resetForm() {
        // Formdaki tüm inputları varsayılan haline (boş) getirir
        document.getElementById('krediForm').reset();
        
        // Açık olan sonuç alanını tekrar gizler
        document.getElementById('sonucAlani').classList.add('d-none');
        
        // İsteğe bağlı: Temizledikten sonra imleci tekrar ilk inputa odaklar
        document.getElementById('krediTutari').focus();
    } */


        /* function resetForm() {
        document.getElementById('kdvForm').reset();
        document.getElementById('resultBox').style.display = 'none';
    } */

        /* function resetForm() {
        document.getElementById('discountForm').reset();
        document.getElementById('resBase').innerText = "0.00 ₺";
        document.getElementById('resDiscount').innerText = "0.00 ₺";
        document.getElementById('resTotal').innerText = "0.00 ₺";
    } */