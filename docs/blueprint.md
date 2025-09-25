# **App Name**: TetraBlaze

## Core Features:

- Firebase Authentication: Implement Google, Apple, and anonymous sign-in for user authentication, and tie game saves to those credentials.
- Firestore Database: Design and implement Firestore collections (users, leaderboards, ghosts) to store user data, leaderboard scores, and ghost replay data.
- Realtime Leaderboard: Display a real-time, updating leaderboard within the game by listening to changes in the Firestore leaderboards collection.
- Ghost Battle: Enable asynchronous ghost battles by fetching replay data from the ghosts collection based on other players' UIDs, and displaying their ghost replays alongside the user's current game.
- Score Submission: Implement client-side logic to send scores to Cloud Functions via HTTP upon game completion, for validation and storage.
- Cloud Functions: Implement the 'onScoreSubmit' function to validate scores, update user high scores, write scores to leaderboards, and save replay data to the 'ghosts' collection upon high score updates. Also, implement the 'dailyReset' function.
- Dynamic Game Balance: Integrate Remote Config to manage game balance parameters such as 'score_multiplier_tetris', 'level_up_speed', and 'event_banner_url', allowing changes without app updates.

## Style Guidelines:

- Primary color: Vibrant purple (#BE29EC) to evoke a Cyber Neon theme.
- Background color: Dark gray (#222222) to emphasize the neon elements.
- Accent color: Electric blue (#4DD0E1) to highlight interactive elements and create contrast.
- Body and headline font: 'Space Grotesk' sans-serif for headings, combined with 'Inter' sans-serif for body text to provide a computerized, techy feel while maintaining readability.
- Code font: 'Source Code Pro' for displaying data or replay code snippets.
- Use neon-style icons that complement the Cyber Neon theme.
- Implement smooth and engaging animations for Tetromino movements and score updates.