This page can be accessed at https://stalkan.vercel.app

It has very simplistic user authentification, using Firebase as an email/password sign-in provider.
It also leverages Firebase for CRUD operations. Data tied to each user via userID is stored in Firebase's realtime database. With small screen sizes, the sidebar is off by default and only slides into view upon pressing a button at the top corner of the page (this button isn't visible on larger screen sizes). There is a bug where the sidebar dissapears upon returning to a large screen size (when checking responsive view with inspect element), but in common practice this bug should almost never occur due to screen sizes being static.
