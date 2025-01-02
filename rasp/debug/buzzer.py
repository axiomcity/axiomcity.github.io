#!/usr/bin/env python3.11

from gpiozero import Buzzer
from time import sleep

# Définir le buzzer connecté au GPIO 17
buzzer = Buzzer(17)

# Faire sonner 5 fois
buzz = 0

try:
    while buzz <= 5:
        buzzer.on()
        sleep(1)
        buzzer.off()
        sleep(.5)
        buzz += 1

except KeyboardInterrupt:
    # Nettoyer et désactiver le buzzer en cas d'interruption
    buzzer.off()
