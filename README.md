# Calculator and Expression Parser with Inferno.js


## What you built? 

In this project, we wanted to try and build out a feature using a Javascript library that is an alternative to React, Inferno.js. What interested us about this library was its claim from its documentation that it was one of the fastest libraries while still having a lot of functionality that React would provide. 

The website consisted of two main parts, a basic calculator and a rule based expression parser. 

## Who Did What?

Aditya - I worked on the expression validator and parser. This expression parser takes in a mathematical expression as input based on a set of rules I had predefined. It will first parse the expression and ensure that all parts of the expression, including nested expressions, are following these predefined rules. I think its cool because it recursively calculates the answer to the expression, and if there are any errors, will give a specific error and point the user to the specific part of the overall expression that the error is at. I definitely came across multiple problems with parsing the expressions when coding this up. Parsing input correctly is not as easy of a task as it initially seems because there are so many edge cases I needed to consider in order to ensure that I was only accepted valid input. Furthermore, when I started implementing some more complex functionality such as nested expressions and factorials, I ran into many bugs where I would get a number, but it was not the correct answer to the expression inputted. I resolved these by constantly print debugging via `console.log()`. 

## What you learned

Before we could get to the features, we had to set up the general Inferno.js app with routing in order to have separate links to the two different components we worked on. One thing we noticed about Inferno.js is that it is extremly similar to React, and has pretty similar importing structure for external libraries. Routing was also pretty similar to React Routing, and utilized the `<BrowserRouter>` tag to create those links. There was also the regular `<Route>` tag which pointed to a specfic component. Overall, like previously stated, when we were actually coding we did not notice much difference between Inferno.js and React. In fact, we did not even notice much difference in speed between the two libraries though Inferno.js was marketed as being one of the fastest libraries. Though this might be true, our components were not nearly complex enough to yield demonstrable differences between the two libraries.

Aditya - when I built out the rule based expression parser, what I wanted to build up was my skill in parsing and validating input. Parsing and validating input will likely be an important part of many CS 98 projects, so I wanted to build an expression parser that would be able to validate input and calculate any expression and also let users know where they may have erred when typing in an expression. I believe that it is much more useful to just use a premade rules library to validate inputs because they are heavily tested and take into account any/all edge cases including ones that I probably missed when making this rule based parser. In terms of my opinion on Inferno.js, I don't think I will be using this library because any project that I work on will not require a super fast library. When you use a library that is not as widely used as React or even less widely used libraries like Angular, there is a serious lack of documentation aside from the basic documentation on the library's website. I don't think that the unnoticeable increase in speed is worth the difficulty in finding any documentation that can help me build out a product. 

## Authors

Aditya Choudhari and Maxwell Carmichael

## Acknowledgments

Aditya - I did not use any tutorial here, I just relied on the open source Inferno.js documentation that can be found here: [Inferno](https://www.infernojs.org/)
