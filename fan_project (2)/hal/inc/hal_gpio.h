#ifndef HAL_GPIO_H
#define HAL_GPIO_H

#include <stdbool.h>
#include <stdint.h>

typedef enum
{
  HAL_GPIO_PIN_RELAY = 0,   /* output: mains relay that switches the fan motor */
  HAL_GPIO_PIN_SPEED,       /* output: relay that selects the high speed tap   */
  HAL_GPIO_PIN_SW_POWER,    /* input : on/off switch                           */
  HAL_GPIO_PIN_SW_HIGH,     /* input : high level switch                       */
  HAL_GPIO_PIN_SW_LOW,      /* input : low level switch                        */
  HAL_GPIO_PIN_SW_TIMER,    /* input : timer button, supplied through the CLI  */
  HAL_GPIO_PIN_COUNT
} HalGpioPin_t;

typedef enum
{
  HAL_GPIO_LOW = 0,
  HAL_GPIO_HIGH
} HalGpioLevel_t;

void HalGpio_Init(void);
void HalGpio_WritePin(HalGpioPin_t pin, HalGpioLevel_t level);
HalGpioLevel_t HalGpio_ReadPin(HalGpioPin_t pin);

/* Simulator only: stands in for a finger on the switch. Real hardware has no such call. */
void HalGpio_SimPress(HalGpioPin_t pin);

#endif /* HAL_GPIO_H */
