function M2stop () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
function M2_Back () {
    pins.digitalWritePin(DigitalPin.P12, 1)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
input.onButtonPressed(Button.A, function () {
    M1_Forw()
    M2_Forw()
})
function M1_Forw () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
}
input.onButtonPressed(Button.B, function () {
    M1_Back()
    M2_Back()
})
function M1_Back () {
    pins.digitalWritePin(DigitalPin.P0, 1)
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
function M2_Forw () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P2, 1)
}
basic.forever(function () {
	
})
