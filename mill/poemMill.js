const fs = require("fs"); 
const input = require("./input.js");
const millinfo = require("./millinfo.js");
console.log(process.argv);
let args = process.argv;
const Bfile = `./B.js`;
const B = require(Bfile);
const BfilmFile = `./Bfilm.js`;
const Bfilm = require(BfilmFile);
const tools = require("./tools.js");
const nticks = B.nticks;
const fps = B.fps;
const bookunits = input.bookunits || "in";
const bookwidth = input.bookwidth || 8;
const bookheight = input.bookheight || 8;
const bookmargin = input.bookmargin || 1;
const bleed = input.bleed || 0.125;
const pixelsperunit = input.pixelsperunit || 72;
const captionheight = input.captionheight || 1;
const width = bookwidth+bookunits;
const height = bookheight+bookunits;
const w = Number(bookwidth), h = Number(bookheight);
const m = Number(bookmargin);
const b = Number(bleed);
const iw = (w-2.0*m);
const ih = (h-2.0*m);
const innerwidth = iw+bookunits;
const innerheight = ih+bookunits;
const margin = bookmargin+bookunits;
const margingutter = (m+0.2)+bookunits;
const svgwidth = w*pixelsperunit;
const svgheight = h*pixelsperunit;
const markup = str => {
	let words = str.split(" ").map( (w,j) => {
		return tools.randominteger(0,30)<2 ? `<mark class="mark${tools.randominteger(0,20)} word${j}">${w}</mark>` : w;
	});
	return words.join(" ");
};
const bookid = process.argv[4] ? process.argv[4] : "testmill";
const poemsfile = `./poems.js`;
const framesfile = `./frames.js`;
const coversfile = `./covers.js`;
const bookfile = `./book.js`;
const filmfile = `./film.js`;
const rawpoems = require("./poemTextLists.js");
//console.log(`rawpoems.length = ${rawpoems.length}`);

let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();

const canvas = {width:svgwidth,height:svgheight,min:Math.min(svgwidth,svgheight),max:Math.max(svgwidth,svgheight)};
const textLists2html = textLists => {
	return textLists.reduce( (acc,list) => {
		acc = acc + `
		<ul class="stanza">` + list.map(item=>item.replace("prostitutes","creased map")).reduce( (ulstr,item) => {
			ulstr = ulstr + `<li>${markup(item)}</li>`;
			return ulstr;
		},"");
		acc = acc + `
		</ul>`;
		return acc;
	}, "")
};

let poemsobj = [...new Array(nticks).keys()].map( j => {
	let textLists = rawpoems[j%rawpoems.length].lists;
	//let textarray = "left throng city depot arrived alone worn suitcase sandwich lukewarm coffee thermos tepid brown liquid greasy paper rusted texaco station folded map urgent mission fix the system repair reclaim rebuild reweave restore prairie meadow sequestration".split(" ");
	let textarray = textLists.reduce( (acc,list) => {
		return acc + list.join(" ");
	}, "").split(" ").filter( word => word!=="prostitutes" && word!==" ");
	let captiontext = [0,1,2].map(j=>textarray[tools.randominteger(0,textarray.length)]).join(" :|: ");
	let title = [0].map(j=>textarray[tools.randominteger(0,textarray.length)]).join(" ");
	// console.log(textarray);
	let poem = {
		id: `${(j+1).toString().padStart(2, '0')}`,
		title: `${title}`,
		text: textLists2html(textLists),
	};
	//let jd = (j===0 || j===nticks-1) ? tools.randominteger(1,nticks-2) : j; 
	let jd=j;
	let elementdraw = B.elements.map( layer => {
		return layer.map( el => {
			//console.log(el.role);
			let cx = el.b[jd].cx || el.cx;
			let cy = el.b[jd].cy || el.cy;
			let r = el.b[jd].r || el.r;
			let w = el.b[jd].w || el.w;
			let h = el.b[jd].h || el.h;
			let sw = el.b[jd].sw || el.sw;
			let sf = el.b[jd].sf || el.sf;
			let sd = el.b[jd].sd || el.sd;
			let so = el.b[jd].so || el.so;
			let fo = el.b[jd].fo || el.fo;
			let strokecolor = el.b[jd].strokecolor || el.strokecolor;
			let fillcolor = el.b[jd].fillcolor || el.fillcolor;
			let p = tools.drawp[el.role]( {cx,cy,r,w,h,sw,sf,sd,so,fo,strokecolor,fillcolor } ); 
			//console.log(JSON.stringify(p));
			//console.log(JSON.stringify(tools.drawf(canvas,p,el.tag)));
			return tools.drawf(canvas,p,el.tag);
		}).join(" ");
	}).join(" ");

	poem.figure = {
		picture:`
	<svg viewBox="0 0 ${svgwidth} ${svgheight}">
		${elementdraw}
	</svg>
	`,
		caption:`${captiontext}`};
	//console.log(`poemtitle = ${poem.figure.caption}, j=${j}`);
	return poem;
});

