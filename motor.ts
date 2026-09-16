/*******************************************************************************
 * Functions for REKA:BIT - DC motors and servos driver.
 *
 * NOTE: DC motor routing is changed from I2C (via PIC16F1827) to direct
 * micro:bit physical pin control using PWM.
 *
 * Pin mapping (H-bridge 2-pin per motor):
 *   M1: IN1 = P0,  IN2 = P1
 *   M2: IN1 = P12, IN2 = P2
 *
 * Servos are still controlled via the onboard PIC16F1827 (I2C).
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Motor channel.
enum MotorChannel {
    M1 = 0,
    M2 = 1,
    
    //% block="all"
    All = 1000,
};

// Motor direction.
enum MotorDirection {
    //% block="forward"
    Forward = 0,

    //% block="backward"
    Backward = 1
};

// Servo Channel.
enum ServoChannel {
    S1 = REG_ADD_SERVO_1,
    S2 = REG_ADD_SERVO_2,
    S3 = REG_ADD_SERVO_3,
    S4 = REG_ADD_SERVO_4,

    //% block="all"
    All = 1000,
};

// DC motor pin mapping (direct physical pin routing).
const M1_IN1 = DigitalPin.P0;
const M1_IN2 = DigitalPin.P1;
const M2_IN1 = DigitalPin.P12;
const M2_IN2 = DigitalPin.P2;



namespace rekabit {

    // Set the PWM frequency of the motor pins to 5 kHz (period = 200 us).
    pins.analogSetPeriod(AnalogPin.P0, 200);
    pins.analogSetPeriod(AnalogPin.P1, 200);
    pins.analogSetPeriod(AnalogPin.P2, 200);
    pins.analogSetPeriod(<AnalogPin>DigitalPin.P12, 200);

    /**
     * Drive the motor pins directly with PWM.
     * @param motor Motor channel.
     * @param direction Motor direction.
     * @param speed Motor speed (0-255), scaled to analogWrite range (0-1023).
     */
    function driveMotorPins(motor: MotorChannel, direction: MotorDirection, speed: number): void {
        speed = rekabit.limit(speed, 0, 255) * 4;
        switch (motor) {
            case MotorChannel.M1:
                if (direction == MotorDirection.Forward) {
                    pins.digitalWritePin(M1_IN1, 0);
                    pins.analogWritePin(M1_IN2, speed);
                }
                else {
                    pins.analogWritePin(M1_IN1, speed);
                    pins.digitalWritePin(M1_IN2, 0);
                }
                break;

            case MotorChannel.M2:
                if (direction == MotorDirection.Forward) {
                    pins.digitalWritePin(M2_IN1, 0);
                    pins.analogWritePin(M2_IN2, speed);
                }
                else {
                    pins.analogWritePin(M2_IN1, speed);
                    pins.digitalWritePin(M2_IN2, 0);
                }
                break;

            case MotorChannel.All:
                if (direction == MotorDirection.Forward) {
                    pins.digitalWritePin(M1_IN1, 0);
                    pins.analogWritePin(M1_IN2, speed);
                    pins.digitalWritePin(M2_IN1, 0);
                    pins.analogWritePin(M2_IN2, speed);
                }
                else {
                    pins.analogWritePin(M1_IN1, speed);
                    pins.digitalWritePin(M1_IN2, 0);
                    pins.analogWritePin(M2_IN1, speed);
                    pins.digitalWritePin(M2_IN2, 0);
                }
                break;
        }
    }

    /**
     * Brake the motor (both pins LOW = coast).
     * @param motor Motor channel. eg: Motor.M1, Motor.M2
     */
    //% group="DC Motors"
    //% weight=20
    //% blockGap=8
    //% blockId=rekabit_brake_motor
    //% block="brake motor %motor"
    export function brakeMotor(motor: MotorChannel): void {
        switch (motor) {
            case MotorChannel.M1:
                pins.digitalWritePin(M1_IN1, 0);
                pins.digitalWritePin(M1_IN2, 0);
                break;

            case MotorChannel.M2:
                pins.digitalWritePin(M2_IN1, 0);
                pins.digitalWritePin(M2_IN2, 0);
                break;

            case MotorChannel.All:
                pins.digitalWritePin(M1_IN1, 0);
                pins.digitalWritePin(M1_IN2, 0);
                pins.digitalWritePin(M2_IN1, 0);
                pins.digitalWritePin(M2_IN2, 0);
                break;
        }
    }


    /**
     * Run the motor forward or backward (Speed = 0-255).
     * @param motor Motor channel.
     * @param direction Motor direction.
     * @param speed Motor speed (0-255). eg: 128
     */
    //% group="DC Motors"
    //% weight=19
    //% blockGap=40
    //% blockId=rekabit_run_motor
    //% block="run motor %motor %direction at speed %speed"
    //% speed.min=0 speed.max=255
    export function runMotor(motor: MotorChannel, direction: MotorDirection, speed: number): void {
        driveMotorPins(motor, direction, speed);
    }


    /**
     * Disable the servo.
     * @param servo Servo channel.
     */
    //% group="Servos"
    //% weight=18
    //% blockGap=8
    //% blockId=rekabit_disable_servo
    //% block="disable servo %servo"
    export function disableServo(servo: ServoChannel): void {
        if (servo == ServoChannel.All) {
            rekabit.i2cWrite(ServoChannel.S1, 0);
            rekabit.i2cWrite(ServoChannel.S2, 0);
            rekabit.i2cWrite(ServoChannel.S3, 0);
            rekabit.i2cWrite(ServoChannel.S4, 0);
        }
        else {
            rekabit.i2cWrite(servo, 0);
        }
    }


    /**
     * Set the position for servo (0-180 degrees).
     * @param servo Servo channel.
     * @param position Servo positon. eg: 90
     */
    //% group="Servos"
    //% weight=17
    //% blockGap=40
    //% blockId=rekabit_set_servo_position
    //% block="set servo %servo position to %position degrees"
    //% position.min=0 position.max=180
    export function setServoPosition(servo: ServoChannel, position: number): void {
        position = rekabit.limit(position, 0, 180);

        let pulseWidth = position * 20 / 18 + 50
        if (servo == ServoChannel.All) {
            rekabit.i2cWrite(ServoChannel.S1, pulseWidth);
            rekabit.i2cWrite(ServoChannel.S2, pulseWidth);
            rekabit.i2cWrite(ServoChannel.S3, pulseWidth);
            rekabit.i2cWrite(ServoChannel.S4, pulseWidth);
        }
        else {
            rekabit.i2cWrite(servo, pulseWidth);
        }
    }

}

