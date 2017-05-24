import * as _ from "lodash";
import * as moment from 'moment';
import { Greeter } from './greeter';
import { person } from './person';
import MoviesViewModel from './MoviesViewModel';
var styles = require('./css/style1.scss') ;

function component () {
  document.getElementById("header").innerHTML =
    _.join([person.firstName, person.lastName, '!!!'], ' ');

  document.getElementById("color1").innerHTML =moment().format('MMMM Do YYYY, h:mm:ss a');

  let greeter  :any = new Greeter('Cecil');
	let greeting :any = greeter.greet();
	console.log(greeting);
}

component();
 new MoviesViewModel().movies.forEach(movie => console.log(movie.title));
