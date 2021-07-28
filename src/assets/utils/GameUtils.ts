import GameDataInterface from '../../interface/GameData';

export default class GameUtils {
  public static ROW_NUMBER: number = 8;
  public static CARD_LENGTH: number = 52;
  public static FOUNDATION_LENGTH: number = 4;
  public static OPEN_CELL_LENGTH: number = 4;
  private static isUsed: boolean[] = new Array(GameUtils.CARD_LENGTH).fill(
    false
  );

  private static getRandCardNum: Function = (): number => {
    let value: number;
    while (true) {
      value = Math.floor(Math.random() * GameUtils.CARD_LENGTH); // 0 - 51
      if (!GameUtils.isUsed[value]) {
        GameUtils.isUsed[value] = true;
        return value;
      }
    }
  };

  public static GetRandomCardList(): number[][] {
    let list: number[][] = new Array(GameUtils.ROW_NUMBER).fill([]);
    for (let i = 0; i < GameUtils.CARD_LENGTH; ++i) {
      let row: number = i % GameUtils.ROW_NUMBER;
      let cardValue: number = GameUtils.getRandCardNum();
      list[row] = [...list[row], cardValue];
    }

    return list;
  }

  public static GetListData(data: GameDataInterface, type: string): number[][] {
    switch (type) {
      case 'opencell':
        return data.openCellList;
      case 'foundation':
        return data.foundation;
      case 'main':
      default:
        return data.mainCardList;
    }
  }
}
