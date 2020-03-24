<template>
  <q-page class="flex flex-center">

    <div class="relative-position">
      <div class="absolute-top info-container">
        <h4 class="title">No frontiers</h4>
        <ul>
          <li>Population: <span>{{ livings }}</span></li>
          <li>Death: <span>{{ death }}</span></li>
          <li class="healthy">Healthy: <span>{{ healthy }}</span></li>
          <li class="sick">Sick: <span>{{ sick }}</span></li>
          <li class="recovered">Recovered: <span>{{ recovered }}</span></li>
          <li class="you" v-if="you">You: <span>{{ you.status.toLowerCase() }}</span></li>
        </ul>
      </div>

      <vue-p5 v-on="{ setup, draw }"></vue-p5>
    </div>

  </q-page>
</template>

<script>
import VueP5 from 'vue-p5';
import Person from 'src/commons/Person';

export default {
  name: 'Simulation',
  components: {
    VueP5
  },
  data() {
    return {
      population: 200,
      isolated: 0,
      persons: [],
      r0: null,
      you: null,

      currentX: 0,
      sickLines: [],

      recoveredLines: [],

      healthyLines: [],

      populationLines: []
    }
  },
  computed: {

    livings() {
      return this.persons.length;
    },
    death() {
      return (this.population + 2) - this.livings;
    },
    sick() {
      return this.persons.filter((p) => p.status == 'SICK').length;
    },
    healthy() {
      return this.persons.length - this.sick - this.recovered;
    },
    recovered() {
      return this.persons.filter((p) => p.status == 'RECOVERED').length;
    }

  },
  methods: {

    setup(sketch) {
        sketch.createCanvas(sketch.windowWidth/2, sketch.windowHeight/2);

        // Surrounding healthy persons
        for (var i = 0; i < this.population; i++) {
          this.persons[i] = new Person({ x: sketch.random(sketch.width), y: sketch.random(sketch.height), sketch });
        }

        // isolated persons
        for (var i = 0; i < this.isolated; i++) {
          this.persons[i] = new Person({ x: sketch.random(sketch.width), y: sketch.random(sketch.height), isolated: true, sketch });
        }

        // A first sick person
        this.r0 = new Person({ x: sketch.width / 2, y: sketch.height / 2, isSick: true, sketch });
        this.persons.push(this.r0);

        // YOU
        this.you = new Person({ x: sketch.random(sketch.width), y: sketch.random(sketch.height), you: true, sketch });
        this.persons.push(this.you);
    },

    draw(sketch) {
      sketch.background(255);
      this.checkYourDeath();

      for (var i = 0; i < this.persons.length; i++) {
        if (!this.persons[i].alive) {
          this.persons.splice(i, 1);
          continue;
        }
        this.persons[i].update();
        this.contactWithOthers(i);
      }

      this.drawCharts(sketch);
    },

    drawCharts(sketch) {
      this.drawSickChart(sketch);
      this.drawRecoveredChart(sketch);
      this.drawHealthyChart(sketch);
      this.drawPopulationChart(sketch);
    },

    checkYourDeath() {
      if (this.you.status === 'DEAD') {
        /*
        const youLoseImg = document.querySelector('#you-lose');
        youLoseImg.style.display = 'block';
        */
      }
    },

    contactWithOthers(i) {
      for (var j = 0; j < this.persons.length; j++) {
        // avoid a person detecting 'itself'
        if (i != j) {
          this.persons[i].collide(this.persons[j]);
        }
      }
    },

    drawSickChart(sketch) {
      if (sketch.frameCount % 15 == 0) {
        const sick = this.persons.filter((p) => p.status == 'SICK');
        const currentY = sick.length/2;
        this.currentX += 1;
        this.sickLines.push([this.currentX, currentY]);
      }

      sketch.noStroke();
      sketch.fill(sketch.color(255, 0, 0), 100);

      for (var i = 0; i < this.sickLines.length; i++) {
        sketch.rect(this.sickLines[i][0], sketch.windowHeight/2 - this.sickLines[i][1]/2, 1, this.sickLines[i][1]);
      }
    },

    drawRecoveredChart(sketch) {
      if (sketch.frameCount % 15 == 0) {
        const recovered = this.persons.filter((p) => p.status == 'RECOVERED');
        const currentY = recovered.length/2;
        this.currentX += 1;
        this.recoveredLines.push([this.currentX, currentY]);
      }

      sketch.noStroke();
      sketch.fill(sketch.color(0, 0, 255), 100);

      for (var i = 0; i < this.recoveredLines.length; i++) {
        sketch.rect(this.recoveredLines[i][0], sketch.windowHeight/2 - this.recoveredLines[i][1]/2, 1, this.recoveredLines[i][1]);
      }
    },

    drawHealthyChart(sketch) {
      if (sketch.frameCount % 15 == 0) {
        const sick = this.persons.filter((p) => p.status == 'SICK');
        const recovered = this.persons.filter((p) => p.status == 'RECOVERED');
        const healthy = this.persons.length - sick.length - recovered.length;
        const currentY = healthy/2;
        this.currentX += 1;
        this.healthyLines.push([this.currentX, currentY]);
      }

      sketch.noStroke();
      sketch.fill(sketch.color(0, 255, 0), 100);

      for (var i = 0; i < this.healthyLines.length; i++) {
        sketch.rect(this.healthyLines[i][0], sketch.windowHeight/2 - this.healthyLines[i][1]/2, 1, this.healthyLines[i][1]);
      }
    },

    drawPopulationChart(sketch) {
      if (sketch.frameCount % 15 == 0) {
        const currentY = this.persons.length/2;
        this.currentX += 1;
        this.populationLines.push([this.currentX, currentY]);
      }

      sketch.noStroke();
      sketch.fill(sketch.color(210, 210, 210), 100);

      for (var i = 0; i < this.populationLines.length; i++) {
        sketch.rect(this.populationLines[i][0], sketch.windowHeight/2 - this.populationLines[i][1]/2, 1, this.populationLines[i][1]);
      }
    }

  }
}
</script>
