import blip from '../audio/blip1.wav';
import battleIntro from '../audio/battle-start.wav';
import battleLoop from '../audio/battle-loop.wav';
import battleEnd from '../audio/battle-end.wav';
import coin from '../audio/coin.wav';
import grow from '../audio/grow.wav';
import hurryIntro from '../audio/hurry-start.wav';
import hurryLoop from '../audio/hurry-loop.wav';
import hurryEnd from '../audio/hurry-end.wav';
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
import loss from '../audio/loss.mp3';

export default class GameSounds {
  // fix audio volume
  // stop battle sound on end
  constructor() {
    this.blip = new Audio(blip);
    this.battleIntro = new Audio(battleIntro);
    this.battleLoop = new Audio(battleLoop);
    this.battleEnd = new Audio(battleEnd);
    this.coin = new Audio(coin);
    this.grow = new Audio(grow);
    this.hurryIntro = new Audio(hurryIntro);
    this.hurryLoop = new Audio(hurryLoop);
    this.hurryEnd = new Audio(hurryEnd);
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
    this.loss = new Audio(loss);

    this.hurryIntro.onended = () => {
      this.hurryLoop.play();
      this.hurryLoop.loop = true;
    }
    this.hurryLoop.onended = () => {
      this.hurryEnd.play();
    }
    this.battleIntro.onended = () => {
      this.battleLoop.play();
      this.battleLoop.loop = true;
    }
    this.battleLoop.onended = () => {
      this.battleEnd.play();
    }
  }

  playBlip() {
    this.blip.play();
  }

  setVolume() {
    this.attack1.volume = 0.02;
    this.attack2.volume = 0.02;
    this.attack3.volume = 0.02;
    this.attack4.volume = 0.02;
    this.attack5.volume = 0.02;
    this.attack6.volume = 0.02;
    this.attack7.volume = 0.02;
    this.attack8.volume = 0.02;
    this.blip.volume = 0.02;
    this.battleIntro.volume = 0.02;
    this.battleLoop.volume = 0.02;
    this.battleEnd.volume = 0.02;
    this.hurryIntro.volume = 0.02;
    this.hurryEnd.volume = 0.02;
    this.hurryLoop.volume = 0.02;
    this.save.volume = 0.02;
    this.victory.volume = 0.02;
    this.trainer.volume = 0.02;
    this.loss.volume = 0.02;
    this.coin.volume = 0.02;
    this.grow.volume = 0.02;
  }

  mute() {
    this.attack1.volume = 0.0;
    this.attack2.volume = 0.0;
    this.attack3.volume = 0.0;
    this.attack4.volume = 0.0;
    this.attack5.volume = 0.0;
    this.attack6.volume = 0.0;
    this.attack7.volume = 0.0;
    this.attack8.volume = 0.0;
    this.blip.volume = 0.0;
    this.battleIntro.volume = 0.0;
    this.battleLoop.volume = 0.0;
    this.battleEnd.volume = 0.0;
    this.hurryIntro.volume = 0.0;
    this.hurryEnd.volume = 0.0;
    this.hurryLoop.volume = 0.0;
    this.save.volume = 0.0;
    this.victory.volume = 0.0;
    this.trainer.volume = 0.0;
    this.loss.volume = 0.0;
    this.coin.volume = 0.0;
    this.grow.volume = 0.0;
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
    this.hurryIntro.play();
  }
  endStartSong() {
    this.hurryLoop.loop = false;
  }

  battleSongIntro() {
    this.battleIntro.play();
  }

  endBattleSong() {
    this.battleLoop.loop = false;
  }

}
