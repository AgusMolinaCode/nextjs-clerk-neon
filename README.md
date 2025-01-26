# Professional Search Application

## Introduction
This is a web application for searching and finding professionals in various categories and cities. It allows users to browse through a list of professionals, view their details, and leave ratings and comments.

## Features
- Search for professionals by category and city
- View detailed information about each professional
- User authentication and authorization
- Rating and comment system for users to provide feedback on professionals
- Responsive design for optimal viewing on different devices

## Technologies Used
- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Prisma](https://www.prisma.io/) - Modern database toolkit for TypeScript and Node.js
- [PostgreSQL](https://www.postgresql.org/) - Powerful open-source relational database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development
- [Clerk](https://clerk.dev/) - User authentication and management platform
- [Uploadthing](https://uploadthing.com/) - File upload and management service

## Project Structure
The project follows a standard Next.js directory structure:

- `app/` - Contains the main application pages and components
  - `products/[slug]` - Individual product page
  - `profile/` - Directory for individual profile form pages
  - `page.tsx` - The main page component that displays the search form and results
- `components/` - Reusable components used throughout the application
  - `ProductCard.tsx` - Component for displaying product cards
  - `RatingComponent.tsx` - Component for handling user ratings and comments
  - `form/` - Directory for form components
- `lib/` - Utility functions and helper modules
  - `products.ts` - Functions for fetching and manipulating product data
  - `users.ts` - Functions for fetching and manipulating user data
  - `utils.ts` - General utility functions
  - `prisma.ts` - Prisma client configuration
  - `validation.ts` - Validation functions for form inputs
- `public/` - Static assets such as images and fonts
- `styles/` - Global CSS styles and Tailwind CSS configuration
- `prisma/` - Prisma schema and migrations
- `env.local` - Environment variables for local development
- `env.example` - Example environment variables for production
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `package.json` - Project dependencies and scripts


## Functionality
### Search
Users can search for professionals by selecting a category and city from the dropdown menus on the main page. The search results are dynamically updated based on the selected filters.

### Product Details
Clicking on a professional's card takes the user to a detailed page displaying more information about the professional, including their name, description, and ratings.

### User Authentication
User authentication is handled by Clerk. Users can sign up, log in, and manage their accounts through the Clerk platform.

### Ratings and Comments
Authenticated users can leave ratings and comments for professionals. The rating is selected from a dropdown menu, and comments can be entered in a text area. Once submitted, the rating and comment are displayed on the professional's detail page.

### Image Upload
Professionals can upload images to their profiles using the Uploadthing service. The uploaded images are securely stored and served through Uploadthing's CDN.

## Environment Setup
### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL database
- Clerk account for user authentication

### Environment Variables
Create a `.env` file in the root directory of the project and add the following variables:

```
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
UPLOADTHING_SECRET=your_uploadthing_secret_key
NEXT_PUBLIC_UPLOADTHING_APP_ID=your_uploadthing_app_id
```

Replace `your_database_url`, `your_clerk_publishable_key`, `your_clerk_secret_key`, `your_uploadthing_secret_key`, and `your_uploadthing_app_id` with your actual database URL, Clerk API keys, and Uploadthing credentials.

### Prisma Setup
1. Install the Prisma CLI globally:
   ```
   npm install -g prisma
   ```
2. Set up the database schema:
   ```
   prisma db push
   ```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/AgusMolinaCode/nextjs-clerk-neon.git
   ```
2. Install the dependencies:
   ```
   cd professional-search-app
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and visit `http://localhost:3000` to see the application.

## Deployment
The application can be easily deployed to platforms like [Vercel](https://vercel.com/) Follow their respective documentation for detailed deployment instructions.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries or questions, please contact the developer:

Agustin Molina
- Email: agustin@example.com
- LinkedIn: [Agustin Molina](https://www.linkedin.com/in/agustin-molina-994635138/)
