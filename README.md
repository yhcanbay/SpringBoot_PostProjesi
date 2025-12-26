# 🚀 Sohbet Uygulaması

Modern ve güzel tasarımlı bir sosyal medya uygulaması. Spring Boot backend ve React frontend ile geliştirilmiştir.

## ✨ Özellikler

- 🔐 **Kullanıcı Kimlik Doğrulama** - JWT tabanlı güvenli giriş sistemi
- 📝 **Post Oluşturma** - Başlık ve içerik ile post paylaşma
- ❤️ **Beğeni Sistemi** - Postları beğenme/beğenmeme
- 💬 **Yorum Yapma** - Postlara yorum ekleme
- 👤 **Kullanıcı Profilleri** - Kullanıcı sayfaları ve post geçmişi
- 🎨 **Modern UI** - Glassmorphism ve gradient efektleri
- 📱 **Responsive Tasarım** - Mobil, tablet ve desktop uyumlu

## 🛠️ Teknolojiler

### Backend
- **Spring Boot 3.5.6** - Java framework
- **Spring Security** - Güvenlik ve kimlik doğrulama
- **JWT** - Token tabanlı authentication
- **PostgreSQL** - Veritabanı
- **JPA/Hibernate** - ORM
- **Lombok** - Boilerplate kod azaltma

### Frontend
- **React 18** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Routing
- **SCSS** - Styling
- **Modern CSS** - Glassmorphism, gradients, animations

## 📋 Gereksinimler

- Java 21+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.6+

## 🚀 Kurulum

### 1. Repository'yi Klonlayın

```bash
git clone https://github.com/yourusername/sohbet_uygulamasi.git
cd sohbet_uygulamasi
```

### 2. PostgreSQL Veritabanı Oluşturun

```sql
CREATE DATABASE "quest-app";
CREATE SCHEMA app1;
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını kopyalayıp `.env` olarak kaydedin ve değerleri doldurun:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
DB_USERNAME=postgres
DB_PASSWORD=your_actual_password
JWT_SECRET=your_very_long_and_secure_secret_key_here
```

### 4. Backend'i Çalıştırın

```bash
# Maven ile
mvn spring-boot:run

# veya IDE'nizde SohbetUygulamasiApplication.java'yı çalıştırın
```

Backend `http://localhost:8080` adresinde çalışacaktır.

### 5. Frontend'i Çalıştırın

```bash
cd frontend
npm install
npm start
```

Frontend `http://localhost:3000` adresinde çalışacaktır.

## 📁 Proje Yapısı

```
sohbet_uygulamasi/
├── src/main/java/com/yhcanbay/sohbet_uygulamasi/
│   ├── controller/          # REST API endpoints
│   ├── service/             # Business logic
│   ├── repository/          # Database access
│   ├── entities/            # JPA entities
│   ├── dto/                 # Data transfer objects
│   └── security/            # JWT & Security config
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Auth/        # Login/Register
│   │   │   ├── Home/        # Ana sayfa
│   │   │   ├── Post/        # Post components
│   │   │   ├── Comment/     # Yorum components
│   │   │   ├── Navbar/      # Navigation
│   │   │   └── User/        # Kullanıcı profili
│   │   ├── App.js
│   │   └── index.css        # Global styles
│   └── package.json
└── pom.xml
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Yeni kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi
- `POST /auth/refresh` - Token yenileme

### Posts
- `GET /posts` - Tüm postları listele
- `GET /posts/{postId}` - Belirli bir postu getir
- `POST /posts` - Yeni post oluştur (Auth gerekli)
- `PUT /posts/{postId}` - Post güncelle (Auth gerekli)
- `DELETE /posts/{postId}` - Post sil (Auth gerekli)

### Likes
- `GET /likes?postId={postId}` - Post'un beğenilerini listele
- `POST /likes` - Post beğen (Auth gerekli)
- `DELETE /likes?userId={userId}&postId={postId}` - Beğeniyi kaldır (Auth gerekli)

### Comments
- `GET /comments?postId={postId}` - Post'un yorumlarını listele
- `POST /comments` - Yorum ekle (Auth gerekli)
- `PUT /comments/{commentId}` - Yorum güncelle (Auth gerekli)
- `DELETE /comments/{commentId}` - Yorum sil (Auth gerekli)

### Users
- `GET /users` - Tüm kullanıcıları listele
- `GET /users/{userId}` - Kullanıcı bilgilerini getir
- `POST /users` - Yeni kullanıcı oluştur

## 🎨 Tasarım Özellikleri

- **Glassmorphism** - Cam efektli modern kartlar
- **Gradient Borders** - Animasyonlu renkli çerçeveler
- **Smooth Animations** - Yumuşak geçişler ve hover efektleri
- **Custom Scrollbar** - Özelleştirilmiş kaydırma çubuğu
- **Modern Color Palette** - Mor, pembe, mavi gradient'ler
- **Responsive Design** - Tüm ekran boyutlarına uyumlu

## 🔒 Güvenlik

- JWT token tabanlı authentication
- Password encryption (BCrypt)
- CORS yapılandırması
- SQL injection koruması (JPA)
- XSS koruması

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Yusuf Hakan Canbay**

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
