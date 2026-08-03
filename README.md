# 🚀 SaaS Analytics Dashboard

A modern, full‑stack Business Intelligence dashboard built with **Django (backend)** and **React + Vite (frontend)**. Track sales, revenue, user metrics, and performance in real‑time with a beautiful rose/pink theme, high‑precision currency display, and interactive data visualizations.

![Dashboard Preview](https://via.placeholder.com/1200x600/ec4899/ffffff?text=SaaS+Analytics+Dashboard)

---

## 📸 Screenshots

| Dashboard | Reports | Live Pulse |
|-----------|---------|------------|
| ![Dashboard](https://via.placeholder.com/400x250/ec4899/ffffff?text=Dashboard) | ![Reports](https://via.placeholder.com/400x250/f43f5e/ffffff?text=Reports) | ![Live Pulse](https://via.placeholder.com/400x250/db2777/ffffff?text=Live+Pulse) |

---

## ✨ Features

### 🔐 Authentication
- User registration & login with JWT
- Secure token refresh mechanism
- Protected routes with PrivateRoute component

### 📊 Core Dashboard
- **KPI Cards**: Total Revenue, Active Users, MRR, Growth Rate
- **Revenue Trend**: Line chart with monthly revenue data
- **Sales by Category**: Bar chart (SaaS, Support, Consulting, API)
- **User Segmentation**: Pie chart (Free vs Premium users)
- **Recent Transactions**: Table with inline editing and delete functionality

### 📈 Reports & Analytics
- Advanced filtering (date range, category, status, search)
- Summary statistics with 4‑decimal precision
  - Total Revenue
  - Total Transactions
  - Average Transaction Value
  - Completed Revenue
  - Pending Revenue
- Sortable transaction table
- CSV export with precise decimal values

### ⚡ Live Pulse (Real‑time)
- WebSocket‑driven live updates
- Active sessions monitoring
- API call volume tracking
- Real‑time event feed
- Freeze/Resume controls

### ⚙️ Settings
- Dark/Light mode toggle
- Notification preferences
- Profile management
- Data reset functionality

### 🎨 Design
- Rose/pink gradient theme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Dark mode support
- Custom scrollbar styling

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Django 5.0** | Web framework |
| **Django REST Framework** | API development |
| **Simple JWT** | Authentication |
| **Django CORS Headers** | Cross‑origin requests |
| **Django Filters** | Query filtering |
| **DRF YASG** | API documentation |
| **SQLite** (dev) / PostgreSQL (prod) | Database |
| **Channels** | WebSocket support |
| **Celery** | Background tasks |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool |
| **React Router v6** | Routing |
| **TanStack Query** | Data fetching & caching |
| **Axios** | HTTP client |
| **Chart.js** | Interactive charts |
| **Framer Motion** | Animations |
| **React Hot Toast** | Notifications |
| **date‑fns** | Date formatting |

---

## 📁 Project Structure
saas-analytics-dashboard/
├── backend/ # Django Backend
│ ├── manage.py
│ ├── requirements.txt
│ ├── .env
│ ├── backend/ # Main Django config
│ ├── api/ # API app (dashboard metrics)
│ ├── users/ # User authentication
│ └── transactions/ # Transactions app

├── frontend/ # React Frontend
│ ├── package.json
│ ├── vite.config.js
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── components/
│ ├── services/
│ ├── context/
│ ├── hooks/
│ └── utils/

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn
- PostgreSQL (optional, SQLite works for development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/saas-analytics-dashboard.git
cd saas-analytics-dashboard