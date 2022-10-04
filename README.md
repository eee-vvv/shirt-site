# README

**RESEARCH PAYMENT/SHOP/SHIPMENT TOOLS
- ask on discord
- probably stripe

## MVP features

- [ ] **Dev Ops**
  - [ ] Test suite in place, development is TDD, and we have high test coverage of the product
- [ ] **Database**
  - [ ] Inventory (shirts, images, sizing, prices, etc.)
  - [ ] Cart
  - [ ] User Session
- [ ] **Shopping**
  - [ ] Users can browse shirts and add items to their carts without logging in
  - [ ] Cart
    - [ ] Users can remove items from the shopping cart
    - [ ] shopping cart persists between browser sessions (times out eventually)
    - [ ] If an item has already been bought when user tries to check it out, they get a "nolonger available" message
- [ ] **Payment**
  - [ ] Users can checkout and securely process a transaction with card, paypal, apple pay, etc,
- [ ] **CMS**
  - [ ] allow admin to manage inventory and orders without our help



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
