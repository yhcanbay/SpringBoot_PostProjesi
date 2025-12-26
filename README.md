# 🌱 İlk Spring Boot Projem - Sohbet Uygulaması

> **Not:** Bu benim ilk Spring Boot projemdir. Spring Framework, REST API, JWT authentication ve React ile full-stack development öğrenirken geliştirdim.(Frontend kısmında Aİ dan yardım alınmıştır. Projenin genel amacı Spring Öğrenmektir.)

## 📚 Proje Hakkında

Bu proje, Spring Boot ve React kullanarak geliştirdiğim bir sosyal medya uygulamasıdır. Kullanıcılar kayıt olabilir, giriş yapabilir, post paylaşabilir, beğenebilir ve yorum yapabilir.

### 🎯 Öğrenme Hedeflerim

Bu projede şunları öğrendim ve uyguladım:

- ✅ **Spring Boot** ile backend geliştirme
- ✅ **Spring Security** ve JWT ile authentication
- ✅ **JPA/Hibernate** ile veritabanı işlemleri
- ✅ **PostgreSQL** entegrasyonu
- ✅ **REST API** tasarımı
- ✅ **React** ile frontend geliştirme
- ✅ **Material-UI** component library kullanımı
- ✅ Modern CSS (Glassmorphism, Gradients, Animations)

## ✨ Özellikler

- 🔐 **Kullanıcı Sistemi** - Kayıt ol, giriş yap, profil görüntüle
- 📝 **Post Paylaşma** - Başlık ve içerik ile post oluşturma
- ❤️ **Beğeni Sistemi** - Postları beğenme/beğenmeme
- 💬 **Yorum Yapma** - Postlara yorum ekleme
- 🎨 **Modern Tasarım** - Glassmorphism efektleri ve gradient'ler
- 📱 **Responsive** - Mobil ve desktop uyumlu

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Spring Boot 3.5.6** - Ana framework
- **Spring Security** - Güvenlik
- **JWT (JSON Web Token)** - Token tabanlı authentication
- **Spring Data JPA** - Veritabanı işlemleri
- **PostgreSQL** - Veritabanı
- **Lombok** - Kod kısaltma
- **Maven** - Dependency management

### Frontend
- **React 18** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Sayfa yönlendirme
- **SCSS** - Styling
- **Axios/Fetch** - API istekleri

## 📋 Gereksinimler

- Java 21 veya üzeri
- Node.js 16 veya üzeri
- PostgreSQL 12 veya üzeri
- Maven 3.6 veya üzeri

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/yourusername/sohbet_uygulamasi.git
cd sohbet_uygulamasi
```

### 2. PostgreSQL Veritabanı Oluşturun

PostgreSQL'de yeni bir veritabanı ve schema oluşturun:

```sql
CREATE DATABASE "quest-app";
\c quest-app
CREATE SCHEMA app1;
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

`.env` dosyasını açıp kendi değerlerinizi girin:

```env
DB_USERNAME=postgres
DB_PASSWORD=sizin_sifreniz
JWT_SECRET=en_az_32_karakterli_gizli_anahtar
```

### 4. Backend'i Başlatın

```bash
# Maven ile
mvn spring-boot:run

# veya IDE'nizde (IntelliJ IDEA, Eclipse, VS Code)
# SohbetUygulamasiApplication.java dosyasını çalıştırın
```

Backend `http://localhost:8080` adresinde çalışacaktır.

### 5. Frontend'i Başlatın

Yeni bir terminal açın:

```bash
cd frontend
npm install
npm start
```

Frontend `http://localhost:3000` adresinde açılacaktır.

## 📁 Proje Yapısı