let coversobj = [...new Array(4).keys()].map( j => j*8).flatMap( j => { 
	let cover = {
		id: `${(j).toString().padStart(3, '0')}`,
		title: `mctavish #${millinfo.dt}`,
		subtitle: millinfo.datetime, 
		text: "", 
	};
	let jd=j;
	let elementdraw = B.elements.map( layer => {
		return layer.map( el => {
			//console.log(el.role);
			let cx = el.b[jd].cx || el.cx;
			let cy = el.b[jd].cy || el.cy;
			let r = el.b[jd].r || el.r;
			let w = el.b[jd].w || el.w;
			let h = el.b[jd].h || el.h;
			let sw = el.b[jd].sw || el.sw;
			let sf = el.b[jd].sf || el.sf;
			let sd = el.b[jd].sd || el.sd;
			let so = el.b[jd].so || el.so;
			let fo = el.b[jd].fo || el.fo;
			let strokecolor = el.b[jd].strokecolor || el.strokecolor;
			let fillcolor = el.b[jd].fillcolor || el.fillcolor;
			let p = tools.drawp[el.role]( {cx,cy,r,w,h,sw,sf,sd,so,fo,strokecolor,fillcolor } ); 
			//console.log(JSON.stringify(p));
			//console.log(JSON.stringify(tools.drawf(canvas,p,el.tag)));
			return tools.drawf(canvas,p,el.tag);
		}).join(" ");
	}).join(" ");
	cover.figure = {
		picture:`
	<svg viewBox="0 0 ${svgwidth*2.2} ${svgheight*1.2}">
		${elementdraw}
	</svg>
	`,
		caption: "",
	};
	return cover;
});
//let framesobj = poemsobj.flatMap( (poem,j) => { 
let framesobj = [...new Array(nticks).keys()].flatMap( j => { 
	//let poem = (j>0&&j<nticks) ? poemsobj[j%nticks] : {title:"fieldNotes",figure:{caption:"field notes!"}};
	//let poem = (j>0&&j<nticks-1) ? poemsobj[j%nticks] : {title:"",figure:{caption:""}};
	let poem = poemsobj[j%nticks];
	return [...new Array(fps).keys()].map( t => {
		let k = fps*j + t;
		//console.log(`poem.title=${poem.figure.caption}`);
		let frame = {
			id: `${(k).toString().padStart(3, '0')}`,
			title: poem.title, 
			text: poem.figure.caption.split(" ")[0], 
		};
		/*	
		let frame = {
			id: `${(k).toString().padStart(3, '0')}`,
			title: "", 
			text: "", 
		}
		*/
		let elementdraw = Bfilm.elements.map( layer => {
			return layer.map( el => {
				let jd = k%el.b.length;
				//console.log(el.role);
				let cx = el.b[jd].cx || el.cx;
				let cy = el.b[jd].cy || el.cy;
				let r = el.b[jd].r || el.r;
				let w = el.b[jd].w || el.w;
				let h = el.b[jd].h || el.h;
				let sw = el.b[jd].sw || el.sw;
				let sf = el.b[jd].sf || el.sf;
				let sd = el.b[jd].sd || el.sd;
				let so = el.b[jd].so || el.so;
				let fo = el.b[jd].fo || el.fo;
				let strokecolor = el.b[jd].strokecolor || el.strokecolor;
				let fillcolor = el.b[jd].fillcolor || el.fillcolor;
				let p = tools.drawp[el.role]( {cx,cy,r,w,h,sw,sf,sd,so,fo,strokecolor,fillcolor } ); 
				//console.log(JSON.stringify(p));
				//console.log(JSON.stringify(tools.drawf(canvas,p,el.tag)));
				return tools.drawf(canvas,p,el.tag);
			}).join(" ");
		}).join(" ");
		frame.figure = {
			picture:`
	<svg viewBox="0 0 ${svgwidth} ${svgheight}">
		${elementdraw}
	</svg>
	`,
			//caption: poem.figure.caption,
			caption: "",
		};
		return frame;
	});
});

