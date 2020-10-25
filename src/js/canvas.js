const { rand } = require('./utils')
const vector = require('./vector');

const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');


let particle_count , 
    particles;

const config = {
    GRAVITY: 0.9, 
    FRICTION: 0.8, 
    AIR_RESITANCE: 0.01, 
    width: 500,
    height: 500, 
}



class Particle {
    constructor(pos , vel , acc , radius,  color) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        //draw circle
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x , this.pos.y , this.radius , 0 , Math.PI * 2 , false);
        ctx.fill();
        ctx.closePath();
        // end ><
    }

    update() {
        this.vel = vector.add(this.vel , this.acc);
        this.pos = vector.add(this.pos , this.vel);

        if(this.pos.y > canvas.height - this.radius) {
            this.pos.y = canvas.height - this.radius;
            this.vel.y = -this.vel.y;
        } else if(this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y = -this.vel.y;
        }


        if(this.pos.x > canvas.width - this.radius) {
            this.pos.x = canvas.width - this.radius;
            this.vel.x = -this.vel.x;
        } else if(this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x = -this.vel.x;
        }

        this.draw();
    }

}

const init = () => {

    particle_count = 10;
    particles = [];

    canvas.width = config.width;
    canvas.height = config.height;

    for(let i = 0; i < particle_count; ++i) {
        particles.push(new Particle(
            new vector(rand(0 , canvas.width) , 0 + 50),
            new vector(10,10),
            new vector(0,1),
            rand(5 , 10),
            "white"
        ))

    }
}

init();
const loop = () => {
    ctx.rect(0,0, canvas.width , canvas.height);
    ctx.fillStyle = "black";
    ctx.fill();
    for(let particle of particles) {
        particle.update();
    }
    requestAnimationFrame(loop);

}
loop();
