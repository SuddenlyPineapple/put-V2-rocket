#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <MPU9250_asukiaaa.h>
#include <Adafruit_BMP280.h>
#include <SPI.h>
//
// TODO ADDING CHECKING BATTERY STATUS
// https://www.pangodream.es/esp32-getting-battery-charging-level

// I2C DEFINE
#define SDA_PIN 23
#define SCL_PIN 19
// SPI DEFINE
#define MISO_PIN 27
#define MOSI_PIN 25

//BLE DEFINE
#define serviceID BLEUUID("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
BLECharacteristic customCharacteristic(
        BLEUUID("beb5483e-36e1-4688-b7f5-ea07361b26a8"),
        BLECharacteristic::PROPERTY_READ |
        BLECharacteristic::PROPERTY_WRITE |
        BLECharacteristic::PROPERTY_NOTIFY
);
bool deviceConnected = false;

//I2C device found at address 0x68 - mpu9250
MPU9250_asukiaaa mySensor;
float aX, aY, aZ, aSqrt, gX, gY, gZ, mDirection, mX, mY, mZ, temp, press, latt;

//I2C device found at address 0x76 - bmp280
Adafruit_BMP280 bmp;

//Build-in Hall sensor
//int hall = 0;
char value[1024] = "Default";

//Sending Data
class ServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer *MyServer) {
        deviceConnected = true;
    };

    void onDisconnect(BLEServer *MyServer) {
        deviceConnected = false;
    }
};

//Receiving data
class MyCharacteristicCallbacks : public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *customCharacteristic) {
        std::string rcvString = customCharacteristic->getValue();
        if (rcvString.length() > 0) {
            for (int i = 0; i < rcvString.length(); ++i) {
                Serial.print(rcvString[i]);
                value[i] = rcvString[i];
            }
            for (int i = rcvString.length(); i < 50; ++i) {
                value[i] = 0;
            }
            customCharacteristic->setValue((char *) &value);
        } else {
            Serial.println("Empty Value Received!");
        }
    }
};

void setup() {
    //USE PIN 22 as GND
    pinMode(22, OUTPUT);
    digitalWrite(22, LOW);

    //Serial RUN for TESTING
    Serial.begin(115200);

    //I2C RUN
    Wire.begin(SDA_PIN, SCL_PIN);
    mySensor.setWire(&Wire);

    //SPI RUN
    SPI.begin(18, MISO_PIN, MOSI_PIN, 34);

    // MPU9250_asukiaaa RUN
    mySensor.beginAccel();
    mySensor.beginGyro();

    // BMP280 RUN
    bmp.begin();
    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                    Adafruit_BMP280::SAMPLING_X2,
                    Adafruit_BMP280::SAMPLING_X16,
                    Adafruit_BMP280::FILTER_X16,
                    Adafruit_BMP280::STANDBY_MS_500);

    // BLE CONFIGURATION
    /* Create the BLE Server */
    BLEDevice::init("ROCKET PUT"); // BLE DEV NAME
    BLEServer *MyServer = BLEDevice::createServer();  //Create the BLE Server
    MyServer->setCallbacks(new ServerCallbacks());  // Set the function that handles server callbacks
    BLEService *customService = MyServer->createService(serviceID); // Create the BLE Service
    customService->addCharacteristic(&customCharacteristic);  // Create a BLE Characteristic
    customCharacteristic.setCallbacks(new MyCharacteristicCallbacks());
    MyServer->getAdvertising()->addServiceUUID(serviceID);  // Configure Advertising
    customService->start(); // Start the service
    MyServer->getAdvertising()->start();  // Start the server/advertising
}


void loop() {
    if (mySensor.accelUpdate() == 0) {
        aX = mySensor.accelX();
        aY = mySensor.accelY();
        aZ = mySensor.accelZ();
        aSqrt = mySensor.accelSqrt();

//        Serial.println("accelX: " + String(aX));
//        Serial.println("accelY: " + String(aY));
//        Serial.println("accelZ: " + String(aZ));
//        Serial.println("accelSqrt: " + String(aSqrt));
    } else {
//        Serial.println("Cannod read accel values");
    }

    if (mySensor.gyroUpdate() == 0) {
        gX = mySensor.gyroX();
        gY = mySensor.gyroY();
        gZ = mySensor.gyroZ();

//        Serial.println("gyroX: " + String(gX));
//        Serial.println("gyroY: " + String(gY));
//        Serial.println("gyroZ: " + String(gZ));
    } else {
//        Serial.println("Cannot read gyro values");
    }

    if (bmp.begin() == 1) {
        temp = bmp.readTemperature();
        press = bmp.readPressure() / 100;
        latt = bmp.readAltitude(998); //<-- Put here your Sea Level Pressure (hPa)
//        Serial.println("Temperature: " + String(temp) + " *C");
//        Serial.println("Pressure: " + String(press) + " hPa");
//        Serial.println("Approx altitude: " + String(latt) + " m");

    } else {
//        Serial.println("Cannot read BMP280 values");
    }
//    Take data form Hall chip sensor
//    hall = hallRead();
//    Serial.println(hall);

    //SENDING DATA VIA BLE
    if (deviceConnected) {
        char s[1024];
        snprintf(s, sizeof(s),
                 "{\"temp\": %f, \"pressure\": %f, \"altitude\": %f, \"aX\": %f, \"aY\": %f, \"aZ\": %f, \"aSqrt\": %f, \"gX\": %f, \"gY\": %f, \"gZ\": %f}",
                 temp, press, latt, aX, aY, aZ, aSqrt, gX, gY, gZ);
        customCharacteristic.setValue(s);
        customCharacteristic.notify();
    }
    delay(2000);
}