let bookobj = input.bookobj;
bookobj.sections = [
	{ 
		id: "section1",
		title: "the repair(*)",
		inscription: "random text from field notes",
		cssclasses: ["pagestartnumbers", "booksection"],
		poems: [...new Array(nticks).keys()].map( j => { return poemsobj[j].id }), 
	},
	/*
		{ 
			id: "section1",
			title: "the repair(*)",
			inscription: "it was like this every morning ...",
			cssclasses: ["pagestartnumbers", "booksection"],
			poems: [...new Array(nticks).keys()].filter( j => j < 61 ).map( j => { return poems[j%poems.length].id }), 
		},
		{ 
			id: "section2",
			title: "#=> 2 <=#",
			inscription: " &&& ",
			cssclasses: ["booksection"],
			poems: [...new Array(nticks).keys()].filter( j => j > 60 && j < 121 ).map( j => { return poems[j%poems.length].id }), 
		},
		{ 
			id: "section3",
			title: "#=> 3 <=#",
			cssclasses: ["booksection"],
			poems: [...new Array(nticks).keys()].filter( j => j > 120 && j < 181 ).map( j => { return poems[j%poems.length].id }), 
		},
		{ 
			id: "section4",
			title: "#=> 4 <=#",
			cssclasses: ["booksection"],
			poems: [...new Array(nticks).keys()].filter( j => j > 180 && j < 241 ).map( j => { return poems[j%poems.length].id }), 
		},
		*/
];
bookobj.poemids = [...new Array(nticks).keys()].map( j => { return poemsobj[j].id }); 


let filmobj = input.filmobj;
filmobj.sections = [
	{ 
		id: "title",
		title: "field notes",
		cssclasses: ["pagenonumbers", "notoc", "booktitle", "booksection"],
	},
	{ 
		id: "section1",
		title: "the repair(*)",
		inscription: "it was like this every morning ...",
		cssclasses: ["pagestartnumbers", "booksection"],
		poems: [...new Array(framesobj.length).keys()].map( j => { return framesobj[j].id }), 
	},
];
filmobj.poemids= [...new Array(nticks*fps).keys()].map( j => { return framesobj[j].id }); 
/*
Object.keys(input).forEach( key => {
	bookobj[key] = input[key];
	filmobj[key] = input[key];
});
*/

let bookstr = `let book =
	${JSON.stringify(bookobj, null, "\t")};
module.exports = book;`

let filmstr = `let book =
	${JSON.stringify(filmobj, null, "\t")};
module.exports = book;`

let poemsstr = `let poems =
	${JSON.stringify(poemsobj, null, "\t")};
module.exports = poems;`

let framestr = `let poems =
	${JSON.stringify(framesobj)};
module.exports = poems;`

let coversstr = `let covers =
	${JSON.stringify(coversobj)};
module.exports = covers;`

fs.writeFileSync(bookfile, bookstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${bookfile} written successfully\n`);
	}
});
fs.writeFileSync(filmfile, filmstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${filmfile} written successfully\n`);
	}
});
fs.writeFileSync(poemsfile, poemsstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${poemsfile} written successfully\n`);
	}
});
fs.writeFileSync(framesfile, framestr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${framesfile} written successfully\n`);
	}
});
fs.writeFileSync(coversfile, coversstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${coversfile} written successfully\n`);
	}
});
