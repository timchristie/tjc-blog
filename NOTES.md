1) Followed Workshop instructions
	- Baseline workshop deploy page
	- Build fails (can see from messier commits on https://github.com/timchristie/invoice-maker/actions/workflows/build-lint.yml) 
	- Solution: update serverless to 3.40.
	- Update gitignore to ignore node_modules

2) Run locally
	- Need to create a more locked down CLI profile (or at least delete the key after interview)
	- Running pnpm run generate:env:local requires JQ but appeared to work anywayy
	- Need to add gitignore to local env files
	- permissions issues; due to not killing API service properly: lsof -ti:8000 | xargs kill -9 will fix. Also need to take note of the extra places that add object puts in info, as incorrect serverless.yml also kills the api (unsurprisingly)

3) Add User Story Requirements
	- Added using pnpm run add:object. 
	- Not sure if string[] for likes is needed (planning to use a list of anonymised user ids so unliking is possible) 
	- probably shouldn't use plurals in object names after seeing the generated api routes
	- Creating a component: 
		- most of the heavy lifting was done from the Admin front-end code. 
	- Adding packages has to be done to the right package.json

4) Add Bonus Cases
	- Simple client side filtering based on if a string is within the contents or title
        - Deploy to AWS
		- Issues with the post pathing, as some routes are private and some are public . Tried to get too fancy with authorizing on the endpoint yml, rather than just opening the endpoints and authenticating via the app itself. 
        - Like and comment pills are added but currently non-functional. likes and comments are just arrays of strings in the Post object.

