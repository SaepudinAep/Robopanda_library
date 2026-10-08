namespace rekabit {
    export enum MotorChannelM3M4 {
        //% block="M3"
        M3 = 0,
        //% block="M4"
        M4 = 1,
        //% block="all"
        All = 1000
    }

    export enum MotorDirectionDigital {
        //% block="forward"
        Forward = 0,
        //% block="backward"
        Backward = 1
    }

    /**
     * Run the motor forward or backward at full speed (digital).
     * @param motor Motor channel (M3 or M4).
     * @param direction Motor direction.
     */
    //% group="DC Motors"
    //% weight=18
    //% blockGap=8
    //% blockId=rekabit_run_motor_full_digital
    //% block="run motor digital %motor %direction"
    export function runMotorFullDigital(motor: MotorChannelM3M4, direction: MotorDirectionDigital): void {
        switch (motor) {
            case MotorChannelM3M4.M3:
                if (direction == MotorDirectionDigital.Forward) {
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P13, 1023);
                }
                else {
                    pins.analogWritePin(AnalogPin.P14, 1023);
                    pins.analogWritePin(AnalogPin.P13, 0);
                }
                break;

            case MotorChannelM3M4.M4:
                if (direction == MotorDirectionDigital.Forward) {
                    pins.analogWritePin(AnalogPin.P16, 0);
                    pins.analogWritePin(AnalogPin.P15, 1023);
                }
                else {
                    pins.analogWritePin(AnalogPin.P16, 1023);
                    pins.analogWritePin(AnalogPin.P15, 0);
                }
                break;

            case MotorChannelM3M4.All:
                if (direction == MotorDirectionDigital.Forward) {
                    pins.analogWritePin(AnalogPin.P14, 0);
                    pins.analogWritePin(AnalogPin.P13, 1023);
                    pins.analogWritePin(AnalogPin.P16, 0);
                    pins.analogWritePin(AnalogPin.P15, 1023);
                }
                else {
                    pins.analogWritePin(AnalogPin.P14, 1023);
                    pins.analogWritePin(AnalogPin.P13, 0);
                    pins.analogWritePin(AnalogPin.P16, 1023);
                    pins.analogWritePin(AnalogPin.P15, 0);
                }
                break;
        }
    }

    /**
     * Brake the motor (digital).
     * @param motor Motor channel (M3 or M4).
     */
    //% group="DC Motors"
    //% weight=17
    //% blockGap=8
    //% blockId=rekabit_brake_motor_full_digital
    //% block="brake motor digital %motor"
    export function brakeMotorFullDigital(motor: MotorChannelM3M4): void {
        switch (motor) {
            case MotorChannelM3M4.M3:
                pins.analogWritePin(AnalogPin.P14, 0);
                pins.analogWritePin(AnalogPin.P13, 0);
                break;

            case MotorChannelM3M4.M4:
                pins.analogWritePin(AnalogPin.P16, 0);
                pins.analogWritePin(AnalogPin.P15, 0);
                break;

            case MotorChannelM3M4.All:
                pins.analogWritePin(AnalogPin.P14, 0);
                pins.analogWritePin(AnalogPin.P13, 0);
                pins.analogWritePin(AnalogPin.P16, 0);
                pins.analogWritePin(AnalogPin.P15, 0);
                break;
        }
    }

    export enum RekabitAnalogPin {
        //% block="P0"
        P0 = 0,
        //% block="P1"
        P1 = 1,
        //% block="P2"
        P2 = 2
    }

    /**
     * Read analog value from the specified safe pin (0 - 1023).
     * @param pin The analog pin to read from.
     */
    //% group="Sensors"
    //% weight=10
    //% blockGap=8
    //% blockId=rekabit_analog_read
    //% block="read analog pin %pin"
    export function readAnalogPin(pin: RekabitAnalogPin): number {
        switch(pin) {
            case RekabitAnalogPin.P0: return pins.analogReadPin(AnalogPin.P0);
            case RekabitAnalogPin.P1: return pins.analogReadPin(AnalogPin.P1);
            case RekabitAnalogPin.P2: return pins.analogReadPin(AnalogPin.P2);
            default: return 0;
        }
    }
}

