import { parse } from 'node-html-parser';
import HTMLElement from 'node-html-parser/dist/nodes/html';
import { StiebelIsgSystemInfo } from './StiebelIsgParserTypes';

export function parseSystemInfo(rawData: string): StiebelIsgSystemInfo {
  const root: HTMLElement = parse(rawData) as HTMLElement;
  const valueElements = root.querySelectorAll('#werte table tr td.value');

  const readFloat = (elem: HTMLElement): number => {
    return parseFloat(elem.rawText.split(' ')[0].replace(',', '.'));
  };

  const readBooleanImage = (elem: HTMLElement, imageFileName: string): boolean => {
    return (elem.firstChild as HTMLElement).attributes.src.indexOf(imageFileName) >= 0;
  };

  const res: StiebelIsgSystemInfo = {
    roomTemperature: {
      actualRoomTemperatureHc1: readFloat(valueElements[0]),
      setRoomTemperatureHc1: readFloat(valueElements[1]),
      relativeHumidityHc1: readFloat(valueElements[2]),
      actualRoomTemperatureHc2: readFloat(valueElements[3]),
      setRoomTemperatureHc2: readFloat(valueElements[4]),
      relativeHumidityHc2: readFloat(valueElements[5])
    },
    heating: {
      outsideTemperature: readFloat(valueElements[6]),
      actualTemperatureHc1: readFloat(valueElements[7]),
      setTemperatureHc1: readFloat(valueElements[8]),
      actualTemperatureHc2: readFloat(valueElements[9]),
      setTemperatureHc2: readFloat(valueElements[10]),
      flowTemperature: readFloat(valueElements[11]),
      returnTemperature: readFloat(valueElements[12]),
      pressure: readFloat(valueElements[13]),
      flowRate: readFloat(valueElements[14])
    },
    dhw: {
      actualTemperature: readFloat(valueElements[15]),
      setTemperature: readFloat(valueElements[16])
    },
    ventilation: {
      actualFanSpeed: readFloat(valueElements[17]),
      setFlowRate: readFloat(valueElements[18]),
      extractAirActualFanSpeed: readFloat(valueElements[19]),
      extractAirSetFlowRate: readFloat(valueElements[20]),
      extractAirRelativeHumidity: readFloat(valueElements[21]),
      extractAirTemperature: readFloat(valueElements[22]),
      extractAirDewPointTemperature: readFloat(valueElements[23])
    },
    cooling: {
      dewPointTemperatureHc1: readFloat(valueElements[24]),
      dewPointTemperatureHc2: readFloat(valueElements[25])
    },
    heatSourceHeatingStage: parseInt(valueElements[26].rawText, 10),
    energyManagementEnabled: !readBooleanImage(valueElements[27], 'ste-symbol_an-97b765.png')
  };

  return res;
}






