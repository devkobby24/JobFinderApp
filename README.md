# JobFinder App

## Overview

**JobFinder** is a mobile application built with React Native and Expo that allows users to search for jobs across various industries and locations. The app integrates the JSearch API from RapidAPI to fetch and display job listings. 

## Features

- **Job Search**: Search for jobs by keywords, location, and other filters.
- **Job Details**: View detailed job descriptions, requirements, and company information.
- **Save Jobs**: Save favorite jobs for later reference.
- **Apply**: Redirect to the job application page directly from the app.
- **Responsive Design**: Optimized for both iOS and Android devices.

## Technologies Used

- **React Native**: For building the mobile app.
- **Expo**: For easier development and deployment of the app.
- **JSearch API**: From RapidAPI to retrieve job listings.
- **Axios**: For making HTTP requests to the JSearch API.
- **React Navigation**: For handling navigation within the app.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Expo CLI installed globally (`npm install -g expo-cli`)
- A RapidAPI account and access to the JSearch API

### Installation

1. Clone the repository:

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add your RapidAPI key:

   ```plaintext
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. Start the Expo server:

   ```bash
   expo start
   ```

### Usage

1. Launch the Expo app on your iOS or Android device.
2. Scan the QR code provided by the Expo server to open the app on your device.
3. Use the search functionality to find jobs by entering keywords and selecting a location.
4. Click on a job listing to view detailed information and apply for the job.

## API Integration

This app uses the JSearch API from RapidAPI to fetch job listings. The API allows for searching jobs by keywords, location, and other parameters.

### Example API Request

```javascript
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://jsearch.p.rapidapi.com/search',
  params: {
    query: 'Software Engineer',
    location: 'New York',
    page: '1',
    num_pages: '1',
  },
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  },
};

axios.request(options).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **React Native Community** for their extensive documentation and support.
- **Expo** for providing a robust platform for React Native development.
- **RapidAPI** for providing the JSearch API to power the job search functionality.

---

Feel free to customize this README to better fit your project's specific details and requirements.


# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
