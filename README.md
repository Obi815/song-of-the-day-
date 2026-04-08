# Song of the Day 🎵

A web app where you can discover a shared Song of the Day, search for music, and add your own pick for everyone to see.

**Live site:** https://song-of-the-day-qzok.onrender.com/

![Song of the Day app screenshot](./extras/Screenshot%202026-04-07%20at%206.00.50 PM.png)
![Song of the Day app screenshot](./extras/Screenshot%202026-04-07%20at%205.58.36 PM.png)

---

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB

I started this as a simple frontend project using the iTunes API to search for songs and display results. From there, I wanted to take it further and actually make it interactive, so I added a backend with Node and Express and connected it to MongoDB.

Now users can search for songs, preview them, and add their own “Song of the Day.” Those get saved to the database and show up for everyone else on the site.

One of the cooler features is the daily song at the top. Instead of changing every refresh, it’s now controlled by the backend so everyone sees the same song for the day.

---

## Optimizations

I made it so only one song preview can play at a time so you don’t get a bunch of audio playing over each other.

I also moved the date logic to the backend because I ran into issues with users in different countries seeing different results. That made the app way more consistent.

On the UI side, I fixed layout issues for mobile, especially with long song titles and making sure the community section scrolls cleanly instead of stretching the page.

If I were to keep improving this, I’d add things like limiting users to one submission per day, preventing duplicate songs, and adding some form of user authentication so submissions are tied to real users instead of just a name input.

---

## Lessons Learned:

This project helped everything click for me with full-stack development.

The biggest thing I learned was that small things (like dates) can break your app in real-world situations. I had a bug where songs weren’t showing up for people in different countries, and fixing that taught me a lot about why backend control matters.

I also got more comfortable connecting frontend actions to backend routes, working with MongoDB, and debugging when something isn’t working across the whole app.

Overall, this was the first project where it actually felt like something people could use, not just something I built for practice.