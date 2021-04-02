<h1> NOSEDIVE</h1>
<p> Link: </p>

<h2> Overview </h2>
<p> General Assembly: 1 week solo project - Create a full stack web application.</p>
<p> Social media website focusing on users ratings of each other, as seen on television series Black Mirror. In the episode, user's reputation and social standing heavily rely on 5 star ratings that are given after most interactions and those with higher ratings are often seen benefiting from this in real life. On top of the profile based website, I decided to expand on this idea and added a few other sections in the website that would be relevant to the hierarchical system, such as a wishlist, forum and feedback statistics. 
<h2> Technologies </h2>
<ul> 
<li><p> JavaScript </p></li>
<li><p> Sass </p></li>
<li><p> ReactJs </p></li>
<li><p> Python </p></li>
<li><p> Django </p></li>
<li><p> postgreSQL </p></li>
<li><p> Heroku </p></li>
</ul>

<h2> Process </h2> 
<h4> Profile </h4> 
<p> The first step was building profiles for the users, which included a lot of the standard sections seen in most social media websites: bio, photos, followers and activities. 
  This involved creating an initial user model in Python and building further on it by creating foreign key fields to create relationships between the profile details and the user. Backend requests were written in a way that allowed profile details to be pulled from their models as long as the user id number field was supplied in the frontend request. Once the backend was set up I began building the frontend and pulling the appropriate data for each section component. 
  
<h4> Ratings and feedback </h4> 
<p> With each registered user now with a functional profile, I implemented the rating system. A users rating is worked out by taking the combined average of their profile ratings and their post ratings. Within the ratings model I decided to create a feedback field with a list of options the user could select for, this would later be used in the stats section of the website.</p>

```
 def average(self, request, pk):
        user_profile_ratings = Ratings.objects.filter(rated=pk).aggregate(Avg('rating'))
        user_post_ratings = PostRatings.objects.filter(post_owner=pk).aggregate(Avg('rating'))
        if user_profile_ratings['rating__avg'] and user_post_ratings['rating__avg']:
            user_rating_score = (user_profile_ratings['rating__avg'] + user_post_ratings['rating__avg']) / 2
        elif not user_profile_ratings['rating__avg'] and not user_post_ratings['rating__avg']:
            user_rating_score = 0
        elif not user_profile_ratings['rating__avg']:
            user_rating_score = user_post_ratings['rating__avg']
        elif not user_post_ratings['rating__avg']:
            user_rating_score = user_profile_ratings['rating__avg']
        return user_rating_score
```
        
