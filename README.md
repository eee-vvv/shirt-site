# README

**RESEARCH PAYMENT/SHOP/SHIPMENT TOOLS
- ask on discord
- probably stripe

## MVP features

- [ ] Users can browse shirts and add items to their carts without logging in
- [ ] shopping cart persists between browser sessions even if a user is not logged in
- [ ] There is a backend that holds inventory (shirts, images, quantities available, prices, etc.) and can receieve and respond to requests from user clients
- [ ] The inventory is tagged in a way that allows shirts to be categorized, sorted, filtered, etc
- [ ] There is a CMS (content management system) in place that allows admin to manage inventory and orders without our help
- [ ] Users can checkout and securely process a transaction with card, paypal, apple pay, etc, without having an account
- [ ] There is a test suite in place, development is TDD, and we have high test coverage of the product
- [ ] Users can increase, decrease, or remove quantities of items from the shopping cart?
- [ ] Users can't add items to their cart if there is not enough inventory
- [ ] When a user adds an item to their cart, it puts the inventory item on hold?
- [ ] When a user initiates a cart, a timer is set, at the end of which all of their items become available to all shoppers again and their cart is automatically emptied

## Questions to ask Ruby

- do you want users to have accounts where their carts, info, etc are saved for convenient repeat purchases?
  - is this something that can be managed through a third party tool (eg shopify) or will it have to be "rolled" in house?
- how much do you want to rely on 3rd party tools and are you willing to spend money on them?
  - look into different CMSs, etc
- do you want a homepage? do you want the homepage to feature products?
- pagination?
- inspo sites

## meeting notes
- inventory is available until someone actually checks out with it

### views
- homepage is the shop with all products

pages:
- all products
- single product
- info
- cart (maybe not a page but just a dropdown)

## Tech Stack

- DB
- Server (CRUD)
- Frontend client (React (next?))
- Deployment framework
- production server environment
- Payment management system
- CMS for Ruby to manage inventory, order history, etc
- test suite
- potentially a user account tool (maybe stripe tbh)
- state management (redux, context, something)
- style (CSS modules, bootstrap, tailwind, SASS, etc)
