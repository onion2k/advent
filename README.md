# Advent Calender

It's a lovely advent calendar. :)

# Make your own

Clone the repo and use `npm i` to install the necessary dependencies, then initialise it with `npm run start`. This will run a dev server on port 3000 and open a browser pointing to it.

## Customisation

Everything is controlled from a json file that lives in /public. Edit that file to change the advent calendar images and click actions.

### Settings

The different parts of the json file are;

* *bgUrl* is the URL of the main image. It should be suitably big that it works on everything (eg 4K) and 'left centric' as the image is anchored to the left of the calendar (eg make it look nice if the right hand side isn't visible.)
* *randomise* is a true/false boolean that determines whether the windows are displayed in a random order or not.
* *calendar* is an array of 24 objects, one for each day.

#### Day objects

Each day should have it's own object to determine what lives in that window. The available settings are;

* *number* is the number that appears on the door, from 1 through to 24. Don't change these.
* *image* is a URL for the image that appears behind the door.
* *open* is a true/false boolean to determine if the door is open or not. Set it to false.
* *src* a source URL for the action click
* *action* determines what happens if a user clicks on the open window. Available options are "false", "image", "html", or "youtube".
    * "false" (or no value) means nothing happens on a click
    * "image" opens a lightbox pointing to the src value
    * "html" opens a lightbox and sets it's innerhtml to the html file loaded from the src value
    * "youtube" opens a lightbox and embeds a video from YouTube. The src value should be the videoId.

#### Examples

A normal window:

`{ "number": "1", "image": "https://example.com/image.jpg", "open": false }`

A window with a lightbox:

`{ "number": "1", "image": "https://example.com/image.jpg", "open": false, "action": "image", "src": "https://example.com/image_lg.jpg" }`

A window with an HTML lightbox:

`{ "number": "1", "image": "https://example.com/image.jpg", "open": false, "action": "html", "src": "https://example.com/door.html" }`

A window with a YouTube video:

`{ "number": "1", "image": "https://example.com/image.jpg", "open": false, "action": "youtube", "src": "dQw4w9WgXcQ" }`
 

#### More than one calendar

You can have multiple calendars by creating additional json files. The calendars will be named based on the json file name. Eg calendar2.json will be available on [http://localhost:3000/calendar2](http://localhost:3000/calendar2).

## Deployment

To deploy your advent calendar use `npm run build` to make an optimised version in a /build directory and then upload it to a server somewhere.

If you're just using a single advent calendar then you don't need to worry about routing, but if you have more than one you'll need to make every route point to index.html (this is standard with React, Angular, etc).

---
### Notes

* Remove the Flattr meta tag from index.html if you're deploying to live. You don't want that.
* Add a favicon to your calendar.
* The open door is stored using localStorage, so it will be the same across all calendars on the same URL. Use different domains if that's a problem.
* The Reset and Github corner links will not be displayed in December.

---
If you use this advent calendar app why not click on Flattr to fund my code (well, mince pies actually, but they power my code). https://flattr.com/@onion2k

If you want a calendar but you're not happy with the technical stuff drop me a message on Twitter (https://twitter.com/onion2k)