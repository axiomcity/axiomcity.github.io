#!/usr/bin/env python3.11

import adafruit_bme680
from busio import I2C
import board
from time import sleep
from gpiozero import RGBLED
from gpiozero import Buzzer
import paho.mqtt.client as mqtt
import subprocess

# Demarrer le script MQTT en arriere plan
process = subprocess.Popen(['python3', 'MQTT.py'])

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

# Test de demarrage de la LED
l.color = (1, 0, 0)
print("Red...")
sleep(2)

l.color = (0, 1, 0)
print("Green...")
sleep(2)

l.color = (0, 0, 1)
print("Blue...")
sleep(2)

l.color = (1, 1, 1)
print("White...")
sleep(.2)

# Définir le buzzer connecté au GPIO 17
buzzer = Buzzer(17)

# Make the buzzer buzz 3 time
buzz = 0

# Boucle principale du Capteur BME680
while True:

# Verifier si le script MQTT tourne
    if process.poll() is None:
        print("Le script est toujours en cours d'exécution.")
    else:
        print("Le script s'est terminé.")

	# Lire les donnée du capteur

    color = "white"
    temp_c = bme680.temperature + temp_o
    temp_f = to_f(temp_c)
    humidity = bme680.humidity
    #altitude = bme680.altitude
    #pressure = bme680.pressure + 375,32
    gas = bme680.gas

	# Publication des données sur des topics MQTT
    mqtt_client.publish("sensor/temp_c", f"{temp_c:.2f}")
    mqtt_client.publish("sensor/temp_f", f"{temp_f:.2f}")
    mqtt_client.publish("sensor/hum", f"{humidity:.2f}")
    #mqtt_client.publish("sensor/pre", f"{pressure:.2f}")
    #mqtt_client.publish("sensor/alt", f"{altitude:.2f}")
    mqtt_client.publish("sensor/gas", f"{gas:.2f}")

	# Adapter la couleur de la LED a la température en direct

    sleep (0.5)
    if  temp_c <= 30:
	    print("color is blue", temp_c)
	    l.color = (0, 0, 1)

    if  buzz <= 5:
	    buzzer.on()
	    sleep(1)
	    buzzer.off()
	    sleep(.5)
	    buzz += 1

    elif  (temp_c >= 30 and temp_c <= 40):
	    print("color is green - température:", temp_c, "\nhumidité: ", humidity, "%\ngazs:", gas)
	    l.color = (0, 1, 0)
	    buzz = 0

    elif  (temp_c >= 40):
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
