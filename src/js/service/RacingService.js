import { DELAY_TIME_MS, FORWARD_CONDITION_NUMBER } from '../constants.js';
import { getRandomCount, removeHiddenClass } from '../utils.js';
import RemoveTemplate from './RemoveTemplate.js';

class RacingService {
  constructor(createTemplate, racingResult) {
    this.createTemplate = createTemplate;
    this.racingResult = racingResult;
    this.winnerList = [];
  }

  getWinnerList(cars, carPlayers) {
    const carsChildLists = Array.from(cars).map((car) => car.childNodes.length);
    const carPlayerTextLists = Array.from(carPlayers).map((carPlayer) => carPlayer.innerText);
    const maxLength = Math.max(...carsChildLists);

    this.winnerList = carPlayerTextLists.filter((item, index) => carsChildLists[index] === maxLength);
  }

  showGameResult(winnerList) {
    const resultTemplate = this.createTemplate.createRacingResultTemplate(winnerList);
    this.racingResult.insertAdjacentHTML('beforeend', resultTemplate);
    removeHiddenClass(this.racingResult);
  }

  displayCongratsAlert() {
    const timeoutId = setTimeout(() => {
      alert('ππππ μΆνν©λλ€! ππππ');
      clearTimeout(timeoutId);
    }, DELAY_TIME_MS.RACING_GAME_CONGRATS_TIMEOUT);
  }

  isForwardCondition() {
    return getRandomCount() >= FORWARD_CONDITION_NUMBER;
  }

  startRacingGame(coin) {
    const cars = document.querySelectorAll('.car');
    const carPlayers = document.querySelectorAll('.car-player');

    let count = 0;

    const intervalTimeId = setInterval(() => {
      carPlayers.forEach((carPlayer) => {
        if (this.isForwardCondition()) {
          carPlayer.insertAdjacentHTML('afterend', this.createTemplate.createForwardTemplate());
        }
      });

      // eslint-disable-next-line no-plusplus
      count++;

      if (count === coin) {
        clearInterval(intervalTimeId);
        RemoveTemplate.removeAllSpinners(cars);

        this.getWinnerList(cars, carPlayers);
        this.showGameResult(this.winnerList.join(', '));
        this.displayCongratsAlert();
      }
    }, DELAY_TIME_MS.RACING_GAME_INTERVAL);
  }
}

export default RacingService;
