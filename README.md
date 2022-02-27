# NexTrip Duplicated App

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

To run the unit tests provided with this sample application use the follow:

```bash
npm run test
# or
yarn test
```

## Assumptions

- The data from Metro Transit will continue to be consistent into the future and follow its own NexTrip API documentation, so I didn't have to litter my code with if statements checking for that consistency.
- Metro Transit will remain online.
- The size of the application is unlikely grow much larger than it is allowing me to use some methods that would probably grow to be painful. (example createMockFetch)
- The best way to display this data is similar to what Metro Transit has already setup.

## Ways to optimize for scale

If more routes, directions or stops were added to the application you could optimize in several ways.

- If you wanted to reduce the amount of scrolling a user (optimizing for the user experience) you could add text fields and let them start typing and suggest possible routes, directions or stops that could be used.
- If you were worried about <b>memory management</b> you could probably stick the information directly into the select fields instead of storing them in the store.
- If you were worried about <b>getting too much data at once</b> from the apis you could do a pagination scheme and only grab so many items per call. Then do an endless scroll or a more button to grab more items.