## Zero Waste

Zero Waste is a food inventory and waste tracking app that helps you reduce food waste at home. Log what's in your fridge, pantry, and freezer, track expiration dates, and manage your food as you consume or discard it. The stats dashboard gives you insight into your waste habits - how much you're wasting, which food categories and storage locations are most problematic, and how your habits change over time.

**Live demo:** https://zero-waste-gray.vercel.app

### Built With

![Next.js](https://img.shields.io/badge/Next.js-%23000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-%23880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-%2322B5BF?style=for-the-badge&logo=recharts&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-%233068B7?style=for-the-badge&logo=zod&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-%23000000?style=for-the-badge&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-%23000000?style=for-the-badge&logo=vercel&logoColor=white)

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com) or [MongoDB Atlas](https://www.mongodb.com/atlas) for data storage
- [Google OAuth credentials](https://console.cloud.google.com/) for Google sign-in (optional)

### Installation

1. Clone the repo

```
git clone https://github.com/eva-lng/zero-waste.git
```

2. Navigate to the project directory

```
cd zero-waste
```

3. Install dependencies

```
npm install
```

4. Set up environment variables by copying `.env.example` to `.env` and filling in the values:

```
cp .env.example .env
```

5. Run the development server

```
npm run dev
```

## App features

- **Food inventory management** - add food items with details like category, storage location, unit, quantity, expiration date and open/closed status. Filter and search your inventory by category, storage, expiration and status.
- **Food actions** - mark items as consumed or expired (full or partial amounts), move items between storage locations, or open a package to track remaining shelf life.
- **Expiration tracking** - items are visually flagged based on how close they are to expiring, helping you prioritise what to use first.
- **Waste statistics** - a stats dashboard showing total consumed vs wasted, monthly breakdowns by category and storage, and trend charts going back up to 12 months.
- **Authentication** - email/password and Google OAuth sign-in. Profile page allows username and password changes.

## Technical Highlights

- Server components for data fetching with parallel DB queries via `Promise.all` to minimise page load times
- Server Actions for all data mutations with Zod validation and inline error display via `useActionState`
- MongoDB aggregation pipelines for computing waste statistics and trends server-side
- Authentication with Better Auth supporting email/password and Google OAuth
- Interactive charts built with Recharts with custom tooltips and legends
- Mobile-first responsive layout with Tailwind CSS and shadcn/ui components

## Limitations & Future Improvements

- **Password reset** - users can change their password from the profile page while logged in, but there is no forgot password / password reset flow for users who cannot log in. Implementing this would require an email provider with a verified domain to send reset links.
- **Food item templates** - predefined templates for common food items with suggested expiration dates, so users can quickly add items without filling in all fields manually each time.
- **Shopping list** - since users are already tracking what food they have at home, a natural extension would be a shopping list feature to track what needs to be restocked.
