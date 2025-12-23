# 🌱 Wirtualny Ogródek

> Interaktywny symulator ogrodu w czasie rzeczywistym (Tamagotchi dla roślin), zbudowany w oparciu o Czyste Funkcje i architekturę Event-Driven.

## 📖 O Projekcie

**Wirtualny Ogródek** to aplikacja typu SPA (Single Page Application), która pozwala użytkownikowi dbać o wirtualne rośliny. Projekt łączy przyjemną dla oka rozgrywkę z rygorystycznym podejściem inżynierskim (Programowanie Funkcyjne).

Aplikacja symuluje ekosystem, w którym pogoda, poziom nawodnienia i czas wpływają na cykl życia roślin.

## ✨ Funkcjonalności

### 🎮 Rozgrywka (Game Loop)
- **Cykl Życia:** Rośliny przechodzą fazy od nasiona, przez kiełek, aż do dorosłej formy (lub uschnięcia 💀).
- **System Pogody ☀️🌧️:**
  - **Słońce:** Przyspiesza wzrost (2x), ale rośliny szybciej tracą wodę.
  - **Deszcz:** Automatycznie nawadnia rośliny (nie musisz podlewać!).
- **Osiągnięcia 🏆:** System odznak (Badges) przyznawanych automatycznie za spełnienie warunków (np. "Kaktusiara" za posiadanie 3 kaktusów).
- **Efekty Dźwiękowe 🔊:** Interakcje (kopanie, podlewanie, sukces) są wzbogacone o audio.

### 🛠️ Kreator i Edycja
- **Customowe Gatunki:** Możliwość tworzenia własnych roślin o unikalnych parametrach (nazwa, pragnienie, szybkość wzrostu).
- **Interakcja:** Sadzenie, podlewanie i usuwanie martwych roślin.

### 💾 Technologia
- **Auto-Save:** Stan ogrodu (wraz z pogodą i statystykami) jest zapisywany w `localStorage`. Po odświeżeniu strony wracasz do swojego ogrodu.
- **Store & Reducer:** Własna implementacja wzorca Redux (zarządzanie stanem bez zewnętrznych bibliotek).

---

## 🚀 Instalacja i Uruchomienie

### Wymagania wstępne
Aby działały dźwięki, upewnij się, że w głównym folderze znajduje się katalog `sounds/` z plikami: `water.mp3`, `dig.mp3`, `win.mp3`.

### Opcja 1: Docker (Zalecana)

1. Sklonuj repozytorium:
   git clone <twoje-repo>
   cd functional-garden

2. Uruchom kontenery:
   docker-compose up --build

3. Otwórz w przeglądarce:
   http://localhost:8080

### Opcja 2: Lokalnie (VS Code)

1. Otwórz folder projektu w VS Code.
2. Zainstaluj rozszerzenie **Live Server**.
3. Kliknij prawym przyciskiem myszy na `index.html` -> **Open with Live Server**.

---

## 🧠 Aspekty Edukacyjne (Dla Prowadzącego)

Projekt demonstruje zaawansowane koncepcje JS:

1.  **Single Source of Truth:** Cały stan (rośliny, pogoda, statystyki) znajduje się w jednym obiekcie w Store.
2.  **Immutability:** Reducer nigdy nie mutuje stanu bezpośrednio. Używa operatora spread (...) oraz metod tablicowych `map` i `filter`, aby zwracać nowe kopie.
3.  **Pure Functions:** Logika `processPlantTick` jest deterministyczna i łatwa do testowania – przyjmuje stan rośliny i pogodę, zwraca nowy stan.
4.  **Derived State:** Osiągnięcia (Badges) nie są trzymane "na sztywno" w bazie, lecz wyliczane dynamicznie na podstawie kondycji ogrodu.
