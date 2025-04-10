# QuoraTS

This is a full-stack project consisting of a Django backend and a frontend application.  
The backend is powered by **Python 3.12** and **Django 5.2**, and the frontend is served using **npm** with the `serve` package.

---

## 🛠️ Backend Setup

### ✅ Requirements

- Python 3.12+
- pip
- virtualenv
- PostgreSQL (or another DB of your choice)
- Git

---

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/rdsparky/QuoraTS.git
cd QuoraTS
```

#### 2. Create a Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Create a `.env` File for Environment Variables

In the root directory of the backend project, create a `.env` file:

```bash
touch .env
```

Add the following line to define your database connection (update values as needed):

```env
DATABASE_URL=postgres://username:password@localhost:5432/your_database
```

#### 5. Apply Migrations

```bash
python manage.py migrate
```

#### 6. Run the Development Server

```bash
python manage.py runserver
```

The backend will be available at:  
👉 `http://127.0.0.1:8000/`

---

## 🎨 Frontend Setup

### ✅ Requirements

- Node.js (v14+ recommended)
- npm
- `serve` package (for static file hosting)

---

### 🚀 Getting Started

#### 1. Install `serve` Globally

```bash
npm install -g serve
```

#### 2. Navigate to the Frontend Directory

```bash
cd frontend-app
```

#### 3. Serve the Frontend

```bash
serve .
```

Your frontend will be live at:  
👉 `http://localhost:3000` (default)

---

## 📌 Summary

- **Backend**: Python 3.12 + Django 5.2
- **Frontend**: Static frontend served via `serve`
- **Environment Config**: Managed using a `.env` file
- **Dependencies**: Listed in `requirements.txt`

---
