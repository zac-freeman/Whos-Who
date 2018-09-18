# React Assessment - Who's Who
# Assessment Overview

For this assessment, students are tasked with developing a front-end React application that interface with [Spotify's API] in order to get genre's, artists, and **sample** songs. The user will then be able to listen to songs and guess which artist created it.

## Requirements Overview

##### The *Business Requirements* are located in the [REQUIREMENTS.md](REQUIREMENTS.md) file.

The specification for this assessment is written in a way that resembles the kind of informal requirements document you may recieve on a client site or the level of detail you may have after a few meetings with stakeholders/product owners. It is written from a non-technical viewpoint with no regards for the technical requirements that the project may incur. In order to get a sense for what is required technically, it is recommended that you first go through the ***Business Requirements*** and try to see the end goal from a business point of view. After that, go through it again from a technical perspective and begin mapping out mentally and physically (on paper if you'd like) the 

---

## Technical Guidance

##### The following will be an unorganized collection of technical information that could be helpful for this assessment.

When debugging or trying to solve problems within the `React` and `JavaScript` ecosystem, it will be helpful to include `react` or `javascript` in your google searches. For example, searching for `web playback javascript` gives me [`howler.js`](https://howlerjs.com/) which seems useful for playing audio. Learning how to *google well* is one of the most important skills to hone as a developer - especially when dealing with a quickly changing ecosystem.

When getting a `track` from Spotify's API, it gives you a `preview_url` which will be needed to play a **sample** for a given song.

To simplify authenticating with Spotify's API, a skeleton is given which calls a service in the cloud to get a `spotify_access_token`. An example request using this token is provided in the project.

This project uses the [`Ducks`](https://github.com/erikras/ducks-modular-redux) pattern for organizing redux-related code such as action names, action creators, and reducers. 

Reducers (or ducks) in this project are located in their respective `containers/` directory.

