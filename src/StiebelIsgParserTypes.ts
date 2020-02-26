export interface StiebelIsgSystemInfo {
  roomTemperature: {

    /** actual room temperature of heat circuit 1 in °C */
    actualRoomTemperatureHc1: number;

    /** set room temperature of heat circuit 1 in °C */
    setRoomTemperatureHc1: number;

    /** relative humidity in heat circuit 1 in % */
    relativeHumidityHc1: number;

    /** actual room temperature of heat circuit 2 in °C */
    actualRoomTemperatureHc2: number;

    /** set room temperature of heat circuit 2 in °C */
    setRoomTemperatureHc2: number;

    /** relative humidity in heat circuit 2 in % */
    relativeHumidityHc2: number;
  },
  heating: {

    /** outside temperature in °C */
    outsideTemperature: number;

    /** actual temperature in heat circuit 1 in °C */
    actualTemperatureHc1: number;

    /** set temperature in heat circuit 1 in °C */
    setTemperatureHc1: number;

    /** actual temperature in heat circuit 2 in °C */
    actualTemperatureHc2: number;

    /** set temperature in heat circuit 2 in °C */
    setTemperatureHc2: number;

    /** flow temperature in °C */
    flowTemperature: number;

    /** return temperature in °C */
    returnTemperature: number;

    /** pressure in bar */
    pressure: number;

    /** flow rate in l/min */
    flowRate: number;
  },
  dhw: {

    /** actual DHW temperature in °C */
    actualTemperature: number;

    /** set DHW temperature in °C */
    setTemperature: number;
  },
  ventilation: {

    /** actual fan speed in Hz */
    actualFanSpeed: number;

    /** set flow rate in m³/h */
    setFlowRate: number;

    /** extract air actual fan speed in Hz */
    extractAirActualFanSpeed: number;

    /** extract air set flow rate in m³/h */
    extractAirSetFlowRate: number;

    /** extract air relative humidity in % */
    extractAirRelativeHumidity: number;

    /** extract air temperature in °C */
    extractAirTemperature: number;

    /** extract air dew point in °C */
    extractAirDewPointTemperature: number;

    /** differential pressure */
    differentialPressure: number;
  },
  cooling: {

    /** dew point temperature in heat circuit 1 in °C */
    dewPointTemperatureHc1: number;

    /** dew point temperature in heat circuit 2 in °C */
    dewPointTemperatureHc2: number;
  },

  /** heat source: heating stage */
  heatSourceHeatingStage: number,

  /** energy management enabled */
  energyManagementEnabled: boolean
}
