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

  public static IsMoveValid(
    type: string,
    rowIndex: number,
    targetRow: number[],
    moveCardLists: number[]
  ): boolean {
    switch (type) {
      case 'foundation':
        return GameUtils.isMoveToFoundationValid(
          rowIndex,
          targetRow,
          moveCardLists
        );
      case 'opencell':
        return GameUtils.isMoveToOpenCellValid(targetRow, moveCardLists);
      case 'main':
      default:
        return GameUtils.isMoveToOtherRowValid(targetRow, moveCardLists);
    }
  }

  private static isMoveToOpenCellValid(
    targetRow: number[],
    moveCardLists: number[]
  ): boolean {
    return !targetRow.length && moveCardLists.length === 1;
  }

  private static isMoveToFoundationValid(
    rowIndex: number,
    targetRow: number[],
    moveCardLists: number[]
  ): boolean {
    if (moveCardLists.length !== 1) return false;

    switch (rowIndex) {
      case 0: // spade (0-12)
        if (moveCardLists[0] > 12) return false;
        return moveCardLists[0] - targetRow.length === 0;
      case 1: // heart (13-25)
        if (moveCardLists[0] > 25 || moveCardLists[0] < 13) return false;
        return moveCardLists[0] - targetRow.length === 13;
      case 2: // diamond (26-38)
        if (moveCardLists[0] > 38 || moveCardLists[0] < 26) return false;
        return moveCardLists[0] - targetRow.length === 26;
      case 3: // club (39-51)
        if (moveCardLists[0] > 51 || moveCardLists[0] < 39) return false;
        return moveCardLists[0] - targetRow.length === 39;
      default:
        return false;
    }
  }

  private static isMoveToOtherRowValid(
    targetRow: number[],
    moveCardLists: number[]
  ): boolean {
    /**
     * spade  <-> heart    diff 13 * 1 +- 1 = 12 || 14
     * spade  <-> diamond  diff 13 * 2 +- 1 = 25 || 27
     * club   <-> heart    diff 13 * 2 +- 1 = 25 || 27
     * club   <-> diamond  diff 13 * 1 +- 1 = 12 || 14
     */
    if (!targetRow.length) return true;
    let valueDiff: number = Math.abs(
      targetRow[targetRow.length - 1] - moveCardLists[0]
    );
    return (
      valueDiff === 12 ||
      valueDiff === 14 ||
      valueDiff === 25 ||
      valueDiff === 27
    );
  }
}
