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
<h4> Wishlist </h4> 
<p> Having written the ratings portion of the website I was then able to move on to the sections of the website that relied on this information. I decided to create a wishlist that allowed users to only add items of a certain price dependent on their rating. This was taken from the episode, in which the main character was unable to rent out higher end cars due to a drop in her ratings. To achieve this I used the amazon API, which provides details, such as price and description, of all the items currently listed for sale. I wrote an if else statement that only allows a post request to be sent, leading to an item being added to their wishlist, if the price of the item costs within ten times their current user rating, otherwise they would be alerted their rating is not currently high enough. 
  
  ```
  handleWishList = async (price, thumbnail, url, title ) => {
  const userLimit = this.props.user.average * 10
  if (price > userLimit) {
    this.setState({ modal: 'Your rating is not high enough for this action' })
  } else {
    this.setState({ 
      postForm: { 
        price: price,
        thumbnail: thumbnail,
        url: url,
        title: title
      } },
    async () => {
      await axios.post('/api/wishlist/', this.state.postForm , headers())
      this.setState({ modal: 'Item Added to Wishlist' }, 
        async () => {
          await this.props.updateProfile(this.props.user.bio.id, 'wishlist')
        })
    })
  }
  this.checkRating()
}
  ```
  
  <h4> Stats </h4> 
 <p> The stats section of the website provides the user with information on their daily number of ratings, their feedback results and an advice slip. The graphs displaying these were achieved using a third party package, react-stack-grid. It allowed me to input all the users individuals  ratings and insert them into an array which would then present the data into a specififed graph type. The advice slip takes in the any of the ratings with feedback and links the user to information on how they can potentioally increase their rating depending on which of their feedback trait is most prevelant. 
  
  ```
  getAdvice = () => {
    const weakness = this.state.feedback.reduce((x, y) => x.rating_count > y.rating_count ? x : y)
    let advice 
    switch (weakness.feedback) {
      case 'Impoverished Vibes':
        advice = 'https://bit.ly/3ffWg8B'
        console.log('here')
        break
      case 'Unattractive' :
        advice = 'https://bit.ly/2znjGJS'
        break
      case 'Unpleasant Smell' : 
        advice = 'https://bit.ly/37kknQK'
        break
      case 'Rude Interaction': 
        advice = 'https://bit.ly/3dWXzJe'
        break
      case 'Disciminatory': 
        advice = 'https://bit.ly/3dWXzJe'
        break
      default : advice = 'google.com'
    }
    this.setState({ weakness: weakness.feedback, advice }, 
      () => {
        this.handleModal()
      })
  }
  ```
  
  <h4> Forum </h4>
