# Frontend Code Challenge

Dear candidate, please develop a website to track your calorie.

### Food Database API
 - sign up with https://developer.edamam.com/
 - create an application with 'Food Database API' service: https://developer.edamam.com/admin/applications
 - review API documentation: https://developer.edamam.com/food-database-api-docs

## Functional Requirement
![ally ecom frontend code test](https://allyfashion-magic-product-images.s3.ap-southeast-2.amazonaws.com/Frontend+code+test.png)
### Search for Food
 - When I am on the landing page
 - And I enter 'apple' in the search input field
 - Then I should see food will 'apple' listed
### Add Food to Tracker
 - Given I have all food with 'apple' listed
 - When I set quantity and click on add button
 - Then my calorie summary should be updated
 - And the added food become sticky in the list
 - And the added food will have background color set to orange to differentiate from other listed food
 - And it will not disappear with a new search keyword unless removed from the tracker
### Remove Food from Tracker
 - Given I have food added to the tracker
 - When I click on the remove button
 - Then the summary should be updated
### Set Calorie Target
 - When I am on the landing page
 - I should see the calorie target set to 1,000 by default
 - When I update the calorie target
 - Then the summary should be updated

### Technical Requirements
- React >= 16.8
- Redux or similar state container 
- Typescript
- Axios or other libraries for API calling
- Jest or simular tool for unit test
- Responsive design
- submit your solution with a zip file or git repository URL

### Bonus Points
- Enzyme or React-test-library for component test
- No lint error
- Clean code
- Appropriate design pattern
- Docker

