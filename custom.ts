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
                    pins.digitalWritePin(DigitalPin.P0, 0);
                    pins.digitalWritePin(DigitalPin.P1, 1);
                }
                else {
                    pins.digitalWritePin(DigitalPin.P0, 1);
                    pins.digitalWritePin(DigitalPin.P1, 0);
                }
                break;

            case MotorChannelM3M4.M4:
                if (direction == MotorDirectionDigital.Forward) {
                    pins.digitalWritePin(DigitalPin.P12, 0);
                    pins.digitalWritePin(DigitalPin.P2, 1);
                }
                else {
                    pins.digitalWritePin(DigitalPin.P12, 1);
                    pins.digitalWritePin(DigitalPin.P2, 0);
                }
                break;

            case MotorChannelM3M4.All:
                if (direction == MotorDirectionDigital.Forward) {
                    pins.digitalWritePin(DigitalPin.P0, 0);
                    pins.digitalWritePin(DigitalPin.P1, 1);
                    pins.digitalWritePin(DigitalPin.P12, 0);
                    pins.digitalWritePin(DigitalPin.P2, 1);
                }
                else {
                    pins.digitalWritePin(DigitalPin.P0, 1);
                    pins.digitalWritePin(DigitalPin.P1, 0);
                    pins.digitalWritePin(DigitalPin.P12, 1);
                    pins.digitalWritePin(DigitalPin.P2, 0);
                }
                break;
        }
    }
}

