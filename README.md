# Arkeoapp
Flame takımı olarak, Arkeolojinin sadece kazı alanında kalmaması, insanlar ile paylaşılabilir ve daha ulaşılabilir hale getirebilmek için Arkeoapp’i tasarladık.

ArkeoApp, AI Destekli Arkeoloji ve Dijital Koruma Platformu
ArkeoApp, arkeolojik alanların dijital olarak korunması, analiz edilmesi ve güvenliğinin sağlanması için geliştirilmiş, yapay zekâ destekli modüler bir platformdur.

<img width="1174" height="1041" alt="Screenshot 2026-02-04 at 17 19 16" src="https://github.com/user-attachments/assets/eb8e28b6-0915-4d49-b8d6-19043e1d22fb" />

Amaç: Arkeolojik verileri daha hızlı analiz etmek, restorasyon süreçlerini dijitalleştirmek ve sahadaki güvenliği akıllı sistemlerle desteklemek.

Bu proje; bilgisayarlı görü, doğal dil işleme, IoT, video analizi ve bulut tabanlı sistemleri tek bir çatı altında birleştirir.

Özellikler:<img width="1422" height="210" alt="Screenshot 2026-02-04 at 17 20 22" src="https://github.com/user-attachments/assets/e9ac7d18-3229-4e5e-87ac-e563071069fa" />


AI Destekli Arkeoloji Modülleri (Gemini ile desteklenmektedir.)
  Site Restorasyonu
    Arkeolojik alanların eski hâllerinin dijital olarak modellenmesi
    Yapay zekâ ile restorasyon önerileri ve görselleştirme

  Metin Çözümleme
    Yazıt, tablet ve arkeolojik metinlerin analiz edilmesi
    OCR + NLP tabanlı metin çıkarımı ve anlamlandırma

  Mozaik Onarıcı
    Eksik veya hasarlı mozaiklerin AI ile tamamlanması
    Desen tahmini ve dijital rekonstrüksiyon

  Seramik Onarımı
    Kırık seramik parçalarının birleştirilmesi için görsel analiz
    Olası tam formun tahmini

    
Güvenlik ve İzleme Sistemi
  ArkeoApp, kazı alanları ve müze ortamları için uçtan uca akıllı güvenlik altyapısı sunar.

Sistem Mimarisi:

<img width="1348" height="749" alt="Screenshot 2026-02-04 at 17 21 11" src="https://github.com/user-attachments/assets/e0e6eb0e-96cf-4cdb-84c7-21d74390c561" />

<img width="467" height="306" alt="Screenshot 2026-02-04 at 17 24 51" src="https://github.com/user-attachments/assets/21cef71d-6072-4b71-a070-ca0555f079d8" />



Analog CCTV Kamera
        ↓
        DVR (RTSP Stream)
        ↓
     Frigate (AI + Face Recognition)
        ↓
  Home Assistant (Notification Blueprint)
        ↓
   Companion App Bildirimleri
        ↓
 Cloudflare Tunnel
        ↓
Google Cloud üzerinde host edilen web arayüzü

Özellikler:
  Gerçek zamanlı yüz tanıma ve takip etme

  <img width="1249" height="852" alt="Screenshot 2026-02-04 at 17 32 01" src="https://github.com/user-attachments/assets/b43a6608-573c-42f9-93bb-5906c9e85d27" />

  Şüpheli hareket algılama
  Anlık mobil bildirim
  
  ![Bildschirmfoto 2026-02-04 um 5 37 18 PM](https://github.com/user-attachments/assets/97e0ec51-7839-4716-9b1c-01b1a8a9ed4d)

  İnternete açık port gerekmeden Cloudflare Tunnel ile güvenli erişim
  Google Cloud üzerinde merkezi web paneli

Sistem Mimarisi
  Frontend:
    Web tabanlı arayüz
    Google Cloud üzerinde host edilir
  Backend:
    AI servisleri (Gemini API)
    Görüntü işleme & analiz pipeline’ları
    
Video & IoT Katmanı:
  RTSP stream → Frigate → Home Assistant → Bildirim altyapısı
Network:
  Cloudflare Tunnel ile güvenli uzaktan erişim
<img width="586" height="357" alt="Screenshot 2026-02-04 at 17 38 56" src="https://github.com/user-attachments/assets/9000702c-1aaf-45ea-ab51-779ad75e9322" />

  
Kullanılan Teknolojiler
  AI & Görüntü İşleme:
    Gemini, Computer Vision, OCR, NLP
  Video Analizi:
    Frigate NVR, RTSP stream
  IoT & Otomasyon:
    Home Assistant, Companion App
  Network & Security:
    Cloudflare Tunnel
    
  Cloud:
    Google Cloud Platform (GCP)

    
Kurulum

Backend servislerini kur:
  git clone https://github.com/berkemutluu/arkeoapp
  cd arkeoapp/backend
Frontend’i deploy et (Google Cloud):
  App Engine / Cloud Run / VM üzerinden yayınlanabilir.
Güvenlik sistemi için:
  Frigate kurulumu
  Home Assistant notification blueprint entegrasyonu
  Cloudflare Tunnel yapılandırması

  **Android Uygulaması** beta sürümünde yayınlanmıştır! https://github.com/berkemutluu/Arkeoapp/releases/tag/v1-mobile 

Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.

Teşekkürler:
Frigate: [frigate.video](https://frigate.video)
Home Assistant: https://www.home-assistant.io 
