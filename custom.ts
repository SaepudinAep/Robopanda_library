namespace rekabit {
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
    export function runMotorFullDigital(motor: MotorChannel34, direction: MotorDirection): void {
        switch (motor) {
            case MotorChannel34.M3:
                if (direction == MotorDirection.Forward) {
                    pins.digitalWritePin(DigitalPin.P0, 0);
                    pins.digitalWritePin(DigitalPin.P1, 1);
                }
                else {
                    pins.digitalWritePin(DigitalPin.P0, 1);
                    pins.digitalWritePin(DigitalPin.P1, 0);
                }
                break;

            case MotorChannel34.M4:
                if (direction == MotorDirection.Forward) {
                    pins.digitalWritePin(DigitalPin.P12, 0);
                    pins.digitalWritePin(DigitalPin.P2, 1);
                }
                else {
                    pins.digitalWritePin(DigitalPin.P12, 1);
                    pins.digitalWritePin(DigitalPin.P2, 0);
                }
                break;

            case MotorChannel34.All:
                if (direction == MotorDirection.Forward) {
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

