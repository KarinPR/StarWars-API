(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// 'use strict';
 // const starDetail = require('./starDetail');

window.onload = function() {
	const ul = document.querySelector('ul.solarsystem');
	const sun = document.querySelector('li.sun');
	const description = document.querySelector('ul#descriptions');
	let planets = [] ;

	let x = fetch('https://swapi.co/api/planets/')
  		.then( rsp => rsp.json())
  		.then( res => {
  			let planets = res.results;

		const addStar = (arr) => {

			const newPlanet = arr.map((planet , index) => {
			const li = document.createElement('li');
			li.setAttribute("class" , `star planet-${index}`);


			li.style.width = `100px + ${index}`;
			ul.appendChild(li)

			const a = document.createElement('a');
			a.setAttribute("href" , `#${planet.name}`);
			const span = document.createElement('span');
			// span.setAttribute("class", 'tooltiptext');
			span.appendChild(document.createTextNode(`${planet.name}`));

			const reduceSize = (num) => {
				let size = Math.floor((num/1000)/1.5);
				if (size > 10) {
					return (size / 10);
				} else if (size < 2) {
					return (size * 2)
				}
				return size
			} 
			const starWidth = reduceSize(Number(`${planet.diameter}`));
			const starHeight = reduceSize(Number(`${planet.diameter}`));
			const randomColor = Math.floor(Math.random()*16777215).toString(16);

			span.style.width = `${starWidth}px`;
			span.style.height = `${starHeight}px`;
			span.style.backgroundColor = `#${randomColor}`;
			
			a.appendChild(span);
			li.appendChild(a);
		
			const planetStyle = document.querySelector(`.planet-${index}`);
			

			const width = 100 +  Number(`${index}`*60);
			const height = 100 +  Number(`${index}`*60);
			const borderRadius = (Number(`${width}`)/2)+2;
			const top =  270 -  Number(`${index}`*30);
			const left =  430 -  Number(`${index}`*30);
			const zIndex = 99 - Number(`${index}`);
			const animationDuration = Number(`${planet.orbital_period}`/Number(`${planet.rotation_period}`))
			
	 
			planetStyle.style.width = `${width}px`;
			planetStyle.style.height = `${height}px`;
			planetStyle.style.borderRadius = `${borderRadius}px`;
			planetStyle.style.top = `${top}px`;
			planetStyle.style.left = `${left}px`;
			planetStyle.style.zIndex = `${zIndex}`;
			planetStyle.style.zIndex = `${zIndex}`;
			planetStyle.style.animationDuration = `${animationDuration}s`;

			const liDes = document.createElement('li');
			const h2 = document.createElement('h2');
			h2.setAttribute("id" , `${planet.name}`);
			h2.appendChild(document.createTextNode(`${planet.name}`));
			const p = document.createElement('p');






			const StgToArr = (str) => {
				const arr = str.split(',')

				return arr;
			}

			let names = '[]' ;

			const getInfo = async function (urls) {

				const peopleUrl = urls.filter(url => url.includes('people'));
				const filmsUrl = urls.filter(url => url.includes('films'));

				const names = (await Promise.all(peopleUrl.map((url) => 
					fetch(url).then(rsp => rsp.json()).then(res => {
						return res.name 
					})

				))).toString()

				const films = (await Promise.all(filmsUrl.map((url) => 
					fetch(url).then(rsp => rsp.json()).then(res => {
						return res.title 
					})

				))).toString().toLowerCase()

				const information = {names : `${names}` , films : `${films}`}

				description.appendChild(liDes);
				liDes.appendChild(h2);
				liDes.appendChild(p);

				const info = `
					Name: ${planet.name}
					Rotation Period: ${planet.rotation_period}
					Orbital Period: ${planet.orbital_period}
					Climate: ${planet.climate}
					Gravity: ${planet.gravity}
					Terrain: ${planet.terrain}
					Surface Water: ${planet.surface_water}
					Population: ${planet.population}
					residents: ${information.names}
					films: ${information.films}
				`
				p.appendChild(document.createTextNode(`${info}`));

			}
			const newResidents = StgToArr(`${planet.residents}`);
			const filteredResident = newResidents.filter(Boolean)
			const newFilms = StgToArr(`${planet.films}`);
			const filteredFilms = newFilms.filter(Boolean)

	    	const activeUrls = [filteredResident,filteredFilms].filter(arr => arr.length > 0).flat()

			const residents = getInfo(activeUrls)
				})
			return  newPlanet;
		} 
addStar(planets);
})
}
},{}]},{},[1]);
