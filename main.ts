// Robopanda - DC Motor control PWM (analogWrite, 0 - 1023)
// M1: IN1=P0, IN2=P1 | M2: IN1=P12, IN2=P2
// Forward  = IN2 di-PWM, IN1 = 0
// Backward = IN1 di-PWM, IN2 = 0

// Set frekuensi PWM motor ke 5 kHz (period 200 us) agar halus & tidak berdengung.
pins.analogSetPeriod(AnalogPin.P0, 200)
pins.analogSetPeriod(AnalogPin.P1, 200)
pins.analogSetPeriod(AnalogPin.P2, 200)
pins.analogSetPeriod(<AnalogPin>DigitalPin.P12, 200)

// Kecepatan motor (0 - 1023). Ubah angka ini untuk ganti kecepatan default.
let speed = 512

function M2stop () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
function M2_Back (speed: number) {
    pins.analogWritePin(DigitalPin.P12, speed)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
input.onButtonPressed(Button.A, function () {
    M1_Forw(speed)
    M2_Forw(speed)
})
function M1_Forw (speed: number) {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.analogWritePin(DigitalPin.P1, speed)
}
input.onButtonPressed(Button.B, function () {
    M1_Back(speed)
    M2_Back(speed)
})
function M1_Back (speed: number) {
    pins.analogWritePin(DigitalPin.P0, speed)
    pins.digitalWritePin(DigitalPin.P1, 0)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    M1Stop()
    M2stop()
})
function M1Stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
}
function M2_Forw (speed: number) {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.analogWritePin(DigitalPin.P2, speed)
}
basic.forever(function () {
	
})
