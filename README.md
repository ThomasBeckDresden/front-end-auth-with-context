# Front-End Authentication with React Context

You can send a POST request to https://wbs-simple-auth.herokuapp.com 

Send the following JSON along with your request:

```js
{
      "username": "ben"
      "password": "chicken"
}
```

To get a valid JWT sent back by the API

Then you can query with a GET request https://wbs-simple-auth.herokuapp.com/auth/me

If the token is valid, you'll get some information about the user sent back
