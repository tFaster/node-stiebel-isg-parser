import { readFileSync } from 'fs';
import { join } from 'path';
import { parseSystemInfo } from '../src/StiebelIsgParser';
import { StiebelIsgSystemInfo } from '../src/StiebelIsgParserTypes';

describe('StiebelIsgParser', () => {

  it('should parse system info', () => {
    const rawData = readFileSync(join(__dirname, './data/isg-web_info-system_10.1.0.html')).toString();
    const parsed: StiebelIsgSystemInfo = parseSystemInfo(rawData);
    expect(parsed).toBeDefined();
    expect(parsed.roomTemperature.actualRoomTemperatureHc1).toBe(20.1);
    expect(parsed.roomTemperature.setRoomTemperatureHc1).toBe(20.2);
    expect(parsed.roomTemperature.relativeHumidityHc1).toBe(40.2);
    expect(parsed.roomTemperature.actualRoomTemperatureHc2).toBe(21);
    expect(parsed.roomTemperature.setRoomTemperatureHc2).toBe(22.5);
    expect(parsed.roomTemperature.relativeHumidityHc2).toBe(41.3);

    expect(parsed.heating.outsideTemperature).toBe(11.9);
    expect(parsed.heating.actualTemperatureHc1).toBe(43.4);
    expect(parsed.heating.setTemperatureHc1).toBe(25.5);
    expect(parsed.heating.actualTemperatureHc2).toBe(42.8);
    expect(parsed.heating.setTemperatureHc2).toBe(26.9);
    expect(parsed.heating.flowTemperature).toBe(45);
    expect(parsed.heating.pressure).toBe(1.6);
    expect(parsed.heating.flowRate).toBe(28.7);

    expect(parsed.dhw.actualTemperature).toBe(42.6);
    expect(parsed.dhw.setTemperature).toBe(46.9);

    expect(parsed.ventilation.actualFanSpeed).toBe(22.2);
    expect(parsed.ventilation.setFlowRate).toBe(140);
    expect(parsed.ventilation.extractAirActualFanSpeed).toBe(22.1);
    expect(parsed.ventilation.extractAirSetFlowRate).toBe(140);
    expect(parsed.ventilation.extractAirRelativeHumidity).toBe(35);
    expect(parsed.ventilation.extractAirTemperature).toBe(25.4);
    expect(parsed.ventilation.extractAirDewPointTemperature).toBe(8.6);
    expect(parsed.ventilation.differentialPressure).toBe(0);

    expect(parsed.cooling.dewPointTemperatureHc1).toBe(11.1);
    expect(parsed.cooling.dewPointTemperatureHc2).toBe(11.2);

    expect(parsed.heatSourceHeatingStage).toBe(2);

    expect(parsed.energyManagementEnabled).toBeFalsy();
  });
});
