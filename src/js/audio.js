import blip from '../audio/blip1.wav';
import battle from '../audio/battle.mp3';
import coin from '../audio/coin.wav';
import grow from '../audio/grow.wav';
import hurry from '../audio/hurry.mp3';
import levelUp from '../audio/levelUp.mp3';
import attack1 from '../audio/PoisonSting.wav';
import attack2 from '../audio/Pound.wav';
import attack3 from '../audio/RollingKick.wav';
import attack4 from '../audio/SandAttack.wav';
import attack5 from '../audio/Tackle.wav';
import attack6 from '../audio/TakeDown.wav';
import attack7 from '../audio/WaterGun.wav';
import attack8 from '../audio/WhirlWind.wav';
import save from '../audio/save.wav';
import victory from '../audio/victory2.mp3';
import trainer from '../audio/trainer.mp3';

export default class GameSounds {
  constructor() {
    this.blip = new Audio(blip);
    this.battle = new Audio(battle);
    this.coin = new Audio(coin);
    this.grow = new Audio(grow);
    this.hurry = new Audio(hurry);
    this.levelUp = new Audio(levelUp);
    this.attack1 = new Audio(attack1);
    this.attack2 = new Audio(attack2);
    this.attack3 = new Audio(attack3);
    this.attack4 = new Audio(attack4);
    this.attack5 = new Audio(attack5);
    this.attack6 = new Audio(attack6);
    this.attack7 = new Audio(attack7);
    this.attack8 = new Audio(attack8);
    this.save = new Audio(save);
    this.victory = new Audio(victory);
    this.trainer = new Audio(trainer);
  }

  playBlip() {
    this.blip.play();
  }

  battleRandomSound() {
    let randomNumber = Math.floor(Math.random() * 8) + 1;
    if (randomNumber == 1) {
      this.attack1.play();
    } if (randomNumber == 2) {
      this.attack2.play();
    } if (randomNumber == 3) {
      this.attack3.play();
    } if (randomNumber == 4) {
      this.attack4.play();
    } if (randomNumber == 5) {
      this.attack5.play();
    } if (randomNumber == 6) {
      this.attack6.play();
    } if (randomNumber == 7) {
      this.attack7.play();
    } if (randomNumber == 8) {
      this.attack8.play();
    }
  }

  startSongIntro() {
    let audio = this.hurry
    audio.currentTime = 0
    audio.play();
    console.log(audio.currentTime);

    setInterval(function () {
      if (audio.currentTime > 10) {
        audio.pause();
      }
    }, 1000)
  }
}