```
sohbet_uygulamasi/
├── src/main/java/com/yhcanbay/sohbet_uygulamasi/
│   ├── controller/          # REST API endpoints
│   │   └── impl/
│   ├── service/             # Business logic
│   │   └── impl/
│   ├── repository/          # Database operations
│   ├── entities/            # JPA entities (User, Post, Comment, Like)
│   ├── dto/                 # Data Transfer Objects
│   └── security/            # JWT & Security configuration
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Auth/        # Login & Register
│       │   ├── Home/        # Ana sayfa
│       │   ├── Post/        # Post bileşenleri
│       │   ├── Comment/     # Yorum bileşenleri
│       │   ├── Navbar/      # Navigasyon
│       │   └── User/        # Kullanıcı profili
│       ├── App.js
│       └── index.css
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Yeni kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi
- `POST /auth/refresh` - Token yenileme

### Posts
- `GET /posts` - Tüm postları listele
- `GET /posts/{postId}` - Belirli bir post
- `POST /posts` - Yeni post oluştur (🔒 Auth gerekli)
- `PUT /posts/{postId}` - Post güncelle (🔒 Auth gerekli)
- `DELETE /posts/{postId}` - Post sil (🔒 Auth gerekli)

### Likes
- `GET /likes?postId={postId}` - Post beğenilerini listele
- `POST /likes` - Post beğen (🔒 Auth gerekli)
- `DELETE /likes?userId={userId}&postId={postId}` - Beğeniyi kaldır (🔒 Auth gerekli)

### Comments
- `GET /comments?postId={postId}` - Post yorumlarını listele
- `POST /comments` - Yorum ekle (🔒 Auth gerekli)
- `PUT /comments/{commentId}` - Yorum güncelle (🔒 Auth gerekli)
- `DELETE /comments/{commentId}` - Yorum sil (🔒 Auth gerekli)

### Users
- `GET /users` - Tüm kullanıcıları listele
- `GET /users/{userId}` - Kullanıcı bilgilerini getir

## 🎨 Tasarım Özellikleri

Projenin frontend'inde modern web tasarım trendlerini uyguladım:

- **Glassmorphism** - Cam efektli şeffaf kartlar
- **Gradient Backgrounds** - Canlı renk geçişleri
- **Smooth Animations** - Yumuşak hover ve geçiş efektleri
- **Custom Scrollbar** - Özelleştirilmiş kaydırma çubuğu
- **Responsive Design** - Tüm cihazlarda çalışır
- **Modern Typography** - Google Fonts (Inter)

## 📖 Öğrendiklerim

Bu proje sürecinde:

1. **Backend Development**
   - Spring Boot'un temel yapısını
   - REST API tasarımını
   - JPA ile veritabanı ilişkilerini (One-to-Many, Many-to-One)
   - JWT authentication'ı
   - Spring Security yapılandırmasını

2. **Frontend Development**
   - React hooks (useState, useEffect)
   - Component-based architecture
   - API entegrasyonu
   - Modern CSS teknikleri
   - Responsive tasarım

3. **Full-Stack Integration**
   - Backend-Frontend iletişimi
   - CORS yapılandırması
   - Token yönetimi
   - Error handling

## ⚠️ Önemli Notlar

- 🎓 **Eğitim Amaçlı:** Bu proje öğrenme sürecimde geliştirdiğim ilk Spring Boot projesidir.
- 🔒 **Güvenlik:** Production ortamında kullanmadan önce güçlü şifreler ve secret key'ler kullanın.
- 🐛 **Hatalar:** Henüz öğrenme aşamasında olduğum için bazı best practice'leri kaçırmış olabilirim.
- 💡 **Geri Bildirim:** Önerileriniz ve geri bildirimleriniz için issue açabilirsiniz!

## � Gelecek Planlar

- [ ] Profil fotoğrafı yükleme
- [ ] Post'lara resim ekleme
- [ ] Gerçek zamanlı bildirimler (WebSocket)
- [ ] Kullanıcı takip sistemi
- [ ] Dark mode
- [ ] Arama özelliği
- [ ] Unit ve integration testler

## 🤝 Katkıda Bulunma

Bu projeyi geliştirmeye devam ediyorum. Önerileriniz varsa:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -m 'feat: Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📧 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**⭐ Beğendiyseniz yıldız vermeyi unutmayın!**

*Bu projeyi geliştirirken Spring Boot ve React öğrenme yolculuğumda çok şey öğrendim. Umarım sizin için de faydalı olur!* 🚀
