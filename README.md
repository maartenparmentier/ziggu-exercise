# How to run the app

## Backend

(This project uses Ruby v2.6.6)

1. `bin/setup`
2. `rails s`

## Frontend

1. `cd frontend`
2. `yarn && yarn serve`

# Creation Process

## Backend

I created a basic rails app with `rails new vue-pagination-exercise -d=postgresql --api`

I added the following gems:
- `annotate` to get model schemas
- `faker` to easily create dummy data
- `kaminari` for pagination. It's what I am used to, there's no other reason why I used this gem.
- `active_model_serializers` for api responses. It's what I have used for over 5 years. I like sending the pagination data inside `meta`

I uncommented and installed the default `rack-cors` gem, in order to be able to load data in the frontend without having CORS issues. For this example I only allowed the default urls Vue gives us.

## Frontend

I used `@vue/cli` to generate a default Vue 3 app.

# First Vue exploration

#### Study notes
While reading the guides and writing code I made some small notes to help me out later on.
In case you're interested, you can find my notes [here](https://www.notion.so/Study-Notes-827be348dfba422bac7e7214674c0578)

#### Process
I read the `Essentials` and `Components In-Depth` chapters in the [Vue 3 guides](https://v3.vuejs.org/guide/installation.html#release-notes) as well as the `Style Guide`. I skipped the rest for this small exercise to see how far I would come. I'm sure the solution can be optimised by reading further in the documentation and browsing through Vue's API.

All the topics I read in the Style Guide made a lot of sense and they gave me a clean and good feeling.
I think I already use most of the rules in my daily (Ember) work. 👍

After browsing through the documentation for the first time it was clear that I have to completely forget `The Ember Way`. There are no such concepts as routes, controllers, models,... out of the box. I just need to focus on `components`.

Because I fiddled a little bit with React a few years ago, I was able to understand the reactive model a bit better.

Coming from Ember, the biggest mental shift was the removal of 2-way-bindings and the fact that there are less conventions. I'm not sure if I wrote my components according to best practises of the community or Ziggu's internal rules.

Overall, I had a pretty good time writing this small app. It was fun to start with zero Vue knowledge and ending up with a small working app in a matter of hours.

#### Building the app

The first thing I did was installing `@vue/cli`. I was used to the `ember-cli` so I already had some experiences with a framework specific cli tool. I must say that I was impressed by the `vue ui`. It's probably just a nice gimmick for seasoned developers but probably a very helpful tool for junior developers. I don't expect to use this very frequently? To test it out I used `vui ui` to install Bulma (not Buefy as I know you guys use, that would make this exercise too easy since they have a pagination component).

I also installed the Vue Devtools. Same story here, I was used to the `ember inspector` which was super helpful.
Visually it looks a lot better than the Ember inspector I'm used to. Functionally I'll have to build more Vue projects before I have an opinion I guess 😉.

I did have some issues with the livereload/rebuild of the frontend server. I had to stop and restart the frontend process a few times in order for it to pick up my last changes. I'm not sure if this is a known issue, but it was very frustrating at times 😅.

# General decisions

While I was building the app I made the following decisions:
- I would not focus too much on UI, since I understood that was not the goal. Because of that I did not implement ways to dynamically style the component.
I used Bulma's table pagination design, but I had some issues getting the page to look like I wanted. In the end I settled for what it is right now. I did not pay attention to responsive design.
- In a real and bigger app I guess you'd use Vuex or something related. I did not use that because I didn't think it was worth it for this small app.
- As commented in the Rails API, because this was a very simple app and the focus was more on the Vue component, I just wrote all the filtering inside the `#index` and I expected all the params to be present.
- I built the component in the same way (currentPage & totalPage params) as the pagination component I use at my current job. I added the extra `perPage` option to make it a bit more dynamic.
- I saw this exercise not only as an interview task, but also as a learning opportunity and experience. I added a `SortableTableHeader` component as well, in order to play a bit more with bindings, methods, components,...
