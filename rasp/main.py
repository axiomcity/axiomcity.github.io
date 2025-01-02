#!/usr/bin/env python3.11

import adafruit_bme680
from busio import I2C
import board
from time import sleep
from gpiozero import RGBLED
from gpiozero import Buzzer
import paho.mqtt.client as mqtt

# Initialisation de l'I2C et du capteur BME680
i2c = I2C(board.SCL, board.SDA)
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c, address=0x77)
bme680.sea_level_pressure = 1014
pre_offset = 375.325
temp_o = -3 # Chauffe de l'appareil de 3 degrés :/

# Fonction pour afficher température en f
def to_f(c):
	return(c * 9/5) + 32

# Lire les donnée de la LED
l = RGBLED(13, 19, 26, active_high=True)

# Configuration du client MQTT
mqtt_client = mqtt.Client()
mqtt_client.connect("localhost", 1883, 60)

# Définir le buzzer connecté au GPIO 17
buzzer = Buzzer(17)

# Make the buzzer buzz 3 time
buzz = 0

# Boucle principale du Capteur BME680
while True:

	# Lire les donnée du capteur
    color = "white"
    temp_c = bme680.temperature + temp_o
    temp_f = to_f(temp_c)
    humidity = bme680.humidity
    gas = bme680.gas

	# Publication des données sur des topics MQTT
    mqtt_client.publish("sensor/temp_c", f"{temp_c:.2f}")
    mqtt_client.publish("sensor/temp_f", f"{temp_f:.2f}")
    mqtt_client.publish("sensor/hum", f"{humidity:.2f}")
    mqtt_client.publish("sensor/gas", f"{gas:.2f}")

	# Adapter la couleur de la LED a la température en direct
    sleep(1)
    if  temp_c <= 14:
        print("color is blue", temp_c)
        l.color = (0, 0, 1)
        if  buzz <= 5:
            buzzer.on()
            sleep(1)
            buzzer.off()
            sleep(.5)
            buzz += 1

    elif  (temp_c >= 14 and temp_c <= 30):
	    print("color is green - température:", temp_c, "\ntemperature farenheights", temp_f, "\nhumidité: ", humidity, "%\ngazs:", gas)
	    l.color = (0, 1, 0)
	    buzz = 0

    elif  (temp_c >= 30):
	    print("color is red", temp_c)
	    l.color = (1, 0, 0)
	    if ( buzz <= 5 ):
	        buzzer.on()
	        sleep(1)
	        buzzer.off()
	        sleep(.5)
	        buzz += 1

    else:
	    print("color is not in testing mode, or value has failed", temp_c)
