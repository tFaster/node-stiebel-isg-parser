import { parse } from 'node-html-parser';
import HTMLElement from 'node-html-parser/dist/nodes/html';
import { StiebelIsgSystemInfo, StiebelIsgVentilationStages } from './StiebelIsgParserTypes';


export function parseVentilationStages(rawData: string): StiebelIsgVentilationStages {
  const rawDataWithReplacedScriptTags: string = rawData.replace(/script/g, 'article');
  const root: HTMLElement = parse(rawDataWithReplacedScriptTags) as HTMLElement;
  const articleElements: HTMLElement[] = root.querySelectorAll('#werte div.values article');
  const dayStage: string = articleElements[0].rawText.trim().substr(-3, 1);
  const nightStage: string = articleElements[1].rawText.trim().substr(-3, 1);
  const standbyStage: string = articleElements[2].rawText.trim().substr(-3, 1);
  const partyStage: string = articleElements[3].rawText.trim().substr(-3, 1);
  const manualStage: string = articleElements[4].rawText.trim().substr(-3, 1);
  return {
    day: parseInt(dayStage, 10),
    night: parseInt(nightStage, 10),
    standby: parseInt(standbyStage, 10),
    party: parseInt(partyStage, 10),
    manual: parseInt(manualStage, 10),
  }
}

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
      extractAirDewPointTemperature: readFloat(valueElements[23]),
      differentialPressure: readFloat(valueElements[24])
    },
    cooling: {
      dewPointTemperatureHc1: readFloat(valueElements[25]),
      dewPointTemperatureHc2: readFloat(valueElements[26])
    },
    heatSourceHeatingStage: parseInt(valueElements[27].rawText, 10),
    energyManagementEnabled: !readBooleanImage(valueElements[28], 'ste-symbol_an-97b765.png')
  };

  return res;
}






