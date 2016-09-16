# CsgoPolygonScript
Script de auto-apuestas para csgopolygon.com

# Ejecución del Script

1. Accedemos a través de nuestro navegador web (Firefox / Chrome) a csgopolygon.com e iniciamos sesión.
2. Abrimos la consola del navegador pulsando la combinación de teclas CTRL + MAYUS + I.

![image](https://i.gyazo.com/264c575d00afee93d377bf62570abb49.png)

3. Pegamos el codigo y pulsamos INTRO para ejecutarlo (una vez ejecutado podemos cerrar la ventana de "Herramientas para desarrolladores").
4. Ajustamos el script mediante el formulario de [CONFIGURACIÓN] y pulsamos [START] para iniciarlo.

![image](https://i.gyazo.com/72a6474de611f9811419235359e8618b.png)

# Funcionamiento del Script

En el momento de ejecutar el script, este no realizará ninguna apuesta hasta pasadas 10 rondas.
Durante este periodo de tiempo ira almacenando en memoria las jugadas que vayan saliendo.

![image](https://i.gyazo.com/d7b3b5b1732d515754c6d8416ee06e80.png)

Una vez se hayan almacenado 10 resultados, los analizara y realizará su primera apuesta.

![image](https://i.gyazo.com/cb3722e4241d667103322f27973c394c.png)

### Algoritmo de apuestas:

El script comenzará apostando el numero de coins establecidos en el campo "apuesta base":
- Si pierde: ira multiplicando la apuesta *2 hasta ganar, de esta forma recuperará lo apostado en las rondas perdidas y ganará la apuesta base.
- Si gana: volverá a la apuesta base.

El script apostará siempre al último número que ha salido en la ruleta (salvo al color verde). Esta regla se romperá si el porcentaje de un color en la ruleta es del 10% o menos; en este caso apostará a dicho color, ya que existe una alta probabilidad de que aparezca.

El script puede entrar en un modo "apuesta segura". Este modo se activara cuando la racha de 'partidas perdidas seguidas', sea igual a la mitad del 'limite de rondas perdidas'.
Si por ejemplo, hemos establecido un limite de rondas perdidas = 11. El modo "apuesta segura" entrará cuando se alcancen las 6 rodas consecutivas perdidas. (11/2 = 6 (redondeo a la alza)).
*El objetivo de este metodo prevenir los raimbows.*

![image](https://i.gyazo.com/75784998d64cb8b1757f8078ca6d0a16.png)

Cuando el script se encuentre en este modo de "apuesta segura", ira saltando rondas sin apostar, hasta que el porcentaje de un color sea del 10% o menos. En ese momento ira apostando a dicho color hasta que salga.

Mientras el script se encuentre en ese modo, podemos jugarnosla y apostar a un color (puede que el script pase minutos u horas hasta que se de el % establecido). Para ello podeis hacer clic en los enlaces que os aparecerán: ROJO o NEGRO

Evidentemente, una vez se gane la ronda el script volvera a ejecutarse en el modo normal.

Si en algun momento quereis detener la ejecución del script o mostrar el chat, teneis a vuestra disposición en el script los botones.

# Tablas de apuestas

Base 1 coin:

Racha de perdidas	Apuestas	Balance inicial que necesitas
#0	1 coins	1 coins
#1	2 coins	3 coins
#2	4 coins	7 coins
#3	8 coins	15 coins
#4	16 coins	31 coins
#5	32 coins	63 coins
#6	64 coins	127 coins
#7	128 coins	255 coins
#8	256 coins	511 coins
#9	512 coins	1023 coins
#10	1024 coins	2047 coins
#11	2048 coins	4095 coins
#12	4096 coins	8191 coins
#13	8192 coins	16383 coins
#14	16384 coins	32767coins
#15	32768 coins	65535 coins

Base 5 coins:

Racha de perdidas	Apuestas	Balance inicial que necesitas
#0	5 coins	5 coins
#1	10 coins	15 coins
#2	20 coins	35 coins
#3	40 coins	75 coins
#4	80 coins	155 coins
#5	160 coins	315 coins
#6	320 coins	635 coins
#7	640 coins	1275 coins
#8	1280 coins	2555 coins
#9	2560 coins	5115 coins
#10	5120 coins	10235 coins
#11	10240 coins	20475 coins
#12	20480 coins	40955 coins
#13	40960 coins	81915 coins
#14	81920 coins	163835 coins
#15	163840 coins	327675 coins
