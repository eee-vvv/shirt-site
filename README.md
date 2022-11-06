# README

## Dev Database setup

`createdb shirt-site-dev`

\*\*RESEARCH PAYMENT/SHOP/SHIPMENT TOOLS

- ask on discord
- probably stripe

## MVP features

### Pre-deployment

- [ ] Connect email Ruby gave us to all new accounts for everything
- [ ] put Ruby's images in local storage and try to simulate how we'll fetch images
- [ ] CART
  - [ ] Users can browse shirts and add items to their carts without logging in
  - [ ] Users can remove items from the shopping cart
  - [ ] shopping cart persists between browser sessions (times out eventually)
  - [ ] If an item has already been bought when user tries to check it out, they get a "nolonger available" message
- [ ] **Orders**
  - [ ] Orders are written to the database when a user succesfully checks out (cart -> order)
- [ ] set up stripe to work locally
- [ ] **CMS**
  - [ ] allow admin to manage inventory and orders without our help
  - [ ] ADD NEW PRODUCTS
    - [ ] have newly added products appear immediatley
      - [ ] refresh automatically for now
    - [ ] in-site notification for added product
  - [ ] EDIT ALREADY EXISTING PRODUCTS
    - [ ] write to DB
    - [ ] edits apear immediatley
    - [ ] validate entries
    - [ ]
  - [ ] DELETE PRODUCTS
  - [ ] **AUTH**: admin can securely log in via Google auth in order to access CMS and make changes to inventory
- [ ] **Style**
  - [ ] 1) Make site look polished/like a fairly accurate prototype
  - [ ] 2) Meet with Ruby and make site look DONE!

### Deployment

- [ ] **Dev Ops**
  - [ ] Test suite in place, development is TDD, and we have high test coverage of the product

## meeting notes (Ruby)

- inventory is available until someone actually checks out with it

### views

- homepage is the shop with all products

pages:

- all products
- single product
- info
- cart (maybe not a page but just a dropdown)

## Tech Stack

### "1st party"

- Unit testing (React testing library + Jest)
- Integration testing (Cypress)
- Database: PSQL (pg.js)
- Client side frameworks (react.js , next.js)
- State management framework (react context)
- Deployment framework (next.js)
- Server-side framework (express)

### "3rd party"

- CMS: none
- Payment system: (stripe)
- Image storage: (google cloud storage)

## oct 20 notes

- subscribing to a newsletter on the site
- whether to "roll our own" or find a plugin service
