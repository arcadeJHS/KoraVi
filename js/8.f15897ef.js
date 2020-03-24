(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{ac05:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("q-page",{staticClass:"flex flex-center"},[i("div",{staticClass:"relative-position"},[i("div",{staticClass:"absolute-top info-container"},[i("h4",{staticClass:"title"},[t._v("No frontiers")]),i("ul",[i("li",[t._v("Population: "),i("span",[t._v(t._s(t.livings))])]),i("li",[t._v("Death: "),i("span",[t._v(t._s(t.death))])]),i("li",{staticClass:"healthy"},[t._v("Healthy: "),i("span",[t._v(t._s(t.healthy))])]),i("li",{staticClass:"sick"},[t._v("Sick: "),i("span",[t._v(t._s(t.sick))])]),i("li",{staticClass:"recovered"},[t._v("Recovered: "),i("span",[t._v(t._s(t.recovered))])]),t.you?i("li",{staticClass:"you"},[t._v("You: "),i("span",[t._v(t._s(t.you.status.toLowerCase()))])]):t._e()])]),i("vue-p5",t._g({},{setup:t.setup,draw:t.draw}))],1)])},h=[],n=(i("6c7b"),i("e25d")),r=i.n(n),o=i("fc74"),a=i.n(o),c=i("59a1"),u=i.n(c),l={HEALTHY:"HEALTHY",SICK:"SICK",RECOVERED:"RECOVERED",DEAD:"DEAD"},p=function(){function t(s){var i=s.x,e=s.y,h=s.you,n=s.isSick,r=s.isolated,o=s.sketch;a()(this,t),this.x=i,this.y=e,this.r=h?8:5,this.speedX=1,this.speedY=2,this.alive=!0,this.sickFrom=n?new Date:null,this.status=n?l.SICK:l.HEALTHY,this.isolated=!!r,this.you=!!h,this.sketch=o,this.colors={HEALTHY:o.color(19,165,55),SICK:o.color(255,0,0),RECOVERED:o.color(0,0,255)}}return u()(t,[{key:"update",value:function(){if(this.alive&&(this.display(),this.move(),this.bounce(),this.status==l.SICK)){var t=new Date,s=(t.getTime()-this.sickFrom.getTime())/1e3;s>=5&&this.recoverOrDie()}}},{key:"display",value:function(){this.you?(this.sketch.stroke(this.colors[this.status]),this.sketch.fill(this.sketch.color(255,156,42),100)):(this.sketch.noStroke(),this.sketch.fill(this.colors[this.status],100)),this.sketch.ellipse(this.x,this.y,2*this.r,2*this.r)}},{key:"move",value:function(){this.isolated||(this.x+=this.speedX,this.y+=this.speedY)}},{key:"bounce",value:function(){(this.x+this.r>this.sketch.width||this.x-this.r<0)&&(this.speedX*=-1),(this.y+this.r>this.sketch.height||this.y-this.r<0)&&(this.speedY*=-1)}},{key:"collide",value:function(t){if(!this.isolated){var s=this.sketch.dist(this.x,this.y,t.x,t.y);s<=this.r+t.r&&(this.speedX*=-1,this.speedY*=-1,this.changeStatus(t))}}},{key:"changeStatus",value:function(t){t.status==l.SICK&&this.status==l.HEALTHY&&(this.status=l.SICK,this.sickFrom=new Date),this.status==l.SICK&&t.status==l.HEALTHY&&(t.status=l.SICK,t.sickFrom=new Date)}},{key:"recoverOrDie",value:function(){var t=Math.ceil(0),s=Math.floor(100),i=Math.floor(Math.random()*(s-t+1))+t;i<6?(this.alive=!1,this.status=l.DEAD):this.status=l.RECOVERED}}]),t}(),d={name:"Simulation",components:{VueP5:r.a},data:function(){return{population:150,isolated:0,persons:[],r0:null,you:null,currentX:0,sickLines:[],recoveredLines:[],healthyLines:[],populationLines:[]}},computed:{livings:function(){return this.persons.length},death:function(){return this.population+2-this.livings},sick:function(){return this.persons.filter((function(t){return"SICK"==t.status})).length},healthy:function(){return this.persons.length-this.sick-this.recovered},recovered:function(){return this.persons.filter((function(t){return"RECOVERED"==t.status})).length}},methods:{setup:function(t){t.createCanvas(window.innerWidth,window.innerHeight);for(var s=0;s<this.population;s++)this.persons[s]=new p({x:t.random(t.width),y:t.random(t.height),sketch:t});for(s=0;s<this.isolated;s++)this.persons[s]=new p({x:t.random(t.width),y:t.random(t.height),isolated:!0,sketch:t});this.r0=new p({x:t.width/2,y:t.height/2,isSick:!0,sketch:t}),this.persons.push(this.r0),this.you=new p({x:t.random(t.width),y:t.random(t.height),you:!0,sketch:t}),this.persons.push(this.you)},draw:function(t){t.background(255),this.checkYourDeath();for(var s=0;s<this.persons.length;s++)this.persons[s].alive?(this.persons[s].update(),this.contactWithOthers(s)):this.persons.splice(s,1);this.drawCharts(t)},drawCharts:function(t){this.drawSickChart(t),this.drawRecoveredChart(t),this.drawHealthyChart(t),this.drawPopulationChart(t)},checkYourDeath:function(){this.you.status},contactWithOthers:function(t){for(var s=0;s<this.persons.length;s++)t!=s&&this.persons[t].collide(this.persons[s])},drawSickChart:function(t){if(t.frameCount%15==0){var s=this.persons.filter((function(t){return"SICK"==t.status})),i=s.length/2;this.currentX+=1,this.sickLines.push([this.currentX,i])}t.noStroke(),t.fill(t.color(255,0,0),100);for(var e=0;e<this.sickLines.length;e++)t.rect(this.sickLines[e][0],window.innerHeight-this.sickLines[e][1]/2,1,this.sickLines[e][1])},drawRecoveredChart:function(t){if(t.frameCount%15==0){var s=this.persons.filter((function(t){return"RECOVERED"==t.status})),i=s.length/2;this.currentX+=1,this.recoveredLines.push([this.currentX,i])}t.noStroke(),t.fill(t.color(0,0,255),100);for(var e=0;e<this.recoveredLines.length;e++)t.rect(this.recoveredLines[e][0],window.innerHeight-this.recoveredLines[e][1]/2,1,this.recoveredLines[e][1])},drawHealthyChart:function(t){if(t.frameCount%15==0){var s=this.persons.filter((function(t){return"SICK"==t.status})),i=this.persons.filter((function(t){return"RECOVERED"==t.status})),e=this.persons.length-s.length-i.length,h=e/2;this.currentX+=1,this.healthyLines.push([this.currentX,h])}t.noStroke(),t.fill(t.color(0,255,0),100);for(var n=0;n<this.healthyLines.length;n++)t.rect(this.healthyLines[n][0],window.innerHeight-this.healthyLines[n][1]/2,1,this.healthyLines[n][1])},drawPopulationChart:function(t){if(t.frameCount%15==0){var s=this.persons.length/2;this.currentX+=1,this.populationLines.push([this.currentX,s])}t.noStroke(),t.fill(t.color(210,210,210),100);for(var i=0;i<this.populationLines.length;i++)t.rect(this.populationLines[i][0],window.innerHeight-this.populationLines[i][1]/2,1,this.populationLines[i][1])}}},f=d,v=i("2877"),k=Object(v["a"])(f,e,h,!1,null,null,null);s["default"]=k.exports}}]);