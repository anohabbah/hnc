// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hackernews_db: {
    databaseURL: 'https://hacker-news.firebaseio.com',
  },
  app_db: {
    apiKey: 'AIzaSyBmXTfJmHR6aJofm5wwKJkA8bT88aAlLpk',
    authDomain: 'trainings-288515.firebaseapp.com',
    databaseURL: 'https://trainings-288515-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'trainings-288515',
    storageBucket: 'trainings-288515.appspot.com',
    messagingSenderId: '52209567527',
    appId: '1:52209567527:web:86eeb8008d74e75e40cb02',
    measurementId: 'G-0H6CXQKTZ2'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
