class RemoveTemplate {
  static removeAllSpinners = (cars) => {
    cars.forEach((car) => {
      if (car.hasChildNodes()) {
        car.removeChild(car.lastElementChild);
      }
    });
  };

  static removeCarPlayers = (carPlayers) => {
    while (carPlayers.hasChildNodes()) {
      carPlayers.removeChild(carPlayers.firstChild);
    }
  };

  static removeResult = (result) => {
    while (result.hasChildNodes()) {
      result.removeChild(result.firstChild);
    }
  };
}

export default RemoveTemplate;
