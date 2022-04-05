import * as yargs from 'yargs';
import axios from 'axios';

let argv = yargs.option({
            url: {  // for url
                description: "Url to search in",
                default: "https://anatta.io"
            },
            words: { // for words
                description: "Enter words to search for",
                demand: true,
                type: 'string'
            }

            }).parseSync();



console.log(argv.words)


const AxiosInstance = axios.create(); // Create a new Axios Instance

// Send an async HTTP Get request to the url
AxiosInstance.get(argv.url)
  .then( // Once we have data returned ...
    response => {
      let html = response.data; // Get the HTML from the HTTP request
      
      html = html.replace(/<[^>]+>/g, '') // remove tags

      const words = argv.words.split(",") // split , from words string
      words.forEach(
        (w) => {
            const re = new RegExp(w,"ig"); // regex init
            const count = (html.match(re) || []).length; // matches regex pattern
            console.log(w+ ': '+ count); // print
        }
      );
    }
  )
  .catch(console.error); // Error handling